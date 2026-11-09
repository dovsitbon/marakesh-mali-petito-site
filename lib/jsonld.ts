import site from "@/data/site.json";
import infos from "@/data/infos.json";
import avis from "@/data/avis.json";
import formules from "@/data/formules.json";
import { getDict, type Locale } from "@/lib/i18n";

/** Données structurées : EventPlanner (LocalBusiness), une Service par prestation avec prix « à partir de », avis réels, FAQ. */
export function homeJsonLd(lang: Locale) {
  const d = getDict(lang);
  const areaServed = infos.regions ?? [{ "@type": "Country", name: "Israel" }];
  const business = `${site.url}/#business`;
  const service = (name: string, description: string, serviceType: string, price?: number | null) => ({
    "@type": "Service",
    name,
    description,
    serviceType,
    provider: { "@id": business },
    areaServed,
    ...(price ? { offers: { "@type": "Offer", priceCurrency: "ILS", priceSpecification: { "@type": "PriceSpecification", minPrice: price, priceCurrency: "ILS" } } } : {}),
  });
  const price = (id: string) => formules.items.find((f) => f.id === id)?.priceFrom ?? null;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EventPlanner", "LocalBusiness"],
        "@id": business,
        name: lang === "he" ? site.nameHe : `${site.nameLatin} – ${site.nameHe}`,
        alternateName: ["מרקש מלי פטיטו", "Marakesh Mali Petito", "Marrakesh Mali Petito", "מרקש – הפקות טקסי חינה"],
        slogan: d.hero.title,
        description: d.meta.description,
        url: `${site.url}/${lang}`,
        image: `${site.url}/og.jpg`,
        logo: `${site.url}/icon.svg`,
        telephone: site.phoneIntl.replace(/[\s-]/g, ""),
        address: { "@type": "PostalAddress", addressLocality: infos.studioCity.en, addressCountry: "IL" },
        areaServed,
        founder: { "@type": "Person", name: "Mali Petito" },
        sameAs: [site.instagram],
        review: avis.items.map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.name.en.split(",")[0] },
          reviewBody: r.text.he,
          inLanguage: "he",
        })),
      },
      service(d.formulas.items[0].name, d.formulas.items[0].text, "Moroccan henna ceremony production", price("full")),
      service(d.formulas.items[1].name, d.formulas.items[1].text, "Home henna package", price("home")),
      service(d.formulas.items[2].name, d.formulas.items[2].text, "Bar and bat mitzvah henna", price("mitsva")),
      service(d.services.items[3].name, d.services.items[3].text, "Made-to-measure henna outfits"),
      {
        "@type": "FAQPage",
        mainEntity: d.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };
}
