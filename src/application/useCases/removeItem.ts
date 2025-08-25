import {SecureStorageRepository} from '@domain/repositories/secureStorageRepository';

export class RemoveItemStorage {
  constructor(private repo: SecureStorageRepository) {}
  execute(key: string) {
    return this.repo.removeItem(key);
  }
}
