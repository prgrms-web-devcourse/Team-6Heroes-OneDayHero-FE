"use client";

import { useState } from "react";

import { safeFetch } from "@/services/base";

type MutationalFetchParams = string | RequestInit | (() => void);

export function useMutationalFetch<T>(
  baseUrlType: "backend" | "route",
  pathname?: string,
  options?: RequestInit,
  onSuccess?: (response?: Response) => void,
  onError?: (err?: Error) => void
) {
  const [isLoading, setIsLoadingState] = useState(false);

  const customThis = {
    setIsLoading: (value: boolean) => {
      setIsLoadingState(value);
    }
  };

  const useFetchArguments: MutationalFetchParams[] = [baseUrlType];

  if (pathname) {
    useFetchArguments.push(pathname);
    if (options) {
      useFetchArguments.push(options);
      if (onSuccess) {
        useFetchArguments.push(onSuccess);
        if (onError) useFetchArguments.push(onError);
      }
    }
  }

  return {
    mutationalFetch: (safeFetch<T>).bind(customThis, ...useFetchArguments),
    isLoading
  };
}
