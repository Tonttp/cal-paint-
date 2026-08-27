import React, { useState, useEffect } from 'react';
import { TakeoffRow, BOQSettings } from '../types';
import { SECTION_MASTER, PAINT_SYSTEM_MASTER, SURFACE_PREP_MASTER } from '../data/steelMasterData';
import { calculateTakeoffRowData, calculateBOQTotals, formatNumber } from '../utils/calculatorFunctions';
import {
  Plus,
  Trash2,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
  FileSpreadsheet
} from 'lucide-react';

interface PageBOQTakeoffProps {
  onForwardBOQSurface: (surfaceArea: number) => void;
  rows: TakeoffRow[];
  setRows: React.Dispatch<React.SetStateAction<TakeoffRow[]>>;
  settings: BOQSettings;
  setSettings: React.Dispatch<React.SetStateAction<BOQSettings>>;
}

export const PageBOQTakeoff: React.FC<PageBOQTakeoffProps> = ({
  onForwardBOQSurface,
  rows,
  setRows,
  settings,
  setSettings
}) => {
  const [showSettings, setShowSettings] = useState<boolean>(true);

  // Recalculate row
  const updateRow = (id: string, updates: Partial<TakeoffRow>) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const merged = { ...r, ...updates };
        const calculated = calculateTakeoffRowData(
          merged.sectionId,
          merged.length,
          merged.qty,
          merged.paintSysId,
          merged.prepId,
          settings
        );
        return { ...merged, ...calculated };
      })
    );
  };

  // Re-calculate all when settings change
  useEffect(() => {
    setRows((prev) =>
      prev.map((r) => {
        const calculated = calculateTakeoffRowData(
          r.sectionId,
          r.length,
          r.qty,
          r.paintSysId,
          r.prepId,
          settings
        );
        return { ...r, ...calculated };
      })
    );
  }, [settings]);

  const addRow = (customSectionId?: string) => {
    const newId = 'row_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    const defaultSectionId = customSectionId || 'H100x50x5x7';
    const baseLength = 6.0;
    const baseQty = 10;
    const defaultPS = 'PS-01';
    const defaultPrep = '__default';

    const calculated = calculateTakeoffRowData(
      defaultSectionId,
      baseLength,
      baseQty,
      defaultPS,
      defaultPrep,
      settings
    );

    const newRow: TakeoffRow = {
      id: newId,
      sectionId: defaultSectionId,
      length: baseLength,
      qty: baseQty,
      paintSysId: defaultPS,
      prepId: defaultPrep,
      ...calculated
    };

    setRows((prev) => [...prev, newRow]);
  };

  const removeRow = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const loadSampleProject = () => {
    const samples = [
      { sectionId: 'H200x200x8x12', length: 6, qty: 12, ps: 'PS-03', prep: 'SP-04' },
      { sectionId: 'H150x75x5x7', length: 6, qty: 24, ps: 'PS-02', prep: 'SP-03' },
      { sectionId: 'C150x75x6.5x10', length: 6, qty: 30, ps: 'PS-01', prep: '__default' },
      { sectionId: 'L75x75x6', length: 6, qty: 40, ps: 'PS-01', prep: 'SP-02' }
    ];

    const newRows: TakeoffRow[] = samples.map((s, idx) => {
      const calc = calculateTakeoffRowData(s.sectionId, s.length, s.qty, s.ps, s.prep, settings);
      return {
        id: 'sample_' + idx + '_' + Date.now(),
        sectionId: s.sectionId,
        length: s.length,
        qty: s.qty,
        paintSysId: s.ps,
        prepId: s.prep,
        ...calc
      };
    });

    setRows(newRows);
  };

  const totals = calculateBOQTotals(rows);

  const getSectionObj = (secId: string) => SECTION_MASTER.find((s) => s.id === secId);

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              ฟังก์ชันที่ 3 (BOQ Take-Off Engine)
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 tracking-tight">
              ระบบประเมินงานทาสีและถอดแบบโครงสร้างเหล็ก (BOQ)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              คำนวณน้ำหนัก พื้นที่ผิว ปริมาณสี ค่าแรง และค่าเตรียมผิวตามรายการท่อนเหล็กทั้งโครงการ
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all cursor-pointer shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showSettings ? 'ซ่อนการตั้งค่าราคา' : 'แสดงการตั้งค่าราคา'}</span>
            </button>
            <button
              type="button"
              onClick={loadSampleProject}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100 text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>โหลดตัวอย่างโครงสร้าง</span>
            </button>
          </div>
        </div>

        {/* General Settings Panel */}
        {showSettings && (
          <div className="mt-6 p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                การตั้งค่าราคาและสเปกพื้นฐาน (General Estimation Rates)
              </span>
              <span className="text-[11px] text-slate-500">
                *จะใช้เมื่อรายการเหล็กเลือกเป็น 'ค่าเริ่มต้น'
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                  ราคาสี (บาท/ลิตร)
                </label>
                <input
                  type="number"
                  min="0"
                  value={settings.paintPrice}
                  onChange={(e) =>
                    setSettings({ ...settings, paintPrice: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                  ค่าแรงทาสี (บาท/ตร.ม.)
                </label>
                <input
                  type="number"
                  min="0"
                  value={settings.laborRate}
                  onChange={(e) =>
                    setSettings({ ...settings, laborRate: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                  ค่าเตรียมผิว (บาท/ตร.ม.)
                </label>
                <input
                  type="number"
                  min="0"
                  value={settings.prepDefault}
                  onChange={(e) =>
                    setSettings({ ...settings, prepDefault: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                  อัตราทาสี (ตร.ม./ลิตร)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={settings.coverageDefault}
                  onChange={(e) =>
                    setSettings({ ...settings, coverageDefault: parseFloat(e.target.value) || 1 })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                  % สูญเสียสีเริ่มต้น
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.lossDefault}
                  onChange={(e) =>
                    setSettings({ ...settings, lossDefault: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Takeoff Table */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
              ตารางรายการถอดแบบ ({rows.length} รายการ)
            </h3>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => addRow()}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-indigo-200 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> เพิ่มแถวเหล็ก
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs">
            <table className="w-full text-xs text-left border-collapse min-w-[1100px]">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-3 px-2 text-center w-10">#</th>
                  <th className="py-3 px-3 min-w-[160px]">หน้าตัดเหล็ก (Section)</th>
                  <th className="py-3 px-2 text-center w-16">ประเภท</th>
                  <th className="py-3 px-2 text-center w-24">ยาว/ท่อน (ม.)</th>
                  <th className="py-3 px-2 text-center w-20">จำนวน (ชิ้น)</th>
                  <th className="py-3 px-3 min-w-[150px]">ระบบสี (Paint System)</th>
                  <th className="py-3 px-3 min-w-[140px]">เตรียมผิว (Surface Prep)</th>
                  <th className="py-3 px-2 text-right bg-indigo-50/30">ยาวรวม (ม.)</th>
                  <th className="py-3 px-2 text-right bg-indigo-50/30">นน. (kg)</th>
                  <th className="py-3 px-2 text-right bg-indigo-100/50 font-extrabold text-indigo-950">
                    พื้นที่ผิว (ตร.ม.)
                  </th>
                  <th className="py-3 px-2 text-right bg-indigo-50/30">สี (ลิตร)</th>
                  <th className="py-3 px-2 text-right">ค่าสี (฿)</th>
                  <th className="py-3 px-2 text-right">ค่าเตรียมผิว (฿)</th>
                  <th className="py-3 px-2 text-right">ค่าแรง (฿)</th>
                  <th className="py-3 px-3 text-right bg-amber-50/70 font-bold text-amber-950">
                    รวมทั้งสิ้น (฿)
                  </th>
                  <th className="py-3 px-2 text-center w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={16} className="py-10 text-center text-slate-400">
                      ยังไม่มีรายการถอดแบบ กดปุ่ม "+ เพิ่มแถวเหล็ก" หรือ "โหลดตัวอย่างโครงสร้าง" ด้านบน
                    </td>
                  </tr>
                ) : (
                  rows.map((row, index) => {
                    const sec = getSectionObj(row.sectionId);
                    return (
                      <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-2 text-center text-slate-400 font-medium">
                          {index + 1}
                        </td>
                        <td className="py-2.5 px-2">
                          <select
                            value={row.sectionId}
                            onChange={(e) => updateRow(row.id, { sectionId: e.target.value })}
                            className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          >
                            {SECTION_MASTER.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.id} ({s.size})
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-2.5 px-2 text-center text-slate-500 font-mono text-[11px]">
                          {sec ? sec.type : '-'}
                        </td>
                        <td className="py-2.5 px-2">
                          <input
                            type="number"
                            min="0.1"
                            step="0.1"
                            value={row.length}
                            onChange={(e) =>
                              updateRow(row.id, { length: parseFloat(e.target.value) || 0 })
                            }
                            className="w-full px-2 py-1.5 text-center bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          />
                        </td>
                        <td className="py-2.5 px-2">
                          <input
                            type="number"
                            min="1"
                            step="1"
                            value={row.qty}
                            onChange={(e) =>
                              updateRow(row.id, { qty: parseInt(e.target.value) || 1 })
                            }
                            className="w-full px-2 py-1.5 text-center bg-white border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          />
                        </td>
                        <td className="py-2.5 px-2">
                          <select
                            value={row.paintSysId}
                            onChange={(e) => updateRow(row.id, { paintSysId: e.target.value })}
                            className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          >
                            <option value="__default">ค่าเริ่มต้น ({settings.coverageDefault} ตร.ม./ลิตร)</option>
                            {PAINT_SYSTEM_MASTER.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.id} ({p.coverage} ตร.ม./ลิตร)
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-2.5 px-2">
                          <select
                            value={row.prepId}
                            onChange={(e) => updateRow(row.id, { prepId: e.target.value })}
                            className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          >
                            <option value="__default">ค่าเริ่มต้น ({settings.prepDefault} ฿/ตร.ม.)</option>
                            {SURFACE_PREP_MASTER.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.id} ({p.price} ฿/ตร.ม.)
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono bg-indigo-50/20 text-slate-700">
                          {formatNumber(row.totalLength, 3)}
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono bg-indigo-50/20 text-slate-700">
                          {formatNumber(row.weight, 3)}
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono bg-indigo-50 font-bold text-indigo-950">
                          {formatNumber(row.surface, 3)}
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono bg-indigo-50/20 text-indigo-700">
                          {formatNumber(row.paintQty, 3)}
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono text-slate-700">
                          {formatNumber(row.paintCost, 3)}
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono text-slate-700">
                          {formatNumber(row.prepCost, 3)}
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono text-slate-700">
                          {formatNumber(row.laborCost, 3)}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono bg-amber-50/70 font-bold text-amber-950">
                          {formatNumber(row.totalCost, 3)}
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <button
                            type="button"
                            onClick={() => removeRow(row.id)}
                            title="ลบแถวนี้"
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dashboard Summary Cards */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-slate-900">
              สรุปยอดรวมทั้งโครงการ (BOQ Project Summary Dashboard)
            </h3>
            {totals.totalSurface > 0 && (
              <button
                type="button"
                onClick={() => onForwardBOQSurface(totals.totalSurface)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-indigo-200 transition-all cursor-pointer"
              >
                <span>ส่งพื้นที่รวม ({formatNumber(totals.totalSurface, 3)} ตร.ม.) ไปคำนวณสี</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-[11px] font-bold uppercase text-slate-400 block">น้ำหนักเหล็ก</span>
              <div className="text-base font-bold text-slate-900 mt-1">
                {formatNumber(totals.totalWeight, 3)}
              </div>
              <span className="text-[10px] text-slate-400">กิโลกรัม (kg)</span>
            </div>

            <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 text-center">
              <span className="text-[11px] font-bold uppercase text-indigo-700 block">พื้นที่ผิวรวม</span>
              <div className="text-lg font-black text-indigo-950 mt-1">
                {formatNumber(totals.totalSurface, 3)}
              </div>
              <span className="text-[10px] text-indigo-600">ตร.ม. (m²)</span>
            </div>

            <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 text-center">
              <span className="text-[11px] font-bold uppercase text-indigo-700 block">ปริมาณสี</span>
              <div className="text-lg font-black text-indigo-950 mt-1">
                {formatNumber(totals.totalPaintQty, 3)}
              </div>
              <span className="text-[10px] text-indigo-600">ลิตร</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-[11px] font-bold uppercase text-slate-400 block">ค่าสีรวม</span>
              <div className="text-base font-bold text-slate-900 mt-1">
                {formatNumber(totals.totalPaintCost, 3)}
              </div>
              <span className="text-[10px] text-slate-400">บาท</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-[11px] font-bold uppercase text-slate-400 block">ค่าเตรียมผิว</span>
              <div className="text-base font-bold text-slate-900 mt-1">
                {formatNumber(totals.totalPrepCost, 3)}
              </div>
              <span className="text-[10px] text-slate-400">บาท</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-[11px] font-bold uppercase text-slate-400 block">ค่าแรงรวม</span>
              <div className="text-base font-bold text-slate-900 mt-1">
                {formatNumber(totals.totalLaborCost, 3)}
              </div>
              <span className="text-[10px] text-slate-400">บาท</span>
            </div>

            <div className="bg-slate-900 text-white p-4 rounded-2xl text-center shadow-lg relative overflow-hidden col-span-2 sm:col-span-1">
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-indigo-500 rounded-full opacity-30 blur-xl pointer-events-none"></div>
              <span className="text-[11px] font-bold uppercase text-amber-300 block">ยอดรวมทั้งสิ้น</span>
              <div className="text-lg font-black text-amber-400 mt-1">
                {formatNumber(totals.totalCost, 3)}
              </div>
              <span className="text-[10px] text-slate-300">บาท</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
