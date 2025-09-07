import {StorageRepository} from '@domain/storageRepository';
import {Storage} from '@infrastructure/Storage';

export class StorageRepositoryImpl implements StorageRepository {
  private storage: Storage;

  constructor() {
    this.storage = new Storage();
  }

  async setItem(key: string, value: string) {
    return await this.storage.setItem(key, value);
  }
  async getItem(key: string) {
    const newValue = await this.storage.getItem(key);
    return newValue ?? null;
  }
}
