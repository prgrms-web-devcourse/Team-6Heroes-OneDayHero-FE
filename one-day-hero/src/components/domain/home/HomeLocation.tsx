"use client";

import { useEffect, useState } from "react";

import { getClientToken } from "@/app/utils/cookie";
import useLocation from "@/hooks/useLocation";
import { apiUrl } from "@/services/base";
import { HomeResponse } from "@/types/response";

const HomeLocation = () => {
  const { location, address } = useLocation();

  const token = getClientToken();

  useEffect(() => {
    if (location.lat === 0 || location.lng === 0) return;

    const fetchHome = async () => {
      try {
        const response = await fetch(
          apiUrl(`/main?longitude=${location.lng}&latitude=${location.lat}`),
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.ok) {
          const data: HomeResponse = await response.json();
          console.log(data);
        } else {
          throw new Error("위도 경도를 기반으로 한 API 요청에 실패했습니다.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchHome();
  }, [location, token]);

  return <div>{address}</div>;
};

export default HomeLocation;
