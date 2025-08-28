import {NativeModules} from 'react-native';

console.log('🔍 All available modules:', Object.keys(NativeModules));
console.log('🔍 Total modules count:', Object.keys(NativeModules).length);

const {SecureStorageModule} = NativeModules;

if (!SecureStorageModule) {
  console.error('❌ SecureStorageModule is undefined!');
  console.log('Available modules:', Object.keys(NativeModules));
} else {
  console.log('✅ SecureStorageModule found!');
  console.log('Module methods:', Object.keys(SecureStorageModule));
}

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
