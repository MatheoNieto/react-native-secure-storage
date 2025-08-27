import {NativeModules} from 'react-native';
const {StorageModule} = NativeModules;

export const NativeStorage = {
  getItem: (key: string) => StorageModule.getItem(key),
  setItem: (key: string, value: string) => StorageModule.setItem(key, value),
  removeItem: (key: string) => StorageModule.removeItem(key),
};
