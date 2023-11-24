import { HomeResponse } from "./../types/response";
import { useFetch } from "./base";

const INITIAL_LAT = 37.5666103;
const INITIAL_LNG = 126.9783882;

export const useGetMainFetch = (
  token: string,
  lat = INITIAL_LAT,
  lng = INITIAL_LNG
) => {
  return useFetch<HomeResponse>(`/main?longitude=${lng}&latitude=${lat}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
