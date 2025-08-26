declare const useStorage: (keyName: string) => {
    value: string | null;
    updateValue: (newValue: string) => void;
    refreshValue: () => void;
    deleteItem: () => void;
    loading: boolean;
};

export { useStorage };
