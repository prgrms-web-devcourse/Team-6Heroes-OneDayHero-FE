import { getServerToken } from "../utils/auth";

const HomePage = async () => {
  console.log(getServerToken());

  return <div className="flex w-full flex-col items-center justify-center" />;
};

export default HomePage;
