export interface SecureStorage {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
  removeItem(key: string): Promise<void>;
  removeAll(): Promise<void>;
}

export interface Storage {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
}
