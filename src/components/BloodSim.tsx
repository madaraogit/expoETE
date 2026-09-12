"use client";

import { useMemo, useState } from "react";
import { ALL_BLOOD_TYPES, checkCompatibility } from "@/lib/bloodLogic";
import { BloodType, FullBloodType, RhFactor } from "@/types/blood";

const RH_OPTIONS: RhFactor[] = ["+", "-"];

function TypePicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: FullBloodType;
  onChange: (v: FullBloodType) => void;
}) {
  return (
    <div className="flex-1">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-ink/50">{label}</p>
      <div className="flex flex-wrap gap-2">
        {ALL_BLOOD_TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onChange({ ...value, type: t })}
            className={`h-10 w-10 rounded-full border text-sm font-semibold transition-colors ${
              value.type === t
                ? "border-crimson bg-crimson text-parchment"
                : "border-ink/20 bg-white text-ink/70 hover:border-crimson/50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        {RH_OPTIONS.map((rh) => (
          <button
            key={rh}
            type="button"
            onClick={() => onChange({ ...value, rh })}
            className={`h-9 flex-1 rounded-md border text-sm font-medium transition-colors ${
              value.rh === rh
                ? "border-navy bg-navy text-parchment"
                : "border-ink/20 bg-white text-ink/70 hover:border-navy/40"
            }`}
          >
            Rh{rh}
          </button>
        ))}
      </div>
    </div>
  );
}

function BloodCellSVG({
  type,
  rh,
  agitate,
}: {
  type: BloodType;
  rh: RhFactor;
  agitate: boolean;
}) {
  const hasA = type === "A" || type === "AB";
  const hasB = type === "B" || type === "AB";

  const cells = [
    { cx: 40, cy: 40 },
    { cx: 80, cy: 30 },
    { cx: 70, cy: 70 },
    { cx: 110, cy: 60 },
  ];

  return (
    <svg viewBox="0 0 150 100" className="h-24 w-full" role="img" aria-label={`Hemácias tipo ${type}${rh}`}>
      {cells.map((c, i) => (
        <g
          key={i}
          className={agitate ? "animate-pulse" : ""}
          style={agitate ? { transformOrigin: `${c.cx}px ${c.cy}px` } : undefined}
        >
          <circle cx={c.cx} cy={c.cy} r="14" fill="#C1121F" opacity="0.85" />
          <circle cx={c.cx} cy={c.cy} r="14" fill="none" stroke="#7A0F1A" strokeWidth="1" />
          {hasA && (
            <circle cx={c.cx - 6} cy={c.cy - 6} r="3" fill="#2E6F6E" stroke="#fff" strokeWidth="0.5" />
          )}
          {hasB && (
            <circle cx={c.cx + 6} cy={c.cy - 6} r="3" fill="#C97A2B" stroke="#fff" strokeWidth="0.5" />
          )}
          {rh === "+" && (
            <rect x={c.cx - 2} y={c.cy + 3} width="4" height="4" fill="#F3ECDC" opacity="0.9" />
          )}
        </g>
      ))}
    </svg>
  );
}

export default function BloodSim() {
  const [donor, setDonor] = useState<FullBloodType>({ type: "O", rh: "-" });
  const [recipient, setRecipient] = useState<FullBloodType>({ type: "A", rh: "+" });

  const result = useMemo(() => checkCompatibility(donor, recipient), [donor, recipient]);

  return (
    <div className="rounded-2xl border hairline bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
        <TypePicker label="Doador" value={donor} onChange={setDonor} />
        <TypePicker label="Receptor" value={recipient} onChange={setRecipient} />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 border-t hairline pt-6 sm:gap-8">
        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-ink/40">Hemácias do doador</p>
          <BloodCellSVG type={donor.type} rh={donor.rh} agitate={!result.compatible} />
        </div>
        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-ink/40">Plasma do receptor</p>
          <BloodCellSVG type={recipient.type} rh={recipient.rh} agitate={!result.compatible} />
        </div>
      </div>

      <div
        className={`mt-6 rounded-xl border p-5 ${
          result.compatible
            ? "border-antigenA/30 bg-antigenA/5"
            : "border-crimson/30 bg-crimson/5"
        }`}
      >
        <p
          className={`font-serif text-lg font-medium ${
            result.compatible ? "text-antigenA" : "text-crimson"
          }`}
        >
          {result.compatible ? "Transfusão compatível" : "Transfusão incompatível — risco de aglutinação"}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{result.reason}</p>
      </div>
    </div>
  );
}
