export const getLocalStorage = (key: string, defaultValue: any = false) => {
  try {
    if (typeof localStorage === "undefined") return defaultValue;

    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.log(error);

    return defaultValue;
  }
};

export const setLocalStorage = (key: string, value: any) => {
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

export const getSessionStorage = (key: string, defaultValue: any = false) => {
  try {
    if (typeof sessionStorage === "undefined") return defaultValue;

    const value = sessionStorage.getItem(key);

    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.log(error);

    return defaultValue;
  }
};

export const setSessionStorage = (key: string, value: any) => {
  try {
    if (typeof sessionStorage === "undefined") return;

    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const deleteSessionStorage = (key: string) => {
  try {
    if (typeof sessionStorage === "undefined") return;

    sessionStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
