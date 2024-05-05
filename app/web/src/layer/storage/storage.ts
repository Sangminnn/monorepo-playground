const canUseStorage = () => {
  try {
    const key = "__storage_test__";
    window.localStorage.setItem(key, "test");

    const value = window.localStorage.getItem(key) === "test";

    return !!value;
  } catch (e) {
    return false;
  }
};

const mapStorage = () => {
  const storage = new Map();

  const getItem = (key: string) => {
    return storage.get(key);
  };

  const setItem = <T>(key: string, value: T) => {
    return storage.set(key, value);
  };

  return {
    getItem,
    setItem,
  };
};

const localStorage = canUseStorage() ? window.localStorage : mapStorage();

export const getStorageValue = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const setStorageValue = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
