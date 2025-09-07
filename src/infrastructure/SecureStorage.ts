import {ExpoSecureStorage} from './expo/SecureStorage';
import {NativeSecureStorage} from './native/nativeSecureStorage';
import {SecureStorage as ISecureStorage} from '@domain/entity/storage';

export class SecureStorage implements ISecureStorage {
  private secureStorage: ISecureStorage;

  constructor() {
    this.secureStorage = this.isRunningInExpo()
      ? new ExpoSecureStorage()
      : new NativeSecureStorage();
  }

  private isRunningInExpo() {
    if (
      (typeof global !== 'undefined' && (global as any).__expo) ||
      (global as any).expo
    ) {
      return true;
    }

    const Constants = require('expo-constants');
    if (Constants)
      return (
        Constants?.executionEnvironment === 'managed' ||
        Constants?.executionEnvironment === 'bare' ||
        Constants?.appOwnership === 'expo'
      );

    return false;
  }

  async setItem(key: string, value: string): Promise<void> {
    return this.secureStorage.setItem(key, value);
  }

  async getItem(key: string): Promise<string | null> {
    return this.secureStorage.getItem(key);
  }

  async removeItem(key: string): Promise<void> {
    return this.secureStorage.removeItem(key);
  }

  async removeAll(): Promise<void> {
    return this.secureStorage.removeAll();
  }
}
