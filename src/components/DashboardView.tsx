import React from 'react';
import { Block, PayrollData, TabType } from '../types';
import {
  Boxes,
  FileCheck2,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  PlusCircle,
  Activity,
  Calendar,
  IndianRupee,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface DashboardViewProps {
  chain: Block[];
  isValid: boolean;
  onNavigate: (tab: TabType) => void;
  onLoadSampleData: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  chain,
  isValid,
  onNavigate,
  onLoadSampleData,
}) => {
  const totalBlocks = chain.length;
  const payrollTransactions = Math.max(0, totalBlocks - 1);
  const genesisBlock = chain[0];
  const genesisPresent = Boolean(genesisBlock && genesisBlock.index === 0);

  // Recent transactions (reverse order, excluding genesis)
  const recentPayrollBlocks = chain
    .filter((b) => !b.isGenesis)
    .slice(-5)
    .reverse();

  // Financial summary
  const totalDisbursed = chain.reduce((sum, b) => {
    if (!b.isGenesis) {
      const data = b.data as PayrollData;
      return sum + (Number(data.salary) || 0);
    }
    return sum;
  }, 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Welcome / Academic Notice */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-xl p-6 border border-blue-900/40 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5" /> VTU BIC702 Demonstration Console
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Payroll Transaction Blockchain Ledger
            </h2>
            <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
              An academic implementation recording monthly organizational payroll disbursements into cryptographically linked blocks using <strong>SHA-256</strong> hashing, verifiable audit trails, and automated tamper detection.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              id="dash-btn-add"
              onClick={() => onNavigate('add-payroll')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Add Transaction
            </button>
            <button
              id="dash-btn-verify"
              onClick={() => onNavigate('verification')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-all cursor-pointer"
            >
              <Activity className="w-4 h-4" />
              Verify Chain
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Academic Metrics (Requirement 6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Total Blocks */}
        <div id="stat-total-blocks" className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 shadow-sm relative overflow-hidden group hover:border-blue-500/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Blocks
            </span>
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Boxes className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-white">{totalBlocks}</span>
            <span className="text-xs text-slate-400 font-medium">Blocks in ledger</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Genesis + {payrollTransactions} Transaction Block{payrollTransactions === 1 ? '' : 's'}
          </p>
        </div>

        {/* Metric 2: Payroll Transactions */}
        <div id="stat-payroll-transactions" className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 shadow-sm relative overflow-hidden group hover:border-indigo-500/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Payroll Transactions
            </span>
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-white">{payrollTransactions}</span>
            <span className="text-xs text-slate-400 font-medium">Logged records</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Total Disbursed: ₹{totalDisbursed.toLocaleString('en-IN')}
          </p>
        </div>

        {/* Metric 3: Blockchain Status */}
        <div id="stat-blockchain-status" className={`rounded-xl p-5 border shadow-sm relative overflow-hidden transition-all ${
          isValid
            ? 'bg-emerald-950/30 border-emerald-800/60'
            : 'bg-rose-950/40 border-rose-800/80 animate-pulse'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Blockchain Status
            </span>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
              isValid
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
            }`}>
              {isValid ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${
              isValid ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {isValid ? 'VALID' : 'INVALID'}
            </span>
          </div>
          <p className={`mt-2 text-xs font-medium ${isValid ? 'text-emerald-300/80' : 'text-rose-300'}`}>
            {isValid ? 'No tampering detected' : 'Tampering detected in chain'}
          </p>
        </div>

        {/* Metric 4: Genesis Block Status */}
        <div id="stat-genesis-status" className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 shadow-sm relative overflow-hidden group hover:border-cyan-500/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Genesis Block
            </span>
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-cyan-300">
              {genesisPresent ? 'PRESENT' : 'MISSING'}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400 font-mono">
            Index 0 • Prev Hash: &quot;0&quot;
          </p>
        </div>
      </div>

      {/* Interactive Quick Links / Educational Flow Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700/80 space-y-3">
          <div className="flex items-center gap-2.5 text-blue-400 font-semibold text-sm">
            <Boxes className="w-4 h-4" />
            <span>Visual Blockchain Cards</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Inspect each block card with its exact index, timestamp, formatted salary, previous hash, and 64-char SHA-256 digest.
          </p>
          <button
            onClick={() => onNavigate('blockchain')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 group cursor-pointer"
          >
            <span>Open Blockchain View</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700/80 space-y-3">
          <div className="flex items-center gap-2.5 text-rose-400 font-semibold text-sm">
            <ShieldAlert className="w-4 h-4" />
            <span>Tamper Detection Demo</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Academic sandbox to safely modify an employee salary (e.g., ₹35,000 to ₹50,000) and observe the cryptographic chain break.
          </p>
          <button
            onClick={() => onNavigate('tamper-demo')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 group cursor-pointer"
          >
            <span>Launch Tamper Sandbox</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700/80 space-y-3">
          <div className="flex items-center gap-2.5 text-indigo-400 font-semibold text-sm">
            <Activity className="w-4 h-4" />
            <span>Architecture &amp; Algorithm</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Explore the full VTU student viva guide, 7-step architectural diagram, 12-step academic algorithm, and test cases matrix.
          </p>
          <button
            onClick={() => onNavigate('architecture')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 group cursor-pointer"
          >
            <span>View Architecture &amp; Steps</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Recent Payroll Transactions Ledger */}
      <div className="bg-slate-800/80 rounded-xl border border-slate-700 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700 flex flex-wrap items-center justify-between gap-4 bg-slate-850">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-blue-400" />
              Recent Payroll Transaction Blocks
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live transaction records appended as immutable blocks in the blockchain
            </p>
          </div>

          <div className="flex items-center gap-3">
            {payrollTransactions === 0 && (
              <button
                onClick={onLoadSampleData}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium underline underline-offset-2 cursor-pointer"
              >
                Load Sample Demonstration Data
              </button>
            )}
            <button
              onClick={() => onNavigate('blockchain')}
              className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <span>View All {totalBlocks} Blocks</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {recentPayrollBlocks.length === 0 ? (
          <div className="p-8 text-center space-y-3">
            <Boxes className="w-12 h-12 text-slate-600 mx-auto" />
            <div className="text-slate-300 font-medium text-sm">No payroll transactions recorded yet</div>
            <p className="text-slate-400 text-xs max-w-md mx-auto">
              Only the Genesis Block (Block #0) is currently in the ledger. Click below to load fictional academic demo data or add a custom payroll block.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={onLoadSampleData}
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer"
              >
                Load Sample Data
              </button>
              <button
                onClick={() => onNavigate('add-payroll')}
                className="px-3.5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold cursor-pointer"
              >
                Add First Transaction
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/60 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-700/80">
                <tr>
                  <th scope="col" className="px-6 py-3 font-semibold">Block #</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Employee ID</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Employee Name</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Salary (₹)</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Payroll Month</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Payment Status</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Block Hash (SHA-256)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60 font-normal">
                {recentPayrollBlocks.map((block) => {
                  const data = block.data as PayrollData;
                  return (
                    <tr key={block.index} className="hover:bg-slate-750/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 text-xs">
                          Block #{block.index}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono font-semibold text-white">
                        {data.employeeId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-200">
                        {data.employeeName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-emerald-400 font-semibold">
                        ₹{Number(data.salary).toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-300 text-xs">
                        {data.payrollMonth}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            data.paymentStatus === 'Paid'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              data.paymentStatus === 'Paid' ? 'bg-emerald-400' : 'bg-amber-400'
                            }`}
                          />
                          {data.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-slate-400">
                        <span title={block.hash} className="cursor-help hover:text-white transition-colors">
                          {block.hash.substring(0, 10)}...{block.hash.substring(block.hash.length - 8)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
