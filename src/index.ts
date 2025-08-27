import {createStorageUC} from '@application/useCases';
import {SecureStorageRepositoryImpl} from '@infrastructure/storageRepository';

export * from '@presentation/hooks/useStorage';

const repo = SecureStorageRepositoryImpl.getInstance();
const createUC = createStorageUC(repo);

export default createUC;
