import { EventSourcePolyfill } from "event-source-polyfill";
import Image from "next/image";

import NotificationItem from "@/components/domain/notification/NotificationItem";
import { apiUrl } from "@/services/base";
import { useGetNotificationFetch } from "@/services/notification";
import searchFail from "~/images/searchFail.png";

import ErrorPage from "../error";
import { getServerToken } from "../utils/auth";

const NotificationPage = async () => {
  // const token = getServerToken();

  // const { response, isError } = await useGetNotificationFetch(token!);

  // if (isError || !response) return <ErrorPage />;

  // const {
  //   data: { content, empty }
  // } = response;

  // const fetchSSE = () => {
  //   const eventSource = new EventSourcePolyfill(apiUrl("/sse/subscribe"), {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "text/event-stream"
  //     }
  //   });

  //   eventSource.onopen = (event) => {
  //     console.log("성공!!");
  //     console.log("@@@@@@@@@@@@@@@@", event);
  //   };

  //   eventSource.onmessage = (event) => {
  //     console.log(event, "@@@@@@@@@@@");
  //   };

  //   eventSource.onerror = (e) => {
  //     console.log(e.target, "에러남");
  //     eventSource.close();
  //   };
  // };

  // fetchSSE();

  return (
    <div className="flex w-full flex-col items-center">
      {/* {!empty ? (
        content &&
        content.map((item) => (
          <NotificationItem
            key={item.id}
            title={item.title}
            content={item.content}
            createdAt={item.createdAt}
          />
        ))
      ) : (
        <>
          <div className="relative h-96 w-96">
            <Image src={searchFail} alt="결과 없음" fill />
          </div>
          <h1 className="text-center text-2xl font-bold text-black">
            아직은 알림이 없네요.. <br />
            기다리면 좋은 소식이 있을거에요!
          </h1>
        </> */}
      {/* )} */}
    </div>
  );
};

export default NotificationPage;
