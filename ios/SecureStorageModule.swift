//
//  StorageModule.swift
//  storage
//
//  Created by Matheo Nieto on 30/08/25.
//

import Foundation

// React Native Bridge Types
typealias RCTPromiseResolveBlock = (Any?) -> Void
typealias RCTPromiseRejectBlock = (String?, String?, Error?) -> Void

@objc(SecureStorageModule)
class SecureStorageModule: NSObject {
  private let secureStorage: SecureStorageManager
    
    override init() {
      self.secureStorage = SecureStorageManager()
      super.init()
    }
  
  @objc func saveString(_ key: String, value: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    do {
      try secureStorage.saveString(value, forKey: key)
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

  @objc func removeItem(_ key: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    secureStorage.remove(forKey: key)
    resolve(true)
  }
  
  @objc func removeAll(_ resolver: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    if let domain = Bundle.main.bundleIdentifier {
        UserDefaults.standard.removePersistentDomain(forName: domain)
        UserDefaults.standard.synchronize()
    }
    resolve(true)
  }
}

// MARK: - React Native Bridge Requirements
extension SecureStorageModule {
  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
