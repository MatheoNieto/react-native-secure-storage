//
//  SecureStorageManager.swift
//  storage
//
//  Created by Matheo Nieto on 30/08/25.
//

import Foundation
import CryptoKit
import Security

@available(iOS 13.0, *)
class SecureStorageManager {
  private let encryptionKey: SymmetricKey?
  private let isEncryptionAvailable: Bool 

  init() {
        if #available(iOS 13.0, *) {
            do {
              self.encryptionKey = try AESEncryptionHelper.gettingKey()
                self.isEncryptionAvailable = true
            } catch {
                self.encryptionKey = nil
                self.isEncryptionAvailable = false
            }
        } else {
            self.encryptionKey = nil
            self.isEncryptionAvailable = false
        }
    }

    /// Save encrypted string (or unencrypted if iOS < 13)
    func saveString(_ string: String, forKey key: String) throws {
        if isEncryptionAvailable, let encryptionKey = self.encryptionKey {
            if #available(iOS 13.0, *) {
                let encryptedData = try AESEncryptionHelper.encrypt(string: string, key: encryptionKey)
                UserDefaults.standard.set(encryptedData, forKey: key)
                print("String saved with encryption for key: \(key)")
                return
            }
        }
        
        // Fallback: save unencrypted string for iOS < 13
        UserDefaults.standard.set(string, forKey: key)
        print("String saved without encryption for key: \(key)")
    }
    
    /// Load decrypted string (or unencrypted if iOS < 13)
    func loadString(forKey key: String) throws -> String? {
        if isEncryptionAvailable, let encryptionKey = self.encryptionKey {
            if #available(iOS 13.0, *) {
                guard let encryptedData = UserDefaults.standard.data(forKey: key) else {
                    return nil
                }
                return try AESEncryptionHelper.decryptToString(data: encryptedData, key: encryptionKey)
            }
        } else {
            // Fallback: load unencrypted string for iOS < 13
            return UserDefaults.standard.string(forKey: key)
        }
        
        return nil
    }
  
    /// Remove data
  func remove(forKey key: String) {
    UserDefaults.standard.removeObject(forKey: key)
  }
}
