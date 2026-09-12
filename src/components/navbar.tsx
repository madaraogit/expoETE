"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/#antigenos", label: "Antígenos" },
  { href: "/#transfusao", label: "Transfusão" },
  { href: "/genetica", label: "Genética" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b hairline bg-parchment/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="inline-block h-3 w-3 rounded-full bg-crimson"
          />
          <span className="font-serif text-lg font-semibold tracking-tight text-ink">
            Sistema ABO
          </span>
        </Link>

        <nav className="hidden gap-8 sm:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink/70 transition-colors hover:text-crimson"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Abrir menu"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 sm:hidden"
        >
          <span
            className={`h-px w-6 bg-ink transition-transform ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-ink transition-transform ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col border-t hairline bg-parchment px-5 py-3 sm:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm text-ink/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
