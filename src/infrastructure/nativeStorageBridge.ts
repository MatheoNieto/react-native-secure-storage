import {NativeModules} from 'react-native';

const {SecureStorageModule} = NativeModules;

export const nativeStorage = {
  getItem: async (key: string) => {
    if (!SecureStorageModule) {
      throw new Error('SecureStorageModule not available');
    }
    return await SecureStorageModule.getItem(key);
  },
  setItem: async (key: string, value: string) => {
    if (!SecureStorageModule) {
      throw new Error('SecureStorageModule not available');
    }
    return await SecureStorageModule.setItem(key, value);
  },
};
