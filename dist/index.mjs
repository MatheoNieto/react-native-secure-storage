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
console.log("Available native modules:", NativeModules);
var nativeStorage = {
  getItem: async (key) => {
    return await SecureStorageModule.getItem(key);
  },
  setItem: async (key, value) => {
    return await SecureStorageModule.setItem(key, value);
  }
};

// src/infrastructure/storageRepository.ts
var SecureStorageRepositoryImpl = class {
  async setItem(key, value) {
    return await nativeStorage.setItem(key, value);
  }
  async getItem(key) {
    console.log("SecureStorageRepositoryImpl [newValue] ======<", key);
    const newValue = await nativeStorage.getItem(key);
    console.log("SecureStorageRepositoryImpl [newValue] ======<", newValue);
    return newValue ?? null;
  }
};

// src/index.ts
var repo = new SecureStorageRepositoryImpl();
var createUC = createStorageUC(repo);
export {
  createUC
};
//# sourceMappingURL=index.mjs.map