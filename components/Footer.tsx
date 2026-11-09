import Link from "next/link";
import site from "@/data/site.json";
import infos from "@/data/infos.json";
import { InstagramIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { LogoFull } from "@/components/Logo";
import { fill, type Dict, type Locale } from "@/lib/i18n";
import { telHref, waLink } from "@/lib/quote";

export function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  const year = new Date().getFullYear();
  const home = `/${lang}`;
  const nav = [
    { href: `${home}#formules`, label: d.nav.ceremonies },
    { href: `${home}#maison`, label: d.nav.home_pkg },
    { href: `${home}#mitsva`, label: d.nav.mitsva },
    { href: `${home}#tenues`, label: d.nav.outfits },
    { href: `${home}#mariees`, label: d.nav.brides },
    { href: `${home}#contact`, label: d.nav.check },
  ];
  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto grid max-w-[1400px] items-start gap-14 px-5 pt-20 pb-12 md:grid-cols-3 md:px-10 md:pt-24">
        <div className="order-first md:order-none md:col-start-2">
          <LogoFull />
          <p className="mx-auto mt-8 max-w-xs text-center text-[0.9375rem] leading-relaxed text-ivory/80">{d.footer.regions}</p>
        </div>
        <div className="md:col-start-1 md:row-start-1">
          <p className="eyebrow !text-gold">{d.footer.contact}</p>
          <ul className="mt-5 space-y-3 text-[0.9375rem]">
            <li>
              <a href={waLink(d.whatsapp.hello)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-3 hover:text-gold">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp · <span dir="ltr">{site.phone}</span>
              </a>
            </li>
            {site.team.map((m) => (
              <li key={m.id}>
                <a href={`tel:+${m.whatsapp}`} className="inline-flex min-h-8 items-center gap-3 hover:text-gold">
                  <PhoneIcon className="h-4 w-4" />
                  {m.name[lang]} · <span dir="ltr">{m.phone}</span>
                </a>
              </li>
            ))}
            <li>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-3 hover:text-gold">
                <InstagramIcon className="h-4 w-4" />
                <span dir="ltr">{site.instagramHandle}</span>
              </a>
            </li>
            <li className="text-ivory/80">{fill(d.footer.studio, { city: infos.studioCity[lang] })}</li>
          </ul>
        </div>
        <div className="md:text-end">
          <p className="eyebrow !text-gold">{d.footer.follow}</p>
          <ul className="mt-5 space-y-3 text-[0.9375rem] text-ivory/90">
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-8 items-center hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1400px] flex-col gap-2 border-t border-ivory/15 px-5 py-6 pb-24 text-[0.8125rem] text-ivory/75 sm:pb-6 md:flex-row md:justify-between md:px-10">
        <p>
          © {year} <span translate="no">{lang === "he" ? site.nameHe : site.nameLatin}</span> · {d.footer.rights}
        </p>
        <p className="flex flex-wrap gap-x-4">
          <span>{d.footer.credit}</span>
          <Link href={`${home}/legal`} className="underline-offset-4 hover:text-gold hover:underline">
            {d.footer.legal}
          </Link>
        </p>
      </div>
    </footer>
  );
}
