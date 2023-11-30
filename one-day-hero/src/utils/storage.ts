export const getLocalStorage = (key: string, defaultValue = false) => {
  try {
    if (typeof localStorage === "undefined") return defaultValue;

    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.log(error);

    return defaultValue;
  }
};

export const setLocalStorage = (key: string, value: boolean) => {
  try {
    if (typeof localStorage === "undefined") return;

    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const deleteLocalStorage = (key: string) => {
  try {
    if (typeof localStorage === "undefined") return;

    localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
