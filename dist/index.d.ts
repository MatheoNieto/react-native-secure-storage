declare const useStorage: (keyName: string) => {
    value: string | null;
    updateValue: (newValue: string) => void;
    refreshValue: () => Promise<void>;
    deleteItem: () => void;
    loading: boolean;
};

export { useStorage };
