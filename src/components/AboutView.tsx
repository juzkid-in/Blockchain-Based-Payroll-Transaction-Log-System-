import React from 'react';
import { ACADEMIC_PROJECT_INFO, TEST_CASES_DATA } from '../data/sampleData';
import {
  FileText,
  User,
  Award,
  BookOpen,
  HelpCircle,
  Hash,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  ListOrdered,
  Layers,
  Sparkles,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto animate-fadeIn">
      {/* Title & VTU Assignment Header */}
      <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Visvesvaraya Technological University (VTU)
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
              {ACADEMIC_PROJECT_INFO.title}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Course: <strong>{ACADEMIC_PROJECT_INFO.subject} ({ACADEMIC_PROJECT_INFO.subjectCode})</strong> • 7th Semester B.E.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-mono">Curriculum Component</span>
            <span className="text-xs font-bold text-blue-300">{ACADEMIC_PROJECT_INFO.activity}</span>
          </div>
        </div>

        {/* Candidate & Project Meta Matrix (Section 15) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-750">
            <span className="text-slate-400 block mb-1">Student Name</span>
            <strong className="text-white text-sm block">{ACADEMIC_PROJECT_INFO.studentName}</strong>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-750">
            <span className="text-slate-400 block mb-1">University Seat No (USN)</span>
            <span className="font-mono font-bold text-amber-300 text-sm block">{ACADEMIC_PROJECT_INFO.usn}</span>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-750">
            <span className="text-slate-400 block mb-1">Assigned Topic</span>
            <span className="text-slate-200 font-semibold block">{ACADEMIC_PROJECT_INFO.assignedTopic}</span>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-750">
            <span className="text-slate-400 block mb-1">Cryptographic Standard</span>
            <span className="font-mono text-emerald-400 font-bold block">SHA-256 (FIPS 180-4)</span>
          </div>
        </div>
      </div>

      {/* Objective & Proposed Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            Project Objective
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The primary objective of this project is to design and develop a lightweight, educational blockchain-based <strong>Payroll Transaction Log System</strong> that records employee compensation events into cryptographically linked blocks and enables real-time verification of ledger integrity using SHA-256 cryptographic digests.
          </p>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
            <li>Demonstrate Genesis Block initialization with root reference (<code className="font-mono text-amber-300">&quot;0&quot;</code>).</li>
            <li>Maintain sequential hash linkage across all monthly payroll disbursements.</li>
            <li>Provide verifiable proof of tamper evidence when records are altered.</li>
          </ul>
        </div>

        <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Proposed Solution
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Rather than relying solely on mutable centralized database tables where administrative users can silently alter salary balances or payment states, the proposed system encapsulates every approved payroll disbursement inside an immutable block containing its index, timestamp, payroll data, and prior block hash.
          </p>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
            <li>Employs deterministic JSON serialization before hashing.</li>
            <li>Enforces continuous mathematical parentage verification.</li>
            <li>Supplies an interactive Tamper Detection sandbox for viva demonstration.</li>
          </ul>
        </div>
      </div>

      {/* Problem Statement (Section 16) */}
      <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          Academic Problem Statement
        </h3>
        <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
          <p>
            In modern organizational governance, payroll records represent high-value financial artifacts requiring absolute data integrity and non-repudiation. However, traditional enterprise payroll architectures typically persist records in centralized relational databases (e.g., MySQL, Oracle, PostgreSQL).
          </p>
          <p>
            Within such centralized frameworks:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400 text-xs">
            <li><strong>Risk of Undetected Modification:</strong> Database administrators (DBAs) or privileged software services possess native permissions to execute <code className="font-mono text-slate-300">UPDATE</code> or <code className="font-mono text-slate-300">DELETE</code> SQL statements. An accidental clerical error or malicious internal modification to an employee&apos;s net pay can remain entirely undetected.</li>
            <li><strong>Single Point of Vulnerability:</strong> Centralized databases lack built-in mathematical guarantees that historical rows have not been manipulated between audit cycles.</li>
            <li><strong>Difficulty of Forensic Proof:</strong> When audits occur months after a fiscal disbursement, proving whether an employee&apos;s historical record was altered or stayed intact requires complex, fallible external log files that are themselves susceptible to deletion.</li>
          </ul>
          <p className="text-blue-300 text-xs font-medium">
            Blockchain data structures solve this specific vulnerability by chaining sequential transactions through cryptographic SHA-256 hashes, producing an append-only, tamper-evident audit log.
          </p>
        </div>
      </div>

      {/* Why Blockchain? (Section 17) */}
      <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Hash className="w-4 h-4 text-indigo-400" />
          Why Blockchain for Payroll Logs? (5 Core Pillars)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-900/80 rounded-lg p-4 border border-slate-750 space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-blue-400">1. Cryptographic Hashing</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              SHA-256 maps arbitrary payroll data into an immutable 256-bit fixed-length digest. The avalanche effect guarantees that modifying a single rupee or letter completely changes the resulting hash.
            </p>
          </div>

          <div className="bg-slate-900/80 rounded-lg p-4 border border-slate-750 space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-indigo-400">2. Tamper Evidence</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Blockchain does not prevent someone from changing a byte in raw memory; rather, it makes any unauthorized modification immediately and mathematically self-evident to any auditor.
            </p>
          </div>

          <div className="bg-slate-900/80 rounded-lg p-4 border border-slate-750 space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-cyan-400">3. Linking of Blocks</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every block stores the <code className="font-mono text-amber-300">previousHash</code> of its predecessor. Modifying an earlier block breaks the hash link of every subsequent block in the chain.
            </p>
          </div>

          <div className="bg-slate-900/80 rounded-lg p-4 border border-slate-750 space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-400">4. Automated Verification</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              The verification algorithm recalculates all hashes in milliseconds without human bias, comparing stored digests against freshly computed mathematical outputs.
            </p>
          </div>

          <div className="bg-slate-900/80 rounded-lg p-4 border border-slate-750 space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-purple-400">5. Audit Transparency</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Employees, internal auditors, and financial compliance officers can examine the transaction chain transparently to confirm that salary disbursement logs have remained pristine.
            </p>
          </div>
        </div>
      </div>

      {/* Academic Algorithm (Section 18) */}
      <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ListOrdered className="w-4 h-4 text-emerald-400" />
          Academic Algorithm (12-Step Procedural Specification)
        </h3>

        <div className="bg-slate-900/90 rounded-xl p-5 border border-slate-750 font-mono text-xs text-slate-300 space-y-2.5">
          <div className="text-emerald-400 font-bold">ALGORITHM: Payroll_Blockchain_Transaction_Logging()</div>
          <ol className="space-y-1.5 pl-5 list-decimal text-slate-300">
            <li><strong>Start</strong> the payroll blockchain system.</li>
            <li><strong>Create Genesis Block</strong> as the root element at Index 0.</li>
            <li><strong>Set previous hash</strong> of Genesis Block explicitly to &quot;0&quot;.</li>
            <li><strong>Accept payroll transaction</strong> input: Employee ID, Name, Salary, Month, Payment Status.</li>
            <li><strong>Create a new block</strong> with incremented index (current_index + 1) and current timestamp.</li>
            <li><strong>Store previous block hash</strong> in the new block&apos;s <code className="text-amber-300">previousHash</code> field.</li>
            <li><strong>Calculate SHA-256 hash</strong> of the concatenated payload: Index + Timestamp + Data + PreviousHash.</li>
            <li><strong>Add block</strong> to the blockchain list.</li>
            <li><strong>Repeat</strong> steps 4 through 8 for all additional payroll transactions.</li>
            <li><strong>Validate every block</strong> by checking: (a) Stored Hash == Recalculated Hash, and (b) Block[i].previousHash == Block[i-1].hash.</li>
            <li><strong>Display VALID or INVALID</strong> status with detailed diagnostic report.</li>
            <li><strong>Stop</strong>.</li>
          </ol>
        </div>
      </div>

      {/* Testing Table (Section 19) */}
      <div className="bg-slate-800/80 rounded-xl border border-slate-700 shadow-sm overflow-hidden space-y-0">
        <div className="px-6 py-4 border-b border-slate-700 bg-slate-850">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-400" />
            Software Testing &amp; Verification Matrix (VTU BIC702)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Documented test suites validating functional requirements and cryptographic integrity constraints.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/60 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-700/80 font-mono">
              <tr>
                <th scope="col" className="px-4 py-3">Test ID</th>
                <th scope="col" className="px-4 py-3">Test Case Description</th>
                <th scope="col" className="px-4 py-3">Input / Scenario</th>
                <th scope="col" className="px-4 py-3">Expected Output</th>
                <th scope="col" className="px-4 py-3">Actual Result</th>
                <th scope="col" className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-750 font-normal">
              {TEST_CASES_DATA.map((tc) => (
                <tr key={tc.id} className="hover:bg-slate-750/30 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-blue-400 whitespace-nowrap">
                    {tc.id}
                  </td>
                  <td className="px-4 py-3 font-semibold text-white whitespace-nowrap">
                    {tc.name}
                  </td>
                  <td className="px-4 py-3 text-slate-300 font-mono text-[11px]">
                    {tc.input}
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {tc.expected}
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {tc.actual}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold font-mono text-[10px]">
                      {tc.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Result & Academic Conclusion (Section 20) */}
      <div className="bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 rounded-xl p-6 border border-blue-900/40 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          Project Results &amp; Academic Conclusion
        </h3>
        <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2.5">
          <p>
            The <strong>Blockchain-Based Payroll Transaction Log System</strong> was successfully implemented and evaluated under simulated organizational conditions for VTU Course BIC702.
          </p>
          <p>
            The working application rigorously demonstrates the following core technical capabilities:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-start gap-2 bg-slate-900/80 p-3 rounded-lg border border-slate-750 text-xs">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Genesis Block Creation:</strong> Validated automatic generation of Block #0 with root parent pointer &quot;0&quot;.</span>
            </div>
            <div className="flex items-start gap-2 bg-slate-900/80 p-3 rounded-lg border border-slate-750 text-xs">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Payroll Transaction Recording:</strong> Successfully records multi-field employee records into discrete blocks.</span>
            </div>
            <div className="flex items-start gap-2 bg-slate-900/80 p-3 rounded-lg border border-slate-750 text-xs">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>SHA-256 Hashing:</strong> Produces mathematically deterministic 64-character digests for every block.</span>
            </div>
            <div className="flex items-start gap-2 bg-slate-900/80 p-3 rounded-lg border border-slate-750 text-xs">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Block-to-Block Hash Linking:</strong> Enforces sequential integrity where <code className="font-mono text-amber-300">previousHash</code> matches the prior block.</span>
            </div>
            <div className="flex items-start gap-2 bg-slate-900/80 p-3 rounded-lg border border-slate-750 text-xs">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Blockchain Validation:</strong> Automated mathematical verification instantly reports VALID on unmodified chains.</span>
            </div>
            <div className="flex items-start gap-2 bg-slate-900/80 p-3 rounded-lg border border-slate-750 text-xs">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Tamper Detection:</strong> Accurately flags INVALID status when any salary field is modified, pinpointing the compromised block.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
