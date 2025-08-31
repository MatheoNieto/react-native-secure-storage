import {StorageRepository} from '@domain/StorageRepository';

export class SetItemStorage {
  constructor(private repo: StorageRepository) {}
  execute(key: string, value: string) {
    return this.repo.setItem(key, value);
  }
}
