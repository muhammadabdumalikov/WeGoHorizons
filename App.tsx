import 'react-native-gesture-handler';
import React from 'react';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootLayout} from './app/navigation/index';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './app/api/react-query';
import {AuthProvider} from './app/navigation/auth-context';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        {/* <SafeAreaView style={backgroundStyle}> */}
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
            <AuthProvider>
              <RootLayout />
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
        {/* </SafeAreaView> */}
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
