"use client";

import { useMemo, useState } from "react";
import { buildPunnettSquare, COMMON_GENOTYPES, genotypeLabel } from "@/lib/geneticsLogic";
import { BloodType, Genotype } from "@/types/blood";

const PHENOTYPE_COLOR: Record<BloodType, string> = {
  A: "text-antigenA",
  B: "text-antigenB",
  AB: "text-navy",
  O: "text-crimson",
};

function GenotypeSelect({
  label,
  index,
  onChange,
}: {
  label: string;
  index: number;
  onChange: (g: Genotype) => void;
}) {
  return (
    <div className="flex-1">
      <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink/50">
        {label}
      </label>
      <select
        defaultValue={index}
        onChange={(e) => onChange(COMMON_GENOTYPES[Number(e.target.value)].genotype)}
        className="w-full rounded-md border border-ink/20 bg-white px-3 py-2.5 text-sm text-ink focus:border-crimson"
      >
        {COMMON_GENOTYPES.map((g, i) => (
          <option key={g.label} value={i}>
            {g.label} → tipo {g.phenotype}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function PunnettSquare() {
  const [parent1, setParent1] = useState<Genotype>(COMMON_GENOTYPES[1].genotype); // IAi
  const [parent2, setParent2] = useState<Genotype>(COMMON_GENOTYPES[3].genotype); // IBi

  const result = useMemo(() => buildPunnettSquare(parent1, parent2), [parent1, parent2]);

  return (
    <div className="rounded-2xl border hairline bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
        <GenotypeSelect label="Genitor 1" index={1} onChange={setParent1} />
        <GenotypeSelect label="Genitor 2" index={3} onChange={setParent2} />
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr>
              <th className="w-16"></th>
              {parent2.map((allele, i) => (
                <th key={i} className="border hairline bg-plasma p-3 font-serif text-base font-medium text-ink">
                  {allele}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.grid.map((row, r) => (
              <tr key={r}>
                <th className="border hairline bg-plasma p-3 font-serif text-base font-medium text-ink">
                  {parent1[r]}
                </th>
                {row.map((cell, c) => (
                  <td key={c} className="border hairline p-4">
                    <p className="font-mono text-sm text-ink/70">{genotypeLabel(cell.genotype)}</p>
                    <p className={`mt-1 font-serif text-xl font-semibold ${PHENOTYPE_COLOR[cell.phenotype]}`}>
                      {cell.phenotype}
                    </p>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 border-t hairline pt-6">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-ink/50">
          Proporção fenotípica da prole
        </p>
        <div className="flex flex-wrap gap-4">
          {(Object.keys(result.phenotypeRatio) as BloodType[])
            .filter((t) => result.phenotypeRatio[t] > 0)
            .map((t) => (
              <div key={t} className="flex items-center gap-2">
                <span className={`font-serif text-lg font-semibold ${PHENOTYPE_COLOR[t]}`}>
                  {t}
                </span>
                <span className="text-sm text-ink/60">{result.phenotypeRatio[t]}/4</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
