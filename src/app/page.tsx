import Link from "next/link";
import BloodSim from "@/components/BloodSim";
import { BLOOD_PROFILES, ALL_BLOOD_TYPES } from "@/lib/bloodLogic";

const TYPE_COLOR: Record<string, string> = {
  A: "text-antigenA",
  B: "text-antigenB",
  AB: "text-navy",
  O: "text-crimson",
};

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="bg-cell-grid border-b hairline">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 sm:px-8 sm:py-24 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="mb-4 font-serif text-sm italic text-crimson">Biologia · Genética</p>
            <h1 className="text-balance font-serif text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl md:text-6xl">
              O sistema ABO explica por que nem todo sangue combina.
            </h1>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-ink/70 sm:text-lg">
              Quatro tipos sanguíneos, dois antígenos e um punhado de anticorpos decidem, em
              segundos, se uma transfusão salva ou coloca em risco uma vida. Esta exposição
              percorre os antígenos das hemácias, as regras de compatibilidade e a herança
              genética que define o tipo sanguíneo de cada pessoa.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#transfusao"
                className="rounded-full bg-crimson px-6 py-3 text-sm font-medium text-parchment transition-colors hover:bg-crimson-deep"
              >
                Testar o simulador
              </Link>
              <Link
                href="/genetica"
                className="rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-crimson/50"
              >
                Ver a herança genética
              </Link>
            </div>
          </div>

          <svg viewBox="0 0 220 220" className="mx-auto w-full max-w-xs" role="img" aria-label="Hemácias com antígenos A e B">
            <circle cx="70" cy="70" r="46" fill="#C1121F" opacity="0.9" />
            <circle cx="70" cy="70" r="46" fill="none" stroke="#7A0F1A" strokeWidth="1.5" />
            <circle cx="50" cy="52" r="9" fill="#2E6F6E" stroke="#FAF6EE" strokeWidth="1.5" />
            <text x="50" y="56" textAnchor="middle" fontSize="10" fill="#FAF6EE" fontFamily="var(--font-sans)">A</text>

            <circle cx="150" cy="130" r="46" fill="#C1121F" opacity="0.9" />
            <circle cx="150" cy="130" r="46" fill="none" stroke="#7A0F1A" strokeWidth="1.5" />
            <circle cx="170" cy="112" r="9" fill="#C97A2B" stroke="#FAF6EE" strokeWidth="1.5" />
            <text x="170" y="116" textAnchor="middle" fontSize="10" fill="#FAF6EE" fontFamily="var(--font-sans)">B</text>

            <line x1="30" y1="150" x2="45" y2="150" stroke="#1B2A4A" strokeWidth="2" />
            <line x1="30" y1="150" x2="38" y2="143" stroke="#1B2A4A" strokeWidth="2" />
            <line x1="30" y1="150" x2="38" y2="157" stroke="#1B2A4A" strokeWidth="2" />
            <text x="14" y="154" fontSize="9" fill="#1B2A4A" fontFamily="var(--font-sans)">anti-B</text>
          </svg>
        </div>
      </section>

      {/* ANTÍGENOS */}
      <section id="antigenos" className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="max-w-prose">
          <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
            Antígenos e anticorpos de cada tipo
          </h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Os antígenos A e B são moléculas na superfície das hemácias. O plasma sanguíneo, por
            sua vez, carrega anticorpos contra os antígenos que a própria pessoa não possui —
            é essa combinação que determina quem pode doar sangue para quem.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ALL_BLOOD_TYPES.map((t) => {
            const profile = BLOOD_PROFILES[t];
            return (
              <div key={t} className="rounded-2xl border hairline p-6">
                <p className={`font-serif text-4xl font-semibold ${TYPE_COLOR[t]}`}>{t}</p>
                <dl className="mt-4 space-y-2 text-sm">
                  <div>
                    <dt className="text-ink/40">Antígenos na hemácia</dt>
                    <dd className="text-ink/80">
                      {profile.antigens.length ? profile.antigens.join(", ") : "nenhum"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink/40">Anticorpos no plasma</dt>
                    <dd className="text-ink/80">
                      {profile.antibodies.length ? profile.antibodies.join(", ") : "nenhum"}
                    </dd>
                  </div>
                </dl>
              </div>
            );
          })}
        </div>
      </section>

      {/* TRANSFUSÃO */}
      <section id="transfusao" className="border-t hairline bg-plasma/40">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="max-w-prose">
            <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
              Simulador de transfusão
            </h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Escolha o tipo sanguíneo e o fator Rh do doador e do receptor para ver se a
              transfusão é segura — e entender exatamente qual antígeno reage com qual
              anticorpo quando não é.
            </p>
          </div>

          <div className="mt-10">
            <BloodSim />
          </div>
        </div>
      </section>

      {/* CTA GENÉTICA */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="rounded-2xl border hairline bg-navy px-6 py-12 text-center sm:px-12">
          <h2 className="font-serif text-2xl font-semibold text-parchment sm:text-3xl">
            De onde vem o seu tipo sanguíneo?
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-sm leading-relaxed text-parchment/70 sm:text-base">
            O tipo sanguíneo é herdado dos pais através de três alelos — I<sup>A</sup>, I
            <sup>B</sup> e i. Explore o quadro de Punnett e veja como diferentes cruzamentos
            geram diferentes proporções de filhos A, B, AB e O.
          </p>
          <Link
            href="/genetica"
            className="mt-8 inline-block rounded-full bg-crimson px-6 py-3 text-sm font-medium text-parchment transition-colors hover:bg-crimson-deep"
          >
            Explorar a genética do sistema ABO
          </Link>
        </div>
      </section>
    </>
  );
}
