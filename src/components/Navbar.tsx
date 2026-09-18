import React from 'react';
import { TabType } from '../types';
import {
  LayoutDashboard,
  PlusCircle,
  Boxes,
  CheckCheck,
  AlertTriangle,
  GitFork,
  FileText,
  HelpCircle,
  Code2,
} from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isChainTampered: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  isChainTampered,
}) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'add-payroll',
      label: 'Add Payroll',
      icon: <PlusCircle className="w-4 h-4" />,
    },
    {
      id: 'blockchain',
      label: 'Blockchain',
      icon: <Boxes className="w-4 h-4" />,
    },
    {
      id: 'verification',
      label: 'Verification',
      icon: <CheckCheck className="w-4 h-4" />,
      badge: isChainTampered ? 'Alert' : undefined,
    },
    {
      id: 'tamper-demo',
      label: 'Tamper Demo',
      icon: <AlertTriangle className="w-4 h-4" />,
      badge: isChainTampered ? 'Tampered' : 'Interactive',
    },
    {
      id: 'architecture',
      label: 'Architecture',
      icon: <GitFork className="w-4 h-4" />,
    },
    {
      id: 'about',
      label: 'About Project',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 'viva-guide',
      label: 'Viva Guide',
      icon: <HelpCircle className="w-4 h-4" />,
      badge: 'VTU Prep',
    },
    {
      id: 'python-code',
      label: 'Python Source',
      icon: <Code2 className="w-4 h-4" />,
      badge: 'Flask',
    },
  ];

  return (
    <nav className="bg-slate-850 border-b border-slate-750 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-slate-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 scrollbar-thin scrollbar-thumb-slate-700">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold uppercase tracking-wider ${
                      item.badge === 'Tampered' || item.badge === 'Alert'
                        ? 'bg-rose-500 text-white animate-pulse'
                        : isActive
                        ? 'bg-blue-800 text-blue-100'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
