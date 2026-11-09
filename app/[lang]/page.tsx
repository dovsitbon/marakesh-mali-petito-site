import Image from "next/image";
import site from "@/data/site.json";
import infos from "@/data/infos.json";
import stats from "@/data/stats.json";
import formules from "@/data/formules.json";
import realisations from "@/data/realisations.json";
import avis from "@/data/avis.json";
import { Reveal } from "@/components/Reveal";
import { QuoteForm } from "@/components/QuoteForm";
import { TenuesGallery } from "@/components/TenuesGallery";
import { PrefillLink } from "@/components/PrefillLink";
import { TvClip } from "@/components/TvClip";
import { Rosette } from "@/components/Logo";
import { ArrowIcon, InstagramIcon, PhoneIcon, PlusIcon, WhatsAppIcon } from "@/components/icons";
import { altOf, fill, getDict, type Dict, type Locale } from "@/lib/i18n";
import { homeJsonLd } from "@/lib/jsonld";
import { img } from "@/lib/media";
import { shekels, waLink, type Formula } from "@/lib/quote";

function Photo({ src, d, sizes, className = "", imgClass = "", priority = false }: { src: string; d: Dict; sizes: string; className?: string; imgClass?: string; priority?: boolean }) {
  const p = img(src);
  return (
    <div className={`bg-sand ${className}`}>
      <Image src={p.src} width={p.width} height={p.height} alt={altOf(d, p.src)} sizes={sizes} priority={priority} className={`h-full w-full object-cover ${imgClass}`} />
    </div>
  );
}

function SectionHead({ eyebrow, title, text, center = false, id, dark = false }: { eyebrow: string; title: string; text?: string; center?: boolean; id?: string; dark?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`eyebrow ${dark ? "!text-gold" : ""}`}>{eyebrow}</p>
      <h2 id={id} className="display mt-5 text-[2.5rem] md:text-[3.6rem]">
        {title}
      </h2>
      {text && <p className={`mt-6 text-[1.0625rem] leading-[1.9] ${dark ? "text-ivory/80" : "text-muted"} ${center ? "mx-auto max-w-xl" : "max-w-xl"}`}>{text}</p>}
    </Reveal>
  );
}

const SERVICE_IMAGES: Record<string, string> = {
  full: "/media/hero/trone-jardin.jpg",
  home: "/media/ceremonies/salon-blanc-or.jpg",
  mitsva: "/media/bar-bat-mitsva/bat-mitsva-trone-rouge.jpg",
  outfits: "/media/tenues/couple-turquoise-emeraude.jpg",
};

const BLOCK_IMAGES: Record<string, string> = {
  tradition: "/media/tenues/famille-or-brocart.jpg",
  day: "/media/ceremonies/cortege-tambour.jpg",
  intimate: "/media/ceremonies/chez-soi-jardin.jpg",
};

const FORMULA_ANCHORS: Record<string, string> = { home: "maison", mitsva: "mitsva" };

const CLIPS = ["arouts14-matin", "arouts14-patriotes", "arouts12-paula-leon", "arouts12-mimouna"] as const;

const CELEB_IMAGES: Record<string, string> = {
  eden: "/media/tv/eden-harel-henne.jpg",
  itay: "/media/tenues/marie-gilet-turquoise.jpg",
};

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const d = getDict(lang);
  const channels = lang === "he" ? ["ערוץ 12", "ערוץ 14"] : ["Channel 12", "Channel 14"];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd(lang)).replace(/</g, "\\u003c") }} />

      {/* ——— Hero : les mariés en or sur son trône, dans une arche ; 2 boutons ——— */}
      <section aria-labelledby="hero-title" className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 pt-32 pb-16 md:grid-cols-[1fr_0.9fr] md:gap-16 md:px-10 md:pt-44 md:pb-24 lg:gap-24">
        <div className="relative mx-auto w-[min(80vw,420px)] md:order-2 md:w-full md:max-w-[480px]">
          <span className="arch-frame" aria-hidden="true" />
          <Photo src="/media/hero/maries-or-trone.jpg" d={d} priority sizes="(min-width: 768px) 40vw, 80vw" className="arch rise aspect-[4/5]" imgClass="object-[50%_25%]" />
        </div>
        <div className="text-center md:text-start">
          <p className="eyebrow rise">{d.hero.eyebrow}</p>
          <h1 id="hero-title" className="display rise mt-6 text-[3.3rem] text-henna md:text-[4.8rem] lg:text-[5.8rem]" style={{ animationDelay: "0.1s" }}>
            {d.hero.title}
          </h1>
          <p className="lead rise mx-auto mt-7 max-w-lg md:mx-0" style={{ animationDelay: "0.2s" }}>
            {d.hero.text}
          </p>
          <div className="rise mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start" style={{ animationDelay: "0.3s" }}>
            <a href="#contact" className="btn-solid w-full sm:w-auto">
              {d.hero.cta}
            </a>
            <a href="#mariees" className="btn-line w-full sm:w-auto">
              {d.hero.secondary}
            </a>
          </div>
        </div>
      </section>

      {/* ——— Bande de preuves : 30 ans, vus à la télévision, cérémonies, conseil offert ——— */}
      <section aria-label={d.proof.tv} className="border-y border-line">
        <dl className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-8 px-5 py-10 text-center md:grid-cols-4 md:px-10 md:py-12">
          <div className="flex flex-col-reverse gap-2">
            <dt className="text-[0.9375rem] text-muted">{d.proof.years}</dt>
            <dd className="num text-[2.2rem] text-henna" dir="ltr">{d.proof.yearsValue}</dd>
          </div>
          <div className="flex flex-col-reverse gap-2 md:col-span-2 md:border-x md:border-line">
            <dt className="text-[0.9375rem] text-muted">{d.proof.tv}</dt>
            <dd className="flex items-center justify-center gap-4 font-[family-name:var(--font-display)] text-[1.7rem] text-ink">
              <span>{channels[0]}</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
              <span>{channels[1]}</span>
            </dd>
          </div>
          {stats.ceremonies ? (
            <div className="flex flex-col-reverse gap-2">
              <dt className="text-[0.9375rem] text-muted">{d.proof.ceremonies}</dt>
              <dd className="num text-[2.2rem] text-henna">{stats.ceremonies}+</dd>
            </div>
          ) : (
            // À REMPLIR : nombre de cérémonies réalisées (data/stats.json → ceremonies)
            <div className="flex flex-col-reverse gap-2">
              <dt className="sr-only">{d.proof.free}</dt>
              <dd className="flex h-full items-center justify-center text-[1.0625rem] text-ink">{d.proof.free}</dd>
            </div>
          )}
        </dl>
      </section>

      {/* ——— Cartes portrait des prestations (style Begnis) ——— */}
      <section id="productions" aria-labelledby="productions-title" className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <SectionHead id="productions-title" eyebrow={d.services.eyebrow} title={d.services.title} center />
          <ul className="mt-16 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {d.services.items.map((s, i) => (
              <Reveal as="li" key={s.id} delay={i * 0.08} className="group">
                <a href={s.href} className="block">
                  <Photo src={SERVICE_IMAGES[s.id]} d={d} sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 92vw" className="shine aspect-[3/4]" />
                  <h3 className="display mt-6 text-[1.75rem]">{s.name}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
                  <span className="nav-link mt-5 inline-flex items-center gap-2 text-henna">
                    {d.services.cta}
                    <ArrowIcon className="h-3.5 w-3.5 rtl:-scale-x-100" />
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ——— Formules : la seule section émeraude ——— */}
      <section id="formules" aria-labelledby="formules-title" className="bg-emerald py-24 text-ivory md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <SectionHead id="formules-title" eyebrow={d.formulas.eyebrow} title={d.formulas.title} text={d.formulas.text} dark />
          <ul className="mt-16 grid gap-px overflow-hidden border border-ivory/15 bg-ivory/15 md:grid-cols-2 lg:grid-cols-4">
            {formules.items.map((fm, i) => {
              const t = d.formulas.items[i];
              const inc = (k: string) => d.formulas.inclusions[k as keyof Dict["formulas"]["inclusions"]];
              return (
                <Reveal as="li" key={fm.id} id={FORMULA_ANCHORS[fm.id]} delay={i * 0.06} className="flex scroll-mt-28 flex-col bg-emerald p-7 md:p-8">
                  <span className="num text-[0.8125rem] text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display mt-4 text-[1.9rem]">{t.name}</h3>
                  <p className="mt-3 leading-relaxed text-ivory/80">{t.text}</p>
                  <p className="mt-6 text-[1.0625rem] text-gold">{fm.priceFrom ? fill(d.formulas.from, { price: shekels(fm.priceFrom, lang) }) : d.formulas.onRequest}</p>
                  <p className="label mt-7 !text-ivory/70">{d.formulas.includesLabel}</p>
                  <ul className="mt-3 space-y-2.5 text-[0.9375rem] leading-snug">
                    {fm.includes.map((k) => (
                      <li key={k} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-gold" />
                        {inc(k)}
                      </li>
                    ))}
                  </ul>
                  {fm.extras.length > 0 && (
                    <>
                      <p className="label mt-6 !text-ivory/70">{d.formulas.extrasLabel}</p>
                      <ul className="mt-3 space-y-2 text-[0.9375rem] leading-snug text-ivory/80">
                        {fm.extras.map((k) => (
                          <li key={k} className="flex gap-3">
                            <span aria-hidden="true" className="mt-[0.5em] text-gold">+</span>
                            {inc(k)}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  <div className="flex-1" />
                  <PrefillLink prefill={{ formula: fm.id as Formula }} className="nav-link mt-8 inline-flex min-h-11 items-center gap-2 text-ivory underline-offset-8 hover:underline">
                    {d.formulas.cta}
                    <ArrowIcon className="h-3.5 w-3.5 rtl:-scale-x-100" />
                  </PrefillLink>
                </Reveal>
              );
            })}
          </ul>
          <p className="mt-8 text-[0.875rem] text-ivory/70">{d.formulas.note}</p>
        </div>
      </section>

      {/* ——— L'atelier et les tenues : galerie filtrable ——— */}
      <section id="tenues" aria-labelledby="tenues-title" className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <SectionHead id="tenues-title" eyebrow={d.outfits.eyebrow} title={d.outfits.title} text={d.outfits.text} center />
          <div className="mt-12">
            <TenuesGallery />
          </div>
          <div className="mt-14 text-center">
            <a href={waLink(d.whatsapp.hello)} target="_blank" rel="noopener noreferrer" className="btn-line">
              {d.outfits.cta}
            </a>
          </div>
        </div>
      </section>

      {/* ——— Vu à la télévision (son au clic) + célébrités ——— */}
      <section id="tv" aria-labelledby="tv-title" className="bg-ink py-24 text-ivory md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <SectionHead id="tv-title" eyebrow={d.tv.eyebrow} title={d.tv.title} text={d.tv.text} dark />
          <ul className="mt-14 grid gap-x-6 gap-y-10 md:grid-cols-2">
            {CLIPS.map((c, i) => (
              <Reveal as="li" key={c} delay={(i % 2) * 0.08}>
                <TvClip name={c} poster={`/media/video/${c}.jpg`} label={d.tv.clips[c]} alt={d.alt[c]} />
              </Reveal>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-[0.9375rem] leading-relaxed text-ivory/70">{d.tv.press}</p>

          <div id="celebs" className="mt-24 border-t border-ivory/15 pt-20">
            <SectionHead eyebrow={d.celebs.eyebrow} title={d.celebs.title} dark />
            <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {d.celebs.items.map((c, i) => (
                <Reveal as="li" key={c.id} delay={i * 0.08}>
                  {c.id === "nir" ? (
                    <div className="mx-auto max-w-[19rem] sm:max-w-none">
                      <TvClip name="temoignage-nir-klinger" poster="/media/video/temoignage-nir-klinger.jpg" label={c.name} alt={d.alt["temoignage-nir-klinger"]} portrait />
                    </div>
                  ) : (
                    <>
                      <Photo src={CELEB_IMAGES[c.id]} d={d} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw" className="aspect-[4/5]" imgClass="object-[50%_25%]" />
                      <p className="mt-4 text-[0.9375rem] text-ivory/85">{c.name}</p>
                    </>
                  )}
                  <p className="mt-2 leading-relaxed text-ivory/65">{c.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ——— Trois blocs alternés photo + texte court + un bouton ——— */}
      <section aria-label={d.blocks[0].eyebrow} className="py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] space-y-24 px-5 md:space-y-32 md:px-10">
          {d.blocks.map((b, i) => (
            <article key={b.id} className="grid items-center gap-10 md:grid-cols-2 md:gap-20">
              <Reveal className={i % 2 ? "md:order-2" : ""}>
                <Photo src={BLOCK_IMAGES[b.id]} d={d} sizes="(min-width: 768px) 45vw, 92vw" className={`aspect-[4/5] ${i === 1 ? "arch" : ""}`} />
              </Reveal>
              <Reveal delay={0.1}>
                <p className="eyebrow">{b.eyebrow}</p>
                <h2 className="display mt-5 text-[2.3rem] md:text-[3.1rem]">{b.title}</h2>
                <p className="lead mt-6 max-w-md">{b.text}</p>
                {i === 0 && (
                  <p className="mt-6 text-[0.9375rem] text-gold-ink">
                    <bdi dir="ltr">{d.proof.yearsValue}</bdi> {d.proof.years}
                  </p>
                )}
                <a href={b.href} className={`${b.href === "#contact" ? "btn-solid" : "btn-line"} mt-9`}>
                  {b.cta}
                </a>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      {/* ——— Nos mariées : grille par couple (style Social Pantry) ——— */}
      <section id="mariees" aria-labelledby="brides-title" className="bg-sand py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHead id="brides-title" eyebrow={d.brides.eyebrow} title={d.brides.title} text={d.brides.text} />
            <Reveal>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link-line nav-link inline-flex items-center gap-2 whitespace-nowrap">
                <InstagramIcon className="h-4 w-4" />
                {d.brides.more}
              </a>
            </Reveal>
          </div>
          <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-5 lg:grid-cols-3">
            {realisations.items.map((r, i) => (
              <Reveal as="li" key={r.id} delay={(i % 3) * 0.08} className="group">
                <Photo src={r.image} d={d} sizes="(min-width: 1024px) 31vw, 48vw" className="shine aspect-[4/5]" />
                <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-3">
                  <h3 className="display text-[1.5rem] md:text-[1.8rem]" dir="ltr" translate="no">
                    {r.initials}
                  </h3>
                  {r.guests && <span className="num shrink-0 text-[0.875rem] text-muted">{fill(d.brides.guests, { n: r.guests })}</span>}
                </div>
                {r.place && <p className="mt-1 text-[0.9375rem] text-muted">{r.place[lang]}</p>}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ——— À propos : portrait de Mali + un seul bouton (style Mindy Weiss) ——— */}
      <section id="about" aria-labelledby="about-title" className="py-24 md:py-32">
        <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-5 md:grid-cols-[0.85fr_1fr] md:gap-24 md:px-10">
          <Reveal className="relative mx-auto w-[min(78vw,400px)] md:w-full">
            <span className="arch-frame" aria-hidden="true" />
            <Photo src="/media/tv/mali-plateau-mimouna.jpg" d={d} sizes="(min-width: 768px) 40vw, 78vw" className="arch aspect-[4/5]" imgClass="object-[50%_20%]" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">{d.about.eyebrow}</p>
            <h2 id="about-title" className="display mt-5 text-[2.6rem] md:text-[3.6rem]">
              {d.about.title}
            </h2>
            {/* À REMPLIR : l'histoire de la famille et de l'atelier, et un vrai portrait de Mali */}
            <p className="lead mt-7">{d.about.p1}</p>
            <p className="lead mt-5">{d.about.p2}</p>
            <p className="display mt-8 text-[1.75rem] leading-snug text-henna">{d.about.quote}</p>
            <a href={`https://wa.me/${site.team[0].whatsapp}?text=${encodeURIComponent(d.whatsapp.hello)}`} target="_blank" rel="noopener noreferrer" className="btn-solid mt-10">
              {d.about.cta}
            </a>
          </Reveal>
        </div>
      </section>

      {/* ——— Pourquoi nous (story « למה דווקא בנו ») ——— */}
      <section id="pourquoi" aria-labelledby="why-title" className="border-t border-line py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <SectionHead id="why-title" eyebrow={d.why.eyebrow} title={d.why.title} center />
          <ol className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {d.why.items.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 0.06} className="border-t border-gold/60 pt-6">
                <span className="num text-[0.8125rem] text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-3 text-[1.6rem]">{w.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{w.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ——— Avis : uniquement de vrais avis (data/avis.json) ——— */}
      <section id="avis" aria-labelledby="reviews-title" className="bg-sand py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-10">
          <Reveal>
            <Rosette className="mx-auto h-12 w-12 text-gold" strokeWidth={1.3} />
            <p className="eyebrow mt-8">{d.reviews.eyebrow}</p>
            <h2 id="reviews-title" className="display mt-5 text-[2.4rem] md:text-[3.4rem]">
              {d.reviews.title}
            </h2>
          </Reveal>
          {/* À REMPLIR avec d'autres vrais avis clientes (data/avis.json) – n'en inventer aucun */}
          {avis.items.map((r) => (
            <Reveal key={r.id} delay={0.1}>
              <figure className="mt-14">
                <blockquote className="text-[1.15rem] leading-[1.85] md:text-[1.3rem]">{r.text[lang]}</blockquote>
                <figcaption className="mt-6 text-[0.9375rem] text-muted">
                  <span className="text-ink">{r.name[lang]}</span> · {r.source[lang]}
                  {d.reviews.translated && <span className="block text-[0.8125rem]">{d.reviews.translated}</span>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ——— FAQ ——— */}
      <section id="faq" aria-labelledby="faq-title" className="py-24 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-5 md:grid-cols-[1fr_1.6fr] md:gap-20 md:px-10">
          <SectionHead id="faq-title" eyebrow={d.faq.eyebrow} title={d.faq.title} />
          <Reveal>
            <div className="border-t border-line">
              {d.faq.items.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.125rem] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <PlusIcon className="h-4 w-4 shrink-0 text-henna transition-transform duration-500 group-open:rotate-45" />
                  </summary>
                  <p className="pb-6 leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— Demande de devis ——— */}
      <section id="contact" aria-labelledby="contact-title" className="bg-sand py-24 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-14 px-5 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:px-10">
          <Reveal>
            <p className="eyebrow">{d.book.eyebrow}</p>
            <h2 id="contact-title" className="display mt-5 text-[2.4rem] md:text-[3.3rem]">
              {d.book.title}
            </h2>
            <p className="lead mt-6">{d.book.text}</p>
            <p className="mt-6 text-[0.9375rem] text-gold-ink">
              <bdi dir="ltr">{d.proof.yearsValue}</bdi> {d.proof.years} · {channels.join(" · ")}
            </p>
            <p className="label mt-10">{d.book.or}</p>
            <ul className="mt-4 space-y-3 text-[1rem]">
              <li>
                <a href={waLink(d.whatsapp.hello)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 hover:text-henna">
                  <WhatsAppIcon className="h-5 w-5 text-emerald" />
                  WhatsApp · <span dir="ltr">{site.phone}</span>
                </a>
              </li>
              {site.team.map((m) => (
                <li key={m.id}>
                  <a href={`tel:+${m.whatsapp}`} className="inline-flex min-h-11 items-center gap-3 hover:text-henna">
                    <PhoneIcon className="h-5 w-5 text-emerald" />
                    {m.name[lang]} · <span dir="ltr">{m.phone}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 hover:text-henna">
                  <InstagramIcon className="h-5 w-5 text-emerald" />
                  <span dir="ltr">{site.instagramHandle}</span>
                </a>
              </li>
            </ul>
            <p className="mt-8 text-[0.9375rem] text-muted">{fill(d.book.studio, { city: infos.studioCity[lang] })}</p>
          </Reveal>
          <Reveal delay={0.1} className="bg-ivory p-6 md:p-12">
            <QuoteForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
