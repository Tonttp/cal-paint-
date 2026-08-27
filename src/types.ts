export interface SteelSection {
  id: string;
  type: 'H-BEAM' | 'I-BEAM' | 'CHANNEL' | 'ANGLE' | 'T-BAR';
  size: string;
  kgm: number; // kg per meter
  m2m: number; // m2 per meter
}

export interface PaintSystem {
  id: string;
  desc: string;
  coverage: number; // m2 per litre
  loss: number; // % loss
}

export interface SurfacePrep {
  id: string;
  desc: string;
  price: number; // Baht per m2
}

export interface TakeoffRow {
  id: string;
  sectionId: string;
  length: number;
  qty: number;
  paintSysId: string;
  prepId: string;
  totalLength: number;
  weight: number;
  surface: number;
  paintQty: number;
  paintCost: number;
  prepCost: number;
  laborCost: number;
  totalCost: number;
}

export interface BOQSettings {
  paintPrice: number; // Baht per litre
  laborRate: number; // Baht per m2
  prepDefault: number; // Baht per m2
  coverageDefault: number; // m2 per litre
  lossDefault: number; // % loss
}

export interface BOQTotals {
  totalWeight: number;
  totalSurface: number;
  totalPaintQty: number;
  totalPaintCost: number;
  totalPrepCost: number;
  totalLaborCost: number;
  totalCost: number;
}

export type SteelShapeType = 'plate' | 'round_pipe' | 'square_tube' | 'angle' | 'ibeam' | 'channel';

export type PaintApplicationMethod = 'brush_roller' | 'airless_spray';

export type ContainerType = 'gallon' | 'quart' | 'cup';

export interface SGPaintCoverageRow {
  dft: number; // microns
  brushGallon: number;
  brushQuart: number;
  brushCup: number;
  sprayGallon: number;
  sprayQuart: number;
  sprayCup: number;
}

export interface PaintCalculationResult {
  methodText: string;
  minCoats: number;
  maxCoats: number;
  baseCoverage: number;
  adjustedCoveragePerGallon: number;
  adjustedCoveragePerQuart: number;
  adjustedCoveragePerCup: number;
  lostArea: number;
  totalAreaWithLoss: number;
  netGallons: number;
  totalGallonsWithLoss: number;
  totalLitresWithLoss: number;
  exactGallonsToBuy: number;
  exactQuartsToBuy: number;
  exactCupsToBuy: number;
  exactLitresToBuy: number;
  // Recommended optimal mix (Gallons + Quarts + Cups)
  optimalMix: {
    gallons: number;
    quarts: number;
    cups: number;
    totalLitres: number;
  };
  totalBeforeVat: number;
  vatAmount: number;
  totalWithVat: number;
  pricePerGallon: number;
}
