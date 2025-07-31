import 'react-native-gesture-handler';
import React from 'react';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useColorScheme, LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootLayout} from './app/navigation/index';
import {QueryClient} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {createSyncStoragePersister} from '@tanstack/query-sync-storage-persister';
import storage from './app/shared/storage';
import {AuthProvider} from './app/navigation/auth-context';
import {LanguageProvider} from './app/shared/contexts/LanguageContext';

// Import i18n configuration
import './app/locales/i18n';

// Performance optimizations
if (__DEV__) {
  // Ignore specific warnings in development
  LogBox.ignoreLogs(['Warning:', 'VirtualizedLists should never be nested']);
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: {
    getItem: (key: string) => {
      const value = storage.getString(key);
      return value ?? null;
    },
    setItem: (key: string, value: string) => {
      storage.set(key, value);
    },
    removeItem: (key: string) => {
      storage.delete(key);
    },
  },
});

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{persister}}>
          <LanguageProvider>
            <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
              <AuthProvider>
                <RootLayout />
              </AuthProvider>
            </ThemeProvider>
          </LanguageProvider>
        </PersistQueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
