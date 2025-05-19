import { MMKV } from 'react-native-mmkv';
import { MMKV_ENCRYPTION_KEY } from '@env';

const PREFIX = '@olab:';
const withPrefix = (key) => `${PREFIX}${key}`;

export const storage = new MMKV({
  id: 'olab-storage',
  encryptionKey: MMKV_ENCRYPTION_KEY,
});

// ⬇️ Extend MMKV instance with clean utility functions
storage.setKey = (key, value) => {
  try {
    storage.set(withPrefix(key), value);
  } catch (e) {
    console.error(`[MMKV] Error setting key: ${key}`, e);
  }
};

storage.getKey = (key, fallback = null) => {
  try {
    return storage.getString(withPrefix(key)) ?? fallback;
  } catch (e) {
    console.error(`[MMKV] Error getting key: ${key}`, e);
    return fallback;
  }
};

storage.setObject = (key, obj) => {
  try {
    const json = JSON.stringify(obj);
    storage.set(withPrefix(key), json);
  } catch (e) {
    console.error(`[MMKV] Error setting object: ${key}`, e);
  }
};

storage.getObject = (key, fallback = null) => {
  try {
    const json = storage.getString(withPrefix(key));
    return json ? JSON.parse(json) : fallback;
  } catch (e) {
    console.error(`[MMKV] Error getting object: ${key}`, e);
    return fallback;
  }
};

storage.deleteKey = (key) => {
  try {
    storage.delete(withPrefix(key));
  } catch (e) {
    console.error(`[MMKV] Error deleting key: ${key}`, e);
  }
};

storage.hasKey = (key) => {
  try {
    return storage.contains(withPrefix(key));
  } catch (e) {
    console.error(`[MMKV] Error checking key: ${key}`, e);
    return false;
  }
};

storage.clearAllKeys = () => {
  try {
    storage.clearAll();
  } catch (e) {
    console.error(`[MMKV] Error clearing all keys`, e);
  }
};

storage.getAllKeys = () => {
  try {
    return storage.getAllKeys().filter((key) => key.startsWith(PREFIX));
  } catch (e) {
    console.error(`[MMKV] Error getting all keys`, e);
    return [];
  }
};




// USES of the utiles
// Set a string value
// storage.setKey('username', 'john_doe');

// // Get a string value
// const username = storage.getKey('username');
// console.log(username); // 'john_doe'



// 2. // Set an object
// const user = { name: 'John', age: 30, isAdmin: true };
// storage.setObject('user', user);

// // Get an object
// const savedUser = storage.getObject('user');
// console.log(savedUser); // { name: 'John', age: 30, isAdmin: true }


// 3. // Set an object
// const user = { name: 'John', age: 30, isAdmin: true };
// storage.setObject('user', user);

// // Get an object
// const savedUser = storage.getObject('user');
// console.log(savedUser); // { name: 'John', age: 30, isAdmin: true }


// 4. const allKeys = storage.getAllKeys();
// console.log(allKeys); // Array of all keys starting with '@olab:'


// 5. storage.clearAllKeys();