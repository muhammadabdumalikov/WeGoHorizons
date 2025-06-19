import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

export const useLocalization = () => {
  const { t, i18n } = useTranslation();
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();

  return {
    t,
    i18n,
    currentLanguage,
    changeLanguage,
    availableLanguages,
  };
}; 