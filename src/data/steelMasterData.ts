import { SteelSection, PaintSystem, SurfacePrep } from '../types';

export const SECTION_MASTER: SteelSection[] = [
  // H-BEAM
  { id: 'H100x50x5x7', type: 'H-BEAM', size: '100x50x5x7', kgm: 9.3, m2m: 0.39 },
  { id: 'H100x100x6x8', type: 'H-BEAM', size: '100x100x6x8', kgm: 17.2, m2m: 0.588 },
  { id: 'H125x125x6.5x9', type: 'H-BEAM', size: '125x125x6.5x9', kgm: 23.8, m2m: 0.737 },
  { id: 'H150x75x5x7', type: 'H-BEAM', size: '150x75x5x7', kgm: 14.0, m2m: 0.59 },
  { id: 'H150x150x7x10', type: 'H-BEAM', size: '150x150x7x10', kgm: 31.5, m2m: 0.886 },
  { id: 'H175x175x7.5x11', type: 'H-BEAM', size: '175x175x7.5x11', kgm: 40.2, m2m: 1.035 },
  { id: 'H200x100x5.5x8', type: 'H-BEAM', size: '200x100x5.5x8', kgm: 21.3, m2m: 0.789 },
  { id: 'H200x200x8x12', type: 'H-BEAM', size: '200x200x8x12', kgm: 49.9, m2m: 1.184 },
  { id: 'H250x125x6x9', type: 'H-BEAM', size: '250x125x6x9', kgm: 29.6, m2m: 0.988 },
  { id: 'H250x250x9x14', type: 'H-BEAM', size: '250x250x9x14', kgm: 72.4, m2m: 1.482 },
  { id: 'H300x150x6.5x9', type: 'H-BEAM', size: '300x150x6.5x9', kgm: 36.7, m2m: 1.187 },
  { id: 'H300x300x10x15', type: 'H-BEAM', size: '300x300x10x15', kgm: 94.0, m2m: 1.78 },
  { id: 'H350x175x7x11', type: 'H-BEAM', size: '350x175x7x11', kgm: 49.6, m2m: 1.386 },
  { id: 'H350x350x12x19', type: 'H-BEAM', size: '350x350x12x19', kgm: 137.0, m2m: 2.076 },
  { id: 'H400x200x8x13', type: 'H-BEAM', size: '400x200x8x13', kgm: 66.0, m2m: 1.584 },
  { id: 'H400x400x13x21', type: 'H-BEAM', size: '400x400x13x21', kgm: 172.0, m2m: 2.374 },
  { id: 'H450x200x9x14', type: 'H-BEAM', size: '450x200x9x14', kgm: 76.0, m2m: 1.682 },
  { id: 'H500x200x10x16', type: 'H-BEAM', size: '500x200x10x16', kgm: 89.6, m2m: 1.78 },
  { id: 'H600x200x11x17', type: 'H-BEAM', size: '600x200x11x17', kgm: 106.0, m2m: 1.978 },
  { id: 'H700x300x13x24', type: 'H-BEAM', size: '700x300x13x24', kgm: 185.0, m2m: 2.574 },
  { id: 'H800x300x14x26', type: 'H-BEAM', size: '800x300x14x26', kgm: 210.0, m2m: 2.772 },
  { id: 'H900x300x16x28', type: 'H-BEAM', size: '900x300x16x28', kgm: 243.0, m2m: 2.968 },

  // I-BEAM
  { id: 'I100x75x5x8', type: 'I-BEAM', size: '100x75x5x8', kgm: 12.9, m2m: 0.49 },
  { id: 'I125x75x5.5x9.5', type: 'I-BEAM', size: '125x75x5.5x9.5', kgm: 16.1, m2m: 0.539 },
  { id: 'I150x75x5.5x9.5', type: 'I-BEAM', size: '150x75x5.5x9.5', kgm: 17.1, m2m: 0.589 },
  { id: 'I150x125x8.5x14', type: 'I-BEAM', size: '150x125x8.5x14', kgm: 36.2, m2m: 0.783 },
  { id: 'I180x100x6x10', type: 'I-BEAM', size: '180x100x6x10', kgm: 23.6, m2m: 0.748 },
  { id: 'I200x100x7x10', type: 'I-BEAM', size: '200x100x7x10', kgm: 26.0, m2m: 0.786 },
  { id: 'I250x125x7.5x12.5', type: 'I-BEAM', size: '250x125x7.5x12.5', kgm: 38.3, m2m: 0.985 },
  { id: 'I300x150x10x19', type: 'I-BEAM', size: '300x150x10x19', kgm: 55.5, m2m: 1.18 },
  { id: 'I350x150x8x13', type: 'I-BEAM', size: '350x150x8x13', kgm: 48.3, m2m: 1.284 },
  { id: 'I400x150x10x18.5', type: 'I-BEAM', size: '400x150x10x18.5', kgm: 65.5, m2m: 1.38 },
  { id: 'I450x175x12.5x25', type: 'I-BEAM', size: '450x175x12.5x25', kgm: 95.8, m2m: 1.575 },
  { id: 'I600x190x16x35', type: 'I-BEAM', size: '600x190x16x35', kgm: 176.0, m2m: 1.928 },

  // CHANNEL
  { id: 'C50x25x5x6', type: 'CHANNEL', size: '50x25x5x6', kgm: 3.86, m2m: 0.19 },
  { id: 'C75x40x5x7', type: 'CHANNEL', size: '75x40x5x7', kgm: 6.92, m2m: 0.3 },
  { id: 'C100x50x5x7.5', type: 'CHANNEL', size: '100x50x5x7.5', kgm: 9.36, m2m: 0.39 },
  { id: 'C125x65x6x8', type: 'CHANNEL', size: '125x65x6x8', kgm: 13.4, m2m: 0.498 },
  { id: 'C150x75x6.5x10', type: 'CHANNEL', size: '150x75x6.5x10', kgm: 18.6, m2m: 0.587 },
  { id: 'C180x75x7x10.5', type: 'CHANNEL', size: '180x75x7x10.5', kgm: 21.4, m2m: 0.646 },
  { id: 'C200x80x7.5x11', type: 'CHANNEL', size: '200x80x7.5x11', kgm: 24.6, m2m: 0.705 },
  { id: 'C200x90x8x13.5', type: 'CHANNEL', size: '200x90x8x13.5', kgm: 30.3, m2m: 0.744 },
  { id: 'C250x90x9x13', type: 'CHANNEL', size: '250x90x9x13', kgm: 38.1, m2m: 0.842 },
  { id: 'C300x90x9x13', type: 'CHANNEL', size: '300x90x9x13', kgm: 38.1, m2m: 0.942 },
  { id: 'C300x90x10x15.5', type: 'CHANNEL', size: '300x90x10x15.5', kgm: 43.8, m2m: 0.94 },
  { id: 'C380x100x13x20', type: 'CHANNEL', size: '380x100x13x20', kgm: 67.3, m2m: 1.134 },

  // ANGLE
  { id: 'L25x25x3', type: 'ANGLE', size: '25x25x3', kgm: 1.12, m2m: 0.094 },
  { id: 'L25x25x5', type: 'ANGLE', size: '25x25x5', kgm: 1.77, m2m: 0.09 },
  { id: 'L30x30x3', type: 'ANGLE', size: '30x30x3', kgm: 1.36, m2m: 0.114 },
  { id: 'L40x40x3', type: 'ANGLE', size: '40x40x3', kgm: 1.83, m2m: 0.154 },
  { id: 'L45x45x4', type: 'ANGLE', size: '45x45x4', kgm: 2.42, m2m: 0.172 },
  { id: 'L50x50x5', type: 'ANGLE', size: '50x50x5', kgm: 3.77, m2m: 0.19 },
  { id: 'L60x60x6', type: 'ANGLE', size: '60x60x6', kgm: 5.91, m2m: 0.228 },
  { id: 'L65x65x6', type: 'ANGLE', size: '65x65x6', kgm: 6.38, m2m: 0.248 },
  { id: 'L75x75x6', type: 'ANGLE', size: '75x75x6', kgm: 6.85, m2m: 0.288 },
  { id: 'L75x75x9', type: 'ANGLE', size: '75x75x9', kgm: 9.96, m2m: 0.282 },
  { id: 'L75x75x12', type: 'ANGLE', size: '75x75x12', kgm: 13.0, m2m: 0.276 },
  { id: 'L90x90x7', type: 'ANGLE', size: '90x90x7', kgm: 9.59, m2m: 0.346 },
  { id: 'L90x90x10', type: 'ANGLE', size: '90x90x10', kgm: 13.3, m2m: 0.34 },
  { id: 'L100x100x10', type: 'ANGLE', size: '100x100x10', kgm: 14.9, m2m: 0.38 },
  { id: 'L100x100x12', type: 'ANGLE', size: '100x100x12', kgm: 17.8, m2m: 0.376 },
  { id: 'L120x120x8', type: 'ANGLE', size: '120x120x8', kgm: 14.7, m2m: 0.464 },
  { id: 'L130x130x12', type: 'ANGLE', size: '130x130x12', kgm: 23.4, m2m: 0.496 },
  { id: 'L150x150x12', type: 'ANGLE', size: '150x150x12', kgm: 27.3, m2m: 0.576 },
  { id: 'L150x150x15', type: 'ANGLE', size: '150x150x15', kgm: 33.6, m2m: 0.57 },
  { id: 'L200x200x20', type: 'ANGLE', size: '200x200x20', kgm: 59.7, m2m: 0.76 },
  { id: 'L250x250x25', type: 'ANGLE', size: '250x250x25', kgm: 93.7, m2m: 0.95 },

  // T-BAR
  { id: 'T150x9', type: 'T-BAR', size: '150x9', kgm: 14.5, m2m: 0.354 },
  { id: 'T150x12', type: 'T-BAR', size: '150x12', kgm: 18.1, m2m: 0.36 },
  { id: 'T150x15', type: 'T-BAR', size: '150x15', kgm: 21.6, m2m: 0.366 },
  { id: 'T200x12', type: 'T-BAR', size: '200x12', kgm: 22.8, m2m: 0.46 },
  { id: 'T200x16', type: 'T-BAR', size: '200x16', kgm: 29.1, m2m: 0.468 },
  { id: 'T200x19', type: 'T-BAR', size: '200x19', kgm: 33.8, m2m: 0.474 },
  { id: 'T200x22', type: 'T-BAR', size: '200x22', kgm: 38.5, m2m: 0.48 },
  { id: 'T250x16', type: 'T-BAR', size: '250x16', kgm: 36.2, m2m: 0.568 },
  { id: 'T250x19', type: 'T-BAR', size: '250x19', kgm: 42.0, m2m: 0.574 },
  { id: 'T250x22', type: 'T-BAR', size: '250x22', kgm: 47.9, m2m: 0.58 },
  { id: 'T250x25', type: 'T-BAR', size: '250x25', kgm: 53.8, m2m: 0.586 }
];

export const PAINT_SYSTEM_MASTER: PaintSystem[] = [
  { id: 'PS-01', desc: 'Shop Primer / Zinc Phosphate (รองพื้นกันสนิมซิงค์ฟอสเฟต)', coverage: 8.0, loss: 10.0 },
  { id: 'PS-02', desc: 'Epoxy Primer + Epoxy Topcoat (รองพื้นอีพ็อกซี่ + ทับหน้าอีพ็อกซี่)', coverage: 7.0, loss: 12.0 },
  { id: 'PS-03', desc: 'Zinc-Rich Primer + Epoxy Intermediate + PU Topcoat (ระบบ 3 ชั้น คุณภาพสูง)', coverage: 6.0, loss: 15.0 },
  { id: 'PS-04', desc: 'High-Build Epoxy (อีพ็อกซี่ฟิล์มหนาพิเศษ)', coverage: 5.0, loss: 15.0 },
  { id: 'PS-05', desc: 'Custom / Project Specification (กำหนดตามสเปกโครงการ)', coverage: 7.0, loss: 10.0 }
];

export const SURFACE_PREP_MASTER: SurfacePrep[] = [
  { id: 'SP-01', desc: 'Solvent Cleaning (ทำความสะอาดคราบน้ำมัน/จาระบี)', price: 35 },
  { id: 'SP-02', desc: 'Power Tool Cleaning (ขัดด้วยเครื่องมือกล/ลูกขัด)', price: 75 },
  { id: 'SP-03', desc: 'Abrasive Blast Cleaning Sa 2 (พ่นทรายระดับ Sa 2)', price: 110 },
  { id: 'SP-04', desc: 'Abrasive Blast Cleaning Sa 2.5 (พ่นทรายระดับ Sa 2.5 มาตรฐานอุตสาหกรรม)', price: 140 },
  { id: 'SP-05', desc: 'Abrasive Blast Cleaning Sa 3 (พ่นทรายระดับ Sa 3 ผิวขาวสมบูรณ์)', price: 170 },
  { id: 'SP-06', desc: 'Project Specification (ตามข้อกำหนดโครงการ)', price: 120 }
];

/**
 * ข้อมูลมาตรฐาน SG Paints / Rust Bullet ตามตารางหน้างานจริงและการเทียบสัดส่วน
 */
export const SG_PAINTS_CONTAINER_SIZES = [
  { id: 'cup', name: 'Cup (คัพ)', litres: 0.23, ratioToGallon: 0.23 / 3.785 },
  { id: 'quart', name: 'Quart (ควอร์ต)', litres: 0.95, ratioToGallon: 0.95 / 3.785 },
  { id: 'gallon', name: 'US Gallon (แกลลอน)', litres: 3.785, ratioToGallon: 1.0 }
];

export const SG_PAINTS_COVERAGE_TABLE = [
  {
    dft: 50,
    brushQuart: 9.78,
    brushGallon: 39.0,
    brushCup: +( (0.23 / 3.785) * 39.0 ).toFixed(2),
    sprayGallon: 33.0,
    sprayQuart: +( (0.95 / 3.785) * 33.0 ).toFixed(2),
    sprayCup: +( (0.23 / 3.785) * 33.0 ).toFixed(2)
  },
  {
    dft: 75,
    brushQuart: 6.52,
    brushGallon: 26.0,
    brushCup: +( (0.23 / 3.785) * 26.0 ).toFixed(2),
    sprayGallon: 22.0,
    sprayQuart: +( (0.95 / 3.785) * 22.0 ).toFixed(2),
    sprayCup: +( (0.23 / 3.785) * 22.0 ).toFixed(2)
  },
  {
    dft: 100,
    brushQuart: 4.89,
    brushGallon: 19.5,
    brushCup: +( (0.23 / 3.785) * 19.5 ).toFixed(2),
    sprayGallon: 16.5,
    sprayQuart: +( (0.95 / 3.785) * 16.5 ).toFixed(2),
    sprayCup: +( (0.23 / 3.785) * 16.5 ).toFixed(2)
  },
  {
    dft: 150,
    brushQuart: 3.26,
    brushGallon: 13.0,
    brushCup: 0.79, // จากข้อมูลหน้างานจริง
    sprayGallon: 11.0,
    sprayQuart: +( (0.95 / 3.785) * 11.0 ).toFixed(2),
    sprayCup: +( (0.23 / 3.785) * 11.0 ).toFixed(2)
  },
  {
    dft: 200,
    brushQuart: 2.445,
    brushGallon: 9.75,
    brushCup: +( (0.23 / 3.785) * 9.75 ).toFixed(2),
    sprayGallon: 8.25,
    sprayQuart: +( (0.95 / 3.785) * 8.25 ).toFixed(2),
    sprayCup: +( (0.23 / 3.785) * 8.25 ).toFixed(2)
  },
  {
    dft: 225,
    brushQuart: 2.173333333,
    brushGallon: 8.666666667,
    brushCup: +( (0.23 / 3.785) * 8.666666667 ).toFixed(2),
    sprayGallon: 7.33333,
    sprayQuart: +( (0.95 / 3.785) * 7.33333 ).toFixed(2),
    sprayCup: +( (0.23 / 3.785) * 7.33333 ).toFixed(2)
  },
  {
    dft: 300,
    brushQuart: 1.63,
    brushGallon: 6.5,
    brushCup: 0.40, // จากข้อมูลหน้างานจริง
    sprayGallon: 5.5,
    sprayQuart: +( (0.95 / 3.785) * 5.5 ).toFixed(2),
    sprayCup: +( (0.23 / 3.785) * 5.5 ).toFixed(2)
  }
];

