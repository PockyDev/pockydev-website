// Pino, the corgi of Putzpfote / BrushPaw, as SVG markup built at compile time.
// Drawing from the app's design prototype (PockyDev/ToothbrushTimer,
// .context/design/pino-animation-prototype.html); the brushing pose, grin, foam and toothbrush
// from the app's Compose code (pino/ui/model/PinoGeometry.kt, PinoPose.kt BRUSH_SPOTS,
// pino/ui/compose/PinoFigure.kt) as of commit fef149f. Groups the animation script moves carry a
// `data-pp` attribute (see PinoBrushing.astro).

const C = {
  fur: '#E8A54B', cream: '#FFF6EA', creamShade: '#EBD3B2', ear: '#F6B3C2', cheek: '#F49AA8',
  ink: '#2A1E3B', mouth: '#6B2537', line: '#9A5A1C', brush: '#6F8DFF', white: '#FFFFFF',
};

const HEAD = 'M100 34 C141 34 167 58 168 92 C169 120 141 137 100 137 C59 137 31 120 32 92 C33 58 59 34 100 34Z';
const MASK = 'M100 42 C104 42 106 54 107 68 C108 82 112 92 124 99 C140 108 134 133 100 135 C66 133 60 108 76 99 C88 92 92 82 93 68 C94 54 96 42 100 42Z';
const BODY = 'M100 124 C129 124 143 148 145 174 C147 198 129 212 100 212 C71 212 53 198 55 174 C57 148 71 124 100 124Z';
const BIB = 'M100 132 C115 132 123 152 123 175 C123 197 114 206 100 206 C86 206 77 197 77 175 C77 152 85 132 100 132Z';
const GRIN = 'M85 112 Q100 109 115 112 Q113 127 100 128 Q87 127 85 112Z';
const GRIN_TEETH = 'M87 112.6 Q100 110.2 113 112.6 L112.2 117.6 Q100 115.4 87.8 117.6Z';

/** First brushing spot of the app (BRUSH_SPOTS[0]); the script moves between all three. */
export const BRUSH_SPOTS = [
  { armR: -162, grip: 169 },
  { armR: -178, grip: 183 },
  { armR: -147, grip: 156 },
];
const ARM_L = 14;
const ARM_LEN = 32;
const ARM_LEN_R = 24;
const TAIL = 4;

type Fill = (key: keyof typeof C) => string;
const fill: Fill = (k) => `fill="${C[k]}"`;
const none: Fill = () => '';
const outline = `stroke="${C.line}" stroke-width="3"`;

const arm = (sx: number, sy: number, len: number, f: Fill, st: string) =>
  `<rect x="${sx - 9}" y="${sy - 6}" width="18" height="${len + 4}" rx="9" ${f('fur')} ${st}/>` +
  `<circle cx="${sx}" cy="${sy + len - 3}" r="8.5" ${f('cream')} ${st}/>`;
const armL = (f: Fill, st: string) =>
  `<g transform="rotate(${ARM_L} 68 150)">${arm(68, 150, ARM_LEN, f, st)}</g>`;
const armR = (f: Fill, st: string) =>
  `<g data-pp="arm" transform="rotate(${BRUSH_SPOTS[0].armR} 132 150)">${arm(132, 150, ARM_LEN_R, f, st)}</g>`;

const tail = (f: Fill) =>
  `<g data-pp="tail" transform="rotate(${TAIL} 142 188)"><ellipse cx="153" cy="178" rx="16" ry="10" transform="rotate(-35 153 178)" ${f('fur')}/>` +
  `<ellipse cx="162" cy="171" rx="7" ry="5" transform="rotate(-35 162 171)" ${f('cream')}/></g>`;

const silhouette = (f: Fill) =>
  tail(f) +
  `<rect x="71" y="194" width="24" height="30" rx="12" ${f('fur')}/><rect x="105" y="194" width="24" height="30" rx="12" ${f('fur')}/>` +
  `<ellipse cx="83" cy="221" rx="13" ry="7" ${f('cream')}/><ellipse cx="117" cy="221" rx="13" ry="7" ${f('cream')}/>` +
  `<path d="${BODY}" ${f('fur')}/>`;

const ears = (f: Fill) =>
  `<path d="M38 80 L45 16 Q47 4 57 10 L94 44 Z" ${f('fur')}/><path d="M162 80 L155 16 Q153 4 143 10 L106 44 Z" ${f('fur')}/>`;

const EYES_X = [72, 128];
const eyesOpen = EYES_X.map((x) =>
  `<ellipse cx="${x}" cy="88" rx="7.5" ry="9.5" fill="${C.ink}"/><circle cx="${x + 2.6}" cy="84.4" r="2.8" fill="#fff"/>`).join('');
const eyesBlink = EYES_X.map((x) =>
  `<path d="M${x - 8} 89 Q${x} 93.5 ${x + 8} 89" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>`).join('');

type Mouth = 'smile' | 'grin';
const mouths: Record<Mouth, string> = {
  smile: `<path d="M100 109 V114 M91 113 Q95.5 119 100 114 Q104.5 119 109 113" fill="none" stroke="${C.ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
  grin:
    `<path d="M100 109 V113" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="${GRIN}" fill="${C.mouth}"/><path d="${GRIN_TEETH}" fill="${C.white}"/>` +
    // Foam at the mouth corner, as in the app after the first seconds of brushing
    `<circle cx="86" cy="123" r="3.2" fill="${C.white}" stroke="${C.creamShade}"/><circle cx="82" cy="117.5" r="2.2" fill="${C.white}" stroke="${C.creamShade}"/>`,
};

const face = (clipId: string, mouth: Mouth, animated: boolean) =>
  `<path d="M50 66 L54 26 Q55 19 61 23 L83 45 Z" fill="${C.ear}"/><path d="M150 66 L146 26 Q145 19 139 23 L117 45 Z" fill="${C.ear}"/>` +
  `<path d="${HEAD}" fill="${C.fur}"/>` +
  `<clipPath id="${clipId}"><path d="${HEAD}"/></clipPath>` +
  `<path clip-path="url(#${clipId})" d="${MASK}" fill="${C.cream}"/>` +
  `<ellipse cx="55" cy="105" rx="9.5" ry="6" fill="${C.cheek}" opacity=".7"/><ellipse cx="145" cy="105" rx="9.5" ry="6" fill="${C.cheek}" opacity=".7"/>` +
  (animated ? `<g data-pp="eyes-open">${eyesOpen}</g><g data-pp="eyes-blink" visibility="hidden">${eyesBlink}</g>` : eyesOpen) +
  `<path d="M91 100 Q100 95 109 100 Q109 106 100 110 Q91 106 91 100Z" fill="${C.ink}"/><ellipse cx="97" cy="99.6" rx="2.6" ry="1.4" fill="#fff" opacity=".55"/>` +
  mouths[mouth];

// Toothbrush in the right paw: turns with the arm and by the grip angle; drawn under the paw.
const toothbrush = () => {
  const part = (x: number, y: number, w: number, h: number, r: number, color: string, sw: number) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${color}" stroke="${C.line}" stroke-width="${sw}"/>`;
  const { armR, grip } = BRUSH_SPOTS[0];
  return `<g data-pp="brush" transform="rotate(${armR} 132 150) translate(132 ${150 + ARM_LEN_R - 3}) rotate(${grip})">` +
    part(-36, -3.6, 38, 7.2, 3.6, C.brush, 2.4) + part(-46, -4.6, 14, 9.2, 3, C.brush, 2.4) + part(-45, -12, 12, 7, 2, C.white, 2) +
    '</g>';
};

/** Full-body Pino brushing his teeth (first brushing spot), for the landing page's stage. */
export const pinoBrushingSvg = (clipId: string) => {
  const head = (s: string) => `<g data-pp="head">${s}</g>`;
  const outlinePass =
    `<g fill="${C.line}" stroke="${C.line}" stroke-width="6.5" stroke-linejoin="round">` +
    silhouette(none) + head(ears(none) + `<path d="${HEAD}"/>`) + armL(none, '') +
    `<g data-pp="scrub">${armR(none, '')}</g></g>`;
  return (
    `<ellipse cx="100" cy="231" rx="50" ry="6" class="pp-shadow"/>` +
    `<g data-pp="body">` +
    outlinePass +
    silhouette(fill) +
    `<path d="${BIB}" fill="${C.cream}"/>` +
    `<ellipse data-pp="collar" cx="100" cy="137" rx="32" ry="7" fill="${C.creamShade}"/>` +
    head(ears(fill) + face(clipId, 'grin', true)) +
    armL(fill, outline) +
    `<g data-pp="scrub">${toothbrush()}${armR(fill, outline)}</g>` +
    `</g>`
  );
};

/** Pino's smiling head only, as the app icon's stand-in on the home page tile. */
export const pinoHeadSvg = (clipId: string) =>
  `<g fill="${C.line}" stroke="${C.line}" stroke-width="6.5" stroke-linejoin="round">${ears(none)}<path d="${HEAD}"/></g>` +
  ears(fill) + face(clipId, 'smile', false);
