import React, { useState } from 'react';
import { Block, PayrollData } from '../types';
import { calculateBlockHash } from '../blockchain';
import {
  PlusCircle,
  Hash,
  User,
  IndianRupee,
  Calendar,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Boxes,
  ArrowRight,
  Sparkles,
  Info,
} from 'lucide-react';

interface AddPayrollViewProps {
  latestBlock: Block;
  onAddBlock: (payrollData: PayrollData) => Block;
  onNavigateToBlockchain: () => void;
}

export const AddPayrollView: React.FC<AddPayrollViewProps> = ({
  latestBlock,
  onAddBlock,
  onNavigateToBlockchain,
}) => {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [salary, setSalary] = useState('');
  const [payrollMonth, setPayrollMonth] = useState('September 2026');
  const [paymentStatus, setPaymentStatus] = useState<'Paid' | 'Pending'>('Paid');
  const [remarks, setRemarks] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [successBlock, setSuccessBlock] = useState<Block | null>(null);

  // Live calculation of preview hash
  const nextIndex = latestBlock.index + 1;
  const currentTimestamp = new Date().toISOString();
  const previewData: PayrollData = {
    employeeId: employeeId.trim() || 'EMP_PREVIEW',
    employeeName: employeeName.trim() || 'Employee Name',
    salary: Number(salary) || 0,
    payrollMonth: payrollMonth || 'September 2026',
    paymentStatus,
    remarks: remarks.trim() || undefined,
  };
  const previewHash = calculateBlockHash(
    nextIndex,
    currentTimestamp,
    previewData,
    latestBlock.hash
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessBlock(null);

    // Validation (Section 22)
    if (!employeeId.trim()) {
      setError('Employee ID is required (e.g. EMP001, EMP042).');
      return;
    }
    if (!employeeName.trim()) {
      setError('Employee Name is required.');
      return;
    }
    const numSalary = Number(salary);
    if (!salary || isNaN(numSalary) || numSalary <= 0) {
      setError('Please enter a valid positive salary amount.');
      return;
    }
    if (!payrollMonth.trim()) {
      setError('Payroll month is required (e.g. September 2026).');
      return;
    }

    try {
      const newBlock = onAddBlock({
        employeeId: employeeId.trim().toUpperCase(),
        employeeName: employeeName.trim(),
        salary: Math.round(numSalary),
        payrollMonth: payrollMonth.trim(),
        paymentStatus,
        remarks: remarks.trim() || 'Logged via Academic HR Portal',
      });

      setSuccessBlock(newBlock);
      // Reset form
      setEmployeeId('');
      setEmployeeName('');
      setSalary('');
      setRemarks('');
    } catch (err: any) {
      setError(err.message || 'Failed to append block to blockchain.');
    }
  };

  const handleQuickFill = (id: string, name: string, sal: number, status: 'Paid' | 'Pending') => {
    setEmployeeId(id);
    setEmployeeName(name);
    setSalary(sal.toString());
    setPaymentStatus(status);
    setError(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Title & Context */}
      <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <PlusCircle className="w-6 h-6 text-blue-400" />
              Add Payroll Transaction Block
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Create an immutable payroll record. The system will compute its SHA-256 hash using the previous block&apos;s hash as a cryptographic link.
            </p>
          </div>

          <div className="bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-750 text-right">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">Next Block Index</div>
            <div className="font-mono text-xl font-bold text-blue-400">Block #{nextIndex}</div>
          </div>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successBlock && (
        <div className="bg-emerald-950/50 border border-emerald-500/50 rounded-xl p-5 shadow-lg space-y-3 animate-fadeIn">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-emerald-300">
                  Block #{successBlock.index} Successfully Appended to Blockchain!
                </h3>
                <p className="text-xs text-emerald-200/80">
                  SHA-256 hash calculated and linked to previous block #{latestBlock.index}.
                </p>
              </div>
            </div>
            <button
              onClick={onNavigateToBlockchain}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow transition-all cursor-pointer"
            >
              <span>View in Blockchain</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-slate-900/80 rounded-lg p-3 border border-emerald-800/40 text-xs font-mono space-y-1.5">
            <div className="text-slate-400 flex items-center justify-between">
              <span>Block Hash (SHA-256):</span>
              <span className="text-emerald-400 font-bold">{successBlock.hash}</span>
            </div>
            <div className="text-slate-400 flex items-center justify-between">
              <span>Linked Previous Hash:</span>
              <span className="text-slate-300">{successBlock.previousHash}</span>
            </div>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="bg-rose-950/50 border border-rose-500/50 rounded-xl p-4 flex items-center gap-3 text-rose-200 text-sm">
          <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-7 bg-slate-800/80 rounded-xl p-6 border border-slate-700 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-700 pb-4">
            <h3 className="text-base font-bold text-white">Payroll Details</h3>
            {/* Quick Demo Pre-fill */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Quick Demo:</span>
              <button
                type="button"
                onClick={() => handleQuickFill('EMP004', 'Kavita Menon', 45000, 'Paid')}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                EMP004
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleQuickFill('EMP005', 'Vikram Patel', 52000, 'Pending')}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                EMP005
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Employee ID */}
            <div>
              <label htmlFor="employee-id" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Employee ID <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Hash className="w-4 h-4" />
                </div>
                <input
                  id="employee-id"
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="e.g. EMP001"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Unique organization employee alphanumeric code</p>
            </div>

            {/* Employee Name */}
            <div>
              <label htmlFor="employee-name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Employee Name <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="employee-name"
                  type="text"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  placeholder="e.g. Rahul Kumar"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Salary */}
            <div>
              <label htmlFor="salary" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Salary Amount (INR ₹) <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <IndianRupee className="w-4 h-4" />
                </div>
                <input
                  id="salary"
                  type="number"
                  min="1"
                  step="1"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="e.g. 35000"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Monthly net remuneration for this period</p>
            </div>

            {/* Row: Month & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="payroll-month" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Payroll Month <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    id="payroll-month"
                    type="text"
                    value={payrollMonth}
                    onChange={(e) => setPayrollMonth(e.target.value)}
                    placeholder="e.g. September 2026"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="payment-status" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Payment Status <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <select
                    id="payment-status"
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value as 'Paid' | 'Pending')}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="Paid">Paid (Disbursed)</option>
                    <option value="Pending">Pending (Processing)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Optional Remarks */}
            <div>
              <label htmlFor="remarks" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Remarks / Department <span className="text-slate-500">(Optional)</span>
              </label>
              <input
                id="remarks"
                type="text"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="e.g. Engineering Team Base Salary"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                id="btn-add-payroll-submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md shadow-blue-600/20 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                Add Payroll Transaction
              </button>
            </div>
          </form>
        </div>

        {/* Live Cryptographic Preview & Workflow Steps Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Hash Calculation Inspector */}
          <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Boxes className="w-4 h-4 text-blue-400" />
                Live Block Hash Calculation
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                SHA-256
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Target Block Index:</span>
                <span className="font-mono font-bold text-white bg-slate-900 px-2 py-1 rounded block border border-slate-800">
                  Block #{nextIndex}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">Previous Block Hash (Parent Link):</span>
                <span className="font-mono text-amber-300/90 text-[11px] bg-slate-900 px-2 py-1.5 rounded block border border-slate-800 break-all">
                  {latestBlock.hash}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">Computed Block SHA-256 Digest:</span>
                <span className="font-mono text-emerald-400 text-[11px] bg-slate-900 px-2 py-1.5 rounded block border border-emerald-800/40 break-all font-semibold">
                  {previewHash}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-700 pt-3">
              Notice how the hash updates dynamically as you type. Any modification to salary or name completely recalculates this 64-character hexadecimal digest.
            </p>
          </div>

          {/* Academic 7-Step Workflow Guide (Requirement 7) */}
          <div className="bg-slate-850 rounded-xl p-5 border border-slate-750 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-indigo-400" />
              How It Works (Under the Hood)
            </h4>

            <ol className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">1</span>
                <span>Validates employee ID, name, and salary inputs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">2</span>
                <span>Packages input into a structured transaction payload.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">3</span>
                <span>Retrieves latest block&apos;s hash as <code className="font-mono text-amber-300">previousHash</code>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">4</span>
                <span>Generates the new block with timestamp and incremented index.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">5</span>
                <span>Runs SHA-256 cryptographic hashing on the block contents.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">6</span>
                <span>Appends the new block immutably to the blockchain ledger.</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
