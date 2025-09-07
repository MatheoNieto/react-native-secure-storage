import * as SecureStore from 'expo-secure-store';
import {Storage} from '@domain/entity/storage';

export class ExpoStorage implements Storage {
  async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      throw new Error(`Failed to store encrypted data: ${error}`);
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      throw new Error(`Failed to retrieve encrypted data: ${error}`);
    }
  }
}
