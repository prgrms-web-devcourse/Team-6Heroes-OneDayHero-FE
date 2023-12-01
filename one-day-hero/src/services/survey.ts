import { useMutationalFetch } from "@/hooks/useMutationalFetch";
import { EmptyResponse } from "@/types/response";

import { CustomResponse } from "./base";

export const useDeleteProfileImageFetch = () => {
  return useMutationalFetch<EmptyResponse>("backend") as {
    mutationalFetch: (
      pathname: string,
      fetchOptions: RequestInit,
      onSuccess?: (response?: Response) => void,
      onError?: () => void
    ) => Promise<CustomResponse<EmptyResponse>>;
    isLoading: boolean;
  };
};
