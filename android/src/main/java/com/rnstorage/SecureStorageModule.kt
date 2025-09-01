package com.rnstorage

import android.content.Context
import android.content.SharedPreferences
import android.util.Log
import com.facebook.react.bridge.*

class SecureStorageModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val secureStorage = SecureStorageManager(reactContext)

    companion object {
        private const val MODULE_NAME = "SecureStorageModule"
        private const val PREFS_NAME = "SecureStorageModule"
        private const val TAG = "SecureStorageModule"
    }

    override fun getName(): String {
        return MODULE_NAME
    }

    private fun getSharedPreferences(): SharedPreferences {
        return reactApplicationContext.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
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