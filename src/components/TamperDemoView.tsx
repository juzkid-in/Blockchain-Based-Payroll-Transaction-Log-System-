import React, { useState } from 'react';
import { Block, PayrollData, TamperState, ValidationReport } from '../types';
import { calculateBlockHash } from '../blockchain';
import {
  AlertTriangle,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Flame,
  FileSpreadsheet,
  IndianRupee,
  User,
  Info,
  Layers,
} from 'lucide-react';

interface TamperDemoViewProps {
  chain: Block[];
  tamperState: TamperState;
  report: ValidationReport;
  onApplyTamper: (blockIndex: number, modifiedSalary: number, modifiedName?: string) => void;
  onRestoreChain: () => void;
}

export const TamperDemoView: React.FC<TamperDemoViewProps> = ({
  chain,
  tamperState,
  report,
  onApplyTamper,
  onRestoreChain,
}) => {
  // Available blocks to tamper (exclude genesis block index 0)
  const tamperableBlocks = chain.filter((b) => !b.isGenesis);

  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number>(
    tamperableBlocks.length > 0 ? tamperableBlocks[0].index : 1
  );

  const targetBlock = chain.find((b) => b.index === selectedBlockIndex);
  const targetData = targetBlock && !targetBlock.isGenesis ? (targetBlock.data as PayrollData) : null;

  const [simulatedSalary, setSimulatedSalary] = useState<string>(
    targetData ? '50000' : '50000'
  );
  const [simulatedName, setSimulatedName] = useState<string>(
    targetData ? targetData.employeeName : ''
  );

  const handleTamperSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(simulatedSalary);
    if (!isNaN(num) && num > 0) {
      onApplyTamper(selectedBlockIndex, num, simulatedName || undefined);
    }
  };

  // Quick preset: ₹35,000 -> ₹50,000 (Exact VTU requirement)
  const handleApplyVtuStandardDemo = () => {
    if (tamperableBlocks.length > 0) {
      const bIndex = tamperableBlocks[0].index;
      setSelectedBlockIndex(bIndex);
      onApplyTamper(bIndex, 50000);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-rose-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Tamper Detection Demonstration (Academic Sandbox)
            </h2>
          </div>
          <p className="text-slate-300 text-sm mt-1">
            Simulates an unauthorized insider modifying stored payroll records (e.g. inflating salary from ₹35,000 to ₹50,000) to prove cryptographic detection.
          </p>
        </div>

        {tamperState.isTampered && (
          <button
            id="btn-restore-chain-top"
            onClick={onRestoreChain}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restore Original Chain</span>
          </button>
        )}
      </div>

      {/* Live System Invalidation Banner */}
      <div
        className={`rounded-2xl p-6 border shadow-lg transition-all ${
          tamperState.isTampered
            ? 'bg-rose-950/80 border-rose-500/80'
            : 'bg-slate-800/90 border-slate-700'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                tamperState.isTampered
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              }`}
            >
              {tamperState.isTampered ? <ShieldAlert className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Live Ledger State
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-mono text-white">
                Blockchain Status: {tamperState.isTampered ? (
                  <span className="text-rose-400 font-extrabold">INVALID (Tampering Detected)</span>
                ) : (
                  <span className="text-emerald-400">VALID (Genuine Ledger)</span>
                )}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {tamperState.isTampered
                  ? `Simulated modification active on Block #${tamperState.tamperedBlockIndex}. Stored salary changed from ₹${Number(tamperState.originalValue).toLocaleString('en-IN')} to ₹${Number(tamperState.tamperedValue).toLocaleString('en-IN')}.`
                  : 'All blocks are in their pristine, authentic state. Use the controls below to trigger a test modification.'}
              </p>
            </div>
          </div>

          {tamperState.isTampered && (
            <button
              id="btn-restore-chain-banner"
              onClick={onRestoreChain}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow transition-all cursor-pointer flex-shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset &amp; Restore Valid State</span>
            </button>
          )}
        </div>
      </div>

      {tamperableBlocks.length === 0 ? (
        <div className="bg-slate-800/80 rounded-xl p-8 text-center space-y-3 border border-slate-700">
          <Layers className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-sm text-slate-300">
            No payroll transaction blocks exist yet to tamper with (only Genesis Block present).
          </p>
          <p className="text-xs text-slate-400">
            Please add a payroll transaction or click &quot;Load Sample Data&quot; in the header first.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Tamper Control Panel */}
          <div className="lg:col-span-6 bg-slate-800/80 rounded-xl p-6 border border-slate-700 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-400" />
                Simulate Malicious Field Modification
              </h3>

              <button
                type="button"
                onClick={handleApplyVtuStandardDemo}
                className="text-xs px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30 transition-colors font-medium cursor-pointer"
                title="Apply VTU syllabus standard demo: Modify Salary from ₹35000 to ₹50000"
              >
                VTU Demo: 35k → 50k
              </button>
            </div>

            <form onSubmit={handleTamperSubmit} className="space-y-4">
              {/* Select Block */}
              <div>
                <label htmlFor="tamper-block-select" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Select Target Block to Tamper
                </label>
                <select
                  id="tamper-block-select"
                  value={selectedBlockIndex}
                  onChange={(e) => {
                    const idx = Number(e.target.value);
                    setSelectedBlockIndex(idx);
                    const blk = chain.find((b) => b.index === idx);
                    if (blk && !blk.isGenesis) {
                      const d = blk.data as PayrollData;
                      setSimulatedSalary((d.salary + 15000).toString());
                      setSimulatedName(d.employeeName);
                    }
                  }}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-rose-500 cursor-pointer"
                >
                  {tamperableBlocks.map((b) => {
                    const p = b.data as PayrollData;
                    return (
                      <option key={b.index} value={b.index}>
                        Block #{b.index} — {p.employeeId} ({p.employeeName}) - ₹{Number(p.salary).toLocaleString('en-IN')}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Modify Salary */}
              <div>
                <label htmlFor="tamper-salary" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Modified Salary Amount (INR ₹)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <input
                    id="tamper-salary"
                    type="number"
                    value={simulatedSalary}
                    onChange={(e) => setSimulatedSalary(e.target.value)}
                    placeholder="e.g. 50000"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-rose-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Original stored salary was ₹{targetData ? Number(targetData.salary).toLocaleString('en-IN') : '35,000'}.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  id="btn-tamper-apply"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition-all cursor-pointer"
                >
                  <Flame className="w-4 h-4" />
                  Apply Tampering to Block #{selectedBlockIndex}
                </button>

                {tamperState.isTampered && (
                  <button
                    type="button"
                    id="btn-tamper-reset"
                    onClick={onRestoreChain}
                    className="px-4 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Educational Cryptographic Explanation & Hash Comparison */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-blue-400" />
                The Cryptographic Avalanche Effect
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                In SHA-256, changing even a single digit (like changing <strong>35000</strong> to <strong>50000</strong>) fundamentally scrambles the output hash. Because the modified block produces a different hash, the next block&apos;s stored <code className="text-amber-300 font-mono">previousHash</code> will point to a ghost hash that no longer exists!
              </p>

              {/* Before & After comparison */}
              {targetBlock && targetData && (
                <div className="space-y-3 pt-2">
                  <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-750 text-xs space-y-1">
                    <div className="text-slate-400 flex items-center justify-between">
                      <span className="font-semibold text-emerald-400">Authentic Stored Hash:</span>
                      <span className="font-mono text-[10px] text-slate-400">Original Record</span>
                    </div>
                    <div className="font-mono text-[11px] text-slate-200 break-all">
                      {targetBlock.hash}
                    </div>
                  </div>

                  <div className="bg-slate-900/90 rounded-lg p-3 border border-rose-900/40 text-xs space-y-1">
                    <div className="text-slate-400 flex items-center justify-between">
                      <span className="font-semibold text-rose-400">Recomputed Hash After Modifying Salary:</span>
                      <span className="font-mono text-[10px] text-rose-400">New Digest</span>
                    </div>
                    <div className="font-mono text-[11px] text-rose-300 break-all font-semibold">
                      {calculateBlockHash(
                        targetBlock.index,
                        targetBlock.timestamp,
                        {
                          ...targetData,
                          salary: Number(simulatedSalary) || 50000,
                        },
                        targetBlock.previousHash
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Viva Note Box */}
            <div className="bg-blue-950/30 rounded-xl p-5 border border-blue-900/40 space-y-2 text-xs">
              <h4 className="font-bold text-blue-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Info className="w-3.5 h-3.5" /> VTU Viva Examiner Talking Point
              </h4>
              <p className="text-slate-300 leading-relaxed">
                &quot;Sir, in our project, we demonstrated tamper detection by modifying the salary field of Block #1 from ₹35,000 to ₹50,000. When the validation routine recalculated the SHA-256 digest of Block #1, the output diverged completely from the stored hash. Furthermore, Block #2&apos;s previousHash link was immediately severed. Thus, the system mathematically flags the blockchain as INVALID without relying on any centralized administrator.&quot;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
