import {NativeModules} from 'react-native';

const {StorageModule} = NativeModules;

export const NativeStorage = {
  saveValue: (key: string, value: string): Promise<void> =>
    StorageModule.setItem(key, value),
  getValue: (key: string): Promise<string | null> => StorageModule.getItem(key),
  removeValue: (key: string): Promise<void> => StorageModule.removeItem(key),
  removeAll: () => {},
};
