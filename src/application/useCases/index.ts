import {SecureStorageRepository} from '@domain/repositories/secureStorageRepository';
import {SetItemStorage} from './setItem';
import {GetItemStorage} from './getItem';

export const createStorageUC = (repo: SecureStorageRepository) => ({
  setItem: (key: string, newValue: string) =>
    new SetItemStorage(repo).execute(key, newValue),
  getItem: (key: string) => new GetItemStorage(repo).execute(key),
});
