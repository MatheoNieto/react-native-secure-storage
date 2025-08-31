export interface StorageRepository {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
}
