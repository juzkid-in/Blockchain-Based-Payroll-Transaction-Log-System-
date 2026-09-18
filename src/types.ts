export interface PayrollData {
  employeeId: string;
  employeeName: string;
  salary: number;
  payrollMonth: string;
  paymentStatus: 'Paid' | 'Pending';
  remarks?: string;
}

export interface Block {
  index: number;
  timestamp: string; // ISO string
  data: PayrollData | { message: string; initializedBy: string };
  previousHash: string;
  hash: string;
  isGenesis?: boolean;
}

export interface BlockValidationCheck {
  index: number;
  storedHash: string;
  calculatedHash: string;
  isHashValid: boolean;
  storedPrevHash: string;
  actualPrevHash: string;
  isPrevHashValid: boolean;
  isValid: boolean;
  errorReason?: string;
}

export interface ValidationReport {
  isValid: boolean;
  totalBlocks: number;
  checkedAt: string;
  checks: BlockValidationCheck[];
  firstFailureIndex?: number;
  summaryMessage: string;
}

export interface TamperState {
  isTampered: boolean;
  tamperedBlockIndex: number | null;
  originalBlock: Block | null;
  tamperedField: string | null;
  originalValue: string | number | null;
  tamperedValue: string | number | null;
}

export type TabType =
  | 'dashboard'
  | 'add-payroll'
  | 'blockchain'
  | 'verification'
  | 'tamper-demo'
  | 'architecture'
  | 'about'
  | 'viva-guide'
  | 'python-code';
