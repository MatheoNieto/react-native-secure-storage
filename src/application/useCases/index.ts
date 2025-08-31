import {SecureStorageRepository} from '@domain/secureStorageRepository';
import {StorageRepository} from '@domain/storageRepository';

import {SetItemSecureStorage} from './secureStorage/setItem';
import {GetItemSecureStorage} from './secureStorage/getItem';
import {RemoveItemSecureStorage} from './secureStorage/removeItem';
import {RemoveAllSecureStorage} from './secureStorage/removeAll';
import {SetItemStorage} from './storage/setItem';
import {GetItemStorage} from './storage/getItem';

export const createSecureStorageUC = (repo: SecureStorageRepository) => ({
  setItem: (key: string, newValue: string) =>
    new SetItemSecureStorage(repo).execute(key, newValue),
  getItem: (key: string) => new GetItemSecureStorage(repo).execute(key),
  removeItem: (key: string) => new RemoveItemSecureStorage(repo).execute(key),
  removeAll: () => new RemoveAllSecureStorage(repo).execute(),
});

export const createStorageUC = (repo: StorageRepository) => ({
  setItem: (key: string, newValue: string) =>
    new SetItemStorage(repo).execute(key, newValue),
  getItem: (key: string) => new GetItemStorage(repo).execute(key),
});
