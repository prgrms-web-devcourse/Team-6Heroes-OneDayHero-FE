import { useEffect, useState } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState({
    lat: 37.5666103,
    lng: 126.9783882
  });

  useEffect(() => {
    navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error("위치 정보에서 에러가 발생했습니다.", error);
      },
      {
        enableHighAccuracy: true
      }
    );
  }, []);

  return location;
};
