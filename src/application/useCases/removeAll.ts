import {SecureStorageRepository} from '@domain/repositories/secureStorageRepository';

export class RemoveAllStorage {
  constructor(private repo: SecureStorageRepository) {}
  execute() {
    return this.repo.removeAll();
  }
}
