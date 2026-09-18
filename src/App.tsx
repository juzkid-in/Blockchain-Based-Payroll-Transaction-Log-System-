import React, { useState, useMemo, useCallback } from 'react';
import { PayrollBlockchain } from './blockchain';
import { Block, PayrollData, TabType, TamperState, ValidationReport } from './types';
import { SAMPLE_PAYROLL_TRANSACTIONS } from './data/sampleData';
import { StudentHeader } from './components/StudentHeader';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { AddPayrollView } from './components/AddPayrollView';
import { BlockchainView } from './components/BlockchainView';
import { VerifyView } from './components/VerifyView';
import { TamperDemoView } from './components/TamperDemoView';
import { ArchitectureView } from './components/ArchitectureView';
import { AboutView } from './components/AboutView';
import { VivaGuideView } from './components/VivaGuideView';
import { PythonCodeView } from './components/PythonCodeView';

export default function App() {
  // Initialize blockchain instance
  const [blockchainInstance] = useState<PayrollBlockchain>(() => {
    const bc = new PayrollBlockchain();
    // Pre-populate with demonstration records so examiners see a live ledger immediately
    SAMPLE_PAYROLL_TRANSACTIONS.forEach((txn) => {
      bc.addPayrollBlock(txn);
    });
    return bc;
  });

  const [chain, setChain] = useState<Block[]>(() => blockchainInstance.getChain());
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const [tamperState, setTamperState] = useState<TamperState>({
    isTampered: false,
    tamperedBlockIndex: null,
    originalBlock: null,
    tamperedField: null,
    originalValue: null,
    tamperedValue: null,
  });

  // Calculate cryptographic validation report
  const report: ValidationReport = useMemo(() => {
    return blockchainInstance.validateChain();
  }, [chain, blockchainInstance]);

  // Handler: Add new block
  const handleAddBlock = useCallback(
    (payrollData: PayrollData): Block => {
      const newBlock = blockchainInstance.addPayrollBlock(payrollData);
      setChain(blockchainInstance.getChain());
      return newBlock;
    },
    [blockchainInstance]
  );

  // Handler: Load Sample Demonstration Data
  const handleLoadSampleData = useCallback(() => {
    blockchainInstance.resetChain();
    SAMPLE_PAYROLL_TRANSACTIONS.forEach((txn) => {
      blockchainInstance.addPayrollBlock(txn);
    });
    setChain(blockchainInstance.getChain());
    setTamperState({
      isTampered: false,
      tamperedBlockIndex: null,
      originalBlock: null,
      tamperedField: null,
      originalValue: null,
      tamperedValue: null,
    });
  }, [blockchainInstance]);

  // Handler: Reset Blockchain
  const handleResetChain = useCallback(() => {
    blockchainInstance.resetChain();
    setChain(blockchainInstance.getChain());
    setTamperState({
      isTampered: false,
      tamperedBlockIndex: null,
      originalBlock: null,
      tamperedField: null,
      originalValue: null,
      tamperedValue: null,
    });
  }, [blockchainInstance]);

  // Handler: Apply Tampering (Academic Sandbox)
  const handleApplyTamper = useCallback(
    (blockIndex: number, modifiedSalary: number, modifiedName?: string) => {
      try {
        const patch: Partial<PayrollData> = { salary: modifiedSalary };
        if (modifiedName) {
          patch.employeeName = modifiedName;
        }
        const { original, tampered } = blockchainInstance.tamperWithBlock(blockIndex, patch);
        setChain(blockchainInstance.getChain());
        setTamperState({
          isTampered: true,
          tamperedBlockIndex: blockIndex,
          originalBlock: original,
          tamperedField: 'salary',
          originalValue: (original.data as PayrollData).salary,
          tamperedValue: modifiedSalary,
        });
      } catch (err: any) {
        console.error('Tampering error:', err);
      }
    },
    [blockchainInstance]
  );

  // Handler: Restore Pristine Chain
  const handleRestoreChain = useCallback(() => {
    if (tamperState.tamperedBlockIndex !== null && tamperState.originalBlock !== null) {
      blockchainInstance.restoreBlock(tamperState.tamperedBlockIndex, tamperState.originalBlock);
      setChain(blockchainInstance.getChain());
      setTamperState({
        isTampered: false,
        tamperedBlockIndex: null,
        originalBlock: null,
        tamperedField: null,
        originalValue: null,
        tamperedValue: null,
      });
    } else {
      handleLoadSampleData();
    }
  }, [blockchainInstance, tamperState, handleLoadSampleData]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Academic Credentials Header */}
      <StudentHeader
        blockCount={chain.length}
        transactionCount={Math.max(0, chain.length - 1)}
        isValid={report.isValid}
        onLoadSampleData={handleLoadSampleData}
        onResetChain={handleResetChain}
      />

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isChainTampered={tamperState.isTampered}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            chain={chain}
            isValid={report.isValid}
            onNavigate={setActiveTab}
            onLoadSampleData={handleLoadSampleData}
          />
        )}

        {activeTab === 'add-payroll' && (
          <AddPayrollView
            latestBlock={blockchainInstance.getLatestBlock()}
            onAddBlock={handleAddBlock}
            onNavigateToBlockchain={() => setActiveTab('blockchain')}
          />
        )}

        {activeTab === 'blockchain' && (
          <BlockchainView
            chain={chain}
            isValid={report.isValid}
            onNavigateToTamper={(blockIndex) => {
              setActiveTab('tamper-demo');
            }}
          />
        )}

        {activeTab === 'verification' && (
          <VerifyView
            report={report}
            chain={chain}
            onRevalidate={() => setChain(blockchainInstance.getChain())}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'tamper-demo' && (
          <TamperDemoView
            chain={chain}
            tamperState={tamperState}
            report={report}
            onApplyTamper={handleApplyTamper}
            onRestoreChain={handleRestoreChain}
          />
        )}

        {activeTab === 'architecture' && <ArchitectureView />}

        {activeTab === 'about' && <AboutView />}

        {activeTab === 'viva-guide' && <VivaGuideView />}

        {activeTab === 'python-code' && <PythonCodeView />}
      </main>

      {/* Presentation Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">
              Blockchain-Based Payroll Transaction Log System
            </span>
            <span>•</span>
            <span>VTU BIC702 Activity 1</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Student: <strong className="text-white">Sanjai Shanmuga Prabu</strong></span>
            <span>USN: <strong className="text-amber-300 font-mono">1SP23IC047</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
