"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type UserIdContextType = {
  userId: number;
  setUserId: (value: number) => void;
};

const UserIdContext = createContext<UserIdContextType | null>(null);

const UserIdProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserIdState] = useState(getSavedUserId());
  const router = useRouter();

  const setUserId = (value: number) => {
    setUserIdState(value);
    if (typeof window !== "undefined")
      localStorage.setItem("odh_userId", value.toString());
  };

  useEffect(() => {
    if (userId === 0) {
      router.push(`/login`);
    }
  }, [router, userId]);

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};

export const useUserId = () => {
  const context = useContext(UserIdContext);
  if (context === null) {
    throw new Error("UserId Context 코드를 다시 확인해주세요.");
  }
  return context;
};

const getSavedUserId = () => {
  const savedUserId =
    typeof window !== "undefined"
      ? parseInt(localStorage.getItem("odh_userId") || "0")
      : 0;
  return !Number.isNaN(savedUserId) ? savedUserId : 0;
};

export default UserIdProvider;
