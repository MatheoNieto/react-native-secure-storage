interface SecureStorageRepository {
    setItem(key: string, value: string): Promise<void>;
    getItem(key: string): Promise<string | null>;
    removeItem(key: string): Promise<void>;
}

declare class RemoveAllStorage {
    private repo;
    constructor(repo: SecureStorageRepository);
    execute(): void;
}

declare class GetItemStorage {
    private repo;
    constructor(repo: SecureStorageRepository);
    execute(key: string): Promise<string | null>;
}

declare class RemoveItemStorage {
    private repo;
    constructor(repo: SecureStorageRepository);
    execute(key: string): Promise<void>;
}

declare class SetItemStorage {
    private repo;
    constructor(repo: SecureStorageRepository);
    execute(key: string, value: string): Promise<void>;
}

declare const useStorage: (keyName: string) => {
    value: string | null;
    updateValue: (newValue: string) => void;
    refreshValue: () => Promise<void>;
    deleteItem: () => void;
    loading: boolean;
};

declare const createUC: {
    setItem: SetItemStorage;
    removeItem: RemoveItemStorage;
    getItem: GetItemStorage;
    removeAll: RemoveAllStorage;
};

export { createUC as default, useStorage };
