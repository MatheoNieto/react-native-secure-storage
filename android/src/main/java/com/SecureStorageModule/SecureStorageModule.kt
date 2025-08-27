package com.storage

import android.content.Context
import android.content.SharedPreferences
import com.facebook.react.bridge.*

class SecureStorageModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    private val prefs: SharedPreferences = reactContext.getSharedPreferences("storage", Context.MODE_PRIVATE)

    override fun getName(): String = "SecureStorageModule"


    @ReactMethod
    fun setItem(key: String, value: String, promise: Promise) {
        try {
            sharedPreferences.edit().putString(key, value).apply()
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("SAVE_ERROR", e)
        }
    }

    @ReactMethod
    fun getItem(key: String, promise: Promise) {
        try {
            val value = sharedPreferences.getString(key, null)
            promise.resolve(value)
        } catch (e: Exception) {
            promise.reject("GET_ERROR", e)
        }
    }
}
