// src/application/useCases/setItem.ts
var SetItemStorage = class {
  constructor(repo) {
    this.repo = repo;
  }
  execute(key, value) {
    return this.repo.setItem(key, value);
  }
};

// src/application/useCases/removeItem.ts
var RemoveItemStorage = class {
  constructor(repo) {
    this.repo = repo;
  }
  execute(key) {
    return this.repo.removeItem(key);
  }
};

// src/application/useCases/getItem.ts
var GetItemStorage = class {
  constructor(repo) {
    this.repo = repo;
  }
  async execute(key) {
    return await this.repo.getItem(key);
  }
};

// src/application/useCases/removeAll.ts
var RemoveAllStorage = class {
  constructor(repo) {
    this.repo = repo;
  }
  execute() {
    return this.repo.removeAll();
  }
};

// src/application/useCases/index.ts
var createStorageUC = (repo) => ({
  setItem: new SetItemStorage(repo),
  removeItem: new RemoveItemStorage(repo),
  getItem: new GetItemStorage(repo),
  removeAll: new RemoveAllStorage(repo)
});

// src/presentation/hooks/useStorage.ts
import React from "react";

// src/infrastructure/nativeStorageBridge.ts
import { NativeModules } from "react-native";
var { StorageModule } = NativeModules;
var NativeStorage = {
  saveValue: (key, value) => StorageModule.setItem(key, value),
  getValue: (key) => StorageModule.getItem(key),
  removeValue: (key) => StorageModule.removeItem(key),
  removeAll: () => {
  }
};

// src/infrastructure/storageRepository.ts
var SecureStorageRepositoryImpl = class {
  async setItem(key, value) {
    return await NativeStorage.saveValue(key, value);
  }
  async getItem(key) {
    return await NativeStorage.getValue(key);
  }
  async removeItem(key) {
    return await NativeStorage.removeValue(key);
  }
  async removeAll() {
    return NativeStorage.removeAll();
  }
};

// src/presentation/hooks/useStorage.ts
var useStorage = (keyName) => {
  const repo = new SecureStorageRepositoryImpl();
  const createUC = createStorageUC(repo);
  const [value, setValue] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);
      const storedValue = await createUC.getItem.execute(keyName);
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
      createUC.setItem.execute(keyName, newValue);
      setValue(newValue);
    },
    [value, keyName]
  );
  const deleteItem = React.useCallback(() => {
    createUC.removeItem.execute(keyName);
    setValue(null);
  }, [keyName]);
  const refreshValue = React.useCallback(() => {
    createUC.getItem.execute(keyName).then(setValue);
  }, [keyName]);
  return {
    value,
    updateValue,
    refreshValue,
    deleteItem,
    loading
  };
};
export {
  useStorage
};
//# sourceMappingURL=index.mjs.map