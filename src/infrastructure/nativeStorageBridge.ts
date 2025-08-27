import {NativeModules} from 'react-native';
const {SecureStorageModule} = NativeModules;
console.log('Available native modules:', NativeModules);

export const nativeStorage = {
  getItem: async (key: string) => {
    return await SecureStorageModule.getItem(key);
  },
  setItem: async (key: string, value: string) => {
    return await SecureStorageModule.setItem(key, value);
  },
};
