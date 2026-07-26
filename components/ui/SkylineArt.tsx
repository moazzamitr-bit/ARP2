import { cn } from "@/lib/utils";

/**
 * Line-art Dubai skyline used behind page heroes (proposal slides 14–22).
 *
 * The city is drawn once into a <defs> group and mirrored below the waterline
 * to produce the reflection, so the silhouette and its reflection can never
 * drift apart. Decorative only — hidden from assistive tech.
 */
export function SkylineArt({ className }: { className?: string }) {
  return (
    <svg
      className={cn("skyline-art", className)}
      viewBox="0 0 900 340"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="skyline-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b3d91" stopOpacity="0.015" />
          <stop offset="55%" stopColor="#0b3d91" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#0b3d91" stopOpacity="0.13" />
        </linearGradient>
        <linearGradient id="skyline-streak" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#2ead4b" stopOpacity="0" />
          <stop offset="55%" stopColor="#2ead4b" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#2ead4b" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="skyline-reflection-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#fff" stopOpacity="1" />
        </linearGradient>

        <g id="arp-skyline-city">
          <g fill="url(#skyline-fill)" stroke="#a8c4e6" strokeWidth="1" strokeLinejoin="round">
            {/* Far-left low rise */}
            <path d="M4 262 V214 h26 v-16 h22 v64 Z" />
            <path d="M60 262 V196 l16 -12 l16 12 v66 Z" />
            <path d="M100 262 V228 h38 v-18 h26 v52 Z" />

            {/* Mid-left cluster */}
            <path d="M172 262 V172 h20 v-22 h12 v22 h20 v90 Z" />
            <path d="M234 262 V208 h34 v-14 h20 v68 Z" />
            <path d="M296 262 V150 l14 -14 l14 14 v112 Z" />
            <path d="M334 262 V196 h30 v-24 h20 v90 Z" />
            <path d="M392 262 V180 h16 v-30 h14 v30 h16 v82 Z" />

            {/* Emirates-style twin towers */}
            <path d="M444 262 V128 l12 -26 l12 26 v134 Z" />
            <path d="M476 262 V148 l11 -22 l11 22 v114 Z" />

            {/* Burj Khalifa */}
            <path d="M516 262 V150 h10 V108 h9 V56 l4.5 -44 l4.5 44 v52 h9 v42 h10 v112 Z" />

            {/* Mid-right cluster */}
            <path d="M572 262 V166 h18 v-26 h14 v26 h18 v96 Z" />
            <path d="M634 262 V206 h36 v-16 h22 v72 Z" />
            <path d="M700 262 V158 l14 -16 l14 16 v104 Z" />
            <path d="M740 262 V192 h28 v-22 h18 v92 Z" />

            {/* Far-right low rise */}
            <path d="M798 262 V216 h30 v-14 h20 v60 Z" />
            <path d="M858 262 V184 l12 -12 l12 12 v78 Z" />
          </g>

          {/* Window hatching on the taller towers */}
          <g stroke="#c3d8ef" strokeWidth="0.7" opacity="0.8">
            <path d="M178 186 H216 M178 206 H216 M178 226 H216 M178 246 H216" />
            <path d="M300 166 H320 M300 186 H320 M300 206 H320 M300 226 H320 M300 246 H320" />
            <path d="M448 146 H466 M448 168 H466 M448 190 H466 M448 212 H466 M448 234 H466" />
            <path d="M520 164 H550 M520 186 H550 M520 208 H550 M520 230 H550 M520 252 H550" />
            <path d="M704 172 H724 M704 194 H724 M704 216 H724 M704 238 H724" />
            <path d="M862 196 H882 M862 218 H882 M862 240 H882" />
          </g>
        </g>
      </defs>

      {/* Green accent streak sweeping up to the right */}
      <path d="M430 300 L900 74" stroke="url(#skyline-streak)" strokeWidth="2.5" fill="none" />

      <use href="#arp-skyline-city" />

      {/* Mirrored reflection about the waterline at y = 262 */}
      <g opacity="0.28">
        <use href="#arp-skyline-city" transform="translate(0 524) scale(1 -1)" />
      </g>
      <rect x="0" y="262" width="900" height="78" fill="url(#skyline-reflection-fade)" />

      {/* Waterline */}
      <path d="M0 262 H900" stroke="#bcd4ec" strokeWidth="1" opacity="0.7" />
    </svg>
  );
}
