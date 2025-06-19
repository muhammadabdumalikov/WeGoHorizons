import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useLanguage} from '../shared/contexts/LanguageContext';
import {useTranslation} from 'react-i18next';

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  visible,
  onClose,
}) => {
  const {currentLanguage, changeLanguage, availableLanguages} = useLanguage();
  const {t} = useTranslation();

  const handleLanguageSelect = async (languageCode: string) => {
    await changeLanguage(languageCode);
    onClose();
  };

  const renderLanguageItem = ({
    item,
  }: {
    item: (typeof availableLanguages)[0];
  }) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        currentLanguage === item.code && styles.selectedLanguage,
      ]}
      onPress={() => handleLanguageSelect(item.code)}>
      <Text
        style={[
          styles.languageName,
          currentLanguage === item.code && styles.selectedLanguageText,
        ]}>
        {item.nativeName}
      </Text>
      <Text
        style={[
          styles.languageCode,
          currentLanguage === item.code && styles.selectedLanguageText,
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('profile.language')}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>{t('common.close')}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={availableLanguages}
          renderItem={renderLanguageItem}
          keyExtractor={item => item.code}
          style={styles.list}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  list: {
    flex: 1,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedLanguage: {
    backgroundColor: '#f8f9fa',
  },
  languageName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  languageCode: {
    fontSize: 14,
    color: '#666',
  },
  selectedLanguageText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default LanguageSelector;
