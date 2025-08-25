import {SecureStorageRepository} from '@domain/repositories/secureStorageRepository';
import {SetItemStorage} from './setItem';
import {RemoveItemStorage} from './removeItem';
import {GetItemStorage} from './getItem';
import {RemoveAllStorage} from './removeAll';

export const createStorageUC = (repo: SecureStorageRepository) => ({
  setItem: new SetItemStorage(repo),
  removeItem: new RemoveItemStorage(repo),
  getItem: new GetItemStorage(repo),
  removeAll: new RemoveAllStorage(repo),
});
