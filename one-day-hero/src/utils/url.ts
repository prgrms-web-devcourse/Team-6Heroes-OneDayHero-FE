const makeUrl = (baseUrl: string) => (path: string) => baseUrl + path;

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_MOCKING === "enabled"
    ? (process.env.NEXT_PUBLIC_FE_URL ?? "") + "/api"
    : process.env.NEXT_PUBLIC_BE_URL ?? "";

export const apiUrl = makeUrl(apiBaseUrl);
