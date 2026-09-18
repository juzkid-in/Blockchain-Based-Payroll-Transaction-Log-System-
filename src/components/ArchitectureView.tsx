import React from 'react';
import {
  GitFork,
  ArrowDown,
  UserCheck,
  FileSpreadsheet,
  FileText,
  Box,
  Hash,
  Link2,
  Boxes,
  ShieldCheck,
  Cpu,
  CheckCircle2,
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const steps = [
    {
      num: 1,
      title: 'Step 1: Payroll Data Entry',
      actor: 'HR / Admin',
      icon: <UserCheck className="w-5 h-5 text-blue-400" />,
      desc: 'HR/Admin enters employee payroll information (Employee ID, Name, Salary, Month, Payment Status) into the portal form.',
      vivaNote: 'Input validation guarantees non-empty strings and positive monetary amounts before any block instantiation.',
    },
    {
      num: 2,
      title: 'Step 2: Transaction Formation',
      actor: 'Transaction Packaging Engine',
      icon: <FileText className="w-5 h-5 text-indigo-400" />,
      desc: 'The payroll information is converted into a standardized, canonical transaction dictionary/JSON structure.',
      vivaNote: 'Deterministic serialization ensures keys are sorted identically for reproducible hashing across platforms.',
    },
    {
      num: 3,
      title: 'Step 3: Block Instantiation',
      actor: 'Block Engine',
      icon: <Box className="w-5 h-5 text-cyan-400" />,
      desc: 'The transaction is encapsulated in a new block container along with the current system timestamp and an incremented Block Index.',
      vivaNote: 'Block Index = Prior Block Index + 1. Timestamp marks the exact moment of salary authorization.',
    },
    {
      num: 4,
      title: 'Step 4: SHA-256 Hashing',
      actor: 'Cryptographic Engine',
      icon: <Hash className="w-5 h-5 text-emerald-400" />,
      desc: 'SHA-256 generates the block hash based on Block Index + Timestamp + Payroll Data + Previous Hash.',
      vivaNote: 'Produces a deterministic 256-bit (64-character hexadecimal) cryptographic digest that is mathematically irreversible.',
    },
    {
      num: 5,
      title: 'Step 5: Previous Hash Linkage',
      actor: 'Chain Linker',
      icon: <Link2 className="w-5 h-5 text-amber-400" />,
      desc: "The new block stores the previous block's SHA-256 hash in its `previousHash` attribute (or '0' for the Genesis Block).",
      vivaNote: 'This is the foundational blockchain link: each block mathematically depends on the exact state of the block before it.',
    },
    {
      num: 6,
      title: 'Step 6: Append to Blockchain Ledger',
      actor: 'Distributed Ledger Core',
      icon: <Boxes className="w-5 h-5 text-purple-400" />,
      desc: 'The newly verified block is appended to the ledger, forming an immutable, sequential chain from Genesis Block to current tip.',
      vivaNote: 'Genesis Block (Block 0) serves as the anchor; all subsequent blocks expand the tamper-evident payroll ledger.',
    },
    {
      num: 7,
      title: 'Step 7: Verification & Tamper Detection',
      actor: 'Integrity Validator',
      icon: <ShieldCheck className="w-5 h-5 text-rose-400" />,
      desc: 'The system validates the chain by recalculating all block hashes and verifying pointer links to detect any unauthorized modification.',
      vivaNote: 'If a salary record is altered post-hoc, hash recalculation fails instantly, revealing the exact compromised block.',
    },
  ];

  return (
    <div className="space-y-10 max-w-5xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 shadow-sm">
        <div className="flex items-center gap-2">
          <GitFork className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            System Architecture &amp; Execution Flow
          </h2>
        </div>
        <p className="text-slate-300 text-sm mt-1">
          Visualizing the end-to-end flow from HR payroll data entry down to cryptographic SHA-256 linking and audit verification.
        </p>
      </div>

      {/* Visual Flowchart (Exact Section 11 Specification) */}
      <div className="bg-slate-850 rounded-2xl p-6 sm:p-8 border border-slate-750 shadow-md">
        <h3 className="text-center text-xs uppercase tracking-widest font-bold text-slate-400 mb-8">
          Architectural Dataflow Pipeline (VTU BIC702 Model)
        </h3>

        <div className="flex flex-col items-center space-y-3 max-w-lg mx-auto">
          {/* Node 1 */}
          <div className="w-full bg-blue-950/80 border-2 border-blue-500/80 rounded-xl p-3.5 text-center shadow-sm">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-wider block">Actor</span>
            <span className="text-sm font-extrabold text-white">HR / ADMIN</span>
          </div>

          <ArrowDown className="w-5 h-5 text-blue-400" />

          {/* Node 2 */}
          <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-center shadow-sm">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">Input Interface</span>
            <span className="text-sm font-bold text-slate-200">Payroll Data Entry Form</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Emp ID, Name, Salary, Month, Status</span>
          </div>

          <ArrowDown className="w-5 h-5 text-indigo-400" />

          {/* Node 3 */}
          <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-center shadow-sm">
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">Data Model</span>
            <span className="text-sm font-bold text-slate-200">Payroll Transaction</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Canonical JSON structured payload</span>
          </div>

          <ArrowDown className="w-5 h-5 text-cyan-400" />

          {/* Node 4 */}
          <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-center shadow-sm">
            <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block">Block Factory</span>
            <span className="text-sm font-bold text-slate-200">Create Block</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Assign Block Index &amp; ISO Timestamp</span>
          </div>

          <ArrowDown className="w-5 h-5 text-teal-400" />

          {/* Node 5 */}
          <div className="w-full bg-slate-900 border-2 border-emerald-500/70 rounded-xl p-3.5 text-center shadow-sm">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Cryptographic Engine</span>
            <span className="text-sm font-bold text-white">SHA-256 Hashing</span>
            <span className="text-[11px] text-emerald-300/80 block mt-0.5 font-mono">
              Hash = SHA256(Index + Time + Data + PrevHash)
            </span>
          </div>

          <ArrowDown className="w-5 h-5 text-emerald-400" />

          {/* Node 6 */}
          <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-center shadow-sm">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">Chain Pointer</span>
            <span className="text-sm font-bold text-slate-200">Previous Hash Link</span>
            <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">
              Block[N].previousHash = Block[N-1].hash
            </span>
          </div>

          <ArrowDown className="w-5 h-5 text-amber-400" />

          {/* Node 7 */}
          <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-center shadow-sm">
            <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block">Storage</span>
            <span className="text-sm font-bold text-slate-200">Blockchain Ledger</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Sequential, immutable block array</span>
          </div>

          <ArrowDown className="w-5 h-5 text-purple-400" />

          {/* Node 8 */}
          <div className="w-full bg-emerald-950/80 border-2 border-emerald-500/80 rounded-xl p-3.5 text-center shadow-sm">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">Continuous Audit</span>
            <span className="text-sm font-extrabold text-white">Verification Engine</span>
            <span className="text-[11px] text-emerald-200 block mt-0.5">
              Recalculates digests &amp; confirms zero tampering
            </span>
          </div>
        </div>
      </div>

      {/* Section 12: How the System Works (7 Detailed Steps) */}
      <div className="space-y-6">
        <div className="border-b border-slate-750 pb-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            How the System Works (Step-by-Step Viva Guide)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Designed for clear explanation to academic evaluators during the viva examination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 hover:border-blue-500/40 transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm text-white">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-750 flex items-center justify-center text-xs">
                    {step.icon}
                  </div>
                  <span>{step.title}</span>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-750">
                  {step.actor}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {step.desc}
              </p>

              <div className="pt-2 border-t border-slate-750 text-[11px] text-blue-300/90 font-medium">
                <strong>Viva Point:</strong> {step.vivaNote}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
