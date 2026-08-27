import {
  PaintApplicationMethod,
  PaintCalculationResult,
  TakeoffRow,
  BOQSettings,
  BOQTotals,
  SteelSection,
  PaintSystem,
  SurfacePrep
} from '../types';
import { SECTION_MASTER, PAINT_SYSTEM_MASTER, SURFACE_PREP_MASTER } from '../data/steelMasterData';

/**
 * ฟังก์ชันคำนวณพื้นที่ผิวแผ่นเหล็ก (Plate)
 * สูตร: กว้าง × ยาว × จำนวนด้าน × จำนวนชิ้น
 */
export function calculatePlateArea(width: number, length: number, sides: number, qty: number) {
  if (width <= 0 || length <= 0 || sides <= 0 || qty <= 0) {
    throw new Error('กรุณากรอกขนาดแผ่นเหล็กและจำนวนให้ถูกต้อง (ค่าต้องมากกว่า 0)');
  }
  const areaPerPiece = width * length * sides;
  const totalArea = areaPerPiece * qty;
  const formula = `กว้าง ${width} ม. × ยาว ${length} ม. × ${sides} ด้าน`;
  return { areaPerPiece, totalArea, formula, shapeName: 'แผ่นเหล็ก (Steel Plate)' };
}

/**
 * ฟังก์ชันคำนวณพื้นที่ผิวท่อเหล็กกลม (Round Pipe)
 * สูตร: π × เส้นผ่านศูนย์กลาง × ความยาว × จำนวนชิ้น
 */
export function calculatePipeArea(diameter: number, length: number, qty: number) {
  if (diameter <= 0 || length <= 0 || qty <= 0) {
    throw new Error('กรุณากรอกเส้นผ่านศูนย์กลางและความยาวให้ถูกต้อง (ค่าต้องมากกว่า 0)');
  }
  const perimeter = Math.PI * diameter;
  const areaPerPiece = perimeter * length;
  const totalArea = areaPerPiece * qty;
  const formula = `เส้นรอบวง (π × ${diameter} ม. = ${perimeter.toFixed(3)} ม.) × ยาว ${length} ม.`;
  return { areaPerPiece, totalArea, formula, shapeName: 'ท่อเหล็กกลม (Round Pipe)' };
}

/**
 * ฟังก์ชันคำนวณพื้นที่ผิวท่อเหล็กเหลี่ยม/กล่อง (Square/Rectangular Tube)
 * สูตร: 2 × (กว้าง + สูง) × ความยาว × จำนวนชิ้น
 */
export function calculateTubeArea(width: number, height: number, length: number, qty: number) {
  if (width <= 0 || height <= 0 || length <= 0 || qty <= 0) {
    throw new Error('กรุณากรอกขนาดหน้าตัดและความยาวให้ถูกต้อง (ค่าต้องมากกว่า 0)');
  }
  const perimeter = 2 * (width + height);
  const areaPerPiece = perimeter * length;
  const totalArea = areaPerPiece * qty;
  const formula = `เส้นรอบรูป 2 × (${width} + ${height} ม. = ${perimeter.toFixed(3)} ม.) × ยาว ${length} ม.`;
  return { areaPerPiece, totalArea, formula, shapeName: 'ท่อเหล็กเหลี่ยม/กล่อง (Hollow Structural Section)' };
}

/**
 * ฟังก์ชันคำนวณพื้นที่ผิวเหล็กฉาก (L-Angle)
 * สูตร: (ขา 1 + ขา 2) × ความยาว × 2 ด้าน (ผิวรอบ) × จำนวนชิ้น
 */
export function calculateAngleArea(leg1: number, leg2: number, length: number, qty: number, bothSides: boolean = true) {
  if (leg1 <= 0 || leg2 <= 0 || length <= 0 || qty <= 0) {
    throw new Error('กรุณากรอกขนาดขาฉากและความยาวให้ถูกต้อง (ค่าต้องมากกว่า 0)');
  }
  const perimeter = (leg1 + leg2) * (bothSides ? 2 : 1);
  const areaPerPiece = perimeter * length;
  const totalArea = areaPerPiece * qty;
  const formula = `(${leg1} + ${leg2} ม.) ${bothSides ? '× 2 ด้าน (ใน+นอก)' : '× 1 ด้าน'} × ยาว ${length} ม.`;
  return { areaPerPiece, totalArea, formula, shapeName: 'เหล็กฉาก (L-Angle)' };
}

/**
 * ฟังก์ชันคำนวณพื้นที่ผิวเหล็ก I-Beam / H-Beam
 * สูตร: (4 × ปีก + 2 × ความสูง) × ความยาว × จำนวนชิ้น
 */
export function calculateIBeamArea(height: number, flange: number, length: number, qty: number) {
  if (height <= 0 || flange <= 0 || length <= 0 || qty <= 0) {
    throw new Error('กรุณากรอกขนาดหน้าตัดและความยาวให้ถูกต้อง (ค่าต้องมากกว่า 0)');
  }
  const perimeter = 4 * flange + 2 * height;
  const areaPerPiece = perimeter * length;
  const totalArea = areaPerPiece * qty;
  const formula = `เส้นรอบรูปโดยประมาณ (4 × ${flange} + 2 × ${height} ม. = ${perimeter.toFixed(3)} ม.) × ยาว ${length} ม.`;
  return { areaPerPiece, totalArea, formula, shapeName: 'เหล็ก I-Beam / H-Beam' };
}

/**
 * ฟังก์ชันคำนวณพื้นที่ผิวเหล็กรางน้ำ (C-Channel)
 * สูตร: (2 × ปีก + ความสูง) × 2 ด้าน (ใน+นอก) × ความยาว × จำนวนชิ้น
 */
export function calculateChannelArea(height: number, flange: number, length: number, qty: number) {
  if (height <= 0 || flange <= 0 || length <= 0 || qty <= 0) {
    throw new Error('กรุณากรอกขนาดหน้าตัดและความยาวให้ถูกต้อง (ค่าต้องมากกว่า 0)');
  }
  const perimeter = (2 * flange + height) * 2;
  const areaPerPiece = perimeter * length;
  const totalArea = areaPerPiece * qty;
  const formula = `เส้นรอบรูป (2 × ${flange} + ${height} ม.) × 2 ด้าน (ใน+นอก) = ${perimeter.toFixed(3)} ม. × ยาว ${length} ม.`;
  return { areaPerPiece, totalArea, formula, shapeName: 'เหล็กรางน้ำ (C-Channel)' };
}

/**
 * ฟังก์ชันคำนวณปริมาณสีและงบประมาณ (Paint Volume & Budget Calculator - SG Paints / Rust Bullet Standard)
 */
export function calculatePaintVolumeAndBudget(
  area: number,
  thicknessMicrons: number,
  method: PaintApplicationMethod,
  lossPercentage: number,
  pricePerGallon: number = 6072
): PaintCalculationResult {
  if (area <= 0) {
    throw new Error('กรุณาระบุพื้นที่ทาสีให้ถูกต้อง (มากกว่า 0 ตร.ม.)');
  }
  if (thicknessMicrons <= 0) {
    throw new Error('กรุณาระบุความหนาฟิล์มสีแห้ง (DFT) ให้ถูกต้อง');
  }
  if (lossPercentage < 0) {
    throw new Error('เปอร์เซ็นต์การสูญเสียต้องไม่ติดลบ');
  }

  const isBrush = method === 'brush_roller';
  const methodText = isBrush ? 'ทาด้วยแปรงหรือลูกกลิ้ง (Brush / Roller)' : 'พ่นด้วยเครื่อง Airless Spray';

  let minCoats: number;
  let maxCoats: number;
  if (isBrush) {
    minCoats = Math.ceil(thicknessMicrons / 75);
    maxCoats = Math.ceil(thicknessMicrons / 50);
  } else {
    minCoats = Math.ceil(thicknessMicrons / 50);
    maxCoats = Math.ceil(thicknessMicrons / 30);
  }

  const lostArea = area * (lossPercentage / 100);
  const totalAreaWithLoss = area + lostArea;

  // SG Paints / Rust bullet standard coverage at 300 microns
  const baseCoverage = isBrush ? 6.5 : 5.5; // m2 / US Gallon at 300 microns

  // Exact coverage formulas according to SG Paints / Rust Bullet specifications
  // Brush: Gallon = 1950 / DFT, Quart = 487.5 / DFT
  // Spray: Gallon = 1650 / DFT, Quart = 412.5 / DFT
  const adjustedCoveragePerGallon = (baseCoverage * 300) / thicknessMicrons;
  const adjustedCoveragePerQuart = adjustedCoveragePerGallon * (0.95 / 3.785);
  const adjustedCoveragePerCup = adjustedCoveragePerGallon * (0.23 / 3.785);

  const netGallons = area / adjustedCoveragePerGallon;
  const totalGallonsWithLoss = netGallons * (1 + lossPercentage / 100);
  const totalLitresWithLoss = totalGallonsWithLoss * 3.785;

  // Buying purely as Gallons / Quarts / Cups
  const exactGallonsToBuy = Math.ceil(totalGallonsWithLoss);
  const exactQuartsToBuy = Math.ceil(totalAreaWithLoss / adjustedCoveragePerQuart);
  const exactCupsToBuy = Math.ceil(totalAreaWithLoss / adjustedCoveragePerCup);
  const exactLitresToBuy = exactGallonsToBuy * 3.785;

  // Optimal mix calculation (minimizing excess leftover paint)
  // 1 Gallon = 3.785 L, 1 Quart = 0.95 L, 1 Cup = 0.23 L
  let remainingLitres = totalLitresWithLoss;
  const mixGallons = Math.floor(remainingLitres / 3.785);
  remainingLitres -= mixGallons * 3.785;

  let mixQuarts = Math.floor(remainingLitres / 0.95);
  remainingLitres -= mixQuarts * 0.95;

  let mixCups = Math.ceil(remainingLitres / 0.23);
  if (mixCups * 0.23 >= 0.95) {
    mixQuarts += 1;
    mixCups = 0;
  }
  if (mixQuarts * 0.95 >= 3.785) {
    // 4 quarts = 1 gallon
    mixGallons + 1;
    mixQuarts = 0;
  }

  const mixTotalLitres = mixGallons * 3.785 + mixQuarts * 0.95 + mixCups * 0.23;

  const totalBeforeVat = exactGallonsToBuy * pricePerGallon;
  const vatAmount = totalBeforeVat * 0.07;
  const totalWithVat = totalBeforeVat + vatAmount;

  return {
    methodText,
    minCoats,
    maxCoats,
    baseCoverage,
    adjustedCoveragePerGallon,
    adjustedCoveragePerQuart,
    adjustedCoveragePerCup,
    lostArea,
    totalAreaWithLoss,
    netGallons,
    totalGallonsWithLoss,
    totalLitresWithLoss,
    exactGallonsToBuy,
    exactQuartsToBuy,
    exactCupsToBuy,
    exactLitresToBuy,
    optimalMix: {
      gallons: mixGallons,
      quarts: mixQuarts,
      cups: mixCups,
      totalLitres: mixTotalLitres
    },
    totalBeforeVat,
    vatAmount,
    totalWithVat,
    pricePerGallon
  };
}

/**
 * ฟังก์ชันคำนวณแถวถอดแบบ BOQ (Calculate Single Take-off Row)
 */
export function calculateTakeoffRowData(
  sectionId: string,
  length: number,
  qty: number,
  paintSysId: string,
  prepId: string,
  settings: BOQSettings
): Omit<TakeoffRow, 'id' | 'sectionId' | 'length' | 'qty' | 'paintSysId' | 'prepId'> {
  const section = SECTION_MASTER.find(s => s.id === sectionId);
  const paintSys = PAINT_SYSTEM_MASTER.find(p => p.id === paintSysId);
  const prep = SURFACE_PREP_MASTER.find(p => p.id === prepId);

  const coverage = paintSys ? paintSys.coverage : settings.coverageDefault;
  const lossPct = paintSys ? paintSys.loss : settings.lossDefault;
  const prepPrice = prep ? prep.price : settings.prepDefault;

  const totalLength = Math.max(0, length) * Math.max(0, qty);
  const weight = section ? section.kgm * totalLength : 0;
  const surface = section ? section.m2m * totalLength : 0;

  const paintQty = coverage > 0 ? (surface * (1 + lossPct / 100)) / coverage : 0;
  const paintCost = paintQty * settings.paintPrice;
  const prepCost = surface * prepPrice;
  const laborCost = surface * settings.laborRate;
  const totalCost = paintCost + prepCost + laborCost;

  return {
    totalLength,
    weight,
    surface,
    paintQty,
    paintCost,
    prepCost,
    laborCost,
    totalCost
  };
}

/**
 * ฟังก์ชันคำนวณผลรวม Dashboard BOQ
 */
export function calculateBOQTotals(rows: TakeoffRow[]): BOQTotals {
  return rows.reduce(
    (acc, row) => ({
      totalWeight: acc.totalWeight + (row.weight || 0),
      totalSurface: acc.totalSurface + (row.surface || 0),
      totalPaintQty: acc.totalPaintQty + (row.paintQty || 0),
      totalPaintCost: acc.totalPaintCost + (row.paintCost || 0),
      totalPrepCost: acc.totalPrepCost + (row.prepCost || 0),
      totalLaborCost: acc.totalLaborCost + (row.laborCost || 0),
      totalCost: acc.totalCost + (row.totalCost || 0)
    }),
    {
      totalWeight: 0,
      totalSurface: 0,
      totalPaintQty: 0,
      totalPaintCost: 0,
      totalPrepCost: 0,
      totalLaborCost: 0,
      totalCost: 0
    }
  );
}

/**
 * ฟังก์ชันฟอร์แมตตัวเลขไทยพร้อมทศนิยม (ค่าเริ่มต้น 3 ตำแหน่ง)
 */
export function formatNumber(num: number, decimals: number = 3): string {
  return (num || 0).toLocaleString('th-TH', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}
