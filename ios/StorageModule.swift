import Foundation

@objc(StorageModule)
class StorageModule: NSObject {

  @objc func getItem(_ key: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    resolve(defaults.string(forKey: key))
  }

  @objc func setItem(_ key: String, value: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    defaults.set(value, forKey: key)
    resolve(true)
  }

  @objc func removeItem(_ key: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    defaults.removeObject(forKey: key)
    resolve(true)
  }
   @objc func removeAll(_ key: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    defaults.removeObject(forKey: key)
    resolve(true)
  }
}