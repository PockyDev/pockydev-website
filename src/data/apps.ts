import { url } from './url';
import type { Lang } from './i18n';

export interface App {
  slug: 'kfz-kennzeichen-finder' | 'phonea';
  name: string;
  packageName: string;
  icon: string;
  tagline: string;
  teaser: string;
  facts: string[];
  screenshots: { src: string; alt: string }[];
}

export const playStoreUrl = (app: App, lang: Lang) =>
  `https://play.google.com/store/apps/details?id=${app.packageName}&hl=${lang}`;

const appsByLang: Record<Lang, App[]> = {
  de: [
    {
      slug: 'kfz-kennzeichen-finder',
      name: 'Kfz Kennzeichen Finder',
      packageName: 'de.pockydev.kfzfinder',
      icon: url('/images/apps/kfz-kennzeichen-finder.png'),
      tagline: 'Woher kommt das Auto?',
      teaser: 'Über 900 Kfz-Kennzeichen aus Deutschland, Österreich und der Schweiz – mit Karte, Wikipedia-Infos und auch offline.',
      facts: ['903 Kennzeichen', 'DE · AT · CH', 'offline', 'kostenlos'],
      screenshots: [
        { src: url('/images/screens/kfz-1.webp'), alt: 'Suche nach einem Kennzeichen' },
        { src: url('/images/screens/kfz-2.webp'), alt: 'Detailseite mit Karte und Wikipedia-Info' },
        { src: url('/images/screens/kfz-3.webp'), alt: 'Alphabetische Liste aller Kennzeichen' },
      ],
    },
    {
      slug: 'phonea',
      name: 'Phonea – Buchstabiertafel',
      packageName: 'de.pockydev.phonea',
      icon: url('/images/apps/phonea.png'),
      tagline: 'Nie wieder falsch buchstabieren am Telefon',
      teaser: 'Jedes Wort sicher buchstabieren – mit DIN 5009, NATO-Alphabet und weiteren Buchstabiertafeln. Ohne Werbung.',
      facts: ['6 Buchstabiertafeln', 'DIN 5009', 'ohne Werbung', 'offline'],
      screenshots: [
        { src: url('/images/screens/phonea-1.webp'), alt: 'Wort eingeben und buchstabieren lassen' },
        { src: url('/images/screens/phonea-2.webp'), alt: 'Buchstabiertafel auswählen' },
        { src: url('/images/screens/phonea-3.webp'), alt: 'Übersicht der ganzen Tafel' },
      ],
    },
  ],
  en: [
    {
      slug: 'kfz-kennzeichen-finder',
      name: 'License Plate Finder',
      packageName: 'de.pockydev.kfzfinder',
      icon: url('/images/apps/kfz-kennzeichen-finder.png'),
      tagline: 'Where is that car from?',
      teaser: 'More than 900 number plate codes from Germany, Austria and Switzerland – with map, Wikipedia summary and offline search.',
      facts: ['903 codes', 'DE · AT · CH', 'offline', 'free'],
      screenshots: [
        { src: url('/images/screens/kfz-en-1.webp'), alt: 'Searching for a number plate code' },
        { src: url('/images/screens/kfz-en-2.webp'), alt: 'Detail page with map and Wikipedia summary' },
        { src: url('/images/screens/kfz-en-3.webp'), alt: 'Alphabetical list of all codes' },
      ],
    },
    {
      slug: 'phonea',
      name: 'Phonea – Phonetic Alphabet',
      packageName: 'de.pockydev.phonea',
      icon: url('/images/apps/phonea.png'),
      tagline: 'Never misspell on the phone again',
      teaser: 'Spell any word clearly – with the NATO phonetic alphabet, the German DIN 5009 table and more. No ads.',
      facts: ['6 spelling alphabets', 'NATO', 'no ads', 'offline'],
      screenshots: [
        { src: url('/images/screens/phonea-1.webp'), alt: 'Typing a word to spell it (German app screenshot)' },
        { src: url('/images/screens/phonea-2.webp'), alt: 'Choosing a spelling alphabet (German app screenshot)' },
        { src: url('/images/screens/phonea-3.webp'), alt: 'Overview of the full table (German app screenshot)' },
      ],
    },
  ],
};

export const getApps = (lang: Lang) => appsByLang[lang];
export const getApp = (slug: App['slug'], lang: Lang) => appsByLang[lang].find((a) => a.slug === slug)!;
