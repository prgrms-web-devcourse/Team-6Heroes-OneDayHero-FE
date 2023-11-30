/* eslint-disable no-unused-vars */
import { useMutationalFetch } from "@/hooks/useMutationalFetch";
import { RegionsResponse } from "@/types/response";

import { CustomResponse } from "./base";

export const useGetRegionsFetch = (token: string) => {
  return useMutationalFetch<RegionsResponse>("backend", `/regions`) as {
    mutationalFetch: (
      fetchOptions?: RequestInit,
      onSuccess?: (response?: Response) => void,
      onError?: () => void
    ) => Promise<CustomResponse<RegionsResponse>>;
  };
};
