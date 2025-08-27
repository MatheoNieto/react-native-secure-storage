var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/application/useCases/setItem.ts
var SetItemStorage = class {
  constructor(repo2) {
    this.repo = repo2;
  }
  execute(key, value) {
    return this.repo.setItem(key, value);
  }
};

// src/application/useCases/getItem.ts
var GetItemStorage = class {
  constructor(repo2) {
    this.repo = repo2;
  }
  async execute(key) {
    return await this.repo.getItem(key);
  }
};

// src/application/useCases/index.ts
var createStorageUC = (repo2) => ({
  setItem: (key, newValue) => new SetItemStorage(repo2).execute(key, newValue),
  getItem: (key) => new GetItemStorage(repo2).execute(key)
});

// src/infrastructure/nativeStorageBridge.ts
import { NativeModules } from "react-native";
var { SecureStorageModule } = NativeModules;
var NativeStorage = {
  getItem: (key) => SecureStorageModule.getItem(key),
  setItem: (key, value) => SecureStorageModule.setItem(key, value),
  removeItem: (key) => SecureStorageModule.removeItem(key)
};

// src/infrastructure/storageRepository.ts
var _SecureStorageRepositoryImpl = class _SecureStorageRepositoryImpl {
  static getInstance() {
    if (!_SecureStorageRepositoryImpl._instance) {
      _SecureStorageRepositoryImpl._instance = new _SecureStorageRepositoryImpl();
    }
    return _SecureStorageRepositoryImpl._instance;
  }
  async setItem(key, value) {
    return await NativeStorage.setItem(key, value);
  }
  async getItem(key) {
    console.log("SecureStorageRepositoryImpl ======<", key);
    const newValue = await NativeStorage.getItem(key);
    console.log("SecureStorageRepositoryImpl [newValue] ======<", newValue);
    return newValue;
  }
  // async removeItem(key: string): Promise<void> {
  //   return await NativeStorage.removeItem(key);
  // }
};
__publicField(_SecureStorageRepositoryImpl, "_instance");
var SecureStorageRepositoryImpl = _SecureStorageRepositoryImpl;

// src/index.ts
var repo = SecureStorageRepositoryImpl.getInstance();
var createUC = createStorageUC(repo);
export {
  createUC
};
//# sourceMappingURL=index.mjs.map