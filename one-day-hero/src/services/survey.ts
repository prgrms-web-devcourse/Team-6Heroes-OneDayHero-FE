import { EmptyResponse } from "@/types/response";

import { CustomResponse, useMutationalFetch } from "./base";

export const useDeleteProfileImageFetch = () => {
  return useMutationalFetch<EmptyResponse>() as {
    mutationalFetch: (
      pathname: string,
      fetchOptions: RequestInit,
      onSuccess?: (response?: Response) => void,
      onError?: () => void
    ) => Promise<CustomResponse<EmptyResponse>>;
  };
};
