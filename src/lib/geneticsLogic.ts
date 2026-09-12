import { Allele, BloodType, Genotype, PunnettCell, PunnettResult } from "@/types/blood";

/**
 * Determina o fenótipo (tipo sanguíneo) a partir do genótipo.
 * IA e IB são codominantes entre si e dominantes sobre i.
 */
export function genotypeToPhenotype(genotype: Genotype): BloodType {
  const hasIA = genotype.includes("IA");
  const hasIB = genotype.includes("IB");

  if (hasIA && hasIB) return "AB";
  if (hasIA) return "A";
  if (hasIB) return "B";
  return "O";
}

export function genotypeLabel(genotype: Genotype): string {
  return genotype.join("");
}

/**
 * Gera o quadro de Punnett 2x2 para o cruzamento de dois genótipos
 * dos alelos do gene ABO (IA, IB, i).
 */
export function buildPunnettSquare(parent1: Genotype, parent2: Genotype): PunnettResult {
  const grid: PunnettCell[][] = parent1.map((allele1) =>
    parent2.map((allele2) => {
      const genotype: Genotype = [allele1, allele2];
      return {
        genotype,
        phenotype: genotypeToPhenotype(genotype),
      };
    })
  );

  const phenotypeRatio: Record<BloodType, number> = { A: 0, B: 0, AB: 0, O: 0 };
  grid.flat().forEach((cell) => {
    phenotypeRatio[cell.phenotype] += 1;
  });

  return { parent1, parent2, grid, phenotypeRatio };
}

export const ALLELE_OPTIONS: Allele[] = ["IA", "IB", "i"];

export const COMMON_GENOTYPES: { label: string; genotype: Genotype; phenotype: BloodType }[] = [
  { label: "IAIA (homozigoto)", genotype: ["IA", "IA"], phenotype: "A" },
  { label: "IAi (heterozigoto)", genotype: ["IA", "i"], phenotype: "A" },
  { label: "IBIB (homozigoto)", genotype: ["IB", "IB"], phenotype: "B" },
  { label: "IBi (heterozigoto)", genotype: ["IB", "i"], phenotype: "B" },
  { label: "IAIB (codominante)", genotype: ["IA", "IB"], phenotype: "AB" },
  { label: "ii (homozigoto recessivo)", genotype: ["i", "i"], phenotype: "O" },
];
