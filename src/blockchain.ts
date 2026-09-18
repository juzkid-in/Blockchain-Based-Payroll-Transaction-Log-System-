import { Block, PayrollData, ValidationReport, BlockValidationCheck } from './types';

/**
 * Pure TypeScript SHA-256 Implementation
 * Matches standard FIPS 180-4 and Python's hashlib.sha256().hexdigest()
 * Guaranteed to work synchronously in any browser context without requiring async WebCrypto.
 */
export function sha256(ascii: string): string {
  function rightRotate(value: number, amount: number): number {
    return (value >>> amount) | (value << (32 - amount));
  }

  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  const lengthProperty = 'length';
  let i = 0;
  let j = 0; // Used as a counter across the whole file
  let result = '';

  const words: number[] = [];
  const asciiBitLength = ascii[lengthProperty] * 8;

  // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
  let hash: number[] = [];
  const k: number[] = [];

  // Generate constants dynamically
  let primeCounter = 0;
  const isComposite: { [key: number]: boolean } = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = candidate * candidate; i < 312; i += candidate) {
        isComposite[i] = true;
      }
      if (primeCounter < 8) {
        hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      }
      k[primeCounter] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      primeCounter++;
    }
  }

  ascii += '\x80'; // Append Ƈ' bit (plus zero padding)
  while ((ascii[lengthProperty] % 64) - 56) ascii += '\x00'; // More zero padding
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return ''; // ASCII check: only accept 8-bit ASCII characters
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
  words[words[lengthProperty]] = asciiBitLength | 0;

  // Process each 16-word block
  for (j = 0; j < words[lengthProperty]; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = [...hash];

    hash = hash.slice(0, 8);

    for (i = 0; i < 64; i++) {
      const w15 = w[i - 15];
      const w2 = w[i - 2];

      const s0 =
        i >= 16
          ? rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)
          : 0;
      const s1 =
        i >= 16
          ? rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10)
          : 0;

      const currWord =
        i < 16
          ? w[i]
          : ((w[i - 16] + s0 + w[i - 7] + s1) & 0xffffffff);

      w[i] = currWord;

      const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
      const maj =
        (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
      const sigma0 =
        rightRotate(hash[0], 2) ^
        rightRotate(hash[0], 13) ^
        rightRotate(hash[0], 22);
      const sigma1 =
        rightRotate(hash[4], 6) ^
        rightRotate(hash[4], 11) ^
        rightRotate(hash[4], 25);

      const temp1 = (hash[7] + sigma1 + ch + k[i] + currWord) & 0xffffffff;
      const temp2 = (sigma0 + maj) & 0xffffffff;

      hash = [
        (temp1 + temp2) & 0xffffffff,
        hash[0],
        hash[1],
        hash[2],
        (hash[3] + temp1) & 0xffffffff,
        hash[4],
        hash[5],
        hash[6],
      ];
    }

    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) & 0xffffffff;
    }
  }

  for (i = 0; i < 8; i++) {
    for (let b = 3; b >= 0; b--) {
      const byte = (hash[i] >> (b * 8)) & 255;
      result += (byte < 16 ? '0' : '') + byte.toString(16);
    }
  }
  return result;
}

/**
 * Deterministic JSON Stringifier (keys sorted) for consistent hashing
 */
export function canonicalJsonStringify(obj: any): string {
  if (obj === null || typeof obj !== 'object') {
    return JSON.stringify(obj);
  }
  if (Array.isArray(obj)) {
    return '[' + obj.map(canonicalJsonStringify).join(',') + ']';
  }
  const keys = Object.keys(obj).sort();
  return '{' + keys.map((k) => `"${k}":${canonicalJsonStringify(obj[k])}`).join(',') + '}';
}

/**
 * Calculate the SHA-256 hash of a block based on its index, timestamp, data, and previousHash
 */
export function calculateBlockHash(
  index: number,
  timestamp: string,
  data: any,
  previousHash: string
): string {
  const rawString = `${index}|${timestamp}|${canonicalJsonStringify(data)}|${previousHash}`;
  return sha256(rawString);
}

/**
 * Academic Blockchain implementation for Payroll Transaction Logs
 */
export class PayrollBlockchain {
  private chain: Block[] = [];

  constructor(initialChain?: Block[]) {
    if (initialChain && initialChain.length > 0) {
      this.chain = JSON.parse(JSON.stringify(initialChain));
    } else {
      this.createGenesisBlock();
    }
  }

  /**
   * Generates the immutable Genesis Block (Block 0)
   */
  private createGenesisBlock(): Block {
    const index = 0;
    // Standard fixed Genesis timestamp for academic determinism, or current time
    const timestamp = '2026-09-01T09:00:00.000Z';
    const data = {
      message: 'Genesis Block - VTU BIC702 Payroll Chain Initialized',
      initializedBy: 'Sanjai Shanmuga Prabu (1SP23IC047)',
    };
    const previousHash = '0';
    const hash = calculateBlockHash(index, timestamp, data, previousHash);

    const genesisBlock: Block = {
      index,
      timestamp,
      data,
      previousHash,
      hash,
      isGenesis: true,
    };

    this.chain = [genesisBlock];
    return genesisBlock;
  }

  public getChain(): Block[] {
    return JSON.parse(JSON.stringify(this.chain));
  }

  public getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  public getBlockCount(): number {
    return this.chain.length;
  }

  public getPayrollTransactionCount(): number {
    // Exclude genesis block
    return Math.max(0, this.chain.length - 1);
  }

  /**
   * Add a new payroll transaction block
   */
  public addPayrollBlock(payrollData: PayrollData, customTimestamp?: string): Block {
    const previousBlock = this.getLatestBlock();
    const index = previousBlock.index + 1;
    const timestamp = customTimestamp || new Date().toISOString();
    const previousHash = previousBlock.hash;
    const hash = calculateBlockHash(index, timestamp, payrollData, previousHash);

    const newBlock: Block = {
      index,
      timestamp,
      data: payrollData,
      previousHash,
      hash,
      isGenesis: false,
    };

    this.chain.push(newBlock);
    return newBlock;
  }

  /**
   * Validates the entire blockchain
   * For every block after Genesis:
   * 1. Check current hash equals recalculated hash.
   * 2. Check current block's previous_hash equals previous block's hash.
   */
  public validateChain(): ValidationReport {
    const checks: BlockValidationCheck[] = [];
    let isValid = true;
    let firstFailureIndex: number | undefined = undefined;

    for (let i = 0; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const recalculatedHash = calculateBlockHash(
        currentBlock.index,
        currentBlock.timestamp,
        currentBlock.data,
        currentBlock.previousHash
      );

      const isHashValid = currentBlock.hash === recalculatedHash;
      let isPrevHashValid = true;
      let actualPrevHash = '0';
      let errorReason: string | undefined = undefined;

      if (i === 0) {
        // Genesis block check
        if (currentBlock.previousHash !== '0') {
          isPrevHashValid = false;
          errorReason = 'Genesis block previousHash must be "0"';
        }
        if (!isHashValid) {
          errorReason = 'Genesis block stored hash does not match recalculated SHA-256 hash';
        }
      } else {
        const previousBlock = this.chain[i - 1];
        actualPrevHash = previousBlock.hash;
        isPrevHashValid = currentBlock.previousHash === previousBlock.hash;

        if (!isHashValid && !isPrevHashValid) {
          errorReason = 'Both block hash mismatch (data altered) and broken previousHash link';
        } else if (!isHashValid) {
          errorReason = 'Stored hash does not match recalculated hash (Payroll data was altered)';
        } else if (!isPrevHashValid) {
          errorReason = 'previousHash does not match prior block hash (Blockchain link broken)';
        }
      }

      const blockValid = isHashValid && isPrevHashValid;
      if (!blockValid && isValid) {
        isValid = false;
        firstFailureIndex = i;
      }

      checks.push({
        index: currentBlock.index,
        storedHash: currentBlock.hash,
        calculatedHash: recalculatedHash,
        isHashValid,
        storedPrevHash: currentBlock.previousHash,
        actualPrevHash,
        isPrevHashValid,
        isValid: blockValid,
        errorReason,
      });
    }

    return {
      isValid,
      totalBlocks: this.chain.length,
      checkedAt: new Date().toISOString(),
      checks,
      firstFailureIndex,
      summaryMessage: isValid
        ? 'Blockchain Status: VALID. No tampering detected.'
        : `Blockchain Status: INVALID. Tampering detected at or prior to Block #${firstFailureIndex}.`,
    };
  }

  /**
   * Safely injects modified data for academic demonstration
   */
  public tamperWithBlock(
    blockIndex: number,
    modifiedData: Partial<PayrollData>
  ): { original: Block; tampered: Block } {
    if (blockIndex <= 0 || blockIndex >= this.chain.length) {
      throw new Error('Can only tamper with existing payroll blocks (Index > 0)');
    }

    const original = JSON.parse(JSON.stringify(this.chain[blockIndex])) as Block;
    const target = this.chain[blockIndex];

    // Modify the internal payload without updating the block's current hash or subsequent links
    target.data = {
      ...(target.data as PayrollData),
      ...modifiedData,
    };

    return {
      original,
      tampered: JSON.parse(JSON.stringify(target)),
    };
  }

  /**
   * Restores a block to its genuine original state
   */
  public restoreBlock(blockIndex: number, originalBlock: Block): void {
    if (blockIndex >= 0 && blockIndex < this.chain.length) {
      this.chain[blockIndex] = JSON.parse(JSON.stringify(originalBlock));
    }
  }

  /**
   * Reset to initial state
   */
  public resetChain(): void {
    this.createGenesisBlock();
  }

  /**
   * Replace entire chain
   */
  public setChain(newChain: Block[]): void {
    this.chain = JSON.parse(JSON.stringify(newChain));
  }
}
