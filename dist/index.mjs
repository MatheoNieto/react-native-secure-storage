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

// src/application/useCases/removeItem.ts
var RemoveItemStorage = class {
  constructor(repo2) {
    this.repo = repo2;
  }
  execute(key) {
    return this.repo.removeItem(key);
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

// src/application/useCases/removeAll.ts
var RemoveAllStorage = class {
  constructor(repo2) {
    this.repo = repo2;
  }
  execute() {
    console.log("removing all items from storage");
  }
};

// src/application/useCases/index.ts
var createStorageUC = (repo2) => ({
  setItem: new SetItemStorage(repo2),
  removeItem: new RemoveItemStorage(repo2),
  getItem: new GetItemStorage(repo2),
  removeAll: new RemoveAllStorage(repo2)
});

// src/infrastructure/nativeStorageBridge.ts
import { NativeModules } from "react-native";
var { StorageModule } = NativeModules;
var NativeStorage = {
  getItem: (key) => StorageModule.getItem(key),
  setItem: (key, value) => StorageModule.setItem(key, value),
  removeItem: (key) => StorageModule.removeItem(key)
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
    return await NativeStorage.getItem(key);
  }
  async removeItem(key) {
    return await NativeStorage.removeItem(key);
  }
};
__publicField(_SecureStorageRepositoryImpl, "_instance");
var SecureStorageRepositoryImpl = _SecureStorageRepositoryImpl;

// src/presentation/hooks/useStorage.ts
import React from "react";
var useStorage = (keyName) => {
  const repo2 = SecureStorageRepositoryImpl.getInstance();
  const createUC2 = createStorageUC(repo2);
  const [value, setValue] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);
      const storedValue = await createUC2.getItem.execute(keyName);
      if (isMounted) {
        setValue(storedValue);
        setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [keyName]);
  const updateValue = React.useCallback(
    (newValue) => {
      createUC2.setItem.execute(keyName, newValue);
      setValue(newValue);
    },
    [value, keyName]
  );
  const deleteItem = React.useCallback(() => {
    createUC2.removeItem.execute(keyName);
    setValue(null);
  }, [keyName]);
  const refreshValue = React.useCallback(async () => {
    const newValue = await createUC2.getItem.execute(keyName);
    setValue(newValue);
  }, [keyName]);
  return {
    value,
    updateValue,
    refreshValue,
    deleteItem,
    loading
  };
};

// src/index.ts
var repo = SecureStorageRepositoryImpl.getInstance();
var createUC = createStorageUC(repo);
var index_default = createUC;
export {
  index_default as default,
  useStorage
};
//# sourceMappingURL=index.mjs.map