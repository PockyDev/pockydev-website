import { url } from './url';

export type Lang = 'de' | 'en';

// Every page has a key; the same key maps to the German and the English path.
// Paths are English in both languages; English pages only add the /en prefix.
export const routes = {
  home: { de: '/', en: '/en/' },
  about: { de: '/about-me/', en: '/en/about-me/' },
  imprint: { de: '/imprint/', en: '/en/imprint/' },
  privacy: { de: '/privacy/', en: '/en/privacy/' },
  'app:kfz-kennzeichen-finder': { de: '/apps/kfz-kennzeichen-finder/', en: '/en/apps/kfz-kennzeichen-finder/' },
  'app:phonea': { de: '/apps/phonea/', en: '/en/apps/phonea/' },
  'privacy:kfz-kennzeichen-finder': { de: '/apps/kfz-kennzeichen-finder/privacy/', en: '/en/apps/kfz-kennzeichen-finder/privacy/' },
  'privacy:phonea': { de: '/apps/phonea/privacy/', en: '/en/apps/phonea/privacy/' },
} as const;

export type RouteKey = keyof typeof routes;

export const route = (key: RouteKey, lang: Lang) => url(routes[key][lang]);

export const ui = {
  de: {
    skip: 'Zum Inhalt springen',
    navMain: 'Hauptnavigation',
    navApps: 'Apps',
    navAbout: 'Über mich',
    switchLabel: 'English',
    switchTitle: 'Switch to English',
    footerClaim: 'Android-Apps ohne Schnickschnack.',
    footerNoTracking: 'Keine Cookies, kein Tracking auf dieser Seite.',
    navLegal: 'Rechtliches',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
    getOnPlay: 'Bei Google Play',
    getOnPlayLong: 'Jetzt bei Google Play laden',
    learnMore: 'Mehr erfahren',
    appPrivacyHeading: 'Datenschutz',
    appPrivacyText: (name: string) => `Wie ${name} mit Daten umgeht, steht in der`,
    appPrivacyLink: 'Datenschutzerklärung der App',
    defaultDescription: 'Praktische Android-Apps ohne Schnickschnack: Kfz Kennzeichen Finder und Phonea – Buchstabiertafel.',
    homeTitle: 'PockyDev – Android-Apps aus Norddeutschland',
    ogLocale: 'de_DE',
  },
  en: {
    skip: 'Skip to content',
    navMain: 'Main navigation',
    navApps: 'Apps',
    navAbout: 'About',
    switchLabel: 'Deutsch',
    switchTitle: 'Auf Deutsch lesen',
    footerClaim: 'Android apps without the fuss.',
    footerNoTracking: 'No cookies, no tracking on this site.',
    navLegal: 'Legal',
    imprint: 'Legal notice',
    privacy: 'Privacy',
    getOnPlay: 'Get it on Google Play',
    getOnPlayLong: 'Get it on Google Play',
    learnMore: 'Learn more',
    appPrivacyHeading: 'Privacy',
    appPrivacyText: (name: string) => `How ${name} handles data is described in the`,
    appPrivacyLink: "app's privacy policy",
    defaultDescription: 'Handy Android apps without the fuss: License Plate Finder and Phonea – Phonetic Alphabet.',
    homeTitle: 'PockyDev – Android apps from Northern Germany',
    ogLocale: 'en_GB',
  },
} as const;
