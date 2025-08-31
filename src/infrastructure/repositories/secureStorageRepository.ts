import {SecureStorageRepository} from '@domain/secureStorageRepository';
import {nativeSecureStorage} from '../nativeSecureStorageBridge';

export class SecureStorageRepositoryImpl implements SecureStorageRepository {
  async removeItem(key: string): Promise<void> {
    return await nativeSecureStorage.removeItem(key);
  }
  async removeAll(): Promise<void> {
    return await nativeSecureStorage.removeAll();
  }
  async setItem(key: string, value: string) {
    return await nativeSecureStorage.setItem(key, value);
  }
  async getItem(key: string) {
    const newValue = await nativeSecureStorage.getItem(key);
    return newValue ?? null;
  }
}
