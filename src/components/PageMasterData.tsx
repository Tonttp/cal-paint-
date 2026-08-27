import React, { useState } from 'react';
import {
  SECTION_MASTER,
  PAINT_SYSTEM_MASTER,
  SURFACE_PREP_MASTER,
  SG_PAINTS_COVERAGE_TABLE,
  SG_PAINTS_CONTAINER_SIZES
} from '../data/steelMasterData';
import { Search, Database, Layers, Wrench, BookOpen, Sparkles, ShieldCheck } from 'lucide-react';
import { formatNumber } from '../utils/calculatorFunctions';

export const PageMasterData: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('ALL');

  const filteredSections = SECTION_MASTER.filter((s) => {
    const matchesSearch =
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.size.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'ALL' || s.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="border-b border-slate-100 pb-5 mb-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              ฟังก์ชันที่ 4 (Master Reference Database)
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" /> SG Paints / Rust Bullet Verified
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 tracking-tight">
            ฐานข้อมูลมาตรฐานเหล็ก ระบบสี และมาตรฐาน SG Paints / Rust bullet
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            ตารางข้อมูลมาตรฐานวิศวกรรมสำหรับงานคำนวณพื้นที่ผิว น้ำหนัก และข้อมูลอัตราการทาสีจริงจากหน้างาน
          </p>
        </div>

        {/* Section 0: SG Paints / Rust bullet Specification Tables */}
        <div className="space-y-4 mb-10 p-6 bg-slate-50/70 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              ตารางอัตราการครอบคลุมพื้นที่ SG Paints / Rust bullet (ข้อมูลหน้างานจริงและการเทียบสัดส่วน)
            </h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-lg">
              Official Master Data
            </span>
          </div>

          {/* Table 1: Real on-site data */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              ตารางที่ 1: SG Paints / Rust bullet — ข้อมูลจากหน้างานจริง (On-site measurement)
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-xs">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4">No.</th>
                    <th className="py-2.5 px-4">Size (ขนาดบรรจุภัณฑ์)</th>
                    <th className="py-2.5 px-4 text-right">ปริมาณ (ลิตร)</th>
                    <th className="py-2.5 px-4 text-right text-indigo-900 bg-indigo-50 font-bold">
                      พื้นที่การทาสีที่ความหนา 150 ไมครอน (ตร.ม.)
                    </th>
                    <th className="py-2.5 px-4 text-right text-indigo-900 bg-indigo-50 font-bold">
                      พื้นที่การทาสีที่ความหนา 300 ไมครอน (ตร.ม.)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-4 font-sans text-slate-600">1</td>
                    <td className="py-2.5 px-4 font-sans font-semibold text-slate-900">Cup</td>
                    <td className="py-2.5 px-4 text-right text-slate-700">0.23</td>
                    <td className="py-2.5 px-4 text-right font-bold text-indigo-700 bg-indigo-50/30">0.79</td>
                    <td className="py-2.5 px-4 text-right font-bold text-indigo-700 bg-indigo-50/30">0.4</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-4 font-sans text-slate-600">2</td>
                    <td className="py-2.5 px-4 font-sans font-semibold text-slate-900">Quart</td>
                    <td className="py-2.5 px-4 text-right text-slate-700">0.95</td>
                    <td className="py-2.5 px-4 text-right font-bold text-indigo-700 bg-indigo-50/30">3.26</td>
                    <td className="py-2.5 px-4 text-right font-bold text-indigo-700 bg-indigo-50/30">1.63</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-4 font-sans text-slate-600">3</td>
                    <td className="py-2.5 px-4 font-sans font-semibold text-slate-900">US gallons</td>
                    <td className="py-2.5 px-4 text-right text-slate-700">3.785</td>
                    <td className="py-2.5 px-4 text-right font-bold text-indigo-700 bg-indigo-50/30">13</td>
                    <td className="py-2.5 px-4 text-right font-bold text-indigo-700 bg-indigo-50/30">6.5</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 italic">* เก็บข้อมูลจากหน้างานจริง</p>
          </div>

          {/* Tables 2 & 3 Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Table 2: Brush / Roller Proportion */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                ตารางที่ 2: การทา (Brush / Roller) — คำนวณเทียบสัดส่วน
              </h4>
              <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-xs">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3">ลำดับ</th>
                      <th className="py-2 px-3">ความหนาสี (ไมครอน)</th>
                      <th className="py-2 px-3 text-right">Quart พื้นที่ทาสี (ตร.ม.)</th>
                      <th className="py-2 px-3 text-right text-indigo-900 bg-indigo-50 font-bold">
                        US Gallon พื้นที่ทาสี (ตร.ม.)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {SG_PAINTS_COVERAGE_TABLE.map((row, idx) => (
                      <tr key={row.dft} className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-sans text-slate-500">{idx + 1}</td>
                        <td className="py-2 px-3 font-sans font-semibold text-slate-900">{row.dft}</td>
                        <td className="py-2 px-3 text-right text-slate-700">
                          {row.dft === 225 ? '2.173333333' : row.brushQuart.toString()}
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-indigo-700 bg-indigo-50/30">
                          {row.dft === 225 ? '8.666666667' : row.brushGallon.toString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 italic">* ค่าได้จากการคำนวณเทียบสัดส่วน</p>
            </div>

            {/* Table 3: Airless Spray */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                ตารางที่ 3: 1.2 พ่นด้วย Airless spray — ขนาด US Gallon
              </h4>
              <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-xs">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3">ลำดับ</th>
                      <th className="py-2 px-3">ความหนา (ไมครอน)</th>
                      <th className="py-2 px-3 text-right text-indigo-900 bg-indigo-50 font-bold">
                        พื้นที่ทาสี (ตร.ม.)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {SG_PAINTS_COVERAGE_TABLE.map((row, idx) => (
                      <tr key={row.dft} className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-sans text-slate-500">{idx + 1}</td>
                        <td className="py-2 px-3 font-sans font-semibold text-slate-900">{row.dft}</td>
                        <td className="py-2 px-3 text-right font-bold text-indigo-700 bg-indigo-50/30">
                          {row.dft === 225 ? '7.33333' : row.sprayGallon.toString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 italic">* คำนวณตามอัตราการพ่นจริง (5.5 ตร.ม./แกลลอน ที่ 300 µm)</p>
            </div>
          </div>
        </div>

        {/* Section 1: Steel Section Master with search and filter */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-600" />
              1. ตารางหน้าตัดเหล็กรูปพรรณ (Section Master Database — {filteredSections.length} รายการ)
            </h3>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="ค้นหาขนาด หรือ รหัส..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ALL">ทุกประเภท (All Types)</option>
                <option value="H-BEAM">H-BEAM</option>
                <option value="I-BEAM">I-BEAM</option>
                <option value="CHANNEL">CHANNEL (รางน้ำ)</option>
                <option value="ANGLE">ANGLE (เหล็กฉาก)</option>
                <option value="T-BAR">T-BAR</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl max-h-[380px] overflow-y-auto shadow-xs">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="sticky top-0 bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">รหัสหน้าตัด (Section ID)</th>
                  <th className="py-3 px-3">ประเภท</th>
                  <th className="py-3 px-3">ขนาดมิติ (Dimension)</th>
                  <th className="py-3 px-3 text-right">น้ำหนัก (kg/m)</th>
                  <th className="py-3 px-3 text-right text-indigo-950 bg-indigo-50 font-extrabold">
                    พื้นที่ผิวต่อเมตร (m²/m)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white font-mono">
                {filteredSections.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{s.id}</td>
                    <td className="py-2.5 px-3 text-slate-500">{s.type}</td>
                    <td className="py-2.5 px-3 text-slate-600">{s.size}</td>
                    <td className="py-2.5 px-3 text-right text-slate-700">{s.kgm.toFixed(3)}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-indigo-700 bg-indigo-50/30">
                      {s.m2m.toFixed(3)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Paint Systems & Surface Prep Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-slate-200">
          {/* Paint Systems */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              2. ระบบสีมาตรฐาน (Paint System Master)
            </h3>
            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">รหัส</th>
                    <th className="py-3 px-3">คำอธิบายระบบสี</th>
                    <th className="py-3 px-2 text-right">อัตราทา (ตร.ม./ลิตร)</th>
                    <th className="py-3 px-2 text-right">% Loss</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {PAINT_SYSTEM_MASTER.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-3 font-mono font-bold text-indigo-700">{p.id}</td>
                      <td className="py-2.5 px-3 text-slate-700">{p.desc}</td>
                      <td className="py-2.5 px-2 text-right font-mono font-semibold">{p.coverage}</td>
                      <td className="py-2.5 px-2 text-right font-mono text-red-600">{p.loss}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Surface Preparation */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-indigo-600" />
              3. การเตรียมพื้นผิว (Surface Preparation Master)
            </h3>
            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">รหัส</th>
                    <th className="py-3 px-3">วิธีการเตรียมพื้นผิว</th>
                    <th className="py-3 px-3 text-right">ราคาอ้างอิง (บาท/ตร.ม.)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {SURFACE_PREP_MASTER.map((sp) => (
                    <tr key={sp.id} className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-3 font-mono font-bold text-indigo-700">{sp.id}</td>
                      <td className="py-2.5 px-3 text-slate-700">{sp.desc}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-800">
                        {sp.price} ฿
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 3: Engineering Formulas */}
        <div className="mt-8 p-5 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-3">
          <h4 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            สรุปสูตรคำนวณพื้นที่ผิวและปริมาณสีตามมาตรฐาน SG Paints / Rust bullet
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1 font-bold">อัตราทาสีตาม DFT (Brush/Roller):</strong>
              <code className="text-indigo-700 font-mono">Coverage (US Gallon) = 1950 / DFT (µm)</code>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1 font-bold">อัตราพ่นสีตาม DFT (Airless Spray):</strong>
              <code className="text-indigo-700 font-mono">Coverage (US Gallon) = 1650 / DFT (µm)</code>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1 font-bold">สัดส่วนขนาดบรรจุภัณฑ์:</strong>
              <code className="text-indigo-700 font-mono">
                1 Gal (3.785L) = 4 Quarts (0.95L) = 16.4 Cups (0.23L)
              </code>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1 font-bold">สูตรปริมาณสีรวมเผื่อสูญเสีย:</strong>
              <code className="text-indigo-700 font-mono">
                Total Gallons = (Area / Coverage) × (1 + Loss%)
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
