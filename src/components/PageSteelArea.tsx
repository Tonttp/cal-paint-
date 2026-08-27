import React, { useState, useEffect } from 'react';
import { SteelShapeType } from '../types';
import {
  calculatePlateArea,
  calculatePipeArea,
  calculateTubeArea,
  calculateAngleArea,
  calculateIBeamArea,
  calculateChannelArea,
  formatNumber
} from '../utils/calculatorFunctions';
import { ArrowRight, CheckCircle2, Info, RefreshCw, Sparkles } from 'lucide-react';

interface PageSteelAreaProps {
  onForwardArea: (area: number) => void;
  onAreaCalculated?: (area: number) => void;
}

export const PageSteelArea: React.FC<PageSteelAreaProps> = ({ onForwardArea, onAreaCalculated }) => {
  const [shape, setShape] = useState<SteelShapeType>('plate');
  const [qty, setQty] = useState<number>(1);

  // Plate
  const [plateWidth, setPlateWidth] = useState<number>(1.0);
  const [plateLength, setPlateLength] = useState<number>(2.0);
  const [plateSides, setPlateSides] = useState<number>(2);

  // Round Pipe
  const [pipeDiameter, setPipeDiameter] = useState<number>(0.114);
  const [pipeLength, setPipeLength] = useState<number>(6.0);

  // Square Tube
  const [tubeW, setTubeW] = useState<number>(0.1);
  const [tubeH, setTubeH] = useState<number>(0.1);
  const [tubeLength, setTubeLength] = useState<number>(6.0);

  // Angle
  const [angleLeg1, setAngleLeg1] = useState<number>(0.05);
  const [angleLeg2, setAngleLeg2] = useState<number>(0.05);
  const [angleLength, setAngleLength] = useState<number>(6.0);
  const [angleBothSides, setAngleBothSides] = useState<boolean>(true);

  // I-Beam
  const [beamH, setBeamH] = useState<number>(0.2);
  const [beamFlange, setBeamFlange] = useState<number>(0.1);
  const [beamLength, setBeamLength] = useState<number>(6.0);

  // Channel
  const [chanH, setChanH] = useState<number>(0.15);
  const [chanFlange, setChanFlange] = useState<number>(0.075);
  const [chanLength, setChanLength] = useState<number>(6.0);

  // Result state
  const [result, setResult] = useState<{
    areaPerPiece: number;
    totalArea: number;
    formula: string;
    shapeName: string;
  } | null>(null);

  const [errorMsg, setErrorMsg] = useState<string>('');

  const calculate = () => {
    setErrorMsg('');
    try {
      if (qty <= 0) throw new Error('กรุณากรอกจำนวนชิ้นให้มากกว่า 0');

      let res;
      if (shape === 'plate') {
        res = calculatePlateArea(plateWidth, plateLength, plateSides, qty);
      } else if (shape === 'round_pipe') {
        res = calculatePipeArea(pipeDiameter, pipeLength, qty);
      } else if (shape === 'square_tube') {
        res = calculateTubeArea(tubeW, tubeH, tubeLength, qty);
      } else if (shape === 'angle') {
        res = calculateAngleArea(angleLeg1, angleLeg2, angleLength, qty, angleBothSides);
      } else if (shape === 'ibeam') {
        res = calculateIBeamArea(beamH, beamFlange, beamLength, qty);
      } else if (shape === 'channel') {
        res = calculateChannelArea(chanH, chanFlange, chanLength, qty);
      }
      if (res) {
        setResult(res);
        if (onAreaCalculated && res.totalArea > 0) {
          onAreaCalculated(res.totalArea);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'เกิดข้อผิดพลาดในการคำนวณ');
      setResult(null);
    }
  };

  useEffect(() => {
    calculate();
  }, [
    shape,
    qty,
    plateWidth,
    plateLength,
    plateSides,
    pipeDiameter,
    pipeLength,
    tubeW,
    tubeH,
    tubeLength,
    angleLeg1,
    angleLeg2,
    angleLength,
    angleBothSides,
    beamH,
    beamFlange,
    beamLength,
    chanH,
    chanFlange,
    chanLength
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              ฟังก์ชันที่ 1 (Steel Area Engine)
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 tracking-tight">
              คำนวณพื้นที่ผิวโครงสร้างเหล็กรูปพรรณ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              ระบุรูปทรงและมิติความกว้าง ความยาว และจำนวน เพื่อหาพื้นที่ผิว (ตารางเมตร) สำหรับทาสีกันสนิมและสีทับหน้า
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={calculate}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>รีเฟรชคำนวณ</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Form Column (8 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Shape selection */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                1. เลือกประเภทรูปทรงเหล็ก
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'plate', label: 'แผ่นเหล็ก (Plate)', desc: 'แผ่นเรียบ 1-2 ด้าน' },
                  { id: 'round_pipe', label: 'ท่อกลม (Pipe)', desc: 'ผิวโค้งรอบท่อ' },
                  { id: 'square_tube', label: 'ท่อเหลี่ยม/กล่อง', desc: 'กล่อง 4 ด้าน' },
                  { id: 'angle', label: 'เหล็กฉาก (L)', desc: 'ฉากสองขา' },
                  { id: 'ibeam', label: 'I-Beam / H-Beam', desc: 'ปีกและเอว' },
                  { id: 'channel', label: 'รางน้ำ (Channel)', desc: 'รูปตัวซี C' }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setShape(s.id as SteelShapeType)}
                    className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      shape === s.id
                        ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 ring-2 ring-indigo-500/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 bg-white'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-bold">{s.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dimension Inputs Card */}
            <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                <Info className="w-4 h-4 text-indigo-600" />
                <span>2. ระบุมิติขนาด (หน่วยเป็นเมตร)</span>
              </div>

              {shape === 'plate' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      ความกว้าง (Width)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={plateWidth}
                        onChange={(e) => setPlateWidth(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                        m
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      ความยาว (Length)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={plateLength}
                        onChange={(e) => setPlateLength(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                        m
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      จำนวนด้านทาสี
                    </label>
                    <select
                      value={plateSides}
                      onChange={(e) => setPlateSides(parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    >
                      <option value={1}>1 ด้าน (หน้าเดียว)</option>
                      <option value={2}>2 ด้าน (หน้า-หลัง)</option>
                    </select>
                  </div>
                </div>
              )}

              {shape === 'round_pipe' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      เส้นผ่านศูนย์กลาง (Diameter)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.001"
                        min="0.001"
                        value={pipeDiameter}
                        onChange={(e) => setPipeDiameter(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                        m
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">ตัวอย่าง: ท่อ 4 นิ้ว = 0.114 ม.</span>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      ความยาวท่อ (Length)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={pipeLength}
                        onChange={(e) => setPipeLength(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                        m
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">ความยาวมาตรฐาน 6.0 ม.</span>
                  </div>
                </div>
              )}

              {shape === 'square_tube' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      ความกว้างหน้าตัด
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.001"
                        min="0.001"
                        value={tubeW}
                        onChange={(e) => setTubeW(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                        m
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      ความสูงหน้าตัด
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.001"
                        min="0.001"
                        value={tubeH}
                        onChange={(e) => setTubeH(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                        m
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      ความยาวท่อ
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={tubeLength}
                        onChange={(e) => setTubeLength(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                        m
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {shape === 'angle' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                        ความกว้างขา 1
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.001"
                          min="0.001"
                          value={angleLeg1}
                          onChange={(e) => setAngleLeg1(parseFloat(e.target.value) || 0)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                          m
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                        ความกว้างขา 2
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.001"
                          min="0.001"
                          value={angleLeg2}
                          onChange={(e) => setAngleLeg2(parseFloat(e.target.value) || 0)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                          m
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                        ความยาว
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          min="0.01"
                          value={angleLength}
                          onChange={(e) => setAngleLength(parseFloat(e.target.value) || 0)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                          m
                        </span>
                      </div>
                    </div>
                  </div>
                  <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={angleBothSides}
                      onChange={(e) => setAngleBothSides(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>คิดพื้นที่ผิวทั้ง 2 ด้าน (ผิวในและผิวนอกรอบฉาก)</span>
                  </label>
                </div>
              )}

              {shape === 'ibeam' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      ความสูงเอว (Web H)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.001"
                        min="0.001"
                        value={beamH}
                        onChange={(e) => setBeamH(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                        m
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      ความกว้างปีก (Flange B)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.001"
                        min="0.001"
                        value={beamFlange}
                        onChange={(e) => setBeamFlange(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                        m
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      ความยาว (Length)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={beamLength}
                        onChange={(e) => setBeamLength(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                        m
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {shape === 'channel' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      ความสูง Web (H)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.001"
                        min="0.001"
                        value={chanH}
                        onChange={(e) => setChanH(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                        m
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      ความกว้างปีก Flange (B)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.001"
                        min="0.001"
                        value={chanFlange}
                        onChange={(e) => setChanFlange(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                        m
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      ความยาว (Length)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={chanLength}
                        onChange={(e) => setChanLength(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                        m
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 pt-1">
              <div className="w-48">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                  จำนวน (ชิ้น / ท่อน)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={qty}
                    onChange={(e) => setQty(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                    ชิ้น
                  </span>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                {errorMsg}
              </div>
            )}
          </div>

          {/* Results Summary Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white p-7 sm:p-8 rounded-3xl shadow-xl shadow-slate-300 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
              {/* Ambient Glow */}
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-indigo-500 rounded-full opacity-25 blur-3xl pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3.5 mb-5">
                  <p className="text-indigo-300 font-bold text-xs uppercase tracking-wider">
                    พื้นที่คำนวณเบื้องต้น
                  </p>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>

                {result ? (
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-slate-400">รูปทรงที่คำนวณ</span>
                      <h3 className="text-base font-bold text-white mt-0.5">{result.shapeName}</h3>
                    </div>

                    <div>
                      <h4 className="text-4xl font-black mb-1 tracking-tight text-white">
                        {formatNumber(result.totalArea, 3)}{' '}
                        <span className="text-xl font-medium text-indigo-300 italic">ตร.ม.</span>
                      </h4>
                      <p className="text-xs text-slate-400">Total Surface Area</p>
                    </div>

                    <div className="space-y-3 pt-5 border-t border-slate-800 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">พื้นที่ต่อ 1 ชิ้น:</span>
                        <span className="font-semibold text-white">
                          {formatNumber(result.areaPerPiece, 3)} ตร.ม.
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">จำนวนทั้งหมด:</span>
                        <span className="font-semibold text-white">{qty} ชิ้น</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">สูตรที่ใช้:</span>
                        <code className="text-indigo-300 font-mono">{result.formula}</code>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-slate-400 text-sm">
                    กรอกข้อมูลขนาดและมิติเพื่อดูผลลัพธ์
                  </div>
                )}
              </div>

              {result && (
                <div className="mt-6 pt-5 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => onForwardArea(result.totalArea)}
                    className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-sm shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>ดำเนินการต่อ: คำนวณปริมาณสี (หน้า 2)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Recommendation & Engineering Tips Box */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <p className="text-sm font-bold text-slate-900 mb-4">คำแนะนำทางวิศวกรรม</p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-xs text-slate-600 leading-relaxed">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0"></div>
                  สำหรับท่อกลมและเหล็กกล่อง คิดพื้นที่ผิวด้านนอกรอบรูปทรงเต็ม 360 องศา
                </li>
                <li className="flex gap-3 text-xs text-slate-600 leading-relaxed">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0"></div>
                  สำหรับเหล็ก H-Beam / I-Beam คิดพื้นที่รอบปีกนอก ปีกใน และเอว ทั้ง 2 ด้าน
                </li>
                <li className="flex gap-3 text-xs text-slate-600 leading-relaxed">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0"></div>
                  สามารถส่งค่าพื้นที่รวมไปยังหน้า 2 เพื่อคำนวณปริมาณสีและจำนวนแกลลอนได้ทันที
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
