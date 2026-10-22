import { url } from './url';

export interface App {
  slug: string;
  name: string;
  packageName: string;
  icon: string;
  tagline: string;
  teaser: string;
  facts: string[];
  screenshots: { src: string; alt: string }[];
}

export const playStoreUrl = (app: App) =>
  `https://play.google.com/store/apps/details?id=${app.packageName}`;

export const apps: App[] = [
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
];
