export const url = 'https://b24f-2001-ee0-49b4-6ed0-5c79-1697-71f-c0d6.ngrok-free.app/api';

import AsyncStorage from '@react-native-async-storage/async-storage';
export const setHeaders = () => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      // 'x-auth-token': AsyncStorage.getItem('token'),
    },
  };

  return headers;
};
