import { SecureStorageRepository } from "@domain/repositories/secureStorageRepository";

export class SetItemStorage {
  constructor(private repo: SecureStorageRepository) {}
  execute(key: string, value: string) {
    return this.repo.setItem(key, value);
  }
}
