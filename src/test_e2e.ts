import { PayrollBlockchain } from './blockchain';
import { SAMPLE_PAYROLL_TRANSACTIONS } from './data/sampleData';
import { PayrollData } from './types';

console.log('='.repeat(80));
console.log('  TYPESCRIPT CORE ENGINE: 8-STEP WORKFLOW VERIFICATION');
console.log('  Student: Sanjai Shanmuga Prabu | USN: 1SP23IC047');
console.log('='.repeat(80));

// STEP 1 & 2: Start application and create Genesis Block
console.log('\n[STEP 1 & 2] Initializing PayrollBlockchain and Genesis Block (Block #0)...');
const blockchain = new PayrollBlockchain(); // Creates Genesis Block
const genesis = blockchain.getChain()[0];
console.log(`  [SUCCESS] Genesis Block created:`);
console.log(`    - Index: ${genesis.index}`);
console.log(`    - Previous Hash: ${genesis.previousHash}`);
console.log(`    - SHA-256 Hash: ${genesis.hash}`);
const genesisData = genesis.data as { message: string; initializedBy: string };
console.log(`    - Initialized: ${genesisData.initializedBy}`);

if (genesis.index !== 0 || genesis.previousHash !== '0' || genesis.hash.length !== 64) {
  throw new Error('Genesis block validation failed!');
}

// STEP 3: Add 3 payroll transactions
console.log('\n[STEP 3] Adding 3 payroll transactions...');
const txns: PayrollData[] = [
  {
    employeeId: 'EMP101',
    employeeName: 'Rahul Kumar',
    salary: 45000,
    payrollMonth: 'September 2026',
    paymentStatus: 'Paid',
    remarks: 'Senior Developer Salary',
  },
  {
    employeeId: 'EMP102',
    employeeName: 'Priya Sharma',
    salary: 52000,
    payrollMonth: 'September 2026',
    paymentStatus: 'Paid',
    remarks: 'Team Lead Salary',
  },
  {
    employeeId: 'EMP103',
    employeeName: 'Arjun Rao',
    salary: 38000,
    payrollMonth: 'September 2026',
    paymentStatus: 'Pending',
    remarks: 'Associate Engineer Salary',
  },
];

txns.forEach((txn, i) => {
  const block = blockchain.addPayrollBlock(txn);
  console.log(`  [SUCCESS] Added Block #${block.index}: ${txn.employeeName} (₹${txn.salary})`);
  console.log(`    SHA-256: ${block.hash}`);
  console.log(`    Linked PrevHash: ${block.previousHash}`);
});

if (blockchain.getBlockCount() !== 4) {
  throw new Error(`Expected 4 blocks, found ${blockchain.getBlockCount()}`);
}

// STEP 4: Display all blocks
console.log('\n[STEP 4] Displaying all blocks from chain...');
blockchain.getChain().forEach((blk) => {
  console.log(`  Block #${blk.index} | Prev: ${blk.previousHash.slice(0, 16)}... | Hash: ${blk.hash.slice(0, 16)}...`);
});

// STEP 5: Verify the blockchain
console.log('\n[STEP 5] Verifying blockchain cryptographic integrity...');
let report = blockchain.validateChain();
console.log(`  [SUCCESS] Initial Verification: ${report.summaryMessage}`);
console.log(`  Valid: ${report.isValid}, Checked: ${report.checks.length} blocks`);
if (!report.isValid) {
  throw new Error('Blockchain should be valid before tampering!');
}

// STEP 6: Run tamper detection demonstration
console.log('\n[STEP 6] Running tamper detection demonstration...');
console.log('  Altering salary of Block #1 from ₹45000 to ₹99999 without recomputing hash...');
const { original } = blockchain.tamperWithBlock(1, { salary: 99999 });
report = blockchain.validateChain();
console.log(`  [SUCCESS] Tampering Detected: ${report.summaryMessage}`);
console.log(`  Valid: ${report.isValid}, First Failure Index: ${report.firstFailureIndex}`);
console.log(`  Stored Hash on Block #1:         ${report.checks[1].storedHash}`);
console.log(`  Recalculated SHA-256 on Block 1: ${report.checks[1].calculatedHash}`);
if (report.isValid || report.firstFailureIndex !== 1) {
  throw new Error('Tampering was not detected at Block #1!');
}

// STEP 7: Restore the data
console.log('\n[STEP 7] Restoring authentic original block data...');
blockchain.restoreBlock(1, original);
const restoredBlock = blockchain.getChain()[1];
const restoredData = restoredBlock.data as PayrollData;
console.log(`  [SUCCESS] Block #1 salary restored to: ₹${restoredData.salary}`);
if (restoredData.salary !== 45000) {
  throw new Error('Restoration failed!');
}

// STEP 8: Verify the blockchain again
console.log('\n[STEP 8] Re-verifying blockchain integrity after restoration...');
report = blockchain.validateChain();
console.log(`  [SUCCESS] Re-verification Result: ${report.summaryMessage}`);
console.log(`  Valid: ${report.isValid}, Total blocks: ${report.totalBlocks}`);
if (!report.isValid) {
  throw new Error('Blockchain should be valid after restoration!');
}

console.log('\n' + '='.repeat(80));
console.log('  ALL 8 WORKFLOW STEPS VERIFIED IN TYPESCRIPT WITH ZERO ERRORS!');
console.log('='.repeat(80) + '\n');
