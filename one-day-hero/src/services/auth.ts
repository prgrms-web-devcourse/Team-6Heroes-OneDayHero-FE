import { CustomResponse, useMutationalFetch } from "./base";

type AuthResponse = {
  status: number;
  token: string;
  serverDateTime: string;
};

export const usePostAuthCodeFetch = () => {
  return useMutationalFetch<AuthResponse>("/auth/kakao/login") as {
    mutationalFetch: (
      fetchOptions: RequestInit,
      onSuccess?: (response?: Response) => void,
      onError?: (err?: Error) => void
    ) => Promise<CustomResponse<AuthResponse>>;
  };
};
