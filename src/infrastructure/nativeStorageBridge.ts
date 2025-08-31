import {NativeModules} from 'react-native';

const {StorageModule} = NativeModules;

export const nativeStorage = {
  getItem: async (key: string) => {
    if (!StorageModule) {
      throw new Error('StorageModule not available');
    }
    return await StorageModule.getItem(key);
  },
  setItem: async (key: string, value: string) => {
    if (!StorageModule) {
      throw new Error('StorageModule not available');
    }
    return await StorageModule.setItem(key, value);
  },
};
