// Trie les photos de Marakesh Mali Petito (assets/raw/malipetito_*.jpg) dans assets/<catégorie>/ avec des noms lisibles,
// les prépare pour le web dans public/media/<catégorie>/ (next/image sert ensuite AVIF/WebP),
// puis découpe et compresse les extraits TV et le témoignage vidéo dans public/media/video/ (ffmpeg).
//   npm run media
//
// Source : son Instagram public @marakesh_mali_petito (99 publications + 14 stories à la une), récupéré le 9 novembre 2026
// dans l'ordre du profil : malipetito_NN_<code>[_k][_video-cover].jpg ; stories : malipetito_hl_<story>_NN.jpg.
// Vidéos sources (lourdes, non versionnées) : assets/video-src/.
// Écartés volontairement : visuels chargés de texte (promos, captures), captures d'écran TV basse définition,
// photos floues ou anciennes, plans où des invités sont reconnaissables au premier plan.
import { copyFile, mkdir, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const rawFiles = await readdir(path.join(ROOT, "assets/raw"));

/** « 06:4 » → 4e image de la publication 06 ; « 68v » → couverture du reel 68 ; « hl:tv12_11 » → story à la une. */
const R = (spec) => {
  let f;
  if (spec.startsWith("hl:")) f = `malipetito_hl_${spec.slice(3)}.jpg`;
  else {
    const video = spec.endsWith("v");
    const [n, k] = spec.replace(/v$/, "").split(":");
    f = rawFiles.find((x) => {
      if (!x.startsWith(`malipetito_${n}_`)) return false;
      const isCover = x.includes("_video-cover");
      if (video !== isCover) return false;
      return k ? x.endsWith(`_${k}.jpg`) || x.endsWith(`_${k}_video-cover.jpg`) : !/_\d+(_video-cover)?\.jpg$/.test(x.replace(/^malipetito_\d+_/, ""));
    });
  }
  if (!f || !rawFiles.includes(f)) throw new Error(`Photo ${spec} introuvable`);
  return `raw/${f}`;
};

// [source, catégorie, nom, recadrage facultatif en fractions {top, bottom, left, right}]
const PICKS = [
  // Hero : mariés en tenues dorées brodées sur le trône doré, en plein air
  [R("06:4"), "hero", "maries-or-trone"],
  [R("06:5"), "hero", "trone-jardin"],

  // Tenues de la mariée
  [R("37"), "tenues", "mariee-satin-fuchsia"],
  [R("77:4"), "tenues", "mariee-argent-brode"],
  [R("77:7"), "tenues", "mariee-brocart-bleu"],
  [R("92:3"), "tenues", "mariee-satin-blanc-perle"],
  [R("96"), "tenues", "mariee-couronne-bleue", { top: 0, bottom: 0.88 }],
  [R("77:3"), "tenues", "mariee-bustier-dore"],
  // Tenues du marié
  [R("68v"), "tenues", "marie-gilet-brode"],
  [R("88"), "tenues", "marie-gilet-turquoise"],
  // Couples et famille
  [R("38:2"), "tenues", "couple-turquoise-emeraude"],
  [R("39:1"), "tenues", "couple-satin-rose"],
  [R("77:5"), "tenues", "couple-fuchsia-gilet"],
  [R("77:6"), "tenues", "couple-brocart-emeraude"],
  [R("83:1"), "tenues", "couple-trone-blanc"],
  [R("06:3"), "tenues", "famille-or-brocart"],
  // Enfants (bat-mitsva)
  [R("01:2"), "bar-bat-mitsva", "bat-mitsva-trone-rouge"],

  // Nos mariées (une photo par couple)
  [R("02:1"), "mariees", "o-a-mains-henne"],
  [R("13v"), "mariees", "y-m-trone-dore", { top: 0.12, bottom: 0.95 }],
  [R("06:1"), "mariees", "s-o-jardin"],
  [R("40:1"), "mariees", "k-s-trone"],
  [R("hl:MA_02"), "mariees", "m-a-allee", { top: 0.17, bottom: 1 }],
  [R("hl:OE_08"), "mariees", "o-e-arche", { top: 0.12, bottom: 0.96 }],
  [R("93:3"), "mariees", "d-o-trone"],
  [R("39:2"), "mariees", "n-l-danse"],
  [R("77:1"), "mariees", "o-t-trone-blanc"],

  // Cérémonies, formules et décor
  [R("25:1"), "ceremonies", "salon-blanc-or", { top: 0, bottom: 0.84 }],
  [R("26:2"), "ceremonies", "chez-soi-jardin"],
  [R("27"), "ceremonies", "portes-blanc-or"],
  [R("28:1"), "ceremonies", "charrette-souk"],
  [R("29:3"), "ceremonies", "chameaux"],
  [R("40:5"), "ceremonies", "cortege-tambour"],
  [R("57:1"), "ceremonies", "mariee-henne-mains"],
  [R("57:3"), "ceremonies", "table-douceurs"],

  // Vu à la télévision et célébrités
  [R("01:1"), "tv", "eden-harel-henne"],
  [R("90:2"), "tv", "plateau-arouts-12"],
  [R("hl:tv12_11"), "tv", "mali-plateau-mimouna", { top: 0.42, bottom: 1 }],
  [R("97:1"), "tv", "mali-atelier-magazine", { top: 0, bottom: 1, left: 0.25, right: 0.63 }],
];

// Extraits vidéo : [source, nom, début (s), durée (s), largeur max]
const VIDEO_SRC = path.join(ROOT, "assets/video-src");
const videoFiles = existsSync(VIDEO_SRC) ? await readdir(VIDEO_SRC) : [];
const V = (n) => {
  const f = videoFiles.find((x) => x.startsWith(`malipetito_${n}_`) && x.endsWith(".mp4"));
  return f ? path.join(VIDEO_SRC, f) : null;
};
// [source, nom, début (s), durée (s), largeur max, image d'affiche à (s après le début)]
const CLIPS = [
  [V("14"), "arouts14-matin", 20, 50, 960, 6],
  [V("17"), "arouts14-patriotes", 30, 50, 960, 10],
  [V("72"), "arouts12-paula-leon", 8, 50, 720, 4],
  [V("73"), "arouts12-mimouna", 0, 50, 720, 12],
  [V("05"), "temoignage-nir-klinger", 0, 36, 540, 1],
];

const sizes = {};
for (const [src, cat, name, crop] of PICKS) {
  const file = path.join(ROOT, "assets", src);
  await mkdir(path.join(ROOT, "assets", cat), { recursive: true });
  await mkdir(path.join(ROOT, "public/media", cat), { recursive: true });
  await copyFile(file, path.join(ROOT, "assets", cat, `${name}.jpg`));
  let pipe = sharp(file).rotate();
  if (crop) {
    const { width, height } = await sharp(file).metadata();
    const top = Math.round(height * crop.top);
    const left = Math.round(width * (crop.left ?? 0));
    pipe = pipe.extract({ left, top, width: Math.round(width * (crop.right ?? 1)) - left, height: Math.round(height * crop.bottom) - top });
  }
  const info = await pipe
    .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(ROOT, "public/media", cat, `${name}.jpg`));
  sizes[`/media/${cat}/${name}.jpg`] = [info.width, info.height];
}

// Vidéos : H.264 + AAC (son coupé au départ côté site, activable au clic), image d'affiche extraite
let ffmpeg = null;
try {
  ffmpeg = execFileSync("python", ["-c", "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"]).toString().trim();
} catch {}
if (ffmpeg) {
  await mkdir(path.join(ROOT, "public/media/video"), { recursive: true });
  await mkdir(path.join(ROOT, "assets/tv"), { recursive: true });
  for (const [src, name, start, dur, w, posterAt] of CLIPS) {
    if (!src) continue;
    const out = path.join(ROOT, "public/media/video", `${name}.mp4`);
    if (!existsSync(out))
      execFileSync(ffmpeg, ["-v", "error", "-y", "-ss", String(start), "-i", src, "-t", String(dur), "-vf", `scale='min(${w},iw)':-2`, "-c:v", "libx264", "-preset", "slow", "-crf", "27", "-profile:v", "high", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", out]);
    const posterRaw = path.join(ROOT, "assets/tv", `${name}.jpg`);
    execFileSync(ffmpeg, ["-v", "error", "-y", "-ss", String(start + posterAt), "-i", src, "-frames:v", "1", "-q:v", "2", posterRaw]);
    const info = await sharp(posterRaw).resize({ width: 1280, height: 1280, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(ROOT, "public/media/video", `${name}.jpg`));
    sizes[`/media/video/${name}.jpg`] = [info.width, info.height];
  }
} else console.warn("ffmpeg introuvable (pip install imageio-ffmpeg) : vidéos non générées");

// Emplacements prévus pour les photos et vidéos qu'elle enverra
for (const dir of ["a-recevoir/photos", "a-recevoir/videos", "galerie"]) await mkdir(path.join(ROOT, "assets", dir), { recursive: true });

// Image de partage (Open Graph) 1200 × 630
await sharp(path.join(ROOT, "assets", R("06:5")))
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(ROOT, "public/og.jpg"));

await writeFile(path.join(ROOT, "data/media-sizes.json"), JSON.stringify(sizes, null, 1) + "\n");
console.log(`${PICKS.length} images et ${CLIPS.filter((c) => c[0]).length} vidéos prêtes`);
