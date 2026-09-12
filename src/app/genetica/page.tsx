import type { Metadata } from "next";
import PunnettSquare from "@/components/PunnettSquare";

export const metadata: Metadata = {
  title: "Herança Genética do Sistema ABO",
  description: "Como os alelos IA, IB e i determinam o tipo sanguíneo de cada geração.",
};

export default function Genetica() {
  return (
    <>
      <section className="border-b hairline bg-cell-grid">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="mb-4 font-serif text-sm italic text-crimson">Genética · Herança</p>
          <h1 className="text-balance max-w-prose font-serif text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
            Três alelos, quatro tipos sanguíneos.
          </h1>
          <p className="mt-6 max-w-prose leading-relaxed text-ink/70 sm:text-lg">
            O gene ABO fica no cromossomo 9 e existe em três versões: I<sup>A</sup>, I
            <sup>B</sup> e i. Cada pessoa herda duas cópias — uma de cada genitor — e a
            combinação dessas cópias define o tipo sanguíneo.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="rounded-2xl border hairline p-6">
            <p className="font-serif text-2xl font-semibold text-antigenA">Codominância</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              I<sup>A</sup> e I<sup>B</sup> se manifestam juntos. Quem herda um de cada alelo
              é do tipo AB — nenhum dos dois domina o outro.
            </p>
          </div>
          <div className="rounded-2xl border hairline p-6">
            <p className="font-serif text-2xl font-semibold text-crimson">Recessividade</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              O alelo i não produz antígeno algum e só aparece no fenótipo quando as duas
              cópias herdadas são i — o tipo O.
            </p>
          </div>
          <div className="rounded-2xl border hairline p-6">
            <p className="font-serif text-2xl font-semibold text-navy">Seis genótipos</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              I<sup>A</sup>I<sup>A</sup>, I<sup>A</sup>i, I<sup>B</sup>I<sup>B</sup>, I
              <sup>B</sup>i, I<sup>A</sup>I<sup>B</sup> e ii combinam-se em apenas quatro
              fenótipos possíveis.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t hairline bg-plasma/40">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="max-w-prose">
            <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
              Quadro de Punnett
            </h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Escolha o genótipo de cada genitor e veja, célula por célula, quais combinações
              de alelos a prole pode herdar — e em que proporção cada tipo sanguíneo aparece.
            </p>
          </div>

          <div className="mt-10">
            <PunnettSquare />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="max-w-prose">
          <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
            Um caso clássico
          </h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Dois pais heterozigotos — um I<sup>A</sup>i e outro I<sup>B</sup>i — podem gerar
            filhos dos quatro tipos sanguíneos: A, B, AB e O, cada um com 25% de chance. É por
            isso que o tipo sanguíneo de um filho, sozinho, raramente prova ou descarta um
            vínculo de parentesco sem outros exames.
          </p>
        </div>
      </section>
    </>
  );
}
