const makeUrl = (baseUrl: string) => (path: string) => baseUrl + path;

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_MOCKING === "enabled"
    ? `${process.env.NEXT_PUBLIC_FE_URL}/api/v1/mock`
    : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`;

export const apiUrl = makeUrl(apiBaseUrl);

export type CustomResponse<T> = {
  isError: boolean;
  errorMessage?: string;
  response?: T;
};

export const useFetch = async <T>(
  pathname: string,
  options?: RequestInit,
  onSuccess?: (response?: Response) => void,
  onError?: (err?: Error) => void
): Promise<CustomResponse<T>> => {
  try {
    const response = await fetch(apiUrl(pathname), options);

    const customResponse: CustomResponse<T> = {
      isError: false,
      errorMessage: ""
    };

    if (!response.ok) {
      customResponse.isError = true;
      customResponse.errorMessage = response.statusText;
    }

    try {
      const bodyData = (await response.json()) as T;
      customResponse.response = bodyData;
    } catch (err) {
      customResponse.response = undefined;
    }

    onSuccess?.(response);

    return customResponse;
  } catch (err) {
    const errorResponse: CustomResponse<T> = {
      isError: true,
      errorMessage: (err as Error)?.message
    };

    onError?.(err as Error);

    return errorResponse;
  }
};

type MutationalFetchParams = string | RequestInit | (() => void);

export const useMutationalFetch = <T>(
  pathname?: string,
  options?: RequestInit,
  onSuccess?: (response?: Response) => void,
  onError?: (err?: Error) => void
) => {
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
    mutationalFetch: (useFetch<T>).bind(null, ...useFetchArguments)
  };
};
