declare const createUC: {
    setItem: (key: string, newValue: string) => Promise<void>;
    getItem: (key: string) => Promise<string | null>;
};

export { createUC };
