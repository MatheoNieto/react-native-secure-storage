#import <React/RCTBridgeModule.h>

@interface SecureStorageModule : NSObject <RCTBridgeModule>
@end

@implementation SecureStorageModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getItem:(NSString *)key
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSLog(@"🔵 getItem called with key: %@", key);
    NSString *value = [[NSUserDefaults standardUserDefaults] stringForKey:key];
    NSLog(@"🔵 getItem result: %@", value);
    resolve(value);
}

RCT_EXPORT_METHOD(setItem:(NSString *)key
                    value:(NSString *)value
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSLog(@"🔵 setItem called with key: %@ value: %@", key, value);
    [[NSUserDefaults standardUserDefaults] setObject:value forKey:key];
    [[NSUserDefaults standardUserDefaults] synchronize];
    resolve(@YES);
}

@end