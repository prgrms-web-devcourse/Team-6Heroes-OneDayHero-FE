"use client";

import Script from "next/script";
import { MouseEventHandler, useEffect, useRef, useState } from "react";

import useLocation from "@/hooks/useLocation";
import { useGetMapMissionList } from "@/services/map";
import { Coordinates, MapType } from "@/types";

import { getClientToken } from "../utils/cookie";

const INITIAL_CENTER: Coordinates = [37.5262411, 126.99289439];
const INITIAL_ZOOM = 10;

const MapPage = () => {
  const mapRef = useRef<MapType | null>(null);
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false);
  const token = getClientToken();
  const observeRef = useRef<HTMLDivElement | null>(null);
  const { location } = useLocation();

  const { data } = useGetMapMissionList(
    token ?? "",
    location.lat,
    location.lng,
    observeRef
  );

  console.log(data);

  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...INITIAL_CENTER),
      zoom: INITIAL_ZOOM,
      scaleControl: false,
      mapDataControl: false,
      zomControl: false,
      minZoom: 8,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT
      }
    };
    //새로운 네이버 맵 인스턴스 생성
    const map = new window.naver.maps.Map("map", mapOptions);
    mapRef.current = map;

    // DUMMY["data"].forEach(({ latitude, longitude }) => {
    //   const position = new naver.maps.LatLng(latitude, longitude);
    //   const marker = new naver.maps.Marker({
    //     map: map,
    //     position: position
    //   });
    //   const infowindow = new naver.maps.InfoWindow({
    //     content: `<MapMissionList />`
    //   });
    //   marker.addListener("click", (e) => {
    //     if (infowindow.getMap()) {
    //       infowindow.close();
    //     } else {
    //       infowindow.open(map, marker);
    //     }

    //     mapRef.current?.panTo(position, e.coord);
    //   });
    // });
  };

  //맵이 unmount되었을 때 맵 인스턴스 destory하기
  useEffect(() => {
    return () => {
      mapRef.current?.destroy();
    };
  }, []);

  const handleCloseModal = () => {
    setOpenBottomSheet(false);
  };

  const handleModalClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="relative h-96 w-96">
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        onReady={initializeMap}
      />
      <div id="map" className="h-full w-full" />
      <button
        type="button"
        className="absolute left-1/2 top-2 w-24 translate-x-[-50%] cursor-pointer rounded-2xl bg-slate-100 text-center text-sm font-semibold"
        onClick={() => setOpenBottomSheet(true)}>
        목록보기
      </button>
      {openBottomSheet && (
        <>
          <div
            className="absolute inset-0 z-10 h-96 w-96 bg-black opacity-60"
            onClick={handleCloseModal}
          />
          <div
            className={`opacity-1 absolute bottom-0 left-0 z-20 h-[250px] w-full overflow-hidden rounded-t-lg bg-white transition-transform duration-500 ${
              openBottomSheet ? "translate-y-0" : "translate-y-[250px]"
            }`}
            onClick={handleModalClick}>
            {/* <MapMissionList data={DUMMY["data"]} /> */}
          </div>
          <div ref={observeRef} />
        </>
      )}
    </div>
  );
};

export default MapPage;
