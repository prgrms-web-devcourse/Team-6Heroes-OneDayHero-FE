"use client";

import { useEffect, useState } from "react";

const useLocation = () => {
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0
  });
  const [address, setAddress] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        setLocation({
          lat: 37.4979517,
          lng: 127.0276188
        });
      },
      {
        enableHighAccuracy: true,
        maximumAge: 60000 * 60
      }
    );
  }, []);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("지역 데이터를 조회하는 데 실패했습니다.");
        }

        const { results } = await response.json();

        setAddress(results[3].address_components[1].long_name);
      } catch (error) {
        console.error("에러");
      }
    };

    fetchAddress();
  }, [location]);

  return { location, address };
};

export default useLocation;
("use client");

import { useEffect, useState } from "react";

const useLocation = () => {
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0
  });
  const [address, setAddress] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        setLocation({
          lat: 37.4979517,
          lng: 127.0276188
        });
      },
      {
        enableHighAccuracy: true,
        maximumAge: 60000 * 60
      }
    );
  }, []);

  useEffect(() => {
    if (location.lat === 0 || location.lng === 0) return;

    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("지역 데이터를 조회하는 데 실패했습니다.");
        }

        const { results } = await response.json();

        setAddress(results[3].address_components[1].long_name);
      } catch (error) {
        console.error("에러");
      }
    };

    fetchAddress();
  }, [location]);

  return { location, address };
};

export default useLocation;
