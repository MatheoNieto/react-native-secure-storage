import {SecureStorageRepository} from '@domain/repositories/secureStorageRepository';
import {NativeStorage} from './nativeStorageBridge';

export class SecureStorageRepositoryImpl implements SecureStorageRepository {
  private static _instance: SecureStorageRepositoryImpl;

  static getInstance() {
    if (!SecureStorageRepositoryImpl._instance) {
      SecureStorageRepositoryImpl._instance = new SecureStorageRepositoryImpl();
    }
    return SecureStorageRepositoryImpl._instance;
  }

  async setItem(key: string, value: string) {
    return await NativeStorage.setItem(key, value);
  }
  async getItem(key: string) {
    console.log('SecureStorageRepositoryImpl ======<', key);
    const newValue = await NativeStorage.getItem(key);
    console.log('SecureStorageRepositoryImpl [newValue] ======<', newValue);
    return newValue;
  }
  // async removeItem(key: string): Promise<void> {
  //   return await NativeStorage.removeItem(key);
  // }
}
