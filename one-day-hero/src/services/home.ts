import { HomeResponse } from "./../types/response";
import { safeFetch } from "./base";

const INITIAL_LAT = 37.4979517;
const INITIAL_LNG = 127.0276188;

export const useGetMainFetch = (
  token: string,
  lat = INITIAL_LAT,
  lng = INITIAL_LNG
) => {
  return safeFetch<HomeResponse>(
    "backend",
    `/main?longitude=${lng}&latitude=${lat}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
