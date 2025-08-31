import {SecureStorageRepository} from '@domain/secureStorageRepository';

export class SetItemSecureStorage {
  constructor(private repo: SecureStorageRepository) {}
  execute(key: string, value: string) {
    return this.repo.setItem(key, value);
  }
}
