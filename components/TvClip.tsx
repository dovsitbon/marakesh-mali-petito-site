"use client";

import { useRef, useState } from "react";
import { useLocale } from "@/components/providers";

/**
 * Extrait vidéo : jamais de son automatique. Au repos, l'affiche ; au clic, lecture avec le son.
 * Les vidéos (public/media/video) ne sont chargées qu'au clic (preload="none").
 */
export function TvClip({ name, poster, label, alt, portrait = false }: { name: string; poster: string; label: string; alt: string; portrait?: boolean }) {
  const { d } = useLocale();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.muted = false;
      void v.play();
    } else v.pause();
  };

  return (
    <figure>
      <div className={`relative overflow-hidden bg-ink ${portrait ? "aspect-[4/5]" : "aspect-video"}`}>
        <video
          ref={ref}
          src={`/media/video/${name}.mp4`}
          poster={poster}
          preload="none"
          playsInline
          controls={playing}
          aria-label={alt}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          className="h-full w-full object-cover"
        />
        {!playing && (
          <button type="button" onClick={toggle} aria-label={`${d.tv.play} – ${label}`} className="group absolute inset-0 flex items-center justify-center bg-ink/15 transition-colors duration-500 hover:bg-ink/30">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-ivory/80 bg-ink/40 text-ivory backdrop-blur-sm transition-transform duration-500 group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="ms-1 h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M7 4.5v15l12-7.5z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-4 text-[0.9375rem] text-ivory/85">{label}</figcaption>
    </figure>
  );
}
