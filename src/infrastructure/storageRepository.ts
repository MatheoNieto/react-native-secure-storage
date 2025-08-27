import {SecureStorageRepository} from '@domain/secureStorageRepository';
import {nativeStorage} from './nativeStorageBridge';

export class SecureStorageRepositoryImpl implements SecureStorageRepository {
  async setItem(key: string, value: string) {
    return await nativeStorage.setItem(key, value);
  }
  async getItem(key: string) {
    const newValue = await nativeStorage.getItem(key);
    console.log('SecureStorageRepositoryImpl [newValue] ======<', newValue);
    return newValue ?? null;
  }
}
