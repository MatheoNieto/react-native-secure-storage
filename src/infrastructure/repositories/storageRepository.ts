import {StorageRepository} from '@domain/storageRepository';
import {nativeStorage} from '../nativeStorageBridge';

export class StorageRepositoryImpl implements StorageRepository {
  async setItem(key: string, value: string) {
    return await nativeStorage.setItem(key, value);
  }
  async getItem(key: string) {
    const newValue = await nativeStorage.getItem(key);
    return newValue ?? null;
  }
}
