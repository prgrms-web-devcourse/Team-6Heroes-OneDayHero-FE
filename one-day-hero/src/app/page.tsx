import { getTestMissions } from "@/services/missions";
import MockTest from "./MockTest";

const HomePage = async () => {
  console.log(await getTestMissions());

  return (
    <div>
      <MockTest />
      HomePage
    </div>
  );
};

export default HomePage;
