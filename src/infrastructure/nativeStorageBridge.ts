import {NativeModules} from 'react-native';
const {SecureStorageModule} = NativeModules;

export const NativeStorage = {
  getItem: async (key: string) => await SecureStorageModule.getItem(key),
  setItem: async (key: string, value: string) =>
    await SecureStorageModule.setItem(key, value),
};
