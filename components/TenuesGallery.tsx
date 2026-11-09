"use client";

import Image from "next/image";
import { useState } from "react";
import tenues from "@/data/tenues.json";
import { useLocale } from "@/components/providers";
import { altOf } from "@/lib/i18n";
import { img } from "@/lib/media";

const CATS = ["all", "mariee", "marie", "famille", "enfants"] as const;
type Cat = (typeof CATS)[number];

/** Galerie filtrable des tenues (data/tenues.json) : mariée, marié, famille, enfants. */
export function TenuesGallery() {
  const { lang, d } = useLocale();
  const [cat, setCat] = useState<Cat>("all");
  const [all, setAll] = useState(false);
  const matching = tenues.items.filter((t) => cat === "all" || t.cat === cat);
  const items = all ? matching : matching.slice(0, 8);

  return (
    <div>
      <div role="group" aria-label={d.outfits.label} className="flex flex-wrap justify-center gap-2">
        {CATS.map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => {
              setCat(c);
              setAll(false);
            }} className="chip">
            {d.outfits.filters[c]}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="mx-auto mt-14 max-w-md text-center leading-relaxed text-muted" role="status">
          {d.outfits.empty}
        </p>
      ) : (
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {items.map((t) => {
            const p = img(t.image);
            return (
              <li key={t.id} className="fade-in group">
                <div className="shine aspect-[4/5] bg-sand">
                  <Image src={p.src} width={p.width} height={p.height} alt={altOf(d, p.src)} sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw" className="h-full w-full object-cover object-[50%_25%]" />
                </div>
                <p className="mt-3 text-[0.9375rem] leading-snug">{t.name[lang]}</p>
              </li>
            );
          })}
        </ul>
      )}
      {items.length < matching.length && (
        <div className="mt-12 text-center">
          <button type="button" onClick={() => setAll(true)} className="link-line nav-link">
            {d.outfits.more} ({matching.length})
          </button>
        </div>
      )}
    </div>
  );
}
