const makeUrl = (baseUrl: string) => (path: string) => baseUrl + path;

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_MOCKING === "enabled"
    ? `${process.env.NEXT_PUBLIC_FE_URL}/api/v1/mock`
    : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`;

export const apiUrl = makeUrl(apiBaseUrl);
export const routeUrl = makeUrl(`${process.env.NEXT_PUBLIC_FE_URL}/api`);

export type CustomResponse<T> = {
  isError: boolean;
  errorMessage?: string;
  response?: T;
};

export async function safeFetch<T>(
  this: any,
  baseUrlType: "backend" | "route",
  pathname?: string,
  options?: RequestInit,
  onSuccess?: (response?: Response) => void,
  onError?: (err?: Error) => void
): Promise<CustomResponse<T>> {
  const setIsLoading = this?.setIsLoading;

  try {
    setIsLoading?.(true);
    const fetchUrl =
      baseUrlType === "backend"
        ? apiUrl(pathname ?? "/")
        : routeUrl(pathname ?? "/");
    const response = await fetch(fetchUrl, options);

    const customResponse: CustomResponse<T> = {
      isError: false,
      errorMessage: ""
    };

    if (!response.ok) {
      customResponse.isError = true;

      try {
        const bodyData = await response.json();
        throw new Error(bodyData?.message ?? response.statusText);
      } catch (err) {
        throw new Error((err as Error).message);
      }
    }

    try {
      const bodyData = (await response.json()) as T;
      customResponse.response = bodyData;
    } catch (err) {
      customResponse.response = undefined;
    }

    onSuccess?.(response);
    setIsLoading?.(false);

    return customResponse;
  } catch (err) {
    const errorResponse: CustomResponse<T> = {
      isError: true,
      errorMessage: (err as Error)?.message
    };

    onError?.(err as Error);
    setIsLoading?.(false);

    return errorResponse;
  }
}

export const passRevalidateTag = async (tag: string[]) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FE_URL}/api/revalidateTag`,
      {
        method: "POST",
        body: JSON.stringify({
          tag
        }),
        headers: { "Content-Type": "application/json" }
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (err) {
    console.error(err);
  }
};
