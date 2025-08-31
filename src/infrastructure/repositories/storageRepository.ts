import {StorageRepository} from '@domain/StorageRepository';
import {nativeStorage} from '../nativeStorageBridge';

export class StorageRepositoryImpl implements StorageRepository {
  async setItem(key: string, value: string) {
    return await nativeStorage.setItem(key, value);
  }
  async getItem(key: string) {
    console.log('SecureStorageRepositoryImpl [newValue] ======<', key);
    const newValue = await nativeStorage.getItem(key);
    console.log('SecureStorageRepositoryImpl [newValue] ======<', newValue);
    return newValue ?? null;
  }
}
