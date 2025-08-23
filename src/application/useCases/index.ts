import { SecureStorageRepository } from "@domain/repositories/secureStorageRepository";
import { SetItemStorage } from "./setItem";

export const createStorageUC = (repo: SecureStorageRepository) => ({
  setItem: new SetItemStorage(repo),
});
