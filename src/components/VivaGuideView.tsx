import React, { useState } from 'react';
import { VIVA_QUESTIONS_ANSWERS, ACADEMIC_PROJECT_INFO } from '../data/sampleData';
import {
  HelpCircle,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Award,
  BookOpen,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const VivaGuideView: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              VTU Viva-Voce Examination Preparation Guide
            </h2>
          </div>
          <p className="text-slate-300 text-sm mt-1">
            Curated questions and technical answers specifically based on your <strong>{ACADEMIC_PROJECT_INFO.title}</strong> implementation.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-indigo-300 whitespace-nowrap">
          <Award className="w-4 h-4" />
          <span>BIC702 High-Yield Viva Prep</span>
        </div>
      </div>

      {/* Quick Summary Cards for Key Definitions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-slate-850 p-4 rounded-xl border border-slate-750 space-y-1.5">
          <span className="font-bold text-blue-400 uppercase tracking-wider block">Genesis Block</span>
          <p className="text-slate-300 leading-relaxed">
            The foundation block (Index 0). Its <code className="text-amber-300 font-mono">previousHash</code> is hardcoded to &quot;0&quot; because no prior transaction exists.
          </p>
        </div>

        <div className="bg-slate-850 p-4 rounded-xl border border-slate-750 space-y-1.5">
          <span className="font-bold text-emerald-400 uppercase tracking-wider block">Avalanche Effect</span>
          <p className="text-slate-300 leading-relaxed">
            A small modification in input data (e.g. 1 rupee change in salary) drastically changes the output SHA-256 hash unpredictably.
          </p>
        </div>

        <div className="bg-slate-850 p-4 rounded-xl border border-slate-750 space-y-1.5">
          <span className="font-bold text-purple-400 uppercase tracking-wider block">Tamper Evidence</span>
          <p className="text-slate-300 leading-relaxed">
            Does not physically prevent disk edits; it provides mathematical certainty that any modification is immediately detected upon audit.
          </p>
        </div>
      </div>

      {/* Accordion Questions */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Frequently Asked Examiner Questions &amp; Model Answers
        </h3>

        <div className="space-y-3">
          {VIVA_QUESTIONS_ANSWERS.map((item, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-800/80 rounded-xl border border-slate-700 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-750 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0">
                      Q{idx + 1}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {item.q.replace(/^\d+\.\s*/, '')}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-750 bg-slate-850/60 text-xs sm:text-sm text-slate-200 leading-relaxed animate-fadeIn">
                    <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-750 text-slate-300 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Recommended Answer:</span>
                      </div>
                      <p className="leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
