import { RegionsResponse } from "@/types/response";

import { CustomResponse, useMutationalFetch } from "./base";

export const useGetRegionsFetch = (token: string) => {
  return useMutationalFetch<RegionsResponse>(`/regions`) as {
    mutationalFetch: (
      fetchOptions?: RequestInit,
      onSuccess?: (response?: Response) => void,
      onError?: () => void
    ) => Promise<CustomResponse<RegionsResponse>>;
  };
};
