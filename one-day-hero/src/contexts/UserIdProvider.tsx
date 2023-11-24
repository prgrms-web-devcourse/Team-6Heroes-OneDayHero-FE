"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from "react";

type UserIdContextType = {
  userId: number;
  setUserId: Dispatch<SetStateAction<number>>;
};

const UserIdContext = createContext<UserIdContextType | null>(null);

const UserIdProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState(0);

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

export default UserIdProvider;
