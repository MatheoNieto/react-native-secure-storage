#import <React/RCTBridgeModule.h>

@interface StorageModule : NSObject <RCTBridgeModule>
@end

@implementation StorageModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getItem:(NSString *)key
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *value = [[NSUserDefaults standardUserDefaults] stringForKey:key];
    resolve(value);
}

RCT_EXPORT_METHOD(setItem:(NSString *)key
                    value:(NSString *)value
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    [[NSUserDefaults standardUserDefaults] setObject:value forKey:key];
    [[NSUserDefaults standardUserDefaults] synchronize];
    resolve(@YES);
}

@end