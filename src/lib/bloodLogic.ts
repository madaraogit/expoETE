import { BloodType, BloodProfile, CompatibilityResult, FullBloodType } from "@/types/blood";

// Perfil antigênico e de anticorpos de cada tipo sanguíneo (sistema ABO)
export const BLOOD_PROFILES: Record<BloodType, BloodProfile> = {
  A: { type: "A", antigens: ["A"], antibodies: ["anti-B"] },
  B: { type: "B", antigens: ["B"], antibodies: ["anti-A"] },
  AB: { type: "AB", antigens: ["A", "B"], antibodies: [] },
  O: { type: "O", antigens: [], antibodies: ["anti-A", "anti-B"] },
};

export const ALL_BLOOD_TYPES: BloodType[] = ["A", "B", "AB", "O"];

/**
 * Verifica se o sangue do doador pode ser transfundido no receptor,
 * considerando o sistema ABO e o fator Rh.
 *
 * Regra ABO: a transfusão é segura quando os antígenos das hemácias do
 * doador NÃO reagem com os anticorpos presentes no plasma do receptor.
 *
 * Regra Rh: um receptor Rh- não deve receber sangue Rh+ (risco de
 * sensibilização e produção de anticorpos anti-Rh).
 */
export function checkCompatibility(
  donor: FullBloodType,
  recipient: FullBloodType
): CompatibilityResult {
  const donorProfile = BLOOD_PROFILES[donor.type];
  const recipientProfile = BLOOD_PROFILES[recipient.type];

  const conflictingAntigens = donorProfile.antigens.filter((antigen) =>
    recipientProfile.antibodies.includes(`anti-${antigen}`)
  );

  const abCompatible = conflictingAntigens.length === 0;
  const rhCompatible = !(donor.rh === "+" && recipient.rh === "-");

  const compatible = abCompatible && rhCompatible;

  let reason = "";
  if (!abCompatible) {
    reason = `O antígeno ${conflictingAntigens.join(
      " e "
    )} presente nas hemácias do doador reage com os anticorpos ${conflictingAntigens
      .map((a) => `anti-${a}`)
      .join(" e ")} do plasma do receptor.`;
  } else if (!rhCompatible) {
    reason =
      "O doador é Rh+ e o receptor é Rh-. O receptor pode desenvolver anticorpos anti-Rh contra as hemácias transfundidas.";
  } else {
    reason = "Nenhum antígeno do doador é reconhecido pelos anticorpos do receptor. Transfusão seguro.";
  }

  return {
    compatible,
    reason,
    agglutination: !compatible,
  };
}

export function bloodTypeLabel(bt: FullBloodType): string {
  return `${bt.type}${bt.rh}`;
}

export const UNIVERSAL_DONOR: FullBloodType = { type: "O", rh: "-" };
export const UNIVERSAL_RECIPIENT: FullBloodType = { type: "AB", rh: "+" };
