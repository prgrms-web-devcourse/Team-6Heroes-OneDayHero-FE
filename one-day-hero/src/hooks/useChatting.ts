"use client";

import * as StompJs from "@stomp/stompjs";
import { useCallback, useEffect, useRef, useState } from "react";

import { getClientToken } from "@/app/utils/cookie";

export type MessageProps = {
  chatRoomId: string;
  senderId: number;
  messageType: "TALK" | "LEAVE";
  senderNickName: string;
  message: string;
};

const useChatting = (roomId: string) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const clientRef = useRef<StompJs.Client | null>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const connect = () => {
    clientRef.current = new StompJs.Client({
      brokerURL: `${process.env.NEXT_PUBLIC_BE_WS_URL}/ws-chat`,
      connectHeaders: {
        Authorization: `Bearer ${getClientToken()}`
      },
      debug: function (str) {
        // console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    clientRef.current.onConnect = () => {
      clientRef.current?.subscribe(`/queue/chatRooms/${roomId}`, (message) => {
        const recv = JSON.parse(message.body);
        setMessages((prev) => [...prev, recv]);
      });
    };

    clientRef.current.onStompError = function (frame) {
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
    };

    clientRef.current.activate();
  };

  const disconnect = () => {
    if (!clientRef.current) return;
    clientRef.current.deactivate();
  };

  const sendMessage = useCallback((props: MessageProps) => {
    if (props.message.length <= 0) return;

    clientRef.current?.publish({
      destination: `/pub/chatRooms/${props.chatRoomId}/chat`,
      body: JSON.stringify(props)
    });
  }, []);

  useEffect(() => {
    const enterChatRoom = async () => {
      connect();
    };

    enterChatRoom();

    return () => disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !messageEndRef.current) return;

    window.scrollTo({
      behavior: "smooth",
      top:
        window.scrollY +
        messageEndRef.current.getBoundingClientRect().top -
        window.innerHeight +
        150
    });
  }, [messages]);

  return { messages, sendMessage, messageEndRef };
};

export default useChatting;
