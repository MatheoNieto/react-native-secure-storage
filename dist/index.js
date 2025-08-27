"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  createUC: () => createUC
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
var import_react_native = require("react-native");
var { SecureStorageModule } = import_react_native.NativeModules;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUC
});
//# sourceMappingURL=index.js.map