"use client";
import { MutableRefObject, useEffect, useRef, useState } from "react";

import { safeFetch } from "../services/base";
type useInfiniteFetchProps = {
  baseUrlType: "backend" | "route";
  pathname: string;
  size: number;
  sort?: string;
  observerRef?: MutableRefObject<HTMLDivElement | null>;
  options?: RequestInit;
};
export const useInfiniteFetch = <
  T extends { data: { content: any[]; last: boolean } }
>({
  baseUrlType,
  pathname,
  size,
  sort,
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
      const { isError, response } = await (safeFetch<T>).call(
        null,
        baseUrlType,
        `${pathname}${pathname.includes("?") ? "&" : "?"}page=${
          pageRef.current
        }&size=${size}${sort ?? "&sort="}${
          searchParamsRef.current.length > 0 ? "&" : ""
        }${searchParamsRef.current}`,
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
      hasNextPageRef.current = true;

      setData([]);

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
