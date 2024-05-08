import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n.use(Backend);
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage'],
    },
    fallbackLng: 'en',
    // debug: true,
    debug: false, // prevent returning of i18n object in brower console
  });
// i18n.use(initReactI18next).init({
//   fallbackLng: 'en',
//   debug: true,
// });

export default i18n;
