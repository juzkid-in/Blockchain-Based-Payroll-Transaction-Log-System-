import { PayrollData } from '../types';

export const ACADEMIC_PROJECT_INFO = {
  title: 'Blockchain-Based Payroll Transaction Log System',
  subtitle: 'VTU BIC702 – Activity Based Learning',
  studentName: 'Sanjai Shanmuga Prabu',
  usn: '1SP23IC047',
  department: 'IoT, Cybersecurity and Blockchain Technology',
  subject: 'Blockchain Technology',
  subjectCode: 'BIC702',
  activity: 'Activity Based Learning – Activity 1',
  assignedTopic: 'Payroll Transaction Log',
  institution: 'Visvesvaraya Technological University (VTU)',
  semester: '7th Semester B.E.',
  academicYear: '2026-2027',
};

export const SAMPLE_PAYROLL_TRANSACTIONS: PayrollData[] = [
  {
    employeeId: 'EMP001',
    employeeName: 'Rahul Kumar',
    salary: 35000,
    payrollMonth: 'September 2026',
    paymentStatus: 'Paid',
    remarks: 'Demonstration Data - Monthly Base Salary Disbursed',
  },
  {
    employeeId: 'EMP002',
    employeeName: 'Priya Sharma',
    salary: 42000,
    payrollMonth: 'September 2026',
    paymentStatus: 'Paid',
    remarks: 'Demonstration Data - Senior Associate Salary Disbursed',
  },
  {
    employeeId: 'EMP003',
    employeeName: 'Arjun Rao',
    salary: 38000,
    payrollMonth: 'September 2026',
    paymentStatus: 'Pending',
    remarks: 'Demonstration Data - Verification Pending HR Clearance',
  },
];

export const TEST_CASES_DATA = [
  {
    id: 'TC-01',
    name: 'Create Genesis Block',
    input: 'System initialization',
    expected: 'Genesis Block (Index 0) created with previousHash = "0" and valid SHA-256 hash',
    actual: 'Genesis Block initialized with index 0, previousHash "0", and deterministic cryptographic hash',
    result: 'PASS',
  },
  {
    id: 'TC-02',
    name: 'Add Single Payroll Transaction',
    input: 'EMP001, Rahul Kumar, ₹35000, September 2026, Paid',
    expected: 'New block created with index 1, timestamp, and SHA-256 hash',
    actual: 'Block #1 successfully created and appended to chain',
    result: 'PASS',
  },
  {
    id: 'TC-03',
    name: 'Add Multiple Transactions & Hash Linking',
    input: 'EMP002 and EMP003 payroll entries',
    expected: 'Blocks linked sequentially: Block N previousHash matches Block N-1 currentHash',
    actual: 'Cryptographic chain links verified: Block[N].previousHash == Block[N-1].hash for all blocks',
    result: 'PASS',
  },
  {
    id: 'TC-04',
    name: 'Verify Valid Blockchain Integrity',
    input: 'Unmodified chain containing 4 blocks (Genesis + 3 transactions)',
    expected: 'Status: VALID (No tampering detected)',
    actual: 'All recalculated hashes match stored hashes, all links valid',
    result: 'PASS',
  },
  {
    id: 'TC-05',
    name: 'Simulated Tamper Detection Demo',
    input: 'Modify EMP001 salary from ₹35000 to ₹50000',
    expected: 'Status: INVALID (Tampering detected at Block #1)',
    actual: 'Stored hash != Recalculated hash; avalanche effect breaks subsequent block links',
    result: 'PASS',
  },
  {
    id: 'TC-06',
    name: 'Restore Original Data',
    input: 'Execute Restore/Reset function to revert modified salary back to ₹35000',
    expected: 'Status: VALID (Integrity restored)',
    actual: 'Stored hash equals recalculated hash, chain integrity re-established',
    result: 'PASS',
  },
];

export const VIVA_QUESTIONS_ANSWERS = [
  {
    q: '1. What is a block in your Payroll Blockchain, and what fields does it contain?',
    a: 'In this project, each block is a discrete cryptographic container storing: (1) Block Index, (2) Timestamp, (3) Payroll Transaction Data (Employee ID, Name, Salary, Month, Status), (4) Previous Hash (hash of the prior block), and (5) Current Hash (SHA-256 digest of index + timestamp + data + previousHash).',
  },
  {
    q: '2. What is the Genesis Block, and why does it have previous_hash = "0"?',
    a: 'The Genesis Block is the first block (Index 0) in any blockchain. Because no block precedes it, its previous_hash is explicitly set to "0" by convention, serving as the cryptographic foundation for all subsequent blocks.',
  },
  {
    q: '3. Why did you use SHA-256 for the hashing algorithm?',
    a: 'SHA-256 (Secure Hash Algorithm 256-bit) produces a fixed 64-character hexadecimal digest. It is deterministic, one-way (irreversible), collision-resistant, and exhibits the "avalanche effect", where even a 1-character change in salary completely alters the entire hash.',
  },
  {
    q: '4. How does the system detect if someone tampers with an employee’s salary in the database?',
    a: 'The validation algorithm iterates through every block and independently recalculates its SHA-256 hash using the stored transaction fields, timestamp, and previousHash. If an attacker changes salary from ₹35,000 to ₹50,000, the recalculated hash will not match the stored hash, immediately triggering "Blockchain Status: INVALID - Tampering detected".',
  },
  {
    q: '5. Why does changing one block break all subsequent blocks in the chain?',
    a: 'Every block (N+1) embeds the current hash of block N as its `previousHash`. If block N is modified, its hash changes. Consequently, block N+1\'s stored `previousHash` will no longer equal the modified block N\'s hash. This creates a cascade of cryptographic mismatches.',
  },
  {
    q: '6. Why is blockchain suitable for payroll logs compared to a traditional SQL database?',
    a: 'In traditional relational databases (like MySQL), any administrator with UPDATE/DELETE privileges can alter salary records or payment statuses without leaving an immutable audit trail. Blockchain creates an append-only, tamper-evident log where unauthorized modifications are mathematically detectable.',
  },
  {
    q: '7. Does your project require cryptocurrency or mining?',
    a: 'No. This is a private, permissioned academic ledger specifically designed to demonstrate tamper-evident audit logging. Proof-of-Work (mining) and cryptocurrencies are consensus and incentive mechanisms for public networks like Bitcoin, which are unnecessary for internal organizational payroll verification.',
  },
  {
    q: '8. Explain the 7-step execution flow of your application.',
    a: '1. HR/Admin enters payroll info. 2. Data is converted into a structured transaction. 3. System retrieves the previous block hash. 4. A new block is instantiated. 5. SHA-256 generates the unique block digest. 6. The block is appended to the chain. 7. Continuous verification audits the entire ledger.',
  },
];
