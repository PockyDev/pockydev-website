// A smiling corgi head as SVG markup, built at compile time (same drawing style as the
// PockyDev logo corgi). Used by the home page's teaser tile.

const C = {
  fur: '#E8A54B', cream: '#FFF6EA', ear: '#F6B3C2', cheek: '#F49AA8', ink: '#2A1E3B', line: '#9A5A1C',
};

const HEAD = 'M100 34 C141 34 167 58 168 92 C169 120 141 137 100 137 C59 137 31 120 32 92 C33 58 59 34 100 34Z';
const MASK = 'M100 42 C104 42 106 54 107 68 C108 82 112 92 124 99 C140 108 134 133 100 135 C66 133 60 108 76 99 C88 92 92 82 93 68 C94 54 96 42 100 42Z';

type Fill = (key: keyof typeof C) => string;
const fill: Fill = (k) => `fill="${C[k]}"`;
const none: Fill = () => '';

const ears = (f: Fill) =>
  `<path d="M38 80 L45 16 Q47 4 57 10 L94 44 Z" ${f('fur')}/><path d="M162 80 L155 16 Q153 4 143 10 L106 44 Z" ${f('fur')}/>`;

const eyes = [72, 128].map((x) =>
  `<ellipse cx="${x}" cy="88" rx="7.5" ry="9.5" fill="${C.ink}"/><circle cx="${x + 2.6}" cy="84.4" r="2.8" fill="#fff"/>`).join('');

/** The head with outline, ears and smiling face; view box `22 -4 156 156`. */
export const corgiHeadSvg = (clipId: string) =>
  `<g fill="${C.line}" stroke="${C.line}" stroke-width="6.5" stroke-linejoin="round">${ears(none)}<path d="${HEAD}"/></g>` +
  ears(fill) +
  `<path d="M50 66 L54 26 Q55 19 61 23 L83 45 Z" fill="${C.ear}"/><path d="M150 66 L146 26 Q145 19 139 23 L117 45 Z" fill="${C.ear}"/>` +
  `<path d="${HEAD}" fill="${C.fur}"/>` +
  `<clipPath id="${clipId}"><path d="${HEAD}"/></clipPath>` +
  `<path clip-path="url(#${clipId})" d="${MASK}" fill="${C.cream}"/>` +
  `<ellipse cx="55" cy="105" rx="9.5" ry="6" fill="${C.cheek}" opacity=".7"/><ellipse cx="145" cy="105" rx="9.5" ry="6" fill="${C.cheek}" opacity=".7"/>` +
  eyes +
  `<path d="M91 100 Q100 95 109 100 Q109 106 100 110 Q91 106 91 100Z" fill="${C.ink}"/><ellipse cx="97" cy="99.6" rx="2.6" ry="1.4" fill="#fff" opacity=".55"/>` +
  `<path d="M100 109 V114 M91 113 Q95.5 119 100 114 Q104.5 119 109 113" fill="none" stroke="${C.ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
