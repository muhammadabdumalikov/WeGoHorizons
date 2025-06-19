import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { NativeModules, Platform } from 'react-native';

// Import language resources
import en from './en.json';
import es from './es.json';
import fr from './fr.json';

// Get device language
const getDeviceLanguage = (): string => {
  let deviceLanguage = 'en';

  try {
    if (Platform.OS === 'ios') {
      deviceLanguage =
        NativeModules.SettingsManager?.settings?.AppleLanguages?.[0] ||
        NativeModules.SettingsManager?.settings?.AppleLocale ||
        'en';
    } else {
      deviceLanguage = NativeModules.I18nManager?.localeIdentifier || 'en';
    }

    // Handle potential formats like "en-US" or "en_US"
    return deviceLanguage.split(/[-_]/)[0];
  } catch (error) {
    console.warn('Error getting device language:', error);
    return 'en';
  }
};

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
  fr: {
    translation: fr,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: 'en',
    debug: __DEV__,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Recommended for React Native
    },
  });

export default i18n; 