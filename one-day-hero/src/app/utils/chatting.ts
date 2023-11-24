import * as StompJs from "@stomp/stompjs";
import { Dispatch, SetStateAction } from "react";
import SockJS from "sockjs-client";

import { getClientToken } from "./cookie";

const socket = new SockJS(`${process.env.NEXT_PUBLIC_BE_URL}/ws-chat`);
const stompClient = StompJs.Stomp.over(socket);

export const connect = (
  roomId: string,
  setNewMessages: Dispatch<SetStateAction<string[]>>
) => {
  fetch(`${process.env.NEXT_PUBLIC_FE_URL}/back-end/api/v1/chats/${roomId}`, {
    headers: {
      Authorization: `Bearer ${getClientToken()}`
    }
  });
  stompClient.connect(
    {},
    () => {
      stompClient.subscribe(`/queue/chatRooms/${roomId}`, (message) => {
        const recv = JSON.parse(message.body);
        console.log("message: ", recv);
        // setNewMessages(prev => [...prev, recv])
      });
    },
    (err: unknown) => {
      console.log(err);
    }
  );
};

type SendMessageProps = {
  chatRoomId: string;
  senderId: number;
  messageType: "TALK" | "LEAVE";
  senderNickName: string;
  message: string;
};
export const sendMessage = (props: SendMessageProps) => {
  stompClient.send(
    `/pub/chatRooms/${props.chatRoomId}/chat`,
    {
      headers: {
        Authorization: `Bearer ${getClientToken()}`
      }
    },
    JSON.stringify(props)
  );
  console.log(props);
};
