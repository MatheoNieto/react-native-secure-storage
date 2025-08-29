declare const useStorage: (keyName: string) => {
    value: string | null;
    updateValue: (newValue: string) => void;
    refreshValue: () => Promise<void>;
    loading: boolean;
};

declare const createUC: {
    setItem: (key: string, newValue: string) => Promise<void>;
    getItem: (key: string) => Promise<string | null>;
};

export { createUC, useStorage };
