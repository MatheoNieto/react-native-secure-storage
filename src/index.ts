import {createStorageUC} from '@application/useCases';
import {SecureStorageRepositoryImpl} from '@infrastructure/storageRepository';

const repo = new SecureStorageRepositoryImpl();
export const createUC = createStorageUC(repo);

export * from '@presentation/hooks/useStorage';
