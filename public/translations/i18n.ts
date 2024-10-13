import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      appName: 'BeerMeter',
      welcome: 'Welcome to BeerMeter',
      logout: 'Log out',
      login: 'Login',
      changeLanguage: 'Change language',
    },
  },
  cs: {
    translation: {
      appName: 'PivkoMetr',
      welcome: 'Vítej v Pivkometru',
      logout: 'Odhlásit se',
      login: 'Přihlásit se',
      changeLanguage: 'Změnit jazyk',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
