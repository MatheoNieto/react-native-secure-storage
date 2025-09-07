import * as SecureStore from 'expo-secure-store';
import {AESCrypto} from './encryption';
import {SecureStorage} from '@domain/entity/storage';

export class ExpoSecureStorage implements SecureStorage {
  private crypto: AESCrypto;

  constructor() {
    this.crypto = new AESCrypto();
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      const encryptedData = await this.crypto.encrypt(value);
      await SecureStore.setItemAsync(key, encryptedData);
    } catch (error) {
      throw new Error(`Failed to store encrypted data: ${error}`);
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      const encryptedData = await SecureStore.getItemAsync(key);

      if (!encryptedData) {
        return null;
      }

      const decryptedData = await this.crypto.decrypt(encryptedData);
      return decryptedData;
    } catch (error) {
      throw new Error(`Failed to retrieve encrypted data: ${error}`);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      throw new Error(`Failed to delete item: ${error}`);
    }
  }

  removeAll(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
