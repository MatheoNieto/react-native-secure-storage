import {NativeModules} from 'react-native';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const {SecureStorageModule} = NativeModules;

export const nativeSecureStorage = {
  setItem: async (key: string, value: string) => {
    if (!SecureStorageModule) {
      throw new Error('SecureStorageModule not available');
    }
    return await SecureStorageModule.saveString(key, value);
  },
  getItem: async (key: string) => {
    if (!SecureStorageModule) {
      throw new Error('SecureStorageModule not available');
    }
    return await SecureStorageModule.loadString(key);
  },
  removeItem: async (key: string) => {
    if (!SecureStorageModule) {
      throw new Error('SecureStorageModule not available');
    }
    return await SecureStorageModule.removeItem(key);
  },
  removeAll: async () => {
    if (!SecureStorageModule) {
      throw new Error('SecureStorageModule not available');
    }
    return await SecureStorageModule.removeAll();
  },
};
