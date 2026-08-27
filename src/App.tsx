/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { PageSteelArea } from './components/PageSteelArea';
import { PagePaintBudget } from './components/PagePaintBudget';
import { PageBOQTakeoff } from './components/PageBOQTakeoff';
import { PageMasterData } from './components/PageMasterData';
import { TakeoffRow, BOQSettings } from './types';
import { calculateTakeoffRowData, calculateBOQTotals } from './utils/calculatorFunctions';

export default function App() {
  const [activeTab, setActiveTab] = useState<'steel' | 'paint' | 'boq' | 'master'>('steel');

  // Shared state between tabs
  const [lastSteelArea, setLastSteelArea] = useState<number>(0);
  const [paintInitialArea, setPaintInitialArea] = useState<number>(0);

  // BOQ settings state
  const [boqSettings, setBoqSettings] = useState<BOQSettings>({
    paintPrice: 350,
    laborRate: 95,
    prepDefault: 120,
    coverageDefault: 8.0,
    lossDefault: 10.0
  });

  // BOQ Rows initial state
  const [boqRows, setBoqRows] = useState<TakeoffRow[]>(() => {
    const initialCalc = calculateTakeoffRowData(
      'H100x50x5x7',
      6.0,
      15,
      'PS-01',
      '__default',
      {
        paintPrice: 350,
        laborRate: 95,
        prepDefault: 120,
        coverageDefault: 8.0,
        lossDefault: 10.0
      }
    );

    return [
      {
        id: 'init_row_1',
        sectionId: 'H100x50x5x7',
        length: 6.0,
        qty: 15,
        paintSysId: 'PS-01',
        prepId: '__default',
        ...initialCalc
      }
    ];
  });

  // Handlers for bridging between pages
  const handleTabChange = (tab: 'steel' | 'paint' | 'boq' | 'master') => {
    if (tab === 'paint' && lastSteelArea > 0) {
      setPaintInitialArea(lastSteelArea);
    }
    setActiveTab(tab);
  };

  const handleForwardFromSteel = (area: number) => {
    setLastSteelArea(area);
    setPaintInitialArea(area);
    setActiveTab('paint');
  };

  const handleForwardFromBOQ = (surfaceArea: number) => {
    setPaintInitialArea(surfaceArea);
    setActiveTab('paint');
  };

  const boqTotals = calculateBOQTotals(boqRows);

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <HeaderNav
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        lastArea={lastSteelArea > 0 ? lastSteelArea : boqTotals.totalSurface}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className={activeTab === 'steel' ? 'block' : 'hidden'}>
          <PageSteelArea
            onForwardArea={handleForwardFromSteel}
            onAreaCalculated={(area) => {
              setLastSteelArea(area);
            }}
          />
        </div>

        <div className={activeTab === 'paint' ? 'block' : 'hidden'}>
          <PagePaintBudget
            initialArea={paintInitialArea}
            lastSteelArea={lastSteelArea}
            boqSurfaceArea={boqTotals.totalSurface}
          />
        </div>

        <div className={activeTab === 'boq' ? 'block' : 'hidden'}>
          <PageBOQTakeoff
            onForwardBOQSurface={handleForwardFromBOQ}
            rows={boqRows}
            setRows={setBoqRows}
            settings={boqSettings}
            setSettings={setBoqSettings}
          />
        </div>

        <div className={activeTab === 'master' ? 'block' : 'hidden'}>
          <PageMasterData />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Paint Calculator</span>
            <span>•</span>
            <span>ระบบคำนวณพื้นที่ผิวทาสีและ BOQ โครงสร้างเหล็ก</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-mono">v2.4.1</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
