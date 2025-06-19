import React, {createContext, useContext, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import storage, {LANGUAGE_KEY} from '../storage';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => Promise<void>;
  availableLanguages: Array<{code: string; name: string; nativeName: string}>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const availableLanguages = [
  {code: 'en', name: 'English', nativeName: 'English'},
  {code: 'es', name: 'Spanish', nativeName: 'Español'},
  {code: 'fr', name: 'French', nativeName: 'Français'},
  {code: 'ru', name: 'Russian', nativeName: 'Русский'},
  {code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbekcha'},
  {code: 'kk', name: 'Kazakh', nativeName: 'Қазақша'},
  {code: 'ky', name: 'Kyrgyz', nativeName: 'Кыргызча'},
];

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const {i18n} = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = storage.getString(LANGUAGE_KEY);
      if (savedLanguage) {
        await changeLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading saved language:', error);
    }
  };

  const changeLanguage = async (language: string) => {
    try {
      await i18n.changeLanguage(language);
      setCurrentLanguage(language);
      storage.set(LANGUAGE_KEY, language);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const value: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
