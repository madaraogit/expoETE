// Tipos centrais do sistema ABO e fator Rh

export type BloodType = "A" | "B" | "AB" | "O";
export type RhFactor = "+" | "-";

export interface FullBloodType {
  type: BloodType;
  rh: RhFactor;
}

export interface BloodProfile {
  type: BloodType;
  antigens: string[]; // antígenos presentes na hemácia
  antibodies: string[]; // anticorpos presentes no plasma
}

export interface CompatibilityResult {
  compatible: boolean;
  reason: string;
  agglutination: boolean;
}

// Alelos do gene ABO (cromossomo 9, três alelos: IA, IB, i)
export type Allele = "IA" | "IB" | "i";
export type Genotype = [Allele, Allele];

export interface PunnettCell {
  genotype: Genotype;
  phenotype: BloodType;
}

export interface PunnettResult {
  parent1: Genotype;
  parent2: Genotype;
  grid: PunnettCell[][]; // 2x2
  phenotypeRatio: Record<BloodType, number>;
}
