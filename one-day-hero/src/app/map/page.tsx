"use client";

import Link from "next/link";
import Script from "next/script";
import {
  MouseEventHandler,
  Suspense,
  useEffect,
  useRef,
  useState
} from "react";
import { IoList } from "react-icons/io5";

import Button from "@/components/common/Button";
import MapMissionList from "@/components/domain/map/MapMissionList";
import useLocation from "@/hooks/useLocation";
import { useGetMapMissionList } from "@/services/map";
import { Coordinates, MapType } from "@/types";
import { getClientToken } from "@/utils/cookie";

const INITIAL_CENTER: Coordinates = [37.5262411, 126.99289439];
const INITIAL_ZOOM = 13;

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

  const { data, setSearchParams, fetchNextPage } = useGetMapMissionList(
    token ?? "",
    observeRef
  );

  useEffect(() => {
    if (
      location.lat === 0 ||
      location.lng === 0 ||
      Object.keys(searchParams || {}).length
    ) {
      return;
    }

    setSearchParams(`longitude=${location.lng}&latitude=${location.lat}`);
  }, [location]);

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

      const infowindow = new naver.maps.InfoWindow({
        content: `<div>
        <h2>미션 위치를 확인해보세요</h2>
      </div>`
      });

      marker.addListener("click", () => {
        if (infowindow.getMap()) {
          infowindow.close();
        } else {
          infowindow.open(map, marker);
        }
        mapRef.current?.panTo(position);
      });

      window.naver.maps.Event.addListener(map, "click", () => {
        infowindow.close();
      });
    } else {
      data.forEach(({ latitude, longitude, title }) => {
        const position = new naver.maps.LatLng(latitude, longitude);
        const marker = new naver.maps.Marker({
          map: map,
          position: position
        });
        const infowindow = new naver.maps.InfoWindow({
          content: `
            <div>
              <h2>미션 위치를 확인해보세요</h2>
            </div>`
        });
        marker.addListener("click", () => {
          if (infowindow.getMap()) {
            infowindow.close();
          } else {
            infowindow.open(map, marker);
          }
          mapRef.current?.panTo(position);
        });
      });
    }
  };

  useEffect(() => {
    const checkNaverReady = setInterval(() => {
      if (window.naver) {
        clearInterval(checkNaverReady);
        initializeMap();
      }
    }, 100);

    return () => clearInterval(checkNaverReady);
  }, [data]);

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
    <div className="relative h-[40rem] w-[100vw] max-w-screen-sm">
      <Suspense>
        <Script
          strategy="afterInteractive"
          type="text/javascript"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        />
        <div id="map" className="h-full w-full" />
      </Suspense>
      {!Object.keys(searchParams || {}).length ? (
        <>
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
                className={`opacity-1 bg-background absolute bottom-0 left-0 z-20 flex h-[30rem] w-full flex-col items-center overflow-hidden rounded-t-lg ${
                  openBottomSheet
                    ? "animate-bottom-sheet-up"
                    : "animate-bottom-sheet-down"
                }`}
                onClick={handleModalClick}>
                {data.length ? (
                  <>
                    <MapMissionList data={data} />
                    <Button
                      className="cs:my-5"
                      size="md"
                      onClick={fetchNextPage}>
                      더 보기
                    </Button>
                  </>
                ) : (
                  <div className="my-10 flex h-[20rem] w-full flex-col items-center gap-5">
                    <h1>미션이 생성되지 않은 지역이에요..</h1>
                    <Button>
                      <Link href={"/mission/create"}>미션 생성하기</Link>
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      ) : null}
    </div>
  );
};

export default MapPage;
