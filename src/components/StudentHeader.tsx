import React from 'react';
import { ACADEMIC_PROJECT_INFO } from '../data/sampleData';
import { ShieldCheck, User, Award, BookOpen, RefreshCw, PlusCircle, Database, CheckCircle, ExternalLink } from 'lucide-react';

interface StudentHeaderProps {
  blockCount: number;
  transactionCount: number;
  isValid: boolean;
  onLoadSampleData: () => void;
  onResetChain: () => void;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({
  blockCount,
  transactionCount,
  isValid,
  onLoadSampleData,
  onResetChain,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Top Academic Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 px-4 py-2 border-b border-blue-800/40 text-xs text-blue-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold border border-blue-400/30">
              VTU Academic Project
            </span>
            <span>Visvesvaraya Technological University • Department of IoT, Cybersecurity and Blockchain Technology</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span>Subject: <strong className="text-white">Blockchain Technology ({ACADEMIC_PROJECT_INFO.subjectCode})</strong></span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Activity: <strong className="text-white">Activity Based Learning – Activity 1</strong></span>
            <span className="hidden sm:inline">•</span>
            <a
              href={ACADEMIC_PROJECT_INFO.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-400/30 hover:bg-emerald-500/30 transition-colors"
              title="Live Demo Preview"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Live Demo</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Title & Credentials Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {ACADEMIC_PROJECT_INFO.title}
                </h1>
                <p className="text-sm font-medium text-blue-300">
                  {ACADEMIC_PROJECT_INFO.subtitle} • Dept of {ACADEMIC_PROJECT_INFO.department}
                </p>
              </div>
            </div>

            {/* Student Details Card Row */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-400" />
                <span>Student Name:</span>
                <strong className="text-white font-semibold">{ACADEMIC_PROJECT_INFO.studentName}</strong>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-400" />
                <span>USN:</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 font-mono font-bold text-amber-300 border border-slate-700">
                  {ACADEMIC_PROJECT_INFO.usn}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Dept:</span>
                <span className="text-blue-300 font-medium">{ACADEMIC_PROJECT_INFO.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-xs">Topic:</span>
                <span className="text-slate-200 font-medium text-xs">{ACADEMIC_PROJECT_INFO.assignedTopic}</span>
              </div>
            </div>
          </div>

          {/* Quick Status Pill & Global Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-800/90 rounded-lg p-3 border border-slate-700/80 flex items-center gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Chain Status</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${isValid ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500 animate-ping'}`} />
                  <span className={`font-mono font-bold text-xs ${isValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isValid ? 'VALID' : 'INVALID (TAMPERED)'}
                  </span>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-700" />

              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Total Blocks</div>
                <div className="font-mono font-bold text-sm text-white">
                  {blockCount} <span className="text-xs text-slate-400 font-normal">({transactionCount} Txns)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-load-sample-data"
                onClick={onLoadSampleData}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition-all cursor-pointer"
                title="Load 3 sample employee payroll records for demonstration"
              >
                <Database className="w-3.5 h-3.5" />
                Load Sample Data
              </button>

              <button
                id="btn-reset-chain"
                onClick={onResetChain}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
                title="Reset blockchain to Genesis Block only"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
