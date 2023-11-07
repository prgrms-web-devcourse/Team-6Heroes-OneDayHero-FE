type Mission = {
  id: number;
  missionCategory: {
    id: number;
    code: string;
    name: string;
  };
  citizenId: number;
  region: {
    id: number;
    si: string;
    gu: string;
    dong: string;
  };
  location: {
    x: number;
    y: number;
  };
  missionInfo: {
    title: string;
    content: string;
    missionDate: string;
    startTime: string;
    endTime: string;
    deadlineTime: string;
    price: number;
  };
  bookmarkCount: number;
  missionStatus:
    | "MATCHING"
    | "MATCHING_COMPLETED"
    | "MISSION_COMPLETED"
    | "EXPIRED";
  missionImage: {
    originalName: string;
    path: string;
  };
};

export type { Mission };
