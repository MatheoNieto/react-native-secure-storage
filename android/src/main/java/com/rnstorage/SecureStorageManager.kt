package com.rnstorage

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class SecureStorageManager(private val context: Context) {
    private val secretKey: SecretKey?
    private val isEncryptionAvailable: Boolean
    private val sharedPreferences: SharedPreferences

    companion object {
        private const val PREFS_NAME = "SecureStoragePrefs"
        private const val TAG = "SecureStorageManager"
    }

    init {
        sharedPreferences = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        
        if (AESEncryptionHelper.isEncryptionAvailable()) {
            try {
                secretKey = AESEncryptionHelper.getOrCreateKey()
                isEncryptionAvailable = true
                Log.d(TAG, "SecureStorageManager: Encryption enabled (Android M+)")
            } catch (e: Exception) {
                Log.e(TAG, "Failed to initialize encryption key: ${e.message}")
                secretKey = null
                isEncryptionAvailable = false
            }
        } else {
            Log.d(TAG, "SecureStorageManager: Encryption not available (Android < M), using unencrypted storage")
            secretKey = null
            isEncryptionAvailable = false
        }
    }

    @Throws(Exception::class)
    fun saveString(key: String, value: String) {
        if (isEncryptionAvailable && secretKey != null) {
            try {
                val encryptedValue = AESEncryptionHelper.encrypt(value, secretKey)
                sharedPreferences.edit().putString(key, encryptedValue).apply()
                Log.d(TAG, "String saved with encryption for key: $key")
            } catch (e: Exception) {
                Log.e(TAG, "Encryption failed for key: $key, falling back to unencrypted storage")
                sharedPreferences.edit().putString(key, value).apply()
            }
        } else {
            // Fallback: save unencrypted for Android < M
            sharedPreferences.edit().putString(key, value).apply()
            Log.d(TAG, "String saved without encryption for key: $key")
        }
    }

    @Throws(Exception::class)
    fun loadString(key: String): String? {
        val storedValue = sharedPreferences.getString(key, null) ?: return null

        return if (isEncryptionAvailable && secretKey != null) {
            try {
                AESEncryptionHelper.decrypt(storedValue, secretKey)
            } catch (e: Exception) {
                Log.w(TAG, "Decryption failed for key: $key, assuming unencrypted data")
                storedValue
            }
        } else {
            storedValue
        }
    }

    @Throws(Exception::class)
    fun saveJSON(key: String, jsonString: String) {
        // Validate JSON
        try {
            JSONObject(jsonString)
        } catch (e: JSONException) {
            throw IllegalArgumentException("Provided string is not valid JSON")
        }

        saveString(key, jsonString)
        Log.d(TAG, "JSON data saved for key: $key")
    }

    @Throws(Exception::class)
    fun loadJSON(key: String): String? {
        val jsonString = loadString(key) ?: return null
        
        // Validate that it's still valid JSON
        try {
            JSONObject(jsonString)
        } catch (e: JSONException) {
            throw IllegalArgumentException("Stored data is not valid JSON")
        }

        return jsonString
    }

    fun removeItem(key: String) {
        sharedPreferences.edit().remove(key).apply()
    }

    fun removeAll() {
        sharedPreferences.edit().clear().apply()
    }

    fun hasItem(key: String): Boolean {
        return sharedPreferences.contains(key)
    }

    fun getAllKeys(): Set<String> {
        return sharedPreferences.all.keys
    }

    @Throws(Exception::class)
    fun multiGet(keys: Array<String>): Array<Array<String?>> {
        val result = mutableListOf<Array<String?>>()
        for (key in keys) {
            val value = loadString(key)
            result.add(arrayOf(key, value))
        }
        return result.toTypedArray()
    }

    @Throws(Exception::class)
    fun multiSet(keyValuePairs: Array<Array<String>>) {
        for (pair in keyValuePairs) {
            if (pair.size != 2) {
                throw IllegalArgumentException("Invalid key-value pair format")
            }
            saveString(pair[0], pair[1])
        }
    }

    fun multiRemove(keys: Array<String>) {
        val editor = sharedPreferences.edit()
        for (key in keys) {
            editor.remove(key)
        }
        editor.apply()
    }
}