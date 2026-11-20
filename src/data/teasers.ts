import type { Lang } from './i18n';

// Apps that are announced but not on Google Play yet. They get a tile on the home page and a
// landing page, but no store link, no structured data and no privacy policy of their own.
// On release the app moves to apps.ts (with its privacy pages), and its teaser goes away.
export interface Teaser {
  slug: 'putzpfote';
  name: string;
  tagline: string;
  teaser: string;
  badge: string;
}

const teasersByLang: Record<Lang, Teaser[]> = {
  de: [
    {
      slug: 'putzpfote',
      name: 'Putzpfote',
      tagline: 'Pino putzt mit',
      teaser: 'Ein Zahnputz-Timer für Kinder von etwa 2 bis 6: Der Corgi Pino putzt mit, du legst Putzzeit und Auswahl fest. Ohne Werbung, und er funktioniert ohne Internet.',
      badge: 'Bald für Android',
    },
  ],
  en: [
    {
      slug: 'putzpfote',
      name: 'BrushPaw',
      tagline: 'Pino brushes along',
      teaser: 'A toothbrush timer for children aged about 2 to 6: Pino the corgi brushes along, and you choose the brushing time and what your child can pick. No ads, works offline.',
      badge: 'Coming soon to Android',
    },
  ],
};

export const getTeaser = (slug: Teaser['slug'], lang: Lang) => teasersByLang[lang].find((t) => t.slug === slug)!;
