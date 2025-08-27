import {createStorageUC} from '@application/useCases';
import {SecureStorageRepositoryImpl} from '@infrastructure/storageRepository';

const repo = SecureStorageRepositoryImpl.getInstance();
const createUC = createStorageUC(repo);

export default createUC;
