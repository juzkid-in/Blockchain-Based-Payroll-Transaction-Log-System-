import React, { useState } from 'react';
import { ValidationReport, Block, TabType } from '../types';
import {
  CheckCheck,
  ShieldCheck,
  ShieldAlert,
  RefreshCw,
  Boxes,
  Check,
  X,
  AlertTriangle,
  ArrowRight,
  Info,
} from 'lucide-react';

interface VerifyViewProps {
  report: ValidationReport;
  chain: Block[];
  onRevalidate: () => void;
  onNavigate: (tab: TabType) => void;
}

export const VerifyView: React.FC<VerifyViewProps> = ({
  report,
  chain,
  onRevalidate,
  onNavigate,
}) => {
  const [isValidating, setIsValidating] = useState(false);

  const handleManualAudit = () => {
    setIsValidating(true);
    setTimeout(() => {
      onRevalidate();
      setIsValidating(false);
    }, 300);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CheckCheck className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Blockchain Cryptographic Integrity Verification
            </h2>
          </div>
          <p className="text-slate-300 text-sm mt-1">
            Independently recalculates SHA-256 hashes and inspects continuous pointer linkage across all {report.totalBlocks} blocks.
          </p>
        </div>

        <button
          id="btn-revalidate-chain"
          onClick={handleManualAudit}
          disabled={isValidating}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isValidating ? 'animate-spin' : ''}`} />
          <span>{isValidating ? 'Auditing Ledger...' : 'Run Cryptographic Audit'}</span>
        </button>
      </div>

      {/* Primary Verification Result Banner (Exact Section 9 Requirement) */}
      <div
        id="verification-result-card"
        className={`rounded-2xl p-6 sm:p-8 border shadow-lg transition-all ${
          report.isValid
            ? 'bg-gradient-to-r from-emerald-950/70 via-slate-900 to-emerald-950/40 border-emerald-500/60'
            : 'bg-gradient-to-r from-rose-950/80 via-slate-900 to-rose-950/50 border-rose-500/80'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${
                report.isValid
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}
            >
              {report.isValid ? <ShieldCheck className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
            </div>

            <div className="space-y-1">
              <div className="text-xs uppercase tracking-widest font-semibold text-slate-400">
                Audit Result
              </div>
              <h3
                id="verification-status-heading"
                className={`text-2xl sm:text-3xl font-extrabold font-mono tracking-tight ${
                  report.isValid ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                Blockchain Status: {report.isValid ? 'VALID' : 'INVALID'}
              </h3>
              <p
                id="verification-summary-text"
                className={`text-sm sm:text-base font-medium ${
                  report.isValid ? 'text-emerald-200' : 'text-rose-200'
                }`}
              >
                {report.isValid
                  ? 'No tampering detected. All block hashes and previous pointer references are strictly valid.'
                  : `Tampering detected at Block #${report.firstFailureIndex}! One or more stored values do not match their cryptographic digest.`}
              </p>
            </div>
          </div>

          {!report.isValid && (
            <button
              onClick={() => onNavigate('tamper-demo')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Inspect &amp; Restore in Tamper Demo</span>
            </button>
          )}
        </div>
      </div>

      {/* Verification Formula & Algorithm Logic Box */}
      <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700 space-y-3">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-400" />
          Academic Mathematical Validation Rules (VTU BIC702)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="bg-slate-900/80 rounded-lg p-3 border border-slate-750 space-y-1 font-mono">
            <span className="text-amber-400 font-bold block">Check 1: Payload Digest Recalculation</span>
            <p className="text-slate-400 text-[11px]">
              CurrentHash == SHA256(Index + Timestamp + CanonicalData + PreviousHash)
            </p>
            <span className="text-emerald-400 text-[11px] block mt-1">
              → Detects internal modification of salary, name, or month.
            </span>
          </div>

          <div className="bg-slate-900/80 rounded-lg p-3 border border-slate-750 space-y-1 font-mono">
            <span className="text-blue-400 font-bold block">Check 2: Pointer Link Continuity</span>
            <p className="text-slate-400 text-[11px]">
              Block[N].previousHash == Block[N-1].currentHash
            </p>
            <span className="text-emerald-400 text-[11px] block mt-1">
              → Detects block deletion, insertion, or replacement attempts.
            </span>
          </div>
        </div>
      </div>

      {/* Block-by-Block Audit Verification Table */}
      <div className="bg-slate-800/80 rounded-xl border border-slate-700 shadow-sm overflow-hidden space-y-0">
        <div className="px-6 py-4 border-b border-slate-700 bg-slate-850 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Boxes className="w-4 h-4 text-blue-400" />
              Block-by-Block Verification Breakdown
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live comparison of stored values against fresh on-the-fly SHA-256 computations
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Audit Timestamp: {new Date(report.checkedAt).toLocaleTimeString()}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/60 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-700/80 font-mono">
              <tr>
                <th scope="col" className="px-4 py-3">Block #</th>
                <th scope="col" className="px-4 py-3">Hash Check (Recalculated vs Stored)</th>
                <th scope="col" className="px-4 py-3">Link Check (PrevHash vs Prior Block)</th>
                <th scope="col" className="px-4 py-3">Block Status</th>
                <th scope="col" className="px-4 py-3">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-750 font-normal">
              {report.checks.map((check) => {
                return (
                  <tr
                    key={check.index}
                    className={`transition-colors ${
                      check.isValid ? 'hover:bg-slate-750/40' : 'bg-rose-950/30 font-medium'
                    }`}
                  >
                    {/* Index */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="font-mono font-bold text-white bg-slate-900 px-2 py-1 rounded border border-slate-750">
                        {check.index === 0 ? 'Block #0 (Genesis)' : `Block #${check.index}`}
                      </span>
                    </td>

                    {/* Hash Recalculation Check */}
                    <td className="px-4 py-4 max-w-xs space-y-1 font-mono text-[11px]">
                      <div className="flex items-center gap-2">
                        {check.isHashValid ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                            <Check className="w-3.5 h-3.5" /> Hash Match
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-rose-400 font-bold">
                            <X className="w-3.5 h-3.5" /> HASH MISMATCH!
                          </span>
                        )}
                      </div>
                      <div className="text-slate-400 text-[10px]">
                        Stored: <span className="text-slate-300">{check.storedHash.substring(0, 16)}...</span>
                      </div>
                      {!check.isHashValid && (
                        <div className="text-rose-300 text-[10px]">
                          Computed: <span className="font-bold text-rose-400">{check.calculatedHash.substring(0, 16)}...</span>
                        </div>
                      )}
                    </td>

                    {/* Previous Hash Link Check */}
                    <td className="px-4 py-4 max-w-xs space-y-1 font-mono text-[11px]">
                      <div className="flex items-center gap-2">
                        {check.isPrevHashValid ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                            <Check className="w-3.5 h-3.5" /> Link Intact
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-rose-400 font-bold">
                            <X className="w-3.5 h-3.5" /> BROKEN POINTER!
                          </span>
                        )}
                      </div>
                      <div className="text-slate-400 text-[10px]">
                        Expected: <span className="text-slate-300">{check.actualPrevHash.substring(0, 16)}...</span>
                      </div>
                    </td>

                    {/* Integrity Badge */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
                          check.isValid
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
                        }`}
                      >
                        {check.isValid ? 'VALID' : 'COMPROMISED'}
                      </span>
                    </td>

                    {/* Diagnosis / Notes */}
                    <td className="px-4 py-4 text-xs">
                      {check.isValid ? (
                        <span className="text-slate-400">Cryptographic integrity confirmed.</span>
                      ) : (
                        <span className="text-rose-300 font-semibold">
                          {check.errorReason || 'Tampering detected in block data.'}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
