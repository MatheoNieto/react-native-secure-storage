import {createSecureStorageUC, createStorageUC} from '@application/useCases';
import {StorageRepositoryImpl} from '@infrastructure/repositories/storageRepository';
import {SecureStorageRepositoryImpl} from '@infrastructure/repositories/secureStorageRepository';

const repoStorage = new StorageRepositoryImpl();
const repoSecureStorage = new SecureStorageRepositoryImpl();

export const Storage = createStorageUC(repoStorage);
export const SecureStorage = createSecureStorageUC(repoSecureStorage);

export * from '@presentation/hooks/useStorage';
