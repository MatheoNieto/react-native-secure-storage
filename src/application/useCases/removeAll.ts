import {SecureStorageRepository} from '@domain/repositories/secureStorageRepository';

export class RemoveAllStorage {
  constructor(private repo: SecureStorageRepository) {}
  execute() {
    console.log('removing all items from storage');
  }
}
