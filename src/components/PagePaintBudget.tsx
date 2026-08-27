import React, { useState, useEffect } from 'react';
import { PaintApplicationMethod, PaintCalculationResult, ContainerType } from '../types';
import { calculatePaintVolumeAndBudget, formatNumber } from '../utils/calculatorFunctions';
import { SG_PAINTS_COVERAGE_TABLE, SG_PAINTS_CONTAINER_SIZES } from '../data/steelMasterData';
import { PaintBucket, Sparkles, Table, ChevronDown, ChevronUp, Package, ShieldCheck, Check } from 'lucide-react';

interface PagePaintBudgetProps {
  initialArea?: number;
  lastSteelArea?: number;
  boqSurfaceArea?: number;
}

export const PagePaintBudget: React.FC<PagePaintBudgetProps> = ({
  initialArea = 0,
  lastSteelArea = 0,
  boqSurfaceArea = 0
}) => {
  const [method, setMethod] = useState<PaintApplicationMethod>('brush_roller');
  const [thickness, setThickness] = useState<number>(300);
  const [area, setArea] = useState<number>(initialArea > 0 ? initialArea : 50);
  const [lossPercentage, setLossPercentage] = useState<number>(25);
  const [pricePerGallon, setPricePerGallon] = useState<number>(6072);
  const [selectedContainer, setSelectedContainer] = useState<ContainerType>('gallon');
  const [showSpecTable, setShowSpecTable] = useState<boolean>(true);

  const [result, setResult] = useState<PaintCalculationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const DFT_PRESETS = [50, 75, 100, 150, 200, 225, 300];

  // Sync if initialArea changes
  useEffect(() => {
    if (initialArea > 0) {
      setArea(initialArea);
    }
  }, [initialArea]);

  // Handle method change loss defaults
  const handleMethodChange = (newMethod: PaintApplicationMethod) => {
    setMethod(newMethod);
    if (newMethod === 'brush_roller') {
      setLossPercentage(25);
    } else {
      setLossPercentage(40);
    }
  };

  const calculate = () => {
    setErrorMsg('');
    try {
      const res = calculatePaintVolumeAndBudget(
        area,
        thickness,
        method,
        lossPercentage,
        pricePerGallon
      );
      setResult(res);
    } catch (err: any) {
      setErrorMsg(err.message || 'เกิดข้อผิดพลาดในการคำนวณ');
      setResult(null);
    }
  };

  useEffect(() => {
    calculate();
  }, [method, thickness, area, lossPercentage, pricePerGallon]);

  const pullFromSteel = () => {
    if (lastSteelArea > 0) {
      setArea(parseFloat(lastSteelArea.toFixed(3)));
    } else {
      alert('ยังไม่มีข้อมูลพื้นที่ผิวจากหน้า 1 กรุณาไปคำนวณที่หน้า 1 ก่อน');
    }
  };

  const pullFromBOQ = () => {
    if (boqSurfaceArea > 0) {
      setArea(parseFloat(boqSurfaceArea.toFixed(3)));
    } else {
      alert('ยังไม่มีข้อมูลพื้นที่ผิวรวมจากหน้า 3 (BOQ) กรุณาเพิ่มรายการถอดแบบก่อน');
    }
  };

  // Pricing calculations for different container options
  const quartPrice = Math.round(pricePerGallon * (0.95 / 3.785) * 1.08); // +8% packaging premium
  const cupPrice = Math.round(pricePerGallon * (0.23 / 3.785) * 1.15); // +15% packaging premium

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                ฟังก์ชันที่ 2 (Paint & Budget Engine)
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" /> SG Paints / Rust Bullet
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 tracking-tight">
              คำนวณปริมาณสีและงบประมาณ (SG Paints / Rust Bullet Standard)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              คำนวณอัตราสิ้นเปลืองสีตามมาตรฐานหน้างานจริงและความหนา DFT รองรับทั้งขนาด US Gallon (3.785L), Quart (0.95L) และ Cup (0.23L)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Form Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Method selection */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                1. เลือกวิธีการทำงาน / อุปกรณ์
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleMethodChange('brush_roller')}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    method === 'brush_roller'
                      ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 ring-2 ring-indigo-500/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <div className="font-bold text-sm">การทา (Brush / Roller)</div>
                  <div className="text-xs text-slate-500 mt-1 leading-relaxed">
                    มาตรฐาน 6.5 ตร.ม./แกลลอน (ที่ 300 µm) • 13.0 ตร.ม./แกลลอน (ที่ 150 µm)
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleMethodChange('airless_spray')}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    method === 'airless_spray'
                      ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 ring-2 ring-indigo-500/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <div className="font-bold text-sm">การพ่น (Airless Spray)</div>
                  <div className="text-xs text-slate-500 mt-1 leading-relaxed">
                    มาตรฐาน 5.5 ตร.ม./แกลลอน (ที่ 300 µm) • 11.0 ตร.ม./แกลลอน (ที่ 150 µm)
                  </div>
                </button>
              </div>
            </div>

            {/* Thickness Preset Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  2. ความหนาฟิล์มสีแห้งรวม (DFT) ตามมาตรฐาน SG Paints
                </label>
                <span className="text-xs font-semibold text-indigo-700">
                  {thickness} ไมครอน ({method === 'brush_roller' ? 'ทา' : 'พ่น'})
                </span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-3">
                {DFT_PRESETS.map((dft) => (
                  <button
                    key={dft}
                    type="button"
                    onClick={() => setThickness(dft)}
                    className={`py-2 px-1 text-center rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                      thickness === dft
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-300'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {dft} µm
                  </button>
                ))}
              </div>

              <div className="relative">
                <input
                  type="number"
                  min="10"
                  step="5"
                  value={thickness}
                  onChange={(e) => setThickness(parseFloat(e.target.value) || 0)}
                  placeholder="หรือระบุความหนาไมครอนที่กำหนดเอง..."
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">
                  ไมครอน (DFT µm)
                </span>
              </div>
            </div>

            {/* Area & Pull Inputs */}
            <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                  3. พื้นที่ที่ต้องการทาสี
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={area}
                    onChange={(e) => setArea(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-base font-bold text-indigo-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">
                    ตร.ม. (m²)
                  </span>
                </div>
              </div>

              {/* Quick Pull Buttons */}
              <div className="flex flex-wrap gap-2.5 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={pullFromSteel}
                  className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-all shadow-xs cursor-pointer"
                >
                  📥 ดึงพื้นที่จากหน้า 1 ({lastSteelArea > 0 ? `${lastSteelArea.toFixed(3)} ตร.ม.` : 'ยังไม่มีค่า'})
                </button>
                <button
                  type="button"
                  onClick={pullFromBOQ}
                  className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-all shadow-xs cursor-pointer"
                >
                  📥 ดึงพื้นที่จากหน้า 3 BOQ ({boqSurfaceArea > 0 ? `${boqSurfaceArea.toFixed(3)} ตร.ม.` : 'ยังไม่มีค่า'})
                </button>
              </div>

              {/* Loss % & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                    % เผื่อการสูญเสีย (% Loss)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={lossPercentage}
                      onChange={(e) => setLossPercentage(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                      %
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                    ราคาสีมาตรฐาน (บาท/US Gallon)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="50"
                      value={pricePerGallon}
                      onChange={(e) => setPricePerGallon(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">
                      บาท
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                {errorMsg}
              </div>
            )}

            {/* Packaging Unit Comparison Cards */}
            {result && (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  4. ตรวจสอบอัตราครอบคลุมและจำนวนบรรจุภัณฑ์แต่ละขนาด (ที่ {thickness} µm)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* US Gallon */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
                      <span>US Gallon</span>
                      <span className="font-mono text-indigo-600">3.785 ลิตร</span>
                    </div>
                    <div className="text-lg font-bold text-slate-900">
                      {result.adjustedCoveragePerGallon.toFixed(3)}{' '}
                      <span className="text-xs text-slate-500 font-normal">ตร.ม./แกลลอน</span>
                    </div>
                    <div className="text-xs text-emerald-700 font-semibold mt-1">
                      ต้องซื้อ: {result.exactGallonsToBuy} แกลลอน
                    </div>
                  </div>

                  {/* Quart */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
                      <span>Quart (ควอร์ต)</span>
                      <span className="font-mono text-indigo-600">0.95 ลิตร</span>
                    </div>
                    <div className="text-lg font-bold text-slate-900">
                      {result.adjustedCoveragePerQuart.toFixed(3)}{' '}
                      <span className="text-xs text-slate-500 font-normal">ตร.ม./ควอร์ต</span>
                    </div>
                    <div className="text-xs text-emerald-700 font-semibold mt-1">
                      ต้องซื้อ: {result.exactQuartsToBuy} ควอร์ต
                    </div>
                  </div>

                  {/* Cup */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
                      <span>Cup (คัพ)</span>
                      <span className="font-mono text-indigo-600">0.23 ลิตร</span>
                    </div>
                    <div className="text-lg font-bold text-slate-900">
                      {result.adjustedCoveragePerCup.toFixed(3)}{' '}
                      <span className="text-xs text-slate-500 font-normal">ตร.ม./คัพ</span>
                    </div>
                    <div className="text-xs text-emerald-700 font-semibold mt-1">
                      ต้องซื้อ: {result.exactCupsToBuy} คัพ
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Summary Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white p-7 sm:p-8 rounded-3xl shadow-xl shadow-slate-300 relative overflow-hidden flex flex-col justify-between">
              {/* Ambient Glow */}
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-indigo-500 rounded-full opacity-25 blur-3xl pointer-events-none"></div>

              {result ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3.5 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                      สรุปปริมาณสีและงบประมาณ
                    </span>
                    <PaintBucket className="w-5 h-5 text-indigo-400" />
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block">จำนวนที่ต้องจัดซื้อจริง (US Gallons)</span>
                    <h4 className="text-4xl font-black mb-1 text-white tracking-tight">
                      {result.exactGallonsToBuy}{' '}
                      <span className="text-xl font-medium text-indigo-300 italic">แกลลอน</span>
                    </h4>
                    <span className="text-xs text-indigo-300 font-medium">
                      เทียบเท่า {formatNumber(result.exactLitresToBuy, 3)} ลิตร
                    </span>
                  </div>

                  {/* Recommendation: Optimal Container Mix */}
                  <div className="p-3.5 bg-indigo-950/70 rounded-2xl border border-indigo-800/80 text-xs">
                    <span className="text-indigo-300 font-bold block mb-1.5 flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 text-indigo-400" />
                      แนะนำการจัดซื้อแบบผสมขนาด (ลดเศษสีเหลือทิ้ง):
                    </span>
                    <div className="text-white font-semibold flex flex-wrap gap-2 text-xs">
                      {result.optimalMix.gallons > 0 && (
                        <span className="px-2 py-0.5 bg-indigo-800/60 rounded border border-indigo-600/40">
                          {result.optimalMix.gallons} แกลลอน
                        </span>
                      )}
                      {result.optimalMix.quarts > 0 && (
                        <span className="px-2 py-0.5 bg-indigo-800/60 rounded border border-indigo-600/40">
                          {result.optimalMix.quarts} ควอร์ต
                        </span>
                      )}
                      {result.optimalMix.cups > 0 && (
                        <span className="px-2 py-0.5 bg-indigo-800/60 rounded border border-indigo-600/40">
                          {result.optimalMix.cups} คัพ
                        </span>
                      )}
                      {result.optimalMix.gallons === 0 && result.optimalMix.quarts === 0 && result.optimalMix.cups === 0 && (
                        <span className="text-slate-400">1 คัพ</span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 text-xs text-slate-300 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">วิธีทำงาน:</span>
                      <strong className="text-white">{result.methodText}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">ความหนารวม DFT:</span>
                      <strong className="text-indigo-300">{thickness} ไมครอน</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">อัตราทา/แกลลอน ที่ {thickness} µm:</span>
                      <strong className="text-white">{result.adjustedCoveragePerGallon.toFixed(3)} ตร.ม./Gal</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">รอบการทาแนะนำ:</span>
                      <strong className="text-white">
                        {result.minCoats} - {result.maxCoats} รอบ
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">พื้นที่รวมเผื่อสูญเสีย ({lossPercentage}%):</span>
                      <span className="font-semibold text-white">{formatNumber(result.totalAreaWithLoss, 3)} ตร.ม.</span>
                    </div>
                  </div>

                  {/* Budget & Taxes */}
                  <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>ราคาสีรวม (ก่อน VAT):</span>
                      <span className="font-medium">{formatNumber(result.totalBeforeVat, 3)} บาท</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>ภาษีมูลค่าเพิ่ม (VAT 7%):</span>
                      <span>{formatNumber(result.vatAmount, 3)} บาท</span>
                    </div>
                    <div className="pt-3 border-t border-slate-700/80">
                      <span className="text-xs text-amber-300 font-bold uppercase tracking-wider block">
                        งบประมาณราคาสีรวมสุทธิ (Net Total)
                      </span>
                      <div className="text-3xl font-extrabold text-amber-400 mt-1">
                        {formatNumber(result.totalWithVat, 3)}
                        <span className="text-sm font-normal text-slate-300 ml-2">บาท</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 text-sm">
                  กรอกข้อมูลพื้นที่เพื่อคำนวณปริมาณสีและงบประมาณ
                </div>
              )}
            </div>

            {/* Reference Table Collapsible Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <button
                type="button"
                onClick={() => setShowSpecTable(!showSpecTable)}
                className="w-full flex items-center justify-between text-left font-bold text-slate-900 text-sm cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Table className="w-4 h-4 text-indigo-600" />
                  ตารางมาตรฐาน SG Paints / Rust Bullet
                </span>
                {showSpecTable ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {showSpecTable && (
                <div className="mt-4 space-y-4 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <div className="font-bold text-slate-800 mb-1.5">
                      1. ข้อมูลหน้างานจริง (Actual on-site data)
                    </div>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-100 text-slate-700 font-bold">
                          <tr>
                            <th className="p-2">Size</th>
                            <th className="p-2 text-right">ปริมาณ (L)</th>
                            <th className="p-2 text-right">150 µm (ตร.ม.)</th>
                            <th className="p-2 text-right">300 µm (ตร.ม.)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className={thickness === 150 || thickness === 300 ? 'bg-indigo-50/40' : ''}>
                            <td className="p-2 font-medium">Cup</td>
                            <td className="p-2 text-right">0.23</td>
                            <td className="p-2 text-right font-semibold">0.79</td>
                            <td className="p-2 text-right font-semibold">0.40</td>
                          </tr>
                          <tr className={thickness === 150 || thickness === 300 ? 'bg-indigo-50/40' : ''}>
                            <td className="p-2 font-medium">Quart</td>
                            <td className="p-2 text-right">0.95</td>
                            <td className="p-2 text-right font-semibold">3.26</td>
                            <td className="p-2 text-right font-semibold">1.63</td>
                          </tr>
                          <tr className={thickness === 150 || thickness === 300 ? 'bg-indigo-50/40' : ''}>
                            <td className="p-2 font-medium">US Gallons</td>
                            <td className="p-2 text-right">3.785</td>
                            <td className="p-2 text-right font-bold text-indigo-700">13.00</td>
                            <td className="p-2 text-right font-bold text-indigo-700">6.50</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1">* เก็บข้อมูลจากหน้างานจริง</span>
                  </div>

                  <div>
                    <div className="font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                      <span>2. ตารางเทียบสัดส่วนตามความหนา DFT</span>
                      <span className="text-[11px] text-indigo-600 font-medium">
                        {method === 'brush_roller' ? 'การทา (Brush)' : 'การพ่น (Airless)'}
                      </span>
                    </div>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg max-h-48 overflow-y-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="sticky top-0 bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                          <tr>
                            <th className="p-1.5">DFT (µm)</th>
                            <th className="p-1.5 text-right">Quart (ตร.ม.)</th>
                            <th className="p-1.5 text-right font-bold text-indigo-900">US Gallon (ตร.ม.)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-mono">
                          {SG_PAINTS_COVERAGE_TABLE.map((row) => {
                            const isCurrent = row.dft === thickness;
                            const quartVal = method === 'brush_roller' ? row.brushQuart : row.sprayQuart;
                            const galVal = method === 'brush_roller' ? row.brushGallon : row.sprayGallon;
                            return (
                              <tr
                                key={row.dft}
                                className={isCurrent ? 'bg-indigo-100/70 font-bold text-indigo-950' : 'hover:bg-slate-50'}
                              >
                                <td className="p-1.5 font-sans font-semibold">
                                  {row.dft} µm {isCurrent && <span className="text-indigo-600">●</span>}
                                </td>
                                <td className="p-1.5 text-right">{quartVal.toFixed(2)}</td>
                                <td className="p-1.5 text-right text-indigo-800 font-bold">{galVal.toFixed(2)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
