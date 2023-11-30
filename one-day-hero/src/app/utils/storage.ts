export const getLocalStorage = (key: string, defaultValue = false) => {
  try {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.log(error);

    return defaultValue;
  }
};

export const setLocalStorage = (key: string, value: boolean) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const deleteLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
