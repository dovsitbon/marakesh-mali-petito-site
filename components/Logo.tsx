// Logo de Marakesh Mali Petito redessiné en SVG d'après son logo (rosace dorée à huit branches + « MARRAKESH »
// + « מלי פטיטו | הפקות טקסי חינה »). Tout est ici : il suffit de remplacer ces tracés pour changer le logo.

const R8 = [0, 45, 90, 135, 180, 225, 270, 315];

/** Grand pétale de la rosace (pointe vers le haut), dans un repère centré −50…50. */
const PETAL = "M0 -13C7 -20 8 -32 0 -45C-8 -32 -7 -20 0 -13Z";
/** Petit pétale intercalé, à 22,5°. */
const PETAL_SMALL = "M0 -15C4 -21 4 -28 0 -33C-4 -28 -4 -21 0 -15Z";
/** Volute sous la pointe du grand pétale. */
const CURL = "M-6 -36C-10 -38 -12 -43 -8 -46M6 -36C10 -38 12 -43 8 -46";

/** Rosace au trait (couleur courante), pour l'en-tête, le pied de page et les ornements. */
export function Rosette({ className = "h-10 w-10", strokeWidth = 1.4 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round">
      {R8.map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <path d={PETAL} />
          <path d={CURL} />
          <path d={PETAL_SMALL} transform="rotate(22.5)" />
        </g>
      ))}
      <rect x="-8" y="-8" width="16" height="16" />
      <rect x="-8" y="-8" width="16" height="16" transform="rotate(45)" />
      <circle r="2.6" />
    </svg>
  );
}

/** En-tête : rosace + « מרקש » + « MALI PETITO » en petites capitales espacées. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`} translate="no">
      <Rosette className="h-10 w-10 text-gold md:h-11 md:w-11" strokeWidth={1.6} />
      <span className="flex flex-col items-start leading-none">
        <span className="font-[family-name:var(--font-frank)] text-[1.55rem] text-henna md:text-[1.75rem]" lang="he" dir="rtl">
          מרקש
        </span>
        <span className="mt-1 font-[family-name:var(--font-cormorant)] text-[0.72rem] tracking-[0.36em] md:text-[0.8rem]" dir="ltr">
          MALI PETITO
        </span>
      </span>
    </span>
  );
}

/** Pied de page : logo complet centré, comme son logo officiel. */
export function LogoFull({ className = "" }: { className?: string }) {
  return (
    <span className={`flex flex-col items-center text-center ${className}`} translate="no">
      <Rosette className="h-20 w-20 text-gold" strokeWidth={1.2} />
      <span className="mt-5 ps-[0.3em] font-[family-name:var(--font-cormorant)] text-[2rem] tracking-[0.3em]" dir="ltr">
        MARRAKESH
      </span>
      <span className="mt-2 font-[family-name:var(--font-frank)] text-[1.05rem]" lang="he" dir="rtl">
        מלי פטיטו | הפקות טקסי חינה
      </span>
    </span>
  );
}
