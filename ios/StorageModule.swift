//
//  StorageModule.swift
//  storage
//
//  Created by Matheo Nieto on 30/08/25.
//

import Foundation

@objc(StorageModule)
class StorageModule: NSObject {
  private let secureStorage: SecureStorageManager
  
  override init() {
    do {
      self.secureStorage = try SecureStorageManager()
    } catch {
      fatalError("Failed to initialize SecureStorageManager: \(error)")
    }
    super.init()
  }
  
    // MARK: - String Storage Methods
  
  @objc func saveString(_ key: String, value: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    do {
      try secureStorage.save(value, forKey: key)
      print("String data saved securely for key: \(key)")
      resolve(true)
    } catch {
      reject("SAVE_ERROR", "Failed to save string data: \(error.localizedDescription)", error)
      print("Failed to save string data: \(error)")
    }
  }
  
  @objc func loadString(_ key: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    do {
      let value = try secureStorage.loadString(forKey: key)
      resolve(value)
    } catch {
      reject("LOAD_ERROR", "Failed to load string data: \(error.localizedDescription)", error)
      print("Failed to load string data: \(error)")
    }
  }
  
    // MARK: - JSON Object Storage Methods
  
  @objc func saveJSON(_ key: String, jsonString: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    do {
        // Validate that it's valid JSON
      guard let jsonData = jsonString.data(using: .utf8),
            JSONSerialization.jsonObject(with: jsonData) != nil else {
        reject("INVALID_JSON", "Provided string is not valid JSON", nil)
        return
      }
      
      try secureStorage.save(jsonString, forKey: key)
      print("JSON data saved securely for key: \(key)")
      resolve(true)
    } catch {
      reject("SAVE_ERROR", "Failed to save JSON data: \(error.localizedDescription)", error)
      print("Failed to save JSON data: \(error)")
    }
  }
  
  @objc func loadJSON(_ key: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    do {
      guard let jsonString = try secureStorage.loadString(forKey: key) else {
        resolve(nil)
        return
      }
      
        // Validate that it's still valid JSON before returning
      guard let jsonData = jsonString.data(using: .utf8),
            JSONSerialization.jsonObject(with: jsonData) != nil else {
        reject("INVALID_JSON", "Stored data is not valid JSON", nil)
        return
      }
      
      resolve(jsonString)
    } catch {
      reject("LOAD_ERROR", "Failed to load JSON data: \(error.localizedDescription)", error)
      print("Failed to load JSON data: \(error)")
    }
  }
  
    // MARK: - Generic Storage Methods (for compatibility)
  
  @objc func setItem(_ key: String, value: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    do {
      try secureStorage.save(value, forKey: key)
      resolve(true)
    } catch {
      reject("SET_ERROR", "Failed to set item: \(error.localizedDescription)", error)
    }
  }
  
  @objc func getItem(_ key: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    do {
      let value = try secureStorage.loadString(forKey: key)
      resolve(value)
    } catch {
      reject("GET_ERROR", "Failed to get item: \(error.localizedDescription)", error)
    }
  }
  
  @objc func removeItem(_ key: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    secureStorage.remove(forKey: key)
    resolve(true)
  }
  
  @objc func removeAll(_ resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    let domain = Bundle.main.bundleIdentifier!
    UserDefaults.standard.removePersistentDomain(forName: domain)
    resolve(true)
  }
  
    // MARK: - Additional Utility Methods
  
  @objc func hasItem(_ key: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    let exists = UserDefaults.standard.object(forKey: key) != nil
    resolve(exists)
  }
  
  @objc func getAllKeys(_ resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    let dictionary = UserDefaults.standard.dictionaryRepresentation()
    let keys = Array(dictionary.keys)
    resolve(keys)
  }
}

extension StorageModule {
  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
