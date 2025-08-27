import {createStorageUC} from '@application/useCases';
import {SecureStorageRepositoryImpl} from '@infrastructure/storageRepository';

const repo = SecureStorageRepositoryImpl.getInstance();
export const createUC = createStorageUC(repo);
