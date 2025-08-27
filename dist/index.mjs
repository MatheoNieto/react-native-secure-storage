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
var nativeStorage = {
  getItem: async (key) => {
    await SecureStorageModule.getItem(key);
  },
  setItem: async (key, value) => await SecureStorageModule.setItem(key, value)
};

// src/infrastructure/storageRepository.ts
var SecureStorageRepositoryImpl = class {
  async setItem(key, value) {
    return await nativeStorage.setItem(key, value);
  }
  async getItem(key) {
    console.log("SecureStorageRepositoryImpl ======<", key);
    const newValue = await nativeStorage.getItem(key);
    console.log("SecureStorageRepositoryImpl [newValue] ======<", newValue);
    return Promise.resolve(newValue);
  }
  // async removeItem(key: string): Promise<void> {
  //   return await NativeStorage.removeItem(key);
  // }
};

// src/index.ts
var repo = new SecureStorageRepositoryImpl();
var createUC = createStorageUC(repo);
export {
  createUC
};
//# sourceMappingURL=index.mjs.map