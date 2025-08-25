package com.storage

import android.content.Context
import android.content.SharedPreferences
import com.facebook.react.bridge.*

class StorageModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    private val prefs: SharedPreferences = reactContext.getSharedPreferences("storage", Context.MODE_PRIVATE)

    override fun getName(): String = "StorageModule"

    @ReactMethod
    fun setItem(key: String, value: String, promise: Promise) {
        prefs.edit().putString(key, value).apply()
        promise.resolve(true)
    }

    @ReactMethod
    fun getItem(key: String, promise: Promise) {
        val value = prefs.getString(key, null)
        promise.resolve(value)
    }

    @ReactMethod
    fun removeItem(key: String, promise: Promise) {
        prefs.edit().remove(key).apply()
        promise.resolve(true)
    }
}
