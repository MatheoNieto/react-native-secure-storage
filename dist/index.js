"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  useStorage: () => useStorage
});
module.exports = __toCommonJS(index_exports);

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
var import_react = __toESM(require("react"));

// src/infrastructure/nativeStorageBridge.ts
var import_react_native = require("react-native");
var { StorageModule } = import_react_native.NativeModules;
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
  const [value, setValue] = import_react.default.useState(null);
  const [loading, setLoading] = import_react.default.useState(false);
  import_react.default.useEffect(() => {
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
  const updateValue = import_react.default.useCallback(
    (newValue) => {
      createUC.setItem.execute(keyName, newValue);
      setValue(newValue);
    },
    [value, keyName]
  );
  const deleteItem = import_react.default.useCallback(() => {
    createUC.removeItem.execute(keyName);
    setValue(null);
  }, [keyName]);
  return {
    value,
    updateValue,
    deleteItem,
    loading
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useStorage
});
//# sourceMappingURL=index.js.map