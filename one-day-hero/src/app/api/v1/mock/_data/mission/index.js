export const missionDetail = {
  status: 201,
  data: {
    id: 1,
    missionCategory: {
      categoryId: 1,
      code: "MC_001",
      name: "서빙"
    },
    citizenId: 1,
    regionId: 1,
    location: {
      x: 1234252.23,
      y: 1234252.23
    },
    missionInfo: {
      content: "내용",
      missionDate: "2023-10-10",
      startTime: "10:00",
      endTime: "10:30",
      deadlineTime: "10:00",
      price: 10000
    },
    bookmarkCount: 0,
    missionStatus: "MATCHING"
  },
  serverDateTime: "2023-10-27T13:03:43"
};

export const missionList = {
  data: []
};
