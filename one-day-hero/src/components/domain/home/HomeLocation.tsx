"use client";

import { useEffect, useState } from "react";

import { getClientToken } from "@/app/utils/cookie";
import { useLocation } from "@/hooks/useLocation";
import { apiUrl } from "@/services/base";
import { HomeResponse } from "@/types/response";

const HomeLocation = () => {
  const { lat, lng } = useLocation();
  const [currentLocation, setCurrentLocation] = useState<string>("");

  const token = getClientToken();

  // useEffect(() => {
  //   const fetchHome = async () => {
  //     try {
  //       const response = await fetch(
  //         apiUrl(`/main?longitude=${lng}&latitude=${lat}`),
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`
  //           }
  //         }
  //       );

  //       if (response.ok) {
  //         const data: HomeResponse = await response.json();
  //         console.log(data);
  //       } else {
  //         throw new Error("위도 경도를 기반으로 한 API 요청에 실패했습니다.");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchHome();
  // }, [lat, lng, token]);

  return <div>HomeLocation</div>;
};

export default HomeLocation;
