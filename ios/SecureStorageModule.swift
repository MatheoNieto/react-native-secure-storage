import Foundation
import React

@objc(SecureStorageModule)
class SecureStorageModule: NSObject, RCTBridgeModule {
  static func moduleName() -> String! {
    return "SecureStorageModule"
  }

  static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc
  func getItem(_ key: String,
               resolver: @escaping RCTPromiseResolveBlock,
               rejecter: @escaping RCTPromiseRejectBlock) {
    let value = UserDefaults.standard.string(forKey: key)
    print("getting value for key: \(key) -> \(String(describing: value))")
    resolver(value)
  }

  @objc
  func setItem(_ key: String,
               value: String,
               resolver: @escaping RCTPromiseResolveBlock,
               rejecter: @escaping RCTPromiseRejectBlock) {
    print("Setting value for key: \(key)")
    UserDefaults.standard.set(value, forKey: key)
    resolver(true)
  }
}