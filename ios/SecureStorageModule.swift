import Foundation
import React

@objc(SecureStorageModule)
class SecureStorageModule: NSObject, RCTBridgeModule {
    
  static func moduleName() -> String {
    return "SecureStorageModule"
  }

  static func requiresMainQueueSetup() -> Bool {
    print("🔵 SecureStorageModule requiresMainQueueSetup() called")  
    return false
  }
  
  // Add this to see if the module is being created
  override init() {
    super.init()
    print("🔵 SecureStorageModule INITIALIZED!")
  }

  @objc
  func getItem(_ key: String,
               resolver: @escaping RCTPromiseResolveBlock,
               rejecter: @escaping RCTPromiseRejectBlock) {
    let value = UserDefaults.standard.string(forKey: key)
    print("🔵 getItem called - key: \(key) -> value: \(String(describing: value))")
    resolver(value)
  }

  @objc
  func setItem(_ key: String,
               value: String,
               resolver: @escaping RCTPromiseResolveBlock,
               rejecter: @escaping RCTPromiseRejectBlock) {
    print("🔵 setItem called - key: \(key), value: \(value)")
    UserDefaults.standard.set(value, forKey: key)
    resolver(true)
  }
}