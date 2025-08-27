"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default,
  useStorage: () => useStorage
});
module.exports = __toCommonJS(index_exports);

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
var import_react_native = require("react-native");
var { StorageModule } = import_react_native.NativeModules;
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
var import_react = __toESM(require("react"));
var useStorage = (keyName) => {
  const repo2 = SecureStorageRepositoryImpl.getInstance();
  const createUC2 = createStorageUC(repo2);
  const [value, setValue] = import_react.default.useState(null);
  const [loading, setLoading] = import_react.default.useState(false);
  import_react.default.useEffect(() => {
    (async () => {
      setLoading(true);
      const storedValue = await createUC2.getItem.execute(keyName);
      console.log("===>LOADING DATA MOUNTED===>", storedValue);
      setValue(storedValue);
      setLoading(false);
    })();
  }, [keyName]);
  const updateValue = import_react.default.useCallback(
    (newValue) => {
      createUC2.setItem.execute(keyName, newValue);
      setValue(newValue);
    },
    [value, keyName]
  );
  const deleteItem = import_react.default.useCallback(() => {
    createUC2.removeItem.execute(keyName);
    setValue(null);
  }, [keyName]);
  const refreshValue = import_react.default.useCallback(async () => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useStorage
});
//# sourceMappingURL=index.js.map