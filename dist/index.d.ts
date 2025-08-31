declare const useStorage: (keyName: string) => {
    value: string | null;
    updateValue: (newValue: string) => void;
    refreshValue: () => Promise<void>;
    loading: boolean;
};

declare const Storage: {
    setItem: (key: string, newValue: string) => Promise<void>;
    getItem: (key: string) => Promise<string | null>;
};
declare const SecureStorage: {
    setItem: (key: string, newValue: string) => Promise<void>;
    getItem: (key: string) => Promise<string | null>;
    removeItem: (key: string) => Promise<void>;
    removeAll: () => void;
};

export { SecureStorage, Storage, useStorage };
