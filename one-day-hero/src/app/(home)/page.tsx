import { getServerSession } from "next-auth";

import authOptions from "../api/auth/[...nextauth]/authOptions";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex w-full flex-col items-center justify-center">
      {session ? <h1>세션 있음</h1> : <h1>세션 없음</h1>}
    </div>
  );
};

export default HomePage;
