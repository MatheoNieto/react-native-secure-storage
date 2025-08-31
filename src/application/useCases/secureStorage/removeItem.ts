import {SecureStorageRepository} from '@domain/secureStorageRepository';

export class RemoveItemSecureStorage {
  constructor(private repo: SecureStorageRepository) {}
  execute(key: string) {
    console.log('removing item from secure storage');
    return this.repo.removeItem(key);
  }
}
