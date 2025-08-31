import {SecureStorageRepository} from '@domain/secureStorageRepository';

export class GetItemSecureStorage {
  constructor(private repo: SecureStorageRepository) {}
  async execute(key: string) {
    return await this.repo.getItem(key);
  }
}
