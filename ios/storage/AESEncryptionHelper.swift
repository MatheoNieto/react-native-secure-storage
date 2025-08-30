//
//  AEScript.swift
//  storage
//
//  Created by Matheo Nieto on 30/08/25.
//

import Foundation
import CryptoKit
import Security


class AESEncryptionHelper {
  private static let keyService = "com.storateNative.encryption"
  private static let keyAccount = "encriptionAESEKey"
  
  
  enum EncryptorError: Error {
    case keyGenerationFailed
    case invalidKey
    case encryptionFailed
    case decryptionFailed
    case invalidData
    case keyChainError(OSStatus)
  }
  
  
  private static func generateKey() -> SymmetricKey {
    return SymmetricKey(size: .bits256)
  }
  
  private static func saveKeyToChain(_ key: SymmetricKey) throws{
    let keyData =  key.withUnsafeBytes { Data($0) }
    
    let query : [String: Any] = [
      kSecClass as String: kSecClassGenericPassword,
      kSecAttrService as String: keyService,
      kSecAttrAccount as String: keyAccount,
      kSecValueData as String: keyData
    ]
    
    SecItemDelete(query as CFDictionary)
    
    let status = SecItemAdd(query as CFDictionary, nil)
    guard status == errSecSuccess else {
      throw EncryptorError.keyChainError(status)
    }
  }
  
  private static func loadKeyFromChain() throws -> SymmetricKey {
    let query : [String: Any] = [
      kSecClass as String: kSecClassGenericPassword,
      kSecAttrService as String: keyService,
      kSecAttrAccount as String: keyAccount,
      kSecReturnData as String: true,
      kSecMatchLimit as String: kSecMatchLimitOne
    ]
    
    var item: CFTypeRef?
    let status = SecItemCopyMatching(query as CFDictionary, &item)
    
    guard status == errSecSuccess else {
      throw EncryptorError.keyChainError(status)
    }
    
    guard let data = item as? Data else {
      throw EncryptorError.invalidData
    }
    
    return SymmetricKey(data: data)
    
  }
  
  
  static func gettingKey() throws -> SymmetricKey {
    do {
      return try loadKeyFromChain()
    } catch {
      let newKey = generateKey()
      try saveKeyToChain(newKey)
      return newKey
    }
  }
  
  static func encrypt(data: Data, key: SymmetricKey) throws -> Data {
    do {
      let sealedBox = try AES.GCM.seal(data, using: key)
      guard let encryptedData = sealedBox.combined else {
        throw EncryptorError.encryptionFailed
      }
      return encryptedData
    } catch {
      throw EncryptorError.encryptionFailed
    }
  }
  
    /// Decrypt data using AES-256-GCM
  static func decrypt(data: Data, key: SymmetricKey) throws -> Data {
    do {
      let sealedBox = try AES.GCM.SealedBox(combined: data)
      let decryptedData = try AES.GCM.open(sealedBox, using: key)
      return decryptedData
    } catch {
      throw EncryptorError.decryptionFailed
    }
  }
  
    /// Encrypt string
  static func encrypt(string: String, key: SymmetricKey) throws -> Data {
    guard let data = string.data(using: .utf8) else {
      throw EncryptorError.invalidData
    }
    return try encrypt(data: data, key: key)
  }
  
    /// Decrypt to string
  static func decryptToString(data: Data, key: SymmetricKey) throws -> String {
    let decryptedData = try decrypt(data: data, key: key)
    guard let string = String(data: decryptedData, encoding: .utf8) else {
      throw EncryptorError.invalidData
    }
    return string
  }
}
