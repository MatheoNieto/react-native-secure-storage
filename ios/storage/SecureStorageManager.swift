//
//  SecureStorageManager.swift
//  storage
//
//  Created by Matheo Nieto on 30/08/25.
//

import Foundation
import CryptoKit
import Security

class SecureStorageManager {
  private let encryptionKey: SymmetricKey
  
  init() throws {
    self.encryptionKey = try AESEncryptionHelper.gettingKey()
  }
  
    /// Save encrypted data to UserDefaults
  func save<T: Codable>(_ object: T, forKey key: String) throws {
    let encoder = JSONEncoder()
    let data = try encoder.encode(object)
    let encryptedData = try AESEncryptionHelper.encrypt(data: data, key: encryptionKey)
    UserDefaults.standard.set(encryptedData, forKey: key)
  }
  
    /// Load and decrypt data from UserDefaults
  func load<T: Codable>(_ type: T.Type, forKey key: String) throws -> T? {
    guard let encryptedData = UserDefaults.standard.data(forKey: key) else {
      return nil
    }
    
    let decryptedData = try AESEncryptionHelper.decrypt(data: encryptedData, key: encryptionKey)
    let decoder = JSONDecoder()
    return try decoder.decode(type, from: decryptedData)
  }
  
    /// Save encrypted string
  func saveString(_ string: String, forKey key: String) throws {
    let encryptedData = try AESEncryptionHelper.encrypt(string: string, key: encryptionKey)
    UserDefaults.standard.set(encryptedData, forKey: key)
  }
  
    /// Load decrypted string
  func loadString(forKey key: String) throws -> String? {
    guard let encryptedData = UserDefaults.standard.data(forKey: key) else {
      return nil
    }
    return try AESEncryptionHelper.decryptToString(data: encryptedData, key: encryptionKey)
  }
  
    /// Remove data
  func remove(forKey key: String) {
    UserDefaults.standard.removeObject(forKey: key)
  }
}
