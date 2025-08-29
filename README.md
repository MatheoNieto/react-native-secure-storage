# react-native-secure-storage

`react-native-secure-storage` provides a **fast and reliable solution for securely storing data** in React Native apps.

Currently, only **string values** are supported.  
If you need to store objects, you can `JSON.stringify` before saving and `JSON.parse` when retrieving.

---

## ✨ Features

- 🔐 Secure storage for sensitive data
- ⚡ Simple API for storing and retrieving values
- 🪝 React hook support with auto-refresh capability
- 📦 Lightweight and easy to integrate

---

## 📦 Installation

```bash
npm install react-native-secure-storage
# or
yarn add react-native-secure-storage
```

## 🪝 Using the Hook

The useStorage hook gives you:

- value → The stored value for the given key
- updateValue → Save/update a new value
- refreshValue → Refresh value from storage (useful if updated elsewhere)

```typescript
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useStorage } from 'react-native-secure-storage';

export default function App() {
  const { value, refreshValue, updateValue } = useStorage('myKey');

  return (
    <View>
      <Text>Stored Value: {value}</Text>
      <Button title="Save Value" onPress={() => updateValue('Hello World')} />
      <Button title="Refresh Value" onPress={refreshValue} />
    </View>
  );
}
```

## ⚡ Using the Instance API

If you prefer full control without hooks, you can use the instance API:

```typescript
import React from 'react';
import { View, Text, Button } from 'react-native';
import { createUC as Storage } from 'react-native-secure-storage';

export default function MyComponent() {
  const [value, setValue] = React.useState<string | null>(null);

  const updateValue = async (newValue: string) => {
    await Storage.setItem('myKey', newValue);
    setValue(newValue);
  };

  const refreshValue = async () => {
    const storedValue = await Storage.getItem('myKey');
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

### 🚀 Roadmap

- Support JSON/object storage without manual serialization
- Encrypted storage (AES / Keychain / Keystore)
- Async state management helpers

## 📄 License

MIT © 2025

Would you like me to also **add usage examples with JSON objects** (showing `JSON.stringify` / `JSON.parse`), so developers see immediately how to handle non-string data?
