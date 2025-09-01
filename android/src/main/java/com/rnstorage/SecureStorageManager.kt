package com.rnstorage

import android.content.Context
import android.content.SharedPreferences
import android.util.Log
import org.json.JSONObject
import org.json.JSONException
import javax.crypto.SecretKey

class SecureStorageManager(private val context: Context) {
    private var secretKey: SecretKey? = null
    private var isEncryptionAvailable: Boolean = false
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

    fun saveString(key: String, value: String) {
        if (isEncryptionAvailable && secretKey != null) {
            try {
                val encryptedValue = AESEncryptionHelper.encrypt(value, secretKey!!)
                sharedPreferences.edit().putString(key, encryptedValue).apply()
                Log.d(TAG, "String saved with encryption for key: $key")
            } catch (e: Exception) {
                Log.e(TAG, "Encryption failed for key: $key, falling back to unencrypted storage")
                sharedPreferences.edit().putString(key, value).apply()
            }
        } else {
            sharedPreferences.edit().putString(key, value).apply()
            Log.d(TAG, "String saved without encryption for key: $key")
        }
    }

    fun loadString(key: String): String? {
        val storedValue = sharedPreferences.getString(key, null) ?: return null

        return if (isEncryptionAvailable && secretKey != null) {
            try {
                AESEncryptionHelper.decrypt(storedValue, secretKey!!)
            } catch (e: Exception) {
                Log.w(TAG, "Decryption failed for key: $key, assuming unencrypted data")
                storedValue
            }
        } else {
            storedValue
        }
    }

    fun removeItem(key: String) {
        sharedPreferences.edit().remove(key).apply()
    }

    fun removeAll() {
        sharedPreferences.edit().clear().apply()
    }

}