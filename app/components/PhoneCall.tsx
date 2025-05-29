import { Linking, Platform } from 'react-native';

export const openDialer = (phone: string) => {
      const cleanNumber = phone?.replace(/[^+0-9]/g, '');

      const url = Platform.select({
        ios: `telprompt:${cleanNumber}`, // iOS
        android: `tel:${cleanNumber}`, // Android
      });

      // Check if device can handle the URL scheme
      Linking.canOpenURL(url)
        .then(supported => {
          if (supported) {
            return Linking.openURL(url);
          }
          console.log('Phone dialer is not available');
        })
        .catch(err => console.error('An error occurred', err));
    };
