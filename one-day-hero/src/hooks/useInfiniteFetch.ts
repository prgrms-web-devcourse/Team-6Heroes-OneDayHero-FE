"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";

import { useFetch } from "../services/base";

type useInfiniteFetchProps = {
  pathname: string;
  size: number;
  observerRef?: MutableRefObject<HTMLDivElement | null>;
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
  const hasNextPageRef = useRef<boolean>(true);
  const isLoadingRef = useRef<boolean>(false);

  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            returnMethods.fetchNextPage();
            console.log("intersecting");
          }
        });
      },
      { threshold: 1 }
    );
  }, []);

  const returnMethods = {
    data,
    fetchNextPage: async () => {
      if (!hasNextPageRef.current) return { isError: true };

      isLoadingRef.current = true;

      const { isError, response } = await (useFetch<T>).call(
        null,
        `${pathname}${pathname.includes("?") ? "&" : "?"}page=${
          pageRef.current
        }&size=${size}&sort=${searchParamsRef.current.length > 0 ? "&" : ""}${
          searchParamsRef.current
        }`,
        options
      );

      if (!isError && response) {
        setData((prev) => [...prev, ...response.data.content]);
        hasNextPageRef.current = !response.data.last;
        pageRef.current += 1;
      }

      isLoadingRef.current = false;

      return { isError };
    },
    hasNextPage: hasNextPageRef.current,
    setSearchParams: (newSearchParams: string) => {
      searchParamsRef.current = newSearchParams;
      pageRef.current = 0;

      returnMethods.fetchNextPage();
    },
    isLoading: isLoadingRef.current
  };

  useEffect(() => {
    if (!observerRef?.current || !observer.current) return;

    if (!hasNextPageRef.current || isLoadingRef.current) {
      observer.current.unobserve(observerRef.current);
      return;
    }

    if (pageRef.current === 0 || !isLoadingRef.current)
      observer.current.observe(observerRef.current);
  }, [data, observerRef, hasNextPageRef, isLoadingRef]);

  return returnMethods;
};
