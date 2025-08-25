import {SecureStorageRepository} from '@domain/repositories/secureStorageRepository';
import {NativeStorage} from './nativeStorageBridge';

export class SecureStorageRepositoryImpl implements SecureStorageRepository {
  async setItem(key: string, value: string): Promise<void> {
    return await NativeStorage.saveValue(key, value);
  }
  async getItem(key: string): Promise<string | null> {
    return await NativeStorage.getValue(key);
  }
  async removeItem(key: string): Promise<void> {
    return await NativeStorage.removeValue(key);
  }
  async removeAll(): Promise<void> {
    return NativeStorage.removeAll();
  }
}
