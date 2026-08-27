/**
 * สร้างไฟล์ HTML สมบูรณ์แบบ (Pure Standalone HTML/CSS/JS)
 * พร้อมข้อมูลมาตรฐาน SG Paints / Rust Bullet และการคำนวณแยกขนาดบรรจุภัณฑ์
 */
export function generatePureModularHtml(): string {
  return `<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ระบบคำนวณงานเหล็ก สี SG Paints / Rust Bullet และ BOQ โครงสร้าง</title>
<style>
  :root {
    --primary: #4f46e5;
    --primary-hover: #4338ca;
    --primary-light: #eef2ff;
    --primary-border: #e0e7ff;
    --success: #16a34a;
    --success-hover: #15803d;
    --warning: #f59e0b;
    --danger: #ef4444;
    --dark: #0f172a;
    --gray-bg: #f8fafc;
    --card-bg: #ffffff;
    --border: #e2e8f0;
    --text-main: #1e293b;
    --text-muted: #64748b;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    background-color: #f1f5f9;
    color: var(--text-main);
    line-height: 1.5;
    padding: 24px 16px;
  }

  .app-container {
    max-width: 1240px;
    margin: 0 auto;
  }

  /* Header & Navigation Tabs */
  .main-header {
    background: #ffffff;
    border-radius: 16px;
    padding: 24px 28px;
    border: 1px solid var(--border);
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    margin-bottom: 24px;
    text-align: center;
  }
  .main-header h1 {
    font-size: 24px;
    font-weight: 800;
    color: var(--dark);
    letter-spacing: -0.025em;
    margin-bottom: 6px;
  }
  .main-header p {
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 20px;
  }

  .nav-tabs {
    display: flex;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
    border-bottom: 1px solid var(--border);
    padding-bottom: 16px;
  }
  .tab-btn {
    background: #ffffff;
    border: 1px solid var(--border);
    color: var(--text-muted);
    padding: 10px 18px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .tab-btn:hover {
    background: #f8fafc;
    color: var(--dark);
    border-color: #cbd5e1;
  }
  .tab-btn.active {
    background: var(--primary);
    border-color: var(--primary);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
  }

  /* Page Wrapper */
  .page-view {
    display: none;
    animation: fadeIn 0.2s ease-out;
  }
  .page-view.active {
    display: block;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Card Layouts */
  .card {
    background: var(--card-bg);
    border-radius: 16px;
    padding: 24px 28px;
    border: 1px solid var(--border);
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    margin-bottom: 20px;
  }
  .card-title {
    font-size: 17px;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-left: 4px solid var(--primary);
    padding-left: 12px;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 24px;
  }
  .grid-settings {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
  }
  .grid-3 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
  }

  /* Form Elements */
  .form-group {
    margin-bottom: 18px;
  }
  .form-group label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    color: var(--text-muted);
    margin-bottom: 6px;
  }
  input, select {
    width: 100%;
    padding: 11px 14px;
    border: 1px solid var(--border);
    border-radius: 8px;
    font-size: 14px;
    background: #ffffff;
    transition: all 0.15s ease;
  }
  input:focus, select:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
  }

  /* Buttons */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 20px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    border: none;
    transition: all 0.15s ease;
    text-decoration: none;
  }
  .btn-block { width: 100%; }
  .btn-primary { background: var(--primary); color: #fff; box-shadow: 0 2px 6px rgba(79, 70, 229, 0.2); }
  .btn-primary:hover { background: var(--primary-hover); }
  .btn-success { background: var(--success); color: #fff; }
  .btn-success:hover { background: var(--success-hover); }
  .btn-danger { background: var(--danger); color: #fff; padding: 6px 12px; font-size: 12px; border-radius: 6px; }
  .btn-outline {
    background: #ffffff;
    border: 1px solid var(--border);
    color: #475569;
  }
  .btn-outline:hover { background: #f8fafc; color: var(--dark); border-color: #cbd5e1; }

  .preset-btn {
    padding: 8px 4px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: #f8fafc;
    color: var(--text-main);
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;
    text-align: center;
  }
  .preset-btn:hover { background: #eef2ff; border-color: var(--primary-border); }
  .preset-btn.active { background: var(--primary); color: #fff; border-color: var(--primary); }

  /* Results Box */
  .result-box {
    background: #0f172a;
    color: #f8fafc;
    border-radius: 16px;
    padding: 24px;
    font-size: 14px;
    line-height: 1.7;
    margin-top: 16px;
    box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.2);
  }
  .spec-badge {
    background: rgba(255, 255, 255, 0.07);
    border-left: 3px solid var(--primary);
    padding: 10px 14px;
    border-radius: 6px;
    font-size: 13px;
    color: #cbd5e1;
    margin: 10px 0;
  }
  .val-blue { color: #818cf8; font-weight: 800; font-size: 20px; }
  .val-green { color: #4ade80; font-weight: 800; font-size: 22px; }
  .val-orange { color: #fbbf24; font-weight: 800; font-size: 24px; }

  /* Package Container Cards */
  .pack-card {
    background: #f8fafc;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 12px;
    text-align: center;
  }
  .pack-card .pack-name { font-size: 11px; font-weight: 700; color: var(--text-muted); }
  .pack-card .pack-cov { font-size: 16px; font-weight: 800; color: var(--dark); margin: 4px 0; }
  .pack-card .pack-buy { font-size: 12px; font-weight: 700; color: var(--success); }

  /* Shape sub-fields */
  .shape-section { display: none; }
  .shape-section.active { display: block; }

  /* BOQ Table */
  .table-responsive {
    overflow-x: auto;
    border: 1px solid var(--border);
    border-radius: 12px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }
  th, td {
    padding: 10px 12px;
    border: 1px solid #f1f5f9;
    text-align: center;
  }
  thead th {
    background: #f8fafc;
    color: #334155;
    font-weight: 700;
    border-bottom: 1px solid var(--border);
  }
  tbody tr:hover { background: #f8fafc; }
  .cell-calc { background: #eef2ff; font-weight: 700; color: #312e81; }
  .cell-cost { color: #475569; font-weight: 600; }
  .cell-total { color: #b45309; font-weight: 800; background: #fffbeb; }

  /* Dashboard Cards */
  .dash-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 14px;
  }
  .dash-card {
    background: #f8fafc;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px 12px;
    text-align: center;
  }
  .dash-title { font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px; }
  .dash-val { font-size: 18px; font-weight: 800; color: var(--dark); }

  /* Footer */
  .footer-note {
    text-align: center;
    font-size: 13px;
    color: var(--text-muted);
    margin-top: 24px;
  }
</style>
</head>
<body>

<div class="app-container">

  <!-- Header & Page Selector -->
  <header class="main-header">
    <h1>ระบบคำนวณงานทาสีโครงสร้างเหล็ก & BOQ</h1>
    <p>มาตรฐาน SG Paints / Rust Bullet ตามข้อมูลหน้างานจริงและการเทียบสัดส่วน</p>
    
    <nav class="nav-tabs">
      <button class="tab-btn active" onclick="switchPage('page-steel')">📐 1. คำนวณพื้นที่ผิวเหล็ก</button>
      <button class="tab-btn" onclick="switchPage('page-paint')">🎨 2. คำนวณปริมาณสี SG Paints</button>
      <button class="tab-btn" onclick="switchPage('page-boq')">📋 3. ถอดแบบ BOQ รายการเหล็ก</button>
      <button class="tab-btn" onclick="switchPage('page-master')">📚 4. ฐานข้อมูลมาตรฐาน</button>
    </nav>
  </header>

  <!-- ================= PAGE 1: คำนวณพื้นที่ผิวเหล็ก ================= -->
  <main id="page-steel" class="page-view active">
    <div class="grid-2">
      <div class="card">
        <h2 class="card-title">ระบุรูปทรงและมิติโครงสร้างเหล็ก</h2>

        <div class="form-group">
          <label for="steel_shape">เลือกรูปทรงเหล็ก</label>
          <select id="steel_shape" onchange="fn_handleShapeChange()">
            <option value="plate">แผ่นเหล็ก (Plate)</option>
            <option value="round_pipe">ท่อเหล็กกลม (Round Pipe)</option>
            <option value="square_tube">ท่อเหล็กเหลี่ยม / กล่อง (Hollow Box)</option>
            <option value="angle">เหล็กฉาก (L-Angle)</option>
            <option value="ibeam">เหล็ก I-Beam / H-Beam</option>
            <option value="channel">เหล็กรางน้ำ (C-Channel)</option>
          </select>
        </div>

        <!-- แผ่นเหล็ก -->
        <div id="shape_fields_plate" class="shape-section active">
          <div class="form-group">
            <label for="p_width">ความกว้าง (เมตร)</label>
            <input type="number" id="p_width" step="0.01" value="1.0" min="0">
          </div>
          <div class="form-group">
            <label for="p_length">ความยาว (เมตร)</label>
            <input type="number" id="p_length" step="0.01" value="2.0" min="0">
          </div>
          <div class="form-group">
            <label for="p_sides">จำนวนด้านที่ทาสี</label>
            <select id="p_sides">
              <option value="1">1 ด้าน</option>
              <option value="2" selected>2 ด้าน (หน้า-หลัง)</option>
            </select>
          </div>
        </div>

        <!-- ท่อกลม -->
        <div id="shape_fields_round_pipe" class="shape-section">
          <div class="form-group">
            <label for="pipe_d">เส้นผ่านศูนย์กลาง (เมตร)</label>
            <input type="number" id="pipe_d" step="0.001" value="0.114" min="0">
          </div>
          <div class="form-group">
            <label for="pipe_l">ความยาว (เมตร)</label>
            <input type="number" id="pipe_l" step="0.01" value="6.0" min="0">
          </div>
        </div>

        <!-- ท่อเหลี่ยม -->
        <div id="shape_fields_square_tube" class="shape-section">
          <div class="form-group">
            <label for="tube_w">ความกว้างหน้าตัด (เมตร)</label>
            <input type="number" id="tube_w" step="0.001" value="0.10" min="0">
          </div>
          <div class="form-group">
            <label for="tube_h">ความสูงหน้าตัด (เมตร)</label>
            <input type="number" id="tube_h" step="0.001" value="0.10" min="0">
          </div>
          <div class="form-group">
            <label for="tube_l">ความยาว (เมตร)</label>
            <input type="number" id="tube_l" step="0.01" value="6.0" min="0">
          </div>
        </div>

        <!-- เหล็กฉาก -->
        <div id="shape_fields_angle" class="shape-section">
          <div class="form-group">
            <label for="ang_leg1">ความกว้างขา 1 (เมตร)</label>
            <input type="number" id="ang_leg1" step="0.001" value="0.05" min="0">
          </div>
          <div class="form-group">
            <label for="ang_leg2">ความกว้างขา 2 (เมตร)</label>
            <input type="number" id="ang_leg2" step="0.001" value="0.05" min="0">
          </div>
          <div class="form-group">
            <label for="ang_l">ความยาว (เมตร)</label>
            <input type="number" id="ang_l" step="0.01" value="6.0" min="0">
          </div>
        </div>

        <!-- I-Beam / H-Beam -->
        <div id="shape_fields_ibeam" class="shape-section">
          <div class="form-group">
            <label for="beam_h">ความสูงหน้าตัด Web (เมตร)</label>
            <input type="number" id="beam_h" step="0.001" value="0.20" min="0">
          </div>
          <div class="form-group">
            <label for="beam_b">ความกว้างปีก Flange (เมตร)</label>
            <input type="number" id="beam_b" step="0.001" value="0.10" min="0">
          </div>
          <div class="form-group">
            <label for="beam_l">ความยาว (เมตร)</label>
            <input type="number" id="beam_l" step="0.01" value="6.0" min="0">
          </div>
        </div>

        <!-- C-Channel -->
        <div id="shape_fields_channel" class="shape-section">
          <div class="form-group">
            <label for="chan_h">ความสูง Web (เมตร)</label>
            <input type="number" id="chan_h" step="0.001" value="0.15" min="0">
          </div>
          <div class="form-group">
            <label for="chan_b">ความกว้างปีก Flange (เมตร)</label>
            <input type="number" id="chan_b" step="0.001" value="0.075" min="0">
          </div>
          <div class="form-group">
            <label for="chan_l">ความยาว (เมตร)</label>
            <input type="number" id="chan_l" step="0.01" value="6.0" min="0">
          </div>
        </div>

        <div class="form-group">
          <label for="steel_qty">จำนวน (ชิ้น)</label>
          <input type="number" id="steel_qty" value="1" min="1" step="1">
        </div>

        <button class="btn btn-primary btn-block" onclick="fn_calculateSteelArea()">⚡ คำนวณพื้นที่ผิว</button>
      </div>

      <!-- ผลลัพธ์หน้า 1 -->
      <div class="card">
        <h2 class="card-title">ผลการคำนวณพื้นที่ผิว</h2>
        <div id="steel_result_container" class="result-box">
          <p style="text-align:center; color: #94a3b8;">กรุณาระบุข้อมูลแล้วกดปุ่ม "คำนวณพื้นที่ผิว"</p>
        </div>
      </div>
    </div>
  </main>

  <!-- ================= PAGE 2: คำนวณปริมาณสี SG Paints ================= -->
  <main id="page-paint" class="page-view">
    <div class="grid-2">
      <div class="card">
        <h2 class="card-title">ข้อกำหนดการทาสี (SG Paints / Rust Bullet)</h2>

        <div class="form-group">
          <label for="paint_method">วิธีการทำงาน / อุปกรณ์</label>
          <select id="paint_method" onchange="fn_updatePaintMethodDefaults()">
            <option value="brush_roller">การทา (Brush / Roller) • 13 ตร.ม./แกลลอน (ที่ 150 µm) • 6.5 ตร.ม./แกลลอน (ที่ 300 µm)</option>
            <option value="airless_spray">การพ่น (Airless Spray) • 11 ตร.ม./แกลลอน (ที่ 150 µm) • 5.5 ตร.ม./แกลลอน (ที่ 300 µm)</option>
          </select>
        </div>

        <div class="form-group">
          <label>ความหนาฟิล์มสีแห้ง DFT (ไมครอน) — เลือกรวดเร็ว</label>
          <div style="display:grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-bottom: 8px;">
            <button class="preset-btn" onclick="fn_setDFT(50)">50</button>
            <button class="preset-btn" onclick="fn_setDFT(75)">75</button>
            <button class="preset-btn" onclick="fn_setDFT(100)">100</button>
            <button class="preset-btn" onclick="fn_setDFT(150)">150</button>
            <button class="preset-btn" onclick="fn_setDFT(200)">200</button>
            <button class="preset-btn" onclick="fn_setDFT(225)">225</button>
            <button class="preset-btn active" id="btn_dft_300" onclick="fn_setDFT(300)">300</button>
          </div>
          <input type="number" id="paint_thickness" value="300" min="10" step="5" oninput="fn_calculatePaintVolume()">
        </div>

        <div class="form-group">
          <label for="paint_area">พื้นที่ที่ต้องการทาสี (ตารางเมตร)</label>
          <input type="number" id="paint_area" value="50" min="0.1" step="0.1" oninput="fn_calculatePaintVolume()">
        </div>

        <div style="display:flex; gap:8px; margin-bottom:16px;">
          <button class="btn btn-outline" style="flex:1;" onclick="fn_pullAreaFromLastSteel()">📥 ดึงจากหน้า 1 (พื้นที่เหล็ก)</button>
          <button class="btn btn-outline" style="flex:1;" onclick="fn_pullAreaFromBOQ()">📥 ดึงจากหน้า 3 (BOQ)</button>
        </div>

        <div class="form-group">
          <label for="paint_loss">% เผื่อการสูญเสีย (% Loss)</label>
          <input type="number" id="paint_loss" value="25" min="0" max="100" oninput="fn_calculatePaintVolume()">
        </div>

        <div class="form-group">
          <label for="paint_price_gal">ราคาสีต่อ US Gallon (บาท/แกลลอน 3.785L)</label>
          <input type="number" id="paint_price_gal" value="6072" min="0" oninput="fn_calculatePaintVolume()">
        </div>

        <button class="btn btn-success btn-block" onclick="fn_calculatePaintVolume()">🎨 คำนวณปริมาณสีและงบประมาณ</button>

        <!-- Container Coverage Summary -->
        <div style="margin-top: 18px;">
          <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">อัตราครอบคลุมแต่ละขนาดบรรจุภัณฑ์:</label>
          <div class="grid-3" style="margin-top: 6px;">
            <div class="pack-card">
              <div class="pack-name">US Gallon (3.785 L)</div>
              <div class="pack-cov" id="cov_gal">6.50 ตร.ม.</div>
              <div class="pack-buy" id="buy_gal">ต้องซื้อ: 0 แกลลอน</div>
            </div>
            <div class="pack-card">
              <div class="pack-name">Quart (0.95 L)</div>
              <div class="pack-cov" id="cov_quart">1.63 ตร.ม.</div>
              <div class="pack-buy" id="buy_quart">ต้องซื้อ: 0 ควอร์ต</div>
            </div>
            <div class="pack-card">
              <div class="pack-name">Cup (0.23 L)</div>
              <div class="pack-cov" id="cov_cup">0.40 ตร.ม.</div>
              <div class="pack-buy" id="buy_cup">ต้องซื้อ: 0 คัพ</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ผลลัพธ์หน้า 2 -->
      <div class="card">
        <h2 class="card-title">สรุปปริมาณสีและงบประมาณ</h2>
        <div id="paint_result_container" class="result-box">
          <p style="text-align:center; color: #94a3b8;">กรอกข้อมูลพื้นที่แล้วกดคำนวณ</p>
        </div>
      </div>
    </div>
  </main>

  <!-- ================= PAGE 3: ระบบประเมิน BOQ ================= -->
  <main id="page-boq" class="page-view">
    <div class="card">
      <h2 class="card-title">ตั้งค่าราคาและสเปกทั่วไป (BOQ General Settings)</h2>
      <div class="grid-settings">
        <div class="form-group">
          <label for="boq_set_paintPrice">ราคาสี (บาท/ลิตร)</label>
          <input type="number" id="boq_set_paintPrice" value="350" oninput="fn_recalcAllBOQ()">
        </div>
        <div class="form-group">
          <label for="boq_set_laborRate">ค่าแรงทาสี (บาท/ตร.ม.)</label>
          <input type="number" id="boq_set_laborRate" value="95" oninput="fn_recalcAllBOQ()">
        </div>
        <div class="form-group">
          <label for="boq_set_prepDefault">ค่าเตรียมผิวเริ่มต้น (บาท/ตร.ม.)</label>
          <input type="number" id="boq_set_prepDefault" value="120" oninput="fn_recalcAllBOQ()">
        </div>
        <div class="form-group">
          <label for="boq_set_coverageDefault">อัตราทาเริ่มต้น (ตร.ม./ลิตร)</label>
          <input type="number" id="boq_set_coverageDefault" value="8" oninput="fn_recalcAllBOQ()">
        </div>
        <div class="form-group">
          <label for="boq_set_lossDefault">% สูญเสียสีเริ่มต้น</label>
          <input type="number" id="boq_set_lossDefault" value="10" oninput="fn_recalcAllBOQ()">
        </div>
      </div>
    </div>

    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
        <h2 class="card-title" style="margin-bottom:0;">รายการถอดแบบโครงสร้างเหล็ก (Take-off List)</h2>
        <button class="btn btn-primary" onclick="fn_addBOQRow()">+ เพิ่มแถวรายการ</button>
      </div>

      <div class="table-responsive">
        <table id="boq_table">
          <thead>
            <tr>
              <th>#</th>
              <th>รูปทรงเหล็ก (Section ID)</th>
              <th>ประเภท</th>
              <th>ยาว/ท่อน (ม.)</th>
              <th>จำนวน (ชิ้น)</th>
              <th>ระบบสี (Paint System)</th>
              <th>เตรียมผิว (Prep)</th>
              <th>ยาวรวม (ม.)</th>
              <th>นน. (kg)</th>
              <th>พื้นที่ผิว (ตร.ม.)</th>
              <th>สีที่ใช้ (ลิตร)</th>
              <th>ค่าสี (บาท)</th>
              <th>ค่าเตรียมผิว (บาท)</th>
              <th>ค่าแรง (บาท)</th>
              <th>รวมทั้งสิ้น (บาท)</th>
              <th>การจัดการ</th>
            </tr>
          </thead>
          <tbody id="boq_tbody"></tbody>
        </table>
      </div>
    </div>

    <!-- แดชบอร์ดสรุปผลรวม -->
    <div class="card">
      <h2 class="card-title">สรุปภาพรวมงบประมาณ BOQ (Project Summary Dashboard)</h2>
      <div class="dash-grid">
        <div class="dash-card">
          <div class="dash-title">น้ำหนักเหล็กรวม</div>
          <div class="dash-val" id="sum_weight">0 kg</div>
        </div>
        <div class="dash-card">
          <div class="dash-title">พื้นที่ผิวรวม</div>
          <div class="dash-val val-blue" id="sum_surface">0 ตร.ม.</div>
        </div>
        <div class="dash-card">
          <div class="dash-title">ปริมาณสีรวม</div>
          <div class="dash-val val-blue" id="sum_paint_qty">0 ลิตร</div>
        </div>
        <div class="dash-card">
          <div class="dash-title">ค่าสีรวม</div>
          <div class="dash-val val-green" id="sum_paint_cost">0 ฿</div>
        </div>
        <div class="dash-card">
          <div class="dash-title">ค่าเตรียมผิวรวม</div>
          <div class="dash-val val-green" id="sum_prep_cost">0 ฿</div>
        </div>
        <div class="dash-card">
          <div class="dash-title">ค่าแรงรวม</div>
          <div class="dash-val val-green" id="sum_labor_cost">0 ฿</div>
        </div>
        <div class="dash-card">
          <div class="dash-title">ต้นทุนรวมทั้งโครงการ</div>
          <div class="dash-val val-orange" id="sum_total_cost">0 ฿</div>
        </div>
      </div>
    </div>
  </main>

  <!-- ================= PAGE 4: ฐานข้อมูลและมาตรฐาน ================= -->
  <main id="page-master" class="page-view">
    <!-- SG Paints Official Tables -->
    <div class="card">
      <h2 class="card-title">ตารางอัตราการครอบคลุมพื้นที่ SG Paints / Rust bullet</h2>
      
      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 13px; font-weight: 700; color: var(--dark); margin-bottom: 8px;">
          ตารางที่ 1: SG Paints / Rust bullet — ข้อมูลจากหน้างานจริง (Actual on-site data)
        </h4>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Size (ขนาดบรรจุ)</th>
                <th>ปริมาณ (ลิตร)</th>
                <th>พื้นที่การทาสีที่ความหนา 150 ไมครอน (ตร.ม.)</th>
                <th>พื้นที่การทาสีที่ความหนา 300 ไมครอน (ตร.ม.)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>Cup</td><td>0.23</td><td>0.79</td><td>0.40</td></tr>
              <tr><td>2</td><td>Quart</td><td>0.95</td><td>3.26</td><td>1.63</td></tr>
              <tr><td>3</td><td>US gallons</td><td>3.785</td><td>13.00</td><td>6.50</td></tr>
            </tbody>
          </table>
        </div>
        <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">* เก็บข้อมูลจากหน้างานจริง</p>
      </div>

      <div class="grid-2">
        <div>
          <h4 style="font-size: 13px; font-weight: 700; color: var(--dark); margin-bottom: 8px;">
            ตารางที่ 2: การทา (Brush / Roller) — คำนวณเทียบสัดส่วน
          </h4>
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>ความหนาสี (ไมครอน)</th>
                  <th>Quart (ตร.ม.)</th>
                  <th>US Gallon (ตร.ม.)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>50</td><td>9.78</td><td>39.00</td></tr>
                <tr><td>2</td><td>75</td><td>6.52</td><td>26.00</td></tr>
                <tr><td>3</td><td>100</td><td>4.89</td><td>19.50</td></tr>
                <tr><td>4</td><td>150</td><td>3.26</td><td>13.00</td></tr>
                <tr><td>5</td><td>200</td><td>2.445</td><td>9.75</td></tr>
                <tr><td>6</td><td>225</td><td>2.173333333</td><td>8.666666667</td></tr>
                <tr><td>7</td><td>300</td><td>1.63</td><td>6.50</td></tr>
              </tbody>
            </table>
          </div>
          <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">* ค่าได้จากการคำนวณเทียบสัดส่วน</p>
        </div>

        <div>
          <h4 style="font-size: 13px; font-weight: 700; color: var(--dark); margin-bottom: 8px;">
            ตารางที่ 3: 1.2 พ่นด้วย Airless spray — ขนาด US Gallon
          </h4>
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>ความหนา (ไมครอน)</th>
                  <th>พื้นที่ทาสี (ตร.ม.)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>50</td><td>33.00</td></tr>
                <tr><td>2</td><td>75</td><td>22.00</td></tr>
                <tr><td>3</td><td>100</td><td>16.50</td></tr>
                <tr><td>4</td><td>150</td><td>11.00</td></tr>
                <tr><td>5</td><td>200</td><td>8.25</td></tr>
                <tr><td>6</td><td>225</td><td>7.33333</td></tr>
                <tr><td>7</td><td>300</td><td>5.50</td></tr>
              </tbody>
            </table>
          </div>
          <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">* คำนวณตามอัตราการพ่นจริง (5.5 ตร.ม./แกลลอน ที่ 300 µm)</p>
        </div>
      </div>
    </div>

    <!-- Paint Systems & Prep -->
    <div class="card">
      <h2 class="card-title">ระบบสีและระดับการเตรียมผิวทั่วไป</h2>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>รหัส</th>
              <th>คำอธิบายระบบสี</th>
              <th>อัตราการใช้สีทฤษฎี (ตร.ม./ลิตร)</th>
              <th>% สูญเสียแนะนำ</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>PS-01</td><td>Shop Primer / Zinc Phosphate (รองพื้นกันสนิมซิงค์ฟอสเฟต)</td><td>8.0</td><td>10%</td></tr>
            <tr><td>PS-02</td><td>Epoxy Primer + Epoxy Topcoat (รองพื้นและทับหน้าอีพ็อกซี่)</td><td>7.0</td><td>12%</td></tr>
            <tr><td>PS-03</td><td>Zinc-Rich Primer + Epoxy Intermediate + PU Topcoat (3 ชั้น)</td><td>6.0</td><td>15%</td></tr>
            <tr><td>PS-04</td><td>High-Build Epoxy (อีพ็อกซี่ฟิล์มหนาพิเศษ)</td><td>5.0</td><td>15%</td></tr>
            <tr><td>PS-05</td><td>Custom / Project Specification (ตามสเปกโครงการ)</td><td>7.0</td><td>10%</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>

  <footer class="footer-note">
    โปรแกรมคำนวณงานทาสีโครงสร้างเหล็ก — SG Paints / Rust Bullet Engineering Suite
  </footer>

</div>

<!-- ================= JAVASCRIPT LOGIC (MODULAR FUNCTIONS) ================= -->
<script>
const DB_SECTIONS = [
  {id:'H100x50x5x7', type:'H-BEAM', size:'100x50x5x7', kgm:9.3, m2m:0.39},
  {id:'H100x100x6x8', type:'H-BEAM', size:'100x100x6x8', kgm:17.2, m2m:0.588},
  {id:'H125x125x6.5x9', type:'H-BEAM', size:'125x125x6.5x9', kgm:23.8, m2m:0.737},
  {id:'H150x75x5x7', type:'H-BEAM', size:'150x75x5x7', kgm:14.0, m2m:0.59},
  {id:'H150x150x7x10', type:'H-BEAM', size:'150x150x7x10', kgm:31.5, m2m:0.886},
  {id:'H200x100x5.5x8', type:'H-BEAM', size:'200x100x5.5x8', kgm:21.3, m2m:0.789},
  {id:'H200x200x8x12', type:'H-BEAM', size:'200x200x8x12', kgm:49.9, m2m:1.184},
  {id:'H250x125x6x9', type:'H-BEAM', size:'250x125x6x9', kgm:29.6, m2m:0.988},
  {id:'H250x250x9x14', type:'H-BEAM', size:'250x250x9x14', kgm:72.4, m2m:1.482},
  {id:'H300x150x6.5x9', type:'H-BEAM', size:'300x150x6.5x9', kgm:36.7, m2m:1.187},
  {id:'H300x300x10x15', type:'H-BEAM', size:'300x300x10x15', kgm:94.0, m2m:1.78},
  {id:'H400x200x8x13', type:'H-BEAM', size:'400x200x8x13', kgm:66.0, m2m:1.584},
  {id:'H400x400x13x21', type:'H-BEAM', size:'400x400x13x21', kgm:172.0, m2m:2.374},
  {id:'I100x75x5x8', type:'I-BEAM', size:'100x75x5x8', kgm:12.9, m2m:0.49},
  {id:'I150x75x5.5x9.5', type:'I-BEAM', size:'150x75x5.5x9.5', kgm:17.1, m2m:0.589},
  {id:'I200x100x7x10', type:'I-BEAM', size:'200x100x7x10', kgm:26.0, m2m:0.786},
  {id:'I250x125x7.5x12.5', type:'I-BEAM', size:'250x125x7.5x12.5', kgm:38.3, m2m:0.985},
  {id:'I300x150x10x19', type:'I-BEAM', size:'300x150x10x19', kgm:55.5, m2m:1.18},
  {id:'C75x40x5x7', type:'CHANNEL', size:'75x40x5x7', kgm:6.92, m2m:0.3},
  {id:'C100x50x5x7.5', type:'CHANNEL', size:'100x50x5x7.5', kgm:9.36, m2m:0.39},
  {id:'C150x75x6.5x10', type:'CHANNEL', size:'150x75x6.5x10', kgm:18.6, m2m:0.587},
  {id:'C200x80x7.5x11', type:'CHANNEL', size:'200x80x7.5x11', kgm:24.6, m2m:0.705},
  {id:'L50x50x5', type:'ANGLE', size:'50x50x5', kgm:3.77, m2m:0.19},
  {id:'L65x65x6', type:'ANGLE', size:'65x65x6', kgm:6.38, m2m:0.248},
  {id:'L75x75x6', type:'ANGLE', size:'75x75x6', kgm:6.85, m2m:0.288},
  {id:'L100x100x10', type:'ANGLE', size:'100x100x10', kgm:14.9, m2m:0.38}
];

const DB_PAINT_SYSTEMS = [
  {id:'PS-01', desc:'Shop Primer / Zinc Phosphate', coverage:8.0, loss:10.0},
  {id:'PS-02', desc:'Epoxy Primer + Epoxy Topcoat', coverage:7.0, loss:12.0},
  {id:'PS-03', desc:'Zinc-Rich Primer + Epoxy + PU Topcoat', coverage:6.0, loss:15.0},
  {id:'PS-04', desc:'High-Build Epoxy', coverage:5.0, loss:15.0},
  {id:'PS-05', desc:'Custom / Project Specification', coverage:7.0, loss:10.0}
];

const DB_SURFACE_PREPS = [
  {id:'SP-01', desc:'Solvent Cleaning', price:35},
  {id:'SP-02', desc:'Power Tool Cleaning (St 2 / St 3)', price:75},
  {id:'SP-03', desc:'Abrasive Blast Cleaning Sa 2', price:110},
  {id:'SP-04', desc:'Abrasive Blast Cleaning Sa 2.5', price:140},
  {id:'SP-05', desc:'Abrasive Blast Cleaning Sa 3', price:170},
  {id:'SP-06', desc:'Project Specification', price:120}
];

let g_lastCalculatedSteelArea = 0;
let g_boqRowCounter = 0;

function switchPage(pageId) {
  document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  const targetPage = document.getElementById(pageId);
  if (targetPage) targetPage.classList.add('active');

  const btnIndex = ['page-steel', 'page-paint', 'page-boq', 'page-master'].indexOf(pageId);
  if (btnIndex >= 0) {
    document.querySelectorAll('.tab-btn')[btnIndex].classList.add('active');
  }
}

function fn_handleShapeChange() {
  const shape = document.getElementById('steel_shape').value;
  document.querySelectorAll('.shape-section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('shape_fields_' + shape);
  if (target) target.classList.add('active');
}

function fn_calculateSteelArea() {
  const shape = document.getElementById('steel_shape').value;
  const qty = parseFloat(document.getElementById('steel_qty').value) || 0;
  const resBox = document.getElementById('steel_result_container');

  if (qty <= 0) {
    resBox.innerHTML = '<span style="color:red;">กรุณาระบุจำนวนชิ้นมากกว่า 0</span>';
    return;
  }

  let areaPerPiece = 0;
  let formulaText = '';
  let shapeName = '';

  try {
    if (shape === 'plate') {
      const w = parseFloat(document.getElementById('p_width').value) || 0;
      const l = parseFloat(document.getElementById('p_length').value) || 0;
      const sides = parseFloat(document.getElementById('p_sides').value) || 1;
      if (w <= 0 || l <= 0) throw new Error('กรุณากรอกความกว้างและความยาวให้ถูกต้อง');
      areaPerPiece = w * l * sides;
      shapeName = 'แผ่นเหล็ก (Plate)';
      formulaText = 'กว้าง ' + w + ' ม. × ยาว ' + l + ' ม. × ' + sides + ' ด้าน';
    } else if (shape === 'round_pipe') {
      const d = parseFloat(document.getElementById('pipe_d').value) || 0;
      const l = parseFloat(document.getElementById('pipe_l').value) || 0;
      if (d <= 0 || l <= 0) throw new Error('กรุณากรอกเส้นผ่านศูนย์กลางและความยาวให้ถูกต้อง');
      areaPerPiece = Math.PI * d * l;
      shapeName = 'ท่อเหล็กกลม (Round Pipe)';
      formulaText = 'เส้นรอบวง (π × ' + d + ' ม.) × ยาว ' + l + ' ม.';
    } else if (shape === 'square_tube') {
      const w = parseFloat(document.getElementById('tube_w').value) || 0;
      const h = parseFloat(document.getElementById('tube_h').value) || 0;
      const l = parseFloat(document.getElementById('tube_l').value) || 0;
      if (w <= 0 || h <= 0 || l <= 0) throw new Error('กรุณากรอกขนาดหน้าตัดและความยาวให้ถูกต้อง');
      areaPerPiece = 2 * (w + h) * l;
      shapeName = 'ท่อเหล็กเหลี่ยม / กล่อง (Hollow Box)';
      formulaText = 'เส้นรอบรูป 2×(' + w + ' + ' + h + ') ม. × ยาว ' + l + ' ม.';
    } else if (shape === 'angle') {
      const leg1 = parseFloat(document.getElementById('ang_leg1').value) || 0;
      const leg2 = parseFloat(document.getElementById('ang_leg2').value) || 0;
      const l = parseFloat(document.getElementById('ang_l').value) || 0;
      if (leg1 <= 0 || leg2 <= 0 || l <= 0) throw new Error('กรุณากรอกขนาดขาฉากและความยาว');
      areaPerPiece = (leg1 + leg2) * 2 * l;
      shapeName = 'เหล็กฉาก (L-Angle)';
      formulaText = '(ขา ' + leg1 + ' + ขา ' + leg2 + ') × 2 ด้าน × ยาว ' + l + ' ม.';
    } else if (shape === 'ibeam') {
      const h = parseFloat(document.getElementById('beam_h').value) || 0;
      const b = parseFloat(document.getElementById('beam_b').value) || 0;
      const l = parseFloat(document.getElementById('beam_l').value) || 0;
      if (h <= 0 || b <= 0 || l <= 0) throw new Error('กรุณากรอกขนาดหน้าตัด I-Beam');
      areaPerPiece = (4 * b + 2 * h) * l;
      shapeName = 'เหล็ก I-Beam / H-Beam';
      formulaText = 'เส้นรอบรูปโดยประมาณ (4×' + b + ' + 2×' + h + ') ม. × ยาว ' + l + ' ม.';
    } else if (shape === 'channel') {
      const h = parseFloat(document.getElementById('chan_h').value) || 0;
      const b = parseFloat(document.getElementById('chan_b').value) || 0;
      const l = parseFloat(document.getElementById('chan_l').value) || 0;
      if (h <= 0 || b <= 0 || l <= 0) throw new Error('กรุณากรอกขนาดหน้าตัด C-Channel');
      areaPerPiece = (2 * b + h) * 2 * l;
      shapeName = 'เหล็กรางน้ำ (C-Channel)';
      formulaText = '(2×' + b + ' + ' + h + ') × 2 ด้าน × ยาว ' + l + ' ม.';
    }
  } catch (err) {
    resBox.innerHTML = '<span style="color:red;">' + err.message + '</span>';
    return;
  }

  const totalArea = areaPerPiece * qty;
  g_lastCalculatedSteelArea = totalArea;

  resBox.innerHTML =
    '<strong>รูปทรงที่เลือก:</strong> ' + shapeName + '<br>' +
    '<strong>สูตรคำนวณ:</strong> <div class="spec-badge">' + formulaText + '</div>' +
    '<strong>พื้นที่ผิวต่อชิ้น:</strong> ' + areaPerPiece.toFixed(3) + ' ตร.ม.<br>' +
    '<strong>จำนวนทั้งหมด:</strong> ' + qty + ' ชิ้น<br><hr style="margin:10px 0; border:0; border-top:1px dashed #cbd5e1;">' +
    '<strong>พื้นที่ผิวรวมทั้งสิ้น:</strong> <span class="val-green">' + totalArea.toFixed(3) + '</span> ตารางเมตร' +
    '<div style="margin-top:14px;">' +
    '<button class="btn btn-primary" onclick="fn_forwardAreaToPaint(' + totalArea.toFixed(3) + ')">🚀 ส่งค่านี้ไปคำนวณปริมาณสี (หน้า 2)</button>' +
    '</div>';
}

function fn_forwardAreaToPaint(areaValue) {
  document.getElementById('paint_area').value = areaValue;
  switchPage('page-paint');
  fn_calculatePaintVolume();
}

function fn_setDFT(dftVal) {
  document.getElementById('paint_thickness').value = dftVal;
  document.querySelectorAll('.preset-btn').forEach(btn => btn.classList.remove('active'));
  fn_calculatePaintVolume();
}

function fn_updatePaintMethodDefaults() {
  const method = document.getElementById('paint_method').value;
  const lossInput = document.getElementById('paint_loss');
  if (method === 'brush_roller') {
    lossInput.value = 25;
  } else {
    lossInput.value = 40;
  }
  fn_calculatePaintVolume();
}

function fn_pullAreaFromLastSteel() {
  if (g_lastCalculatedSteelArea > 0) {
    document.getElementById('paint_area').value = g_lastCalculatedSteelArea.toFixed(3);
    fn_calculatePaintVolume();
  } else {
    alert('กรุณาคำนวณพื้นที่ผิวในหน้า 1 ก่อน');
  }
}

function fn_pullAreaFromBOQ() {
  const boqSurfaceText = document.getElementById('sum_surface').textContent;
  const boqSurface = parseFloat(boqSurfaceText.replace(/,/g, '')) || 0;
  if (boqSurface > 0) {
    document.getElementById('paint_area').value = boqSurface.toFixed(3);
    fn_calculatePaintVolume();
  } else {
    alert('กรุณาเพิ่มรายการในตาราง BOQ (หน้า 3) ก่อน');
  }
}

function fn_calculatePaintVolume() {
  const area = parseFloat(document.getElementById('paint_area').value) || 0;
  const thickness = parseFloat(document.getElementById('paint_thickness').value) || 0;
  const method = document.getElementById('paint_method').value;
  const lossPct = parseFloat(document.getElementById('paint_loss').value) || 0;
  const pricePerGal = parseFloat(document.getElementById('paint_price_gal').value) || 6072;
  const resBox = document.getElementById('paint_result_container');

  if (area <= 0 || thickness <= 0) {
    resBox.innerHTML = '<p style="text-align:center; color: #94a3b8;">กรอกข้อมูลพื้นที่และ DFT แล้วกดคำนวณ</p>';
    return;
  }

  const isBrush = method === 'brush_roller';
  const methodText = isBrush ? 'การทา (Brush / Roller)' : 'การพ่น (Airless Spray)';

  const minCoats = isBrush ? Math.ceil(thickness / 75) : Math.ceil(thickness / 50);
  const maxCoats = isBrush ? Math.ceil(thickness / 50) : Math.ceil(thickness / 30);

  const lostArea = area * (lossPct / 100);
  const totalAreaWithLoss = area + lostArea;

  const baseCoverage = isBrush ? 6.5 : 5.5; // at 300 microns
  const adjustedCoverageGal = (baseCoverage * 300) / thickness;
  const adjustedCoverageQuart = adjustedCoverageGal * (0.95 / 3.785);
  const adjustedCoverageCup = adjustedCoverageGal * (0.23 / 3.785);

  const netGallons = area / adjustedCoverageGal;
  const totalGallonsWithLoss = netGallons * (1 + lossPct / 100);
  const totalLitresWithLoss = totalGallonsWithLoss * 3.785;

  const exactGallonsToBuy = Math.ceil(totalGallonsWithLoss);
  const exactQuartsToBuy = Math.ceil(totalAreaWithLoss / adjustedCoverageQuart);
  const exactCupsToBuy = Math.ceil(totalAreaWithLoss / adjustedCoverageCup);
  const exactLitresToBuy = exactGallonsToBuy * 3.785;

  // Update Packaging Cards
  document.getElementById('cov_gal').textContent = adjustedCoverageGal.toFixed(3) + ' ตร.ม.';
  document.getElementById('buy_gal').textContent = 'ต้องซื้อ: ' + exactGallonsToBuy + ' แกลลอน';

  document.getElementById('cov_quart').textContent = adjustedCoverageQuart.toFixed(3) + ' ตร.ม.';
  document.getElementById('buy_quart').textContent = 'ต้องซื้อ: ' + exactQuartsToBuy + ' ควอร์ต';

  document.getElementById('cov_cup').textContent = adjustedCoverageCup.toFixed(3) + ' ตร.ม.';
  document.getElementById('buy_cup').textContent = 'ต้องซื้อ: ' + exactCupsToBuy + ' คัพ';

  // Optimal mix calculation
  let remLitres = totalLitresWithLoss;
  const mixGal = Math.floor(remLitres / 3.785);
  remLitres -= mixGal * 3.785;
  let mixQuart = Math.floor(remLitres / 0.95);
  remLitres -= mixQuart * 0.95;
  let mixCup = Math.ceil(remLitres / 0.23);
  if (mixCup * 0.23 >= 0.95) { mixQuart++; mixCup = 0; }
  if (mixQuart * 0.95 >= 3.785) { mixGal++; mixQuart = 0; }

  let mixTextArr = [];
  if (mixGal > 0) mixTextArr.push(mixGal + ' แกลลอน');
  if (mixQuart > 0) mixTextArr.push(mixQuart + ' ควอร์ต');
  if (mixCup > 0) mixTextArr.push(mixCup + ' คัพ');
  const mixStr = mixTextArr.length > 0 ? mixTextArr.join(' + ') : '1 คัพ';

  const totalBeforeVat = exactGallonsToBuy * pricePerGal;
  const vatAmount = totalBeforeVat * 0.07;
  const totalWithVat = totalBeforeVat + vatAmount;

  const fmt = (n, dec=3) => n.toLocaleString('th-TH', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  resBox.innerHTML =
    '<strong>มาตรฐาน:</strong> SG Paints / Rust Bullet (' + methodText + ')<br>' +
    '<strong>ความหนาฟิล์มสี DFT:</strong> ' + thickness + ' ไมครอน<br>' +
    '<strong>อัตราทาต่อแกลลอน:</strong> ' + adjustedCoverageGal.toFixed(3) + ' ตร.ม./แกลลอน<br>' +
    '<strong>รอบการทาแนะนำ:</strong> <span class="val-blue">' + minCoats + ' - ' + maxCoats + ' รอบ</span><br>' +
    '<div class="spec-badge">' +
    '• พื้นที่สุทธิ: ' + area.toFixed(3) + ' ตร.ม.<br>' +
    '• เผื่อสูญเสีย (' + lossPct + '%): +' + lostArea.toFixed(3) + ' ตร.ม.<br>' +
    '• พื้นที่รวมเผื่อสูญเสีย: ' + totalAreaWithLoss.toFixed(3) + ' ตร.ม.<br>' +
    '• แนะนำผสมขนาด: <strong>' + mixStr + '</strong>' +
    '</div>' +
    '<strong>จำนวนที่ต้องจัดซื้อจริง (แกลลอน):</strong> <span class="val-green">' + exactGallonsToBuy + ' แกลลอน</span> (' + exactLitresToBuy.toFixed(3) + ' ลิตร)<br>' +
    '<hr style="margin:10px 0; border:0; border-top:1px dashed #cbd5e1;">' +
    '<strong>ราคาสีรวม (ก่อน VAT):</strong> ' + fmt(totalBeforeVat, 3) + ' บาท<br>' +
    '<strong>ภาษีมูลค่าเพิ่ม (VAT 7%):</strong> ' + fmt(vatAmount, 3) + ' บาท<br>' +
    '<strong>งบประมาณรวมสุทธิ (Net Total):</strong> <span class="val-orange">' + fmt(totalWithVat, 3) + ' บาท</span>';
}

function fn_getBOQSettings() {
  return {
    paintPrice: parseFloat(document.getElementById('boq_set_paintPrice').value) || 0,
    laborRate: parseFloat(document.getElementById('boq_set_laborRate').value) || 0,
    prepDefault: parseFloat(document.getElementById('boq_set_prepDefault').value) || 0,
    coverageDefault: parseFloat(document.getElementById('boq_set_coverageDefault').value) || 8,
    lossDefault: parseFloat(document.getElementById('boq_set_lossDefault').value) || 0
  };
}

function fn_buildSectionSelectHTML() {
  const groups = {};
  DB_SECTIONS.forEach(s => {
    if (!groups[s.type]) groups[s.type] = [];
    groups[s.type].push(s);
  });
  let html = '';
  Object.keys(groups).forEach(type => {
    html += '<optgroup label="' + type + '">';
    groups[type].forEach(s => {
      html += '<option value="' + s.id + '">' + s.id + ' (' + s.size + ')</option>';
    });
    html += '</optgroup>';
  });
  return html;
}

function fn_buildPaintSystemSelectHTML() {
  let html = '<option value="__default">ค่าเริ่มต้น (Default)</option>';
  DB_PAINT_SYSTEMS.forEach(p => {
    html += '<option value="' + p.id + '">' + p.id + ' — ' + p.desc + '</option>';
  });
  return html;
}

function fn_buildPrepSelectHTML() {
  let html = '<option value="__default">ค่าเริ่มต้น (Default)</option>';
  DB_SURFACE_PREPS.forEach(p => {
    html += '<option value="' + p.id + '">' + p.id + ' — ' + p.desc + '</option>';
  });
  return html;
}

function fn_addBOQRow() {
  g_boqRowCounter++;
  const tbody = document.getElementById('boq_tbody');
  const tr = document.createElement('tr');
  tr.id = 'boq_row_' + g_boqRowCounter;
  tr.innerHTML =
    '<td>' + g_boqRowCounter + '</td>' +
    '<td><select class="f-section" onchange="fn_recalcBOQRow(this)">' + fn_buildSectionSelectHTML() + '</select></td>' +
    '<td class="f-type">-</td>' +
    '<td><input type="number" class="f-len" style="width:75px;" value="6" step="0.1" oninput="fn_recalcBOQRow(this)"></td>' +
    '<td><input type="number" class="f-qty" style="width:65px;" value="10" step="1" min="1" oninput="fn_recalcBOQRow(this)"></td>' +
    '<td><select class="f-ps" onchange="fn_recalcBOQRow(this)">' + fn_buildPaintSystemSelectHTML() + '</select></td>' +
    '<td><select class="f-prep" onchange="fn_recalcBOQRow(this)">' + fn_buildPrepSelectHTML() + '</select></td>' +
    '<td class="cell-calc f-totallen">0</td>' +
    '<td class="cell-calc f-weight">0</td>' +
    '<td class="cell-calc f-surface">0</td>' +
    '<td class="cell-calc f-paintqty">0</td>' +
    '<td class="cell-cost f-paintcost">0</td>' +
    '<td class="cell-cost f-prepcost">0</td>' +
    '<td class="cell-cost f-laborcost">0</td>' +
    '<td class="cell-total f-totalcost">0</td>' +
    '<td><button class="btn btn-danger" onclick="fn_removeBOQRow(' + g_boqRowCounter + ')">ลบ</button></td>';
  tbody.appendChild(tr);

  const sel = tr.querySelector('.f-section');
  fn_recalcBOQRow(sel);
}

function fn_removeBOQRow(rowId) {
  const row = document.getElementById('boq_row_' + rowId);
  if (row) row.remove();
  fn_recalcAllBOQ();
}

function fn_recalcBOQRow(elementInRow) {
  const tr = elementInRow.closest('tr');
  if (!tr) return;

  const sectionId = tr.querySelector('.f-section').value;
  const length = parseFloat(tr.querySelector('.f-len').value) || 0;
  const qty = parseFloat(tr.querySelector('.f-qty').value) || 0;
  const psId = tr.querySelector('.f-ps').value;
  const prepId = tr.querySelector('.f-prep').value;

  const section = DB_SECTIONS.find(s => s.id === sectionId) || DB_SECTIONS[0];
  const ps = DB_PAINT_SYSTEMS.find(p => p.id === psId);
  const prep = DB_SURFACE_PREPS.find(p => p.id === prepId);
  const settings = fn_getBOQSettings();

  tr.querySelector('.f-type').textContent = section.type;

  const totalLength = length * qty;
  const weight = section.kgm * totalLength;
  const surface = section.m2m * totalLength;

  const coverage = ps ? ps.coverage : settings.coverageDefault;
  const lossPct = ps ? ps.loss : settings.lossDefault;
  const prepPrice = prep ? prep.price : settings.prepDefault;

  const paintQty = coverage > 0 ? (surface * (1 + lossPct / 100)) / coverage : 0;
  const paintCost = paintQty * settings.paintPrice;
  const prepCost = surface * prepPrice;
  const laborCost = surface * settings.laborRate;
  const totalCost = paintCost + prepCost + laborCost;

  const fmt = (n, dec=3) => n.toLocaleString('th-TH', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  tr.querySelector('.f-totallen').textContent = fmt(totalLength, 3);
  tr.querySelector('.f-weight').textContent = fmt(weight, 3);
  tr.querySelector('.f-surface').textContent = fmt(surface, 3);
  tr.querySelector('.f-paintqty').textContent = fmt(paintQty, 3);
  tr.querySelector('.f-paintcost').textContent = fmt(paintCost, 3);
  tr.querySelector('.f-prepcost').textContent = fmt(prepCost, 3);
  tr.querySelector('.f-laborcost').textContent = fmt(laborCost, 3);
  tr.querySelector('.f-totalcost').textContent = fmt(totalCost, 3);

  tr.dataset.weight = weight;
  tr.dataset.surface = surface;
  tr.dataset.paintqty = paintQty;
  tr.dataset.paintcost = paintCost;
  tr.dataset.prepcost = prepCost;
  tr.dataset.laborcost = laborCost;
  tr.dataset.totalcost = totalCost;

  fn_updateBOQDashboard();
}

function fn_recalcAllBOQ() {
  document.querySelectorAll('#boq_tbody tr').forEach(tr => {
    const sel = tr.querySelector('.f-section');
    if (sel) fn_recalcBOQRow(sel);
  });
}

function fn_updateBOQDashboard() {
  let sWeight = 0, sSurface = 0, sPaintQty = 0, sPaintCost = 0, sPrepCost = 0, sLaborCost = 0, sTotalCost = 0;

  document.querySelectorAll('#boq_tbody tr').forEach(tr => {
    sWeight += parseFloat(tr.dataset.weight || 0);
    sSurface += parseFloat(tr.dataset.surface || 0);
    sPaintQty += parseFloat(tr.dataset.paintqty || 0);
    sPaintCost += parseFloat(tr.dataset.paintcost || 0);
    sPrepCost += parseFloat(tr.dataset.prepcost || 0);
    sLaborCost += parseFloat(tr.dataset.laborcost || 0);
    sTotalCost += parseFloat(tr.dataset.totalcost || 0);
  });

  const fmt = (n, dec=3) => n.toLocaleString('th-TH', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  document.getElementById('sum_weight').textContent = fmt(sWeight, 3) + ' kg';
  document.getElementById('sum_surface').textContent = fmt(sSurface, 3) + ' ตร.ม.';
  document.getElementById('sum_paint_qty').textContent = fmt(sPaintQty, 3) + ' ลิตร';
  document.getElementById('sum_paint_cost').textContent = fmt(sPaintCost, 3) + ' ฿';
  document.getElementById('sum_prep_cost').textContent = fmt(sPrepCost, 3) + ' ฿';
  document.getElementById('sum_labor_cost').textContent = fmt(sLaborCost, 3) + ' ฿';
  document.getElementById('sum_total_cost').textContent = fmt(sTotalCost, 3) + ' ฿';
}

window.addEventListener('DOMContentLoaded', () => {
  fn_addBOQRow();
  fn_calculatePaintVolume();
});
</script>

</body>
</html>`;
}
