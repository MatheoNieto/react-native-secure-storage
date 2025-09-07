import * as SecureStore from 'expo-secure-store';
import CryptoJS from 'crypto-js';

export class AESCrypto {
  private readonly ENCRYPTION_KEY_NAME = 'encryption_master_key';
  private masterKey: string | null = null;

  constructor() {
    this.initializeMasterKey();
  }

  private initializeMasterKey(): void {
    this.getMasterKey()
      .then(key => {
        this.masterKey = key;
      })
      .catch(error => {
        console.error('Failed to initialize master key:', error);
        this.masterKey = null;
      });
  }

  private async getMasterKey(): Promise<string> {
    try {
      let masterKey = await SecureStore.getItemAsync(this.ENCRYPTION_KEY_NAME);

      if (!masterKey) {
        masterKey = CryptoJS.lib.WordArray.random(256 / 8).toString();
        await SecureStore.setItemAsync(this.ENCRYPTION_KEY_NAME, masterKey);
      }

      return masterKey;
    } catch (error) {
      throw new Error(`Failed to get master key: ${error}`);
    }
  }

  private async ensureMasterKey(): Promise<string> {
    if (this.masterKey) {
      return this.masterKey;
    }

    // Fallback: reload master key
    this.masterKey = await this.getMasterKey();
    return this.masterKey;
  }

  async encrypt(data: string): Promise<string> {
    try {
      const key = await this.ensureMasterKey();
      const encrypted = CryptoJS.AES.encrypt(data, key).toString();
      return encrypted;
    } catch (error) {
      throw new Error(`Encryption failed: ${error}`);
    }
  }

  async decrypt(encryptedData: string): Promise<string> {
    try {
      const key = await this.ensureMasterKey();
      const bytes = CryptoJS.AES.decrypt(encryptedData, key);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      if (!decrypted) {
        throw new Error(
          'Failed to decrypt data - invalid key or corrupted data',
        );
      }

      return decrypted;
    } catch (error) {
      throw new Error(`Decryption failed: ${error}`);
    }
  }
}
