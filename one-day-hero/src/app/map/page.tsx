"use client";

import Script from "next/script";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { IoList } from "react-icons/io5";

import MapMissionList from "@/components/domain/map/MapMissionList";
import useLocation from "@/hooks/useLocation";
import { useGetMapMissionList } from "@/services/map";
import { Coordinates, MapType } from "@/types";

import { getClientToken } from "../utils/cookie";

const INITIAL_CENTER: Coordinates = [37.5262411, 126.99289439];
const INITIAL_ZOOM = 10;

type MapPageProps = {
  searchParams?: {
    lat: string;
    lng: string;
  };
};

const MapPage = ({ searchParams }: MapPageProps) => {
  const mapRef = useRef<MapType | null>(null);
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false);
  const token = getClientToken();
  const observeRef = useRef<HTMLDivElement | null>(null);
  const { location } = useLocation();

  const { data, setSearchParams } = useGetMapMissionList(
    token ?? "",
    observeRef
  );

  console.log(data);

  useEffect(() => {
    if (location.lat === 0 && location.lng === 0) return;
    setSearchParams(`longitude=127.030921234166&latitude=37.4924272855457`);
  }, [location]);
  /** note 위치 기반 테스트 lat=37.4924272855457&lng=127.030921234166 */

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

    const map = new window.naver.maps.Map("map", mapOptions);
    mapRef.current = map;

    if (Object.keys(searchParams || {}).length) {
      const { lat, lng } = searchParams!;
      const position = new window.naver.maps.LatLng(Number(lat), Number(lng));
      mapRef.current?.setCenter(position);

      const marker = new naver.maps.Marker({
        map: map,
        position: position
      });
    } else {
      data.forEach(({ latitude, longitude }) => {
        const position = new naver.maps.LatLng(latitude, longitude);
        const marker = new naver.maps.Marker({
          map: map,
          position: position
        });
        const infowindow = new naver.maps.InfoWindow({
          content: `<MapMissionList />`
        });
        marker.addListener("click", (e) => {
          if (infowindow.getMap()) {
            infowindow.close();
          } else {
            infowindow.open(map, marker);
          }
          mapRef.current?.panTo(position, e.coord);
        });
      });
    }
  };

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
    <div className="relative h-[100vw] min-h-screen w-[100vw] max-w-screen-sm">
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        onReady={initializeMap}
      />
      <div id="map" className="h-full w-full" />
      <button
        type="button"
        className="shadow-down absolute left-1/2 top-2 z-30 flex h-8 w-24 -translate-x-1/2 cursor-pointer items-center justify-center gap-1 rounded-2xl bg-white text-center text-sm font-semibold"
        onClick={() => setOpenBottomSheet(true)}>
        <IoList size={18} className="inline-block" />
        <span className="inline-block">목록보기</span>
      </button>
      {openBottomSheet && (
        <>
          <div
            className="absolute inset-0 z-10 h-full w-full bg-black opacity-60"
            onClick={handleCloseModal}
          />
          <div
            className={`opacity-1 absolute bottom-0 left-0 z-20 h-[35rem] w-full overflow-hidden rounded-t-lg bg-white transition-transform duration-500 ${
              openBottomSheet ? "translate-y-0" : "translate-y-[35rem]"
            }`}
            onClick={handleModalClick}>
            <MapMissionList data={data} curRef={observeRef} />
          </div>
        </>
      )}
    </div>
  );
};

export default MapPage;