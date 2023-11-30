import { safeFetch } from "./base";

type AuthResponse = {
  status: number;
  data: {
    userId: number;
    accessToken: string;
  };
  serverDateTime: string;
};

export const safePostAuthCodeFetch = (code: string) => {
  return safeFetch<AuthResponse>("backend", "/auth/kakao/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code })
  });
};
