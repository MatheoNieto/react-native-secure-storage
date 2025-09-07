import {SecureStorage} from '@domain/entity/storage';
import {NativeModules} from 'react-native';

const {SecureStorageModule} = NativeModules;

export class NativeSecureStorage implements SecureStorage {
  async setItem(key: string, value: string): Promise<void> {
    if (!SecureStorageModule) {
      throw new Error('SecureStorageModule not available');
    }
    return await SecureStorageModule.saveItem(key, value);
  }

  async getItem(key: string): Promise<string | null> {
    if (!SecureStorageModule) {
      throw new Error('SecureStorageModule not available');
    }
    return await SecureStorageModule.getItem(key);
  }

  async removeItem(key: string): Promise<void> {
    if (!SecureStorageModule) {
      throw new Error('SecureStorageModule not available');
    }
    return await SecureStorageModule.removeItem(key);
  }

  async removeAll(): Promise<void> {
    if (!SecureStorageModule) {
      throw new Error('SecureStorageModule not available');
    }
    return await SecureStorageModule.removeAll();
  }
}
