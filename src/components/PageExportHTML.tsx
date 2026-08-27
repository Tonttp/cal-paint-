import React, { useState } from 'react';
import { generatePureModularHtml } from '../utils/htmlGenerator';
import { Copy, Check, Download, Code2, ExternalLink, Sparkles } from 'lucide-react';

export const PageExportHTML: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const htmlCode = generatePureModularHtml();

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'steel_paint_calculator_modular.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleOpenInNewTab = () => {
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              ไฟล์ HTML สมบูรณ์แบบ (Standalone Single HTML File)
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 tracking-tight">
              โค้ดภาษา HTML แยกหน้าและแบ่งเป็น Function ตามที่ต้องการ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              โค้ด HTML/CSS/JavaScript บริสุทธิ์ในไฟล์เดียว แยกหน้าการทำงานเป็นแท็บอิสระ และแบ่งฟังก์ชันชัดเจน สามารถนำไปเปิดใช้งานได้ทุกที่
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-200'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'คัดลอกโค้ดสำเร็จ!' : 'คัดลอกโค้ดทั้งหมด'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>ดาวน์โหลดไฟล์ .html</span>
            </button>

            <button
              type="button"
              onClick={handleOpenInNewTab}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>ทดลองเปิดดู</span>
            </button>
          </div>
        </div>

        {/* Feature checklist */}
        <div className="p-5 bg-indigo-50/70 rounded-2xl border border-indigo-100 mb-6 text-xs text-indigo-950 space-y-2">
          <div className="font-bold text-indigo-950 flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            คุณสมบัติและการจัดสรรฟังก์ชัน:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0"></span>
              <span><strong>แยกหน้ากันอย่างอิสระ:</strong> มีระบบแท็บ 4 หน้า พร้อมการสลับหน้าแบบไร้รอยต่อ</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0"></span>
              <span><strong>แบ่งเป็นฟังก์ชันชัดเจน:</strong> <code>fn_calculateSteelArea()</code>, <code>fn_calculatePaintVolume()</code>, <code>fn_recalcBOQRow()</code></span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0"></span>
              <span><strong>HTML/CSS/JS บริสุทธิ์:</strong> สไตล์ Professional Polish สะอาด ทันสมัย ใช้งานได้ทันที</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0"></span>
              <span><strong>ระบบส่งค่าข้ามหน้า:</strong> กดปุ่มส่งพื้นที่จากหน้า 1 และหน้า 3 ไปยังหน้า 2 ได้ทันที</span>
            </div>
          </div>
        </div>

        {/* Code viewer box */}
        <div className="relative">
          <div className="flex items-center justify-between px-5 py-3 bg-slate-900 text-slate-300 rounded-t-2xl text-xs font-mono border-b border-slate-800">
            <span className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-400" />
              steel_paint_calculator_modular.html ({htmlCode.split('\n').length} บรรทัด)
            </span>
            <button
              onClick={handleCopy}
              className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? 'คัดลอกแล้ว' : 'คลิกเพื่อคัดลอก'}
            </button>
          </div>
          <pre className="p-5 bg-slate-950 text-slate-200 text-xs font-mono rounded-b-2xl overflow-x-auto max-h-[500px] overflow-y-auto leading-relaxed">
            {htmlCode}
          </pre>
        </div>
      </div>
    </div>
  );
};
