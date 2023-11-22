"use client";

import { RefObject, useEffect, useRef, useState } from "react";

import { useFetch } from "../services/base";

type useInfiniteFetchProps = {
  pathname: string;
  size: number;
  observerRef?: RefObject<HTMLDivElement>;
  options?: RequestInit;
};

export const useInfiniteFetch = <
  T extends { data: { content: any[]; last: boolean } }
>({
  pathname,
  size,
  observerRef,
  options
}: useInfiniteFetchProps) => {
  const [data, setData] = useState<T["data"]["content"]>([]);

  const pageRef = useRef<number>(0);
  const searchParamsRef = useRef<string>("");

  const observer = useRef(
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            returnMethods.fetchNextPage();
          }
        });
      },
      { threshold: 1 }
    )
  );

  const returnMethods = {
    fetchNextPage: async () => {
      if (!returnMethods.hasNextPage) return { isError: true };

      returnMethods.isLoading = true;

      const { isError, response } = await (useFetch<T>).call(
        null,
        `${pathname}?page=${pageRef.current}&size=${size}&sort=${
          searchParamsRef.current.length > 0 ? "&" : ""
        }${searchParamsRef.current}`,
        options
      );

      if (!isError && response) {
        setData([...data, ...response.data.content]);
        returnMethods.hasNextPage = !response.data.last;
        pageRef.current += 1;
      }

      returnMethods.isLoading = false;

      return { isError };
    },
    hasNextPage: true,
    setSearchParams: (newSearchParams: string) => {
      searchParamsRef.current = newSearchParams;
      pageRef.current = 0;

      returnMethods.fetchNextPage();
    },
    isLoading: false
  };

  useEffect(() => {
    if (!observerRef?.current) return;

    if (!returnMethods.hasNextPage || returnMethods.isLoading) {
      observer.current.unobserve(observerRef.current);
      return;
    }

    if (pageRef.current === 0 || !returnMethods.isLoading)
      observer.current.observe(observerRef.current);
  }, [data, observerRef, returnMethods.hasNextPage, returnMethods.isLoading]);

  return returnMethods;
};
