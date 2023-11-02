import Category from "@/components/common/Category";
import { apiUrl } from "@/services/urls";

const dummy = {
  missionCategoryId: 1,
  citizenId: 1,
  regionId: 1,
  latitude: 1234252.23,
  longitude: 1234277.388,
  missionInfo: {
    content: "내용",
    missionDate: "2023-10-10",
    startTime: "10:00",
    endTime: "10:30",
    deadlineTime: "10:00",
    price: 10000
  }
};

export type Response = {
  data: {
    id: number;
    missionCategory: {
      categoryId: number;
      code: string;
      name: string;
    };
    citizenId: number;
    regionId: number;
    location: {
      x: number;
      y: number;
    };
    missionInfo: {
      content: string;
      missionDate: string;
      startTime: string;
      endTime: string;
      deadlineTime: string;
      price: number;
    };
    bookmarkCount: number;
    missionStatus: string;
  };
};

const MissionCreatePage = async () => {
  const response = await fetch(apiUrl("/missions/create"), {
    method: "POST",
    body: JSON.stringify(dummy)
  });

  const { data }: Response = await response.json();

  const { id, missionInfo } = data;

  return (
    <div className="w-full">
      <Category />
      <h1>{id}</h1>
      <span>{missionInfo.price}</span>
    </div>
  );
};

export default MissionCreatePage;
