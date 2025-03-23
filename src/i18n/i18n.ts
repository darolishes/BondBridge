import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

// Import translations
const resources = {
  en: {
    translation: {
      common: {
        loading: 'Loading...',
        error: 'An error occurred',
        retry: 'Retry',
      },
      accessibility: {
        button: 'Button',
        selected: 'Selected',
        unselected: 'Not selected',
      },
    },
  },
  // Add more languages here
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

// Handle RTL languages
export const setLanguageWithDirection = async (language: string) => {
  const isRTL = ['ar', 'he', 'fa'].includes(language);
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
  await i18n.changeLanguage(language);
};

export default i18n;
