import {StorageRepository} from '@domain/StorageRepository';

export class GetItemStorage {
  constructor(private repo: StorageRepository) {}
  async execute(key: string) {
    return await this.repo.getItem(key);
  }
}
