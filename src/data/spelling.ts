import type { Lang } from './i18n';

// The spelling alphabets of the Phonea app, copied from its
// alphabet/core/data/model/*AlphabetSource.kt; keep both in sync.
export interface SpellingAlphabet {
  id: 'din5009' | 'germany2022' | 'germany1934' | 'nato' | 'france' | 'italy';
  name: Record<Lang, string>;
  letters: [string, string][];
}

const pairs = (text: string) =>
  text.split(',').map((entry) => {
    const [letter, ...word] = entry.trim().split(' ');
    return [letter, word.join(' ')] as [string, string];
  });

export const spellingAlphabets: SpellingAlphabet[] = [
  {
    id: 'din5009',
    name: { de: 'Deutschland – DIN 5009:2022', en: 'Germany – DIN 5009:2022' },
    letters: pairs(
      'A Aachen, Ä Umlaut Aachen, B Berlin, C Chemnitz, D Düsseldorf, E Essen, F Frankfurt, G Goslar, H Hamburg, I Ingelheim, J Jena, K Köln, L Leipzig, M München, N Nürnberg, O Offenbach, Ö Umlaut Offenbach, P Potsdam, Q Quickborn, R Rostock, S Salzwedel, ß Eszett, T Tübingen, U Unna, Ü Umlaut Unna, V Völklingen, W Wuppertal, X Xanten, Y Ypsilon, Z Zwickau',
    ),
  },
  {
    id: 'nato',
    name: { de: 'NATO-Alphabet (international)', en: 'NATO phonetic alphabet' },
    letters: pairs(
      'A Alfa, B Bravo, C Charlie, D Delta, E Echo, F Foxtrot, G Golf, H Hotel, I India, J Juliett, K Kilo, L Lima, M Mike, N November, O Oscar, P Papa, Q Quebec, R Romeo, S Sierra, T Tango, U Uniform, V Victor, W Whiskey, X X-ray, Y Yankee, Z Zulu',
    ),
  },
  {
    id: 'germany2022',
    name: { de: 'Deutschland bis 2022', en: 'Germany until 2022' },
    letters: pairs(
      'A Anton, Ä Ärger, B Berta, C Cäsar, D Dora, E Emil, F Friedrich, G Gustav, H Heinrich, I Ida, J Julius, K Kaufmann, L Ludwig, M Martha, N Nordpol, O Otto, Ö Ökonom, P Paula, Q Quelle, R Richard, S Samuel, ß Eszett, T Theodor, U Ulrich, Ü Übermut, V Viktor, W Wilhelm, X Xanthippe, Y Ypsilon, Z Zacharias',
    ),
  },
  {
    id: 'germany1934',
    name: { de: 'Deutschland bis 1934', en: 'Germany until 1934' },
    letters: pairs(
      'A Albert, Ä Änderung, B Bernhard, C Cäsar, D David, E Emil, F Friedrich, G Gustav, H Heinrich, I Ida, J Jakob, K Katharina, L Ludwig, M Martha, N Nathan, O Otto, Ö Ökonom, P Paula, Q Quelle, R Richard, S Samuel, ß Eszett, T Theodor, U Ulrich, Ü Überfluss, V Viktor, W Wilhelm, X Xanthippe, Y Ypsilon, Z Zacharias',
    ),
  },
  {
    id: 'france',
    name: { de: 'Frankreich', en: 'France' },
    letters: pairs(
      'A Anatole, B Berthe, C Célestine, D Désiré, E Eugène, F François, G Gaston, H Henri, I Irma, J Joseph, K Kléber, L Louis, M Marcel, N Nicolas, O Oscar, P Pierre, Q Quintal, R Raoul, S Suzanne, T Thérèse, U Ursule, V Victor, W William, X Xavier, Y Yvonne, Z Zoé',
    ),
  },
  {
    id: 'italy',
    name: { de: 'Italien', en: 'Italy' },
    letters: pairs(
      'A Ancona, B Bari, C Como, D Domodossola, E Empoli, F Firenze, G Genova, H Hotel, I Imola, J Juventus, K Kilometro, L Livorno, M Milano, N Napoli, O Otranto, P Pisa, Q Quadro, R Roma, S Savona, T Torino, U Udine, V Venezia, W Vu Doppia, X Xilofono, Y Ipsilon, Z Zara',
    ),
  },
];
