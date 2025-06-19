import storage from './storage';

// Function to save data to MMKV storage
export const saveData = (key: string, value: any) => {
  try {
    storage.set(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error saving data", e);
  }
};

// Function to get data from MMKV storage
export const getData = (key: string) => {
  try {
    const value = storage.getString(key);
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.error("Error retrieving data", e);
  }
};

// Function to remove data from MMKV storage
export const removeData = (key: string) => {
  try {
    storage.delete(key);
  } catch (e) {
    console.error("Error removing data", e);
  }
};

// Function to clear all data
export const clearAllData = () => {
  try {
    storage.clearAll();
  } catch (e) {
    console.error("Error clearing storage", e);
  }
};
