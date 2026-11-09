import site from "@/data/site.json";
import calendar from "@/data/dates.json";
import type { Dict } from "@/lib/i18n";
import { intlLocale, type Locale } from "@/lib/locales";

export const VENUES = ["hall", "home", "outdoor"] as const;
export const FORMULAS = ["full", "home", "mitsva", "party", "unsure"] as const;
export type Venue = (typeof VENUES)[number];
export type Formula = (typeof FORMULAS)[number];

export const takenDates = new Set<string>(calendar.taken as string[]);

export const isPhone = (v: string) => /^[+\d][\d\s\-().]{7,19}$/.test(v.trim());
export const waLink = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
export const telHref = `tel:${site.phoneIntl.replace(/[\s-]/g, "")}`;

export const shekels = (n: number, lang: Locale) => new Intl.NumberFormat(intlLocale[lang], { style: "currency", currency: "ILS", maximumFractionDigits: 0 }).format(n);
export const formatCount = (n: number, lang: Locale) => new Intl.NumberFormat(intlLocale[lang]).format(n);

/** Date du jour au format AAAA-MM-JJ, en heure d'Israël. */
export function isoDay(date: Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jerusalem", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

export function formatDay(iso: string, lang: Locale) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(intlLocale[lang], { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, d)));
}

const join = (blocks: string[][]) => blocks.map((b) => b.filter(Boolean).join("\n")).filter(Boolean).join("\n\n");

export type Request = {
  date: string;
  venue: Venue | "";
  city: string;
  guests: string;
  formula: Formula | "";
  outfits: string;
  budget: string;
  name: string;
  phone: string;
  message: string;
};

/** Récapitulatif de la demande de devis envoyé sur WhatsApp (972533444862), dans la langue du visiteur. */
export function requestMessage(r: Request, lang: Locale, d: Dict) {
  const m = d.book.message;
  const f = d.book.fields;
  const c = ":";
  const line = (label: string, value: string) => (value ? `${label}${c} ${value}` : "");
  return join([
    [`*${m.title}*`],
    [line(m.type, r.formula ? f.types[r.formula] : ""), line(m.date, r.date ? formatDay(r.date, lang) : ""), line(m.venue, r.venue ? f.venues[r.venue] : ""), line(m.city, r.city), line(m.guests, r.guests)],
    [line(m.outfits, r.outfits), line(m.budget, r.budget)],
    [line(m.name, r.name), line(m.phone, r.phone), line(m.message, r.message)],
    [m.closing],
  ]);
}

/** Événement envoyé par les boutons « לבדיקת תאריך » des formules pour pré-remplir le formulaire. */
export type Prefill = Partial<Pick<Request, "formula">>;
export const PREFILL_EVENT = "prefill-request";

/** Pré-remplit le formulaire puis fait défiler jusqu'à lui. */
export function prefillRequest(p: Prefill) {
  window.dispatchEvent(new CustomEvent<Prefill>(PREFILL_EVENT, { detail: p }));
  const target = document.getElementById("contact");
  const lenis = (window as unknown as { __lenis?: { scrollTo: (el: Element, o?: object) => void } }).__lenis;
  if (target) {
    if (lenis) lenis.scrollTo(target, { offset: -72 });
    else target.scrollIntoView({ behavior: "smooth" });
  }
}
