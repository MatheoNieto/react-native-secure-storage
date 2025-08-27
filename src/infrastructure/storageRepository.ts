import {SecureStorageRepository} from '@domain/secureStorageRepository';
import {nativeStorage} from './nativeStorageBridge';

export class SecureStorageRepositoryImpl implements SecureStorageRepository {
  async setItem(key: string, value: string) {
    return await nativeStorage.setItem(key, value);
  }
  async getItem(key: string) {
    console.log('SecureStorageRepositoryImpl ======<', key);
    const newValue = await nativeStorage.getItem(key);
    console.log('SecureStorageRepositoryImpl [newValue] ======<', newValue);
    return Promise.resolve(newValue as any as string | null);
  }
  // async removeItem(key: string): Promise<void> {
  //   return await NativeStorage.removeItem(key);
  // }
}
