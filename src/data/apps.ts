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
  // App with its own look on the website (colours and fonts of the app, see src/styles/<theme>.css)
  theme?: 'phonea';
  // Share image of the app page; without it the page uses the PockyDev image
  ogImage?: string;
  // Promo video on YouTube, loaded only after a click (see VideoPlayer);
  // `short` is a vertical version that phones in portrait get instead
  video?: {
    youtubeId: string; heading: string; title: string; poster: string;
    short?: { youtubeId: string; poster: string };
  };
}

// With a campaign, the link carries a Play install referrer (UTM), so the Play Console
// shows store visits and installs from the website per campaign.
export const playStoreUrl = (app: App, lang: Lang, campaign?: string) => {
  const url = `https://play.google.com/store/apps/details?id=${app.packageName}&hl=${lang}`;
  if (!campaign) return url;
  const referrer = `utm_source=pockydev_website&utm_medium=website&utm_campaign=${campaign}`;
  return `${url}&referrer=${encodeURIComponent(referrer)}`;
};

// Store link for visitors who come from a text shared in the app (app page with `?ref=share`),
// so the Play Console shows installs from shared texts apart from the website's own.
export const sharedPlayStoreUrl = (app: App, lang: Lang) => {
  const referrer = `utm_source=${app.slug}_app&utm_medium=share&utm_campaign=app_share`;
  return `https://play.google.com/store/apps/details?id=${app.packageName}&hl=${lang}&referrer=${encodeURIComponent(referrer)}`;
};

const appsByLang: Record<Lang, App[]> = {
  de: [
    {
      slug: 'kfz-kennzeichen-finder',
      name: 'Kfz Kennzeichen Finder',
      packageName: 'de.pockydev.kfzfinder',
      icon: url('/images/apps/kfz-kennzeichen-finder.png'),
      tagline: 'Woher kommt das Auto?',
      teaser: 'Über 1.300 Kfz-Kennzeichen aus Deutschland, Österreich, der Schweiz, Polen, Tschechien und Kroatien – mit Karte, Wikipedia-Infos und auch offline.',
      facts: ['über 1.300 Kennzeichen', '6 Länder', '7 Sprachen', 'offline', 'kostenlos'],
      screenshots: [
        { src: url('/images/screens/kfz-1.webp'), alt: 'Suche: HH steht für Hamburg' },
        { src: url('/images/screens/kfz-2.webp'), alt: 'Detailseite mit Karte und Wikipedia-Info' },
        { src: url('/images/screens/kfz-3.webp'), alt: 'Alphabetische Liste aller Kennzeichen' },
        { src: url('/images/screens/kfz-4.webp'), alt: 'Auswahl aus sechs Ländern' },
        { src: url('/images/screens/kfz-5.webp'), alt: 'Orte in deiner Sprache: Prag statt Praha' },
      ],
    },
    {
      slug: 'phonea',
      name: 'Phonea – Buchstabiertafel',
      packageName: 'de.pockydev.phonea',
      icon: url('/images/apps/phonea.png'),
      tagline: 'Nie wieder falsch buchstabieren am Telefon',
      teaser: 'Jedes Wort sicher buchstabieren: „P wie Potsdam“ – mit DIN 5009, NATO-Alphabet und weiteren Alphabeten. Ohne Werbung.',
      facts: ['6 Alphabete', 'DIN 5009', 'ohne Werbung', 'offline'],
      screenshots: [
        { src: url('/images/screens/phonea-1.webp'), alt: 'P wie Potsdam: jeder Buchstabe als Sprechblase' },
        { src: url('/images/screens/phonea-2.webp'), alt: 'Namen und Nummern als Favoriten merken' },
        { src: url('/images/screens/phonea-3.webp'), alt: 'Alphabet wählen: DIN 5009, NATO, Frankreich, Italien' },
        { src: url('/images/screens/phonea-4.webp'), alt: 'Das ganze Alphabet auf einen Blick' },
        { src: url('/images/screens/phonea-5.webp'), alt: 'Phonea im dunklen Design' },
      ],
      theme: 'phonea',
      ogImage: url('/images/og-phonea.jpg'),
      video: {
        youtubeId: 'hjoeRLCLhNs',
        heading: 'Phonea im Video',
        title: 'Werbevideo zu Phonea',
        poster: url('/images/phonea-video-poster.webp'),
        short: { youtubeId: 'yl2xWVRIblM', poster: url('/images/phonea-short-poster.webp') },
      },
    },
  ],
  en: [
    {
      slug: 'kfz-kennzeichen-finder',
      name: 'License Plate Finder',
      packageName: 'de.pockydev.kfzfinder',
      icon: url('/images/apps/kfz-kennzeichen-finder.png'),
      tagline: 'Where is that car from?',
      teaser: 'More than 1,300 number plate codes from Germany, Austria, Switzerland, Poland, Czechia and Croatia – with map, Wikipedia summary and offline search.',
      facts: ['1,300+ codes', '6 countries', '7 languages', 'offline', 'free'],
      screenshots: [
        { src: url('/images/screens/kfz-en-1.webp'), alt: 'Search: M stands for Munich' },
        { src: url('/images/screens/kfz-en-2.webp'), alt: 'Detail page with map and Wikipedia summary' },
        { src: url('/images/screens/kfz-en-3.webp'), alt: 'Alphabetical list of all codes' },
        { src: url('/images/screens/kfz-en-4.webp'), alt: 'Choosing one of six countries' },
        { src: url('/images/screens/kfz-en-5.webp'), alt: 'Places in your language: Prague instead of Praha' },
      ],
    },
    {
      slug: 'phonea',
      name: 'Phonea – Phonetic Alphabet',
      packageName: 'de.pockydev.phonea',
      icon: url('/images/apps/phonea.png'),
      tagline: 'Never misspell on the phone again',
      teaser: 'Spell any word clearly: “P as in Papa” – with the NATO phonetic alphabet, the German DIN 5009 alphabet and more. No ads.',
      facts: ['6 alphabets', 'NATO', 'no ads', 'offline'],
      screenshots: [
        { src: url('/images/screens/phonea-en-1.webp'), alt: 'P as in Papa: every letter as a speech bubble' },
        { src: url('/images/screens/phonea-en-2.webp'), alt: 'Keeping names and numbers as favourites' },
        { src: url('/images/screens/phonea-en-3.webp'), alt: 'Choosing an alphabet: NATO, German, French, Italian' },
        { src: url('/images/screens/phonea-en-4.webp'), alt: 'The whole alphabet at a glance' },
        { src: url('/images/screens/phonea-en-5.webp'), alt: 'Phonea in dark mode' },
      ],
      theme: 'phonea',
      ogImage: url('/images/og-phonea.jpg'),
      video: {
        youtubeId: '1xXODQne1cc',
        heading: 'Phonea in a video',
        title: 'Phonea promo video',
        poster: url('/images/phonea-en-video-poster.webp'),
        short: { youtubeId: 'BgXtgC3bXcY', poster: url('/images/phonea-en-short-poster.webp') },
      },
    },
  ],
};

export const getApps = (lang: Lang) => appsByLang[lang];
export const getApp = (slug: App['slug'], lang: Lang) => appsByLang[lang].find((a) => a.slug === slug)!;
