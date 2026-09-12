# Sistema ABO — Exposição de Biologia

Site responsivo (mobile + desktop) construído com **Next.js 14 (App Router)** e **Tailwind CSS**,
para uma exposição sobre o sistema sanguíneo ABO: antígenos, fator Rh, compatibilidade de
transfusão e herança genética (alelos I<sup>A</sup>, I<sup>B</sup>, i).

## Como rodar

```bash
npm install
npm run dev
```

Abra http://localhost:3000. A primeira execução baixa as fontes Fraunces e Inter do Google
Fonts — é necessário estar conectado à internet nesse momento.

Para gerar a versão de produção:

```bash
npm run build
npm start
```

## Estrutura

```
sistema-abo/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # HTML base, fontes (Fraunces + Inter) e metadados
│   │   ├── page.tsx             # Home: hero, antígenos, simulador de transfusão
│   │   ├── globals.css          # Tailwind + tokens de design (cores, foco, motion)
│   │   └── genetica/
│   │       └── page.tsx         # Herança genética + quadro de Punnett
│   ├── components/
│   │   ├── navbar.tsx           # Navegação responsiva (menu hambúrguer no mobile)
│   │   ├── Footer.tsx
│   │   ├── BloodSim.tsx         # Simulador interativo de transfusão (ABO + Rh)
│   │   └── PunnettSquare.tsx    # Calculadora de cruzamento genético (IA, IB, i)
│   ├── lib/
│   │   ├── bloodLogic.ts        # Antígenos, anticorpos, regra de compatibilidade
│   │   └── geneticsLogic.ts     # Genótipo → fenótipo, algoritmo do quadro de Punnett
│   └── types/
│       └── blood.ts             # Tipos e interfaces TypeScript compartilhados
├── tailwind.config.ts            # Paleta e tipografia customizadas
├── tsconfig.json
└── package.json
```

## Decisões de design

- **Paleta**: pergaminho (`#FAF6EE`) como base, carmesim (`#A31621`) para sangue/antígeno
  principal, azul-marinho (`#1B2A4A`) para contraste editorial, verde-petróleo e ocre para
  diferenciar os antígenos A e B nas ilustrações.
- **Tipografia**: Fraunces (serifada, com itálico) para títulos — remete a manuais de
  biologia — e Inter para texto corrido e interface.
- **Interatividade**: dois componentes client-side (`BloodSim`, `PunnettSquare`) isolam toda
  a lógica de negócio em `src/lib`, mantendo os componentes de UI simples de revisar e testar.

## Melhorias feitas em cima da estrutura enviada

- Adicionados `tailwind.config.ts`, `postcss.config.js` e `next.config.js` (necessários para
  o projeto rodar).
- `types/blood.ts` centraliza os tipos usados tanto pela lógica de transfusão quanto pela
  de genética, evitando duplicação entre `bloodLogic.ts` e `geneticsLogic.ts`.
- `BloodSim` e `PunnettSquare` foram implementados como componentes client (`"use client"`)
  com estado local, já que dependem de interação do usuário.
