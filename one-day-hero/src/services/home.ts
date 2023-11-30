import { HomeResponse } from "./../types/response";
import { useMutationalFetch } from "./base";

const INITIAL_LAT = 37.498095;
const INITIAL_LNG = 127.02761;

export const useGetMainFetch = (
  token: string,
  lat = INITIAL_LAT,
  lng = INITIAL_LNG
) => {
  return useMutationalFetch<HomeResponse>(
    `/main?longitude=${lng}&latitude=${lat}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
      next: { revalidate: 10 }
    }
  );
};
