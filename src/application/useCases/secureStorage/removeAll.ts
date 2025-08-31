import {SecureStorageRepository} from '@domain/secureStorageRepository';

export class RemoveAllSecureStorage {
  constructor(private repo: SecureStorageRepository) {}
  execute() {
    this.repo.removeAll();
    console.log('removing all items from secure storage');
  }
}
