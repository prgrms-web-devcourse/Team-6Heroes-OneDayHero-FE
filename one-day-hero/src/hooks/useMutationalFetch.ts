"use client";

import { useState } from "react";

import { MutationalFetchParams, useFetch } from "@/services/base";

export function useMutationalFetch<T>(
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

  const useFetchArguments: MutationalFetchParams[] = [];

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
    mutationalFetch: (useFetch<T>).bind(customThis, ...useFetchArguments),
    isLoading
  };
}
