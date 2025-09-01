package com.rnstorage

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.bridge.Arguments
import android.util.Log

class SecureStorageModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val secureStorage = SecureStorageManager(reactContext)

    companion object {
        private const val TAG = "SecureStorageModule"
    }

    override fun getName(): String {
        return "SecureStorageModule"
    }

    @ReactMethod
    fun saveString(key: String, value: String, promise: Promise) {
        try {
            secureStorage.saveString(key, value)
            Log.d(TAG, "String data saved for key: $key")
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("SAVE_ERROR", "Failed to save string data: ${e.message}", e)
            Log.e(TAG, "Failed to save string data: ${e.message}")
        }
    }

    @ReactMethod
    fun loadString(key: String, promise: Promise) {
        try {
            val value = secureStorage.loadString(key)
            promise.resolve(value)
        } catch (e: Exception) {
            promise.reject("LOAD_ERROR", "Failed to load string data: ${e.message}", e)
            Log.e(TAG, "Failed to load string data: ${e.message}")
        }
    }

    @ReactMethod
    fun removeItem(key: String, promise: Promise) {
        secureStorage.removeItem(key)
        promise.resolve(true)
    }

    @ReactMethod
    fun removeAll(promise: Promise) {
        secureStorage.removeAll()
        promise.resolve(true)
    }

}