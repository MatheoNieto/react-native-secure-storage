import {ExpoStorage} from './expo/Storage';
import {NativeStorage} from './native/nativeStorage';
import {Storage as IStorage} from '@domain/entity/storage';

export class Storage implements IStorage {
  private storage: IStorage;

  constructor() {
    this.storage = this.isRunningInExpo()
      ? new ExpoStorage()
      : new NativeStorage();
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
    return this.storage.setItem(key, value);
  }

  async getItem(key: string): Promise<string | null> {
    return this.storage.getItem(key);
  }
}
