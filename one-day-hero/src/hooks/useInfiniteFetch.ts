"use client";

import {
  MutableRefObject,
  useEffect,
  useRef,
  useState,
  useTransition
} from "react";

import { getSessionStorage, setSessionStorage } from "@/utils/storage";

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
  const scrollRef = useRef<number>(0);

  const localStorageKey = `odh_infinite_${pathname}`;

  const updataScrollRef = () => {
    scrollRef.current = window.scrollY;
  };

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

    const { page, scroll } = getSessionStorage(localStorageKey, {
      page: 0,
      scroll: 0
    });

    if (page !== 0 || scroll !== 0) {
      returnMethods.refreshPage(page, scroll);
    }

    window.addEventListener("scroll", updataScrollRef);

    return () => {
      setSessionStorage(localStorageKey, {
        page: pageRef.current,
        scroll: scrollRef.current
      });

      window.removeEventListener("scroll", updataScrollRef);
    };
  }, []);

  const returnMethods = {
    data,
    fetchNextPage: async () => {
      if (!hasNextPageRef.current) return { isError: true };

      isLoadingRef.current = true;

      const { isError, response } = await safeFetch<T>(
        baseUrlType,
        `${pathname}${pathname.includes("?") ? "&" : "?"}page=${
          pageRef.current
        }&size=${size}${sort ?? `&sort=${sort}`}${
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
    refreshPage: async (recordedPage?: number, recordedScroll?: number) => {
      const totalSize = (recordedPage ? recordedPage : pageRef.current) * size;
      const scroll =
        typeof window === "undefined"
          ? 0
          : recordedScroll
          ? recordedScroll
          : window.scrollY;

      isLoadingRef.current = true;

      const { isError, response } = await safeFetch<T>(
        baseUrlType,
        `${pathname}${
          pathname.includes("?") ? "&" : "?"
        }page=0&size=${totalSize}${sort ?? `&sort=${sort}`}${
          searchParamsRef.current.length > 0 ? "&" : ""
        }${searchParamsRef.current}`,
        options
      );

      if (!isError && response) {
        setData([...response.data.content]);
        hasNextPageRef.current = !response.data.last;
        pageRef.current = recordedPage ? recordedPage : pageRef.current + 1;
      }

      isLoadingRef.current = false;

      setTimeout(() => {
        if (typeof window === "undefined") return;
        window.scrollTo({
          behavior: "instant",
          top: scroll
        });
      }, 10);
    },
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
