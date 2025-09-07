import {SecureStorageRepository} from '@domain/secureStorageRepository';
import {SecureStorage} from '@infrastructure/SecureStorage';

export class SecureStorageRepositoryImpl implements SecureStorageRepository {
  private secureStorage: SecureStorage;

  constructor() {
    this.secureStorage = new SecureStorage();
  }

  async removeItem(key: string): Promise<void> {
    return await this.secureStorage.removeItem(key);
  }
  async removeAll(): Promise<void> {
    return await this.secureStorage.removeAll();
  }
  async setItem(key: string, value: string) {
    return await this.secureStorage.setItem(key, value);
  }
  async getItem(key: string) {
    const newValue = await this.secureStorage.getItem(key);
    return newValue ?? null;
  }
}
