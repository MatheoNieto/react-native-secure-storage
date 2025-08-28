package com.rnstorage
import android.content.Context
import android.content.SharedPreferences
import android.util.Log
import com.facebook.react.bridge.*

class SecureStorageModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        private const val MODULE_NAME = "SecureStorageModule"
        private const val PREFS_NAME = "SecureStorage"
        private const val TAG = "SecureStorageModule"
    }

    override fun getName(): String {
        return MODULE_NAME
    }

    private fun getSharedPreferences(): SharedPreferences {
        return reactApplicationContext.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    }

    @ReactMethod
    fun getItem(key: String, promise: Promise) {
        try {
            Log.d(TAG, "🔵 getItem called with key: $key")
            val prefs = getSharedPreferences()
            val value = prefs.getString(key, null)
            Log.d(TAG, "🔵 getItem result: $value")
            promise.resolve(value)
        } catch (e: Exception) {
            Log.e(TAG, "❌ Error in getItem: ${e.message}", e)
            promise.reject("ERROR", "Failed to get item: ${e.message}", e)
        }
    }

    @ReactMethod
    fun setItem(key: String, value: String, promise: Promise) {
        try {
            Log.d(TAG, "🔵 setItem called with key: $key, value: $value")
            val prefs = getSharedPreferences()
            val editor = prefs.edit()
            editor.putString(key, value)
            val success = editor.commit()
            
            if (success) {
                Log.d(TAG, "🔵 setItem successful")
                promise.resolve(true)
            } else {
                Log.e(TAG, "❌ setItem failed to commit")
                promise.reject("ERROR", "Failed to save item")
            }
        } catch (e: Exception) {
            Log.e(TAG, "❌ Error in setItem: ${e.message}", e)
            promise.reject("ERROR", "Failed to set item: ${e.message}", e)
        }
    }
}