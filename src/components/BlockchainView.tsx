import React, { useState } from 'react';
import { Block, PayrollData } from '../types';
import {
  Boxes,
  ArrowDown,
  Link,
  ShieldCheck,
  ShieldAlert,
  Clock,
  User,
  Hash,
  IndianRupee,
  Calendar,
  CreditCard,
  Camera,
  Search,
  FileCode,
  Copy,
  Check,
} from 'lucide-react';

interface BlockchainViewProps {
  chain: Block[];
  isValid: boolean;
  onNavigateToTamper: (blockIndex: number) => void;
}

export const BlockchainView: React.FC<BlockchainViewProps> = ({
  chain,
  isValid,
  onNavigateToTamper,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [screenshotMode, setScreenshotMode] = useState(false);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleCopyHash = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const filteredChain = chain.filter((block) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    if (block.index.toString().includes(term)) return true;
    if (block.hash.toLowerCase().includes(term)) return true;
    if (block.isGenesis) {
      return (block.data as any).message?.toLowerCase().includes(term);
    }
    const p = block.data as PayrollData;
    return (
      p.employeeId.toLowerCase().includes(term) ||
      p.employeeName.toLowerCase().includes(term) ||
      p.payrollMonth.toLowerCase().includes(term) ||
      p.paymentStatus.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* View Header & Toolbar */}
      <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Boxes className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Visual Blockchain Explorer
            </h2>
          </div>
          <p className="text-slate-300 text-sm mt-1">
            Sequential cryptographic chain of payroll blocks linked via SHA-256 digests. Suitable for VTU Activity 1 screenshots.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, name, or hash..."
              className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 w-56 sm:w-64"
            />
          </div>

          {/* Screenshot presentation mode toggle */}
          <button
            onClick={() => setScreenshotMode(!screenshotMode)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              screenshotMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Toggles clean presentation layout for taking report screenshots"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{screenshotMode ? 'Exit Screenshot View' : 'Screenshot / Report Mode'}</span>
          </button>
        </div>
      </div>

      {/* Assignment Screenshot Watermark / Banner when in Screenshot Mode */}
      {screenshotMode && (
        <div className="bg-slate-900 border-2 border-dashed border-blue-500/60 rounded-xl p-4 text-center text-xs text-blue-200">
          <p className="font-bold text-sm text-white">
            VTU BIC702 Blockchain Technology • Activity Based Learning – Activity 1
          </p>
          <p className="mt-0.5 text-slate-300">
            Student: <strong>Sanjai Shanmuga Prabu</strong> | USN: <strong>1SP23IC047</strong> | Topic: <strong>Payroll Transaction Log</strong>
          </p>
        </div>
      )}

      {/* Chain Representation: [Genesis Block] ↓ [Block 1] ↓ [Block 2] ... */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {filteredChain.map((block, idx) => {
          const isGenesis = block.isGenesis || block.index === 0;
          const payrollData = !isGenesis ? (block.data as PayrollData) : null;
          const prevBlock = idx > 0 ? chain[block.index - 1] : null;
          const isLinkValid = prevBlock ? block.previousHash === prevBlock.hash : true;

          return (
            <div key={block.index} className="space-y-6">
              {/* Block Card */}
              <div
                id={`block-card-${block.index}`}
                className={`rounded-2xl border transition-all shadow-md overflow-hidden ${
                  isGenesis
                    ? 'bg-gradient-to-b from-slate-850 to-slate-900 border-indigo-500/40'
                    : isLinkValid
                    ? 'bg-slate-800/90 border-slate-700 hover:border-blue-500/50'
                    : 'bg-rose-950/40 border-rose-600 shadow-rose-950/50'
                }`}
              >
                {/* Block Header */}
                <div className="px-6 py-4 border-b border-slate-700/80 bg-slate-850 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-extrabold text-lg text-white flex items-center gap-1.5">
                      <Boxes className="w-5 h-5 text-blue-400" />
                      Block #{block.index}
                    </span>

                    {isGenesis ? (
                      <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 text-xs font-bold tracking-wider uppercase">
                        GENESIS BLOCK
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-400/20 text-xs font-semibold">
                        Payroll Transaction Block
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(block.timestamp).toLocaleString('en-IN', {
                        dateStyle: 'medium',
                        timeStyle: 'medium',
                      })}
                    </span>

                    {!isGenesis && (
                      <button
                        onClick={() => onNavigateToTamper(block.index)}
                        className="text-xs text-rose-400 hover:text-rose-300 underline underline-offset-2 font-sans font-medium cursor-pointer"
                        title="Simulate data tampering on this block"
                      >
                        Simulate Tamper
                      </button>
                    )}
                  </div>
                </div>

                {/* Block Body */}
                <div className="p-6 space-y-6">
                  {/* Genesis Content or Payroll Payload */}
                  {isGenesis ? (
                    <div className="bg-indigo-950/30 rounded-xl p-4 border border-indigo-500/20 space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
                        <span>Genesis Initialization Payload</span>
                      </div>
                      <p className="text-sm font-medium text-slate-200">
                        {(block.data as any).message || 'Genesis Block - Initialized'}
                      </p>
                      <div className="text-xs text-slate-400 flex items-center gap-2">
                        <span>Initialized for:</span>
                        <strong className="text-white">{(block.data as any).initializedBy}</strong>
                      </div>
                    </div>
                  ) : payrollData ? (
                    <div className="space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                        <span>Payroll Transaction Data</span>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            payrollData.paymentStatus === 'Paid'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              payrollData.paymentStatus === 'Paid' ? 'bg-emerald-400' : 'bg-amber-400'
                            }`}
                          />
                          {payrollData.paymentStatus}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-900/80 rounded-xl p-4 border border-slate-750">
                        {/* Employee ID */}
                        <div className="space-y-1">
                          <span className="text-[11px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <Hash className="w-3 h-3 text-blue-400" /> Employee ID
                          </span>
                          <span className="font-mono font-bold text-white text-sm block">
                            {payrollData.employeeId}
                          </span>
                        </div>

                        {/* Employee Name */}
                        <div className="space-y-1">
                          <span className="text-[11px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <User className="w-3 h-3 text-indigo-400" /> Employee Name
                          </span>
                          <span className="font-medium text-slate-200 text-sm block">
                            {payrollData.employeeName}
                          </span>
                        </div>

                        {/* Salary */}
                        <div className="space-y-1">
                          <span className="text-[11px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <IndianRupee className="w-3 h-3 text-emerald-400" /> Net Salary
                          </span>
                          <span className="font-mono font-bold text-emerald-400 text-sm block">
                            ₹{Number(payrollData.salary).toLocaleString('en-IN')}
                          </span>
                        </div>

                        {/* Month */}
                        <div className="space-y-1">
                          <span className="text-[11px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-cyan-400" /> Payroll Period
                          </span>
                          <span className="text-slate-300 text-sm block">
                            {payrollData.payrollMonth}
                          </span>
                        </div>
                      </div>

                      {payrollData.remarks && (
                        <p className="text-xs text-slate-400 italic">
                          Remarks: {payrollData.remarks}
                        </p>
                      )}
                    </div>
                  ) : null}

                  {/* Cryptographic Hashes (Previous & Current) */}
                  <div className="space-y-3 pt-2 border-t border-slate-700/80">
                    {/* Previous Hash */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                          <Link className="w-3.5 h-3.5 text-amber-400" />
                          Previous Hash (Cryptographic Parent Link):
                        </span>
                        {isGenesis ? (
                          <span className="text-[10px] text-indigo-300 font-mono">Root Block (&quot;0&quot;)</span>
                        ) : isLinkValid ? (
                          <span className="text-[10px] text-emerald-400 font-mono">Chain Link Verified</span>
                        ) : (
                          <span className="text-[10px] text-rose-400 font-mono font-bold">LINK BROKEN!</span>
                        )}
                      </div>
                      <div className="relative group">
                        <div className="font-mono text-xs text-amber-300/90 bg-slate-900 px-3 py-2 rounded-lg border border-slate-750 break-all select-all">
                          {block.previousHash}
                        </div>
                        <button
                          onClick={() => handleCopyHash(block.previousHash)}
                          className="absolute right-2 top-2 p-1 rounded bg-slate-800 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Copy previous hash"
                        >
                          {copiedHash === block.previousHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Current Block Hash */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                          Current Block Hash (SHA-256 Digest):
                        </span>
                        <span className="text-[10px] text-blue-400 font-mono">256-bit (64 hex characters)</span>
                      </div>
                      <div className="relative group">
                        <div className="font-mono text-xs text-blue-300 font-semibold bg-blue-950/40 px-3 py-2 rounded-lg border border-blue-900/60 break-all select-all">
                          {block.hash}
                        </div>
                        <button
                          onClick={() => handleCopyHash(block.hash)}
                          className="absolute right-2 top-2 p-1 rounded bg-slate-800 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Copy block hash"
                        >
                          {copiedHash === block.hash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Chain Connector Arrow (Section 8 requirement) */}
              {idx < filteredChain.length - 1 && (
                <div className="flex flex-col items-center justify-center py-1">
                  <div className="w-0.5 h-4 bg-blue-500/40" />
                  <div className="px-3 py-1 rounded-full bg-slate-800 border border-blue-500/40 text-blue-400 text-xs font-mono flex items-center gap-1.5 shadow-sm">
                    <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                    <span>Next Block Links to Hash Above</span>
                  </div>
                  <div className="w-0.5 h-4 bg-blue-500/40" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
