# storage-react-native

storage-react-native provides a fast and reliable solution for securely storing sensitive data in React Native apps.

You can choose between:
• Plain storage – stores strings as-is.
• Secure storage – encrypts strings with AES-256 using the Android Keystore / iOS Keychain.

Currently, only string values are supported.
For objects, simply use JSON.stringify before saving and JSON.parse when retrieving.

---

## ✨ Features

- 🔐 Secure storage for sensitive data
- ⚡ Simple API for storing and retrieving values
- 🪝 React hook support with auto-refresh capability
- 📦 Lightweight and easy to integrate

---

## 📦 Installation

```bash
npm install storage-react-native
# or
yarn add storage-react-native
```

## 🪝 Using the Hook

to provide two hooks:

- useSecureStorage → encrypted values (AES-256)
- useStorage → plain text values

Each hook returns:

- value → The stored value for the given key
- updateValue → Save/update a new value
- refreshValue → Refresh value from storage (useful if updated elsewhere)

### 🔐 Encrypted storage (AES)

```typescript
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSecureStorage } from 'storage-react-native';

export default function App() {
  const { value, updateValue, refreshValue } = useSecureStorage('secureKey');

  return (
    <View>
      <Text>Secure Value: {value}</Text>
      <Button title="Save Secure" onPress={() => updateValue('Hello Secure')} />
      <Button title="Refresh" onPress={refreshValue} />
    </View>
  );
}
```

### 📝 Plain storage

```typescript
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useStorage } from 'storage-react-native';

export default function App() {
  const { value, updateValue, refreshValue } = useStorage('plainKey');

  return (
    <View>
      <Text>Plain Value: {value}</Text>
      <Button title="Save Plain" onPress={() => updateValue('Hello Plain')} />
      <Button title="Refresh" onPress={refreshValue} />
    </View>
  );
}
```

## ⚡ Using the Instance API

If you prefer not to use hooks, you can call the API directly.

### 🔐 Encrypted storage

```typescript
import React from 'react';
import { View, Text, Button } from 'react-native';
import { SecureStorage } from 'storage-react-native';

export default function MyComponent() {
  const [value, setValue] = React.useState<string | null>(null);

  const updateValue = async (newValue: string) => {
    await SecureStorage.setItem('myKey', newValue);
    setValue(newValue);
  };

  const refreshValue = async () => {
    const storedValue = await SecureStorage.getItem('myKey');
    setValue(storedValue);
  };

  return (
    <View>
      <Text>Stored Value: {value}</Text>
      <Button title="Save 'Hello'" onPress={() => updateValue('Hello')} />
      <Button title="Refresh" onPress={refreshValue} />
    </View>
  );
}
```

### 📝 Plain storage

```typescript
import {Storage} from 'storage-react-native';

await Storage.setItem('plainKey', 'Hello Plain');
const value = await Storage.getItem('plainKey');
console.log('Plain value:', value);
```

## 🧩 Working with JSON

Since only strings are supported, you can easily store JSON:

```typescript
// Save
const user = {id: 1, name: 'bla bla'};
await SecureStorage.setItem('user', JSON.stringify(user));

// Load
const stored = await SecureStorage.getItem('user');
const userObj = stored ? JSON.parse(stored) : null;
console.log(userObj?.name); // bla bla
```

## 📄 License

MIT © 2025

Would you like me to also **add usage examples with JSON objects** (showing `JSON.stringify` / `JSON.parse`), so developers see immediately how to handle non-string data?
