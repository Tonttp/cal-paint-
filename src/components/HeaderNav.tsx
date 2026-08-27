import React from 'react';
import { Layers, PaintBucket, Calculator, FileSpreadsheet, BookOpen, Sparkles } from 'lucide-react';

interface HeaderNavProps {
  activeTab: 'steel' | 'paint' | 'boq' | 'master';
  setActiveTab: (tab: 'steel' | 'paint' | 'boq' | 'master') => void;
  lastArea: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ activeTab, setActiveTab, lastArea }) => {
  const tabs = [
    { id: 'steel' as const, step: '1', label: 'คำนวณพื้นที่ผิวเหล็ก', desc: 'ข้อมูลมิติและรูปทรง', icon: Calculator },
    { id: 'paint' as const, step: '2', label: 'คำนวณปริมาณสี & งบ', desc: 'DFT, วิธีทา, ปริมาณซื้อ', icon: PaintBucket },
    { id: 'boq' as const, step: '3', label: 'ระบบถอดแบบ BOQ', desc: 'รายการท่อนเหล็กทั้งโครงการ', icon: FileSpreadsheet },
    { id: 'master' as const, step: '4', label: 'ตารางมาตรฐาน & สเปก', desc: 'มอก. / JIS & ระบบสี', icon: BookOpen }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-3 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-sm shadow-indigo-200 shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.828 2.828a2 2 0 010 2.828l-8.486 8.486L11 7.343z"
                ></path>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg sm:text-xl tracking-tight text-slate-900">
                  Paint Calculator
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                ระบบคำนวณพื้นที่ผิวทาสี ปริมาณสี และถอดแบบ BOQ โครงสร้างเหล็ก
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {lastArea > 0 && (
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 rounded-xl border border-indigo-100 text-xs font-medium text-indigo-900 shadow-xs">
                <span className="text-indigo-600 font-semibold">พื้นที่ล่าสุด:</span>
                <strong className="text-indigo-950 font-extrabold text-sm">{lastArea.toFixed(3)}</strong>
                <span className="text-indigo-600">ตร.ม.</span>
              </div>
            )}
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 uppercase tracking-widest font-bold bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
              v2.4.1
            </div>
          </div>
        </div>

        {/* Tab Navigation with Step Badges */}
        <nav className="flex space-x-1.5 sm:space-x-2 overflow-x-auto no-scrollbar py-2.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium border border-transparent'
                }`}
              >
                <span
                  className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.step}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
