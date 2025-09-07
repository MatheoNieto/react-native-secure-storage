import {NativeModules} from 'react-native';
import {Storage} from '@domain/entity/storage';

const {StorageModule} = NativeModules;

export class NativeStorage implements Storage {
  async setItem(key: string, value: string): Promise<void> {
    if (!StorageModule) {
      throw new Error('StorageModule not available');
    }
    return await StorageModule.saveItem(key, value);
  }

  async getItem(key: string): Promise<string | null> {
    if (!StorageModule) {
      throw new Error('StorageModule not available');
    }
    return await StorageModule.getItem(key);
  }
}
