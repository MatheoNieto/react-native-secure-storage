import {NativeModules} from 'react-native';
const {SecureStorageModule} = NativeModules;

export const NativeStorage = {
  getItem: (key: string) => SecureStorageModule.getItem(key),
  setItem: (key: string, value: string) =>
    SecureStorageModule.setItem(key, value),
  removeItem: (key: string) => SecureStorageModule.removeItem(key),
};
