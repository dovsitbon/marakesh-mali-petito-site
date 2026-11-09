"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const KEY = "malipetito-intro";
const TOTAL = 1.5;

// Fleur de lys au trait (son symbole ⚜ sur Instagram), dans un cadre 100 × 104
const LYS = [
  "M50 4C40 20 38 42 50 62C62 42 60 20 50 4Z",
  "M47 61C34 63 20 56 16 43C13 32 21 25 29 29C35 32 34 40 28 41",
  "M53 61C66 63 80 56 84 43C87 32 79 25 71 29C65 32 66 40 72 41",
  "M33 66H67M36 72H64",
  "M50 72C47 84 41 92 33 97M50 72C53 84 59 92 67 97M50 72V100",
];
// Fils dorés qui se tissent sous le nom, comme une broderie
const THREADS = ["M10 10C40 0 60 20 90 10S150 0 190 10", "M10 10C40 20 60 0 90 10S150 20 190 10", "M40 10C70 4 130 16 160 10"];

const markSeen = () => {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {}
  document.documentElement.classList.add("intro-seen");
};

/**
 * Ouverture (1,5 s, une fois par session, aucun son) : fond ivoire → une fleur de lys se dessine au trait doré →
 * « מרקש » apparaît en fondu, puis « MALI PETITO » → quelques fils dorés se tissent sous le nom → fondu sur le hero.
 * Masquée d'office si l'utilisateur réduit les animations (script dans le layout + globals.css).
 */
export function Intro({ skipLabel }: { skipLabel: string }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      markSeen();
      setGone(true);
    }, TOTAL * 1000);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <motion.div
      className="intro-curtain flex items-center justify-center text-ink"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.18, duration: 0.32, ease: "easeOut" }}
    >
      <div className="flex w-[min(78vw,320px)] flex-col items-center">
        <svg viewBox="0 0 100 104" className="block w-[30%]" aria-hidden="true" fill="none" stroke="var(--color-gold)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          {LYS.map((d, i) => (
            <motion.path key={d} d={d} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: i * 0.05, duration: 0.5, ease: "easeInOut" }} />
          ))}
        </svg>
        <motion.p
          lang="he"
          dir="rtl"
          translate="no"
          className="mt-5 font-[family-name:var(--font-frank)] text-[3rem] leading-none text-henna md:text-[3.4rem]"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.35, ease: "easeOut" }}
        >
          מרקש
        </motion.p>
        <motion.p
          dir="ltr"
          translate="no"
          className="mt-3 ps-[0.42em] font-[family-name:var(--font-cormorant)] text-[0.95rem] tracking-[0.42em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.62, duration: 0.3 }}
        >
          MALI PETITO
        </motion.p>
        <svg viewBox="0 0 200 20" className="mt-3 w-[70%]" aria-hidden="true" fill="none" stroke="var(--color-gold)" strokeWidth="0.8" strokeLinecap="round">
          {THREADS.map((d, i) => (
            <motion.path key={d} d={d} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.9 }} transition={{ delay: 0.74 + i * 0.06, duration: 0.4, ease: "easeOut" }} />
          ))}
        </svg>
      </div>

      <button
        type="button"
        onClick={() => {
          markSeen();
          setGone(true);
        }}
        className="nav-link absolute end-4 bottom-4 z-10 min-h-11 px-4 text-muted transition-colors hover:text-ink"
      >
        {skipLabel}
      </button>
    </motion.div>
  );
}
