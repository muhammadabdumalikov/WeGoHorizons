# Localization (i18n) Setup

This project uses `i18next` and `react-i18next` for internationalization support.

## Supported Languages

- English (en) - Default
- Spanish (es)
- French (fr)

## File Structure

```
app/locales/
├── i18n.ts              # Main i18n configuration
├── en.json              # English translations
├── es.json              # Spanish translations
├── fr.json              # French translations
└── README.md            # This file
```

## Usage

### 1. Basic Translation

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return <Text>{t('common.search')}</Text>;
};
```

### 2. Using the Custom Hook

```tsx
import { useLocalization } from '../shared/hooks/useLocalization';

const MyComponent = () => {
  const { t, currentLanguage } = useLocalization();
  
  return (
    <View>
      <Text>{t('common.search')}</Text>
    </View>
  );
};
```

### 3. Language Switching

```tsx
import { useLanguage } from '../shared/contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { changeLanguage, availableLanguages } = useLanguage();
  
  return (
    <View>
      {availableLanguages.map(lang => (
        <TouchableOpacity
          key={lang.code}
          onPress={() => changeLanguage(lang.code)}
        >
          <Text>{lang.nativeName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
```

## Adding New Languages

1. Create a new translation file (e.g., `de.json` for German)
2. Add the language to the `resources` object in `i18n.ts`
3. Add the language to `availableLanguages` in `LanguageContext.tsx`

## Translation Keys Structure

The translation files are organized by feature:

- `common`: Common UI elements (buttons, labels, etc.)
- `navigation`: Navigation-related text
- `search`: Search functionality text
- `hotel`: Hotel-related content
- `travel`: Travel-related content
- `profile`: User profile content
- `errors`: Error messages

## Best Practices

1. Always use translation keys instead of hardcoded strings
2. Use descriptive key names (e.g., `hotel.bookNow` instead of `book`)
3. Group related translations under the same namespace
4. Test with different languages
5. Consider text length variations between languages
6. Use interpolation for dynamic content: `t('welcome', { name: userName })`

## Testing

To test different languages:

1. Use the `LanguageSelector` component
2. Or programmatically: `changeLanguage('es')`
3. The selected language is persisted in MMKV storage

## Troubleshooting

- If translations don't load, check that the language file is properly imported in `i18n.ts`
- Check the console for i18n debug messages (enabled in development mode) 