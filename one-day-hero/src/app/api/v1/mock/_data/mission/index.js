export const missionDetail = {
  status: 201,
  data: {
    id: 1,
    missionCategory: {
      id: 1,
      code: "MC_001",
      name: "서빙"
    },
    citizenId: 14,
    region: {
      id: 1,
      si: "서울시",
      gu: "강남구",
      dong: "역삼동"
    },
    location: {
      x: 1234252.23,
      y: 1234252.23
    },
    missionInfo: {
      title: "제목",
      content: "내용",
      missionDate: "2023-10-10",
      startTime: "10:00",
      endTime: "10:30",
      deadlineTime: "10:00",
      price: 10000
    },
    bookmarkCount: 0,
    missionStatus: "MATCHING",
    missionImage: {
      originalName: "xxx.jpeg",
      path: "~~~~"
    }
  },
  serverDateTime: "2023-10-27T13:03:43"
};

export const ongoingMissionList = {
  data: [
    {
      id: 1,
      missionCategory: {
        id: 1,
        code: "MC_001",
        name: "서빙"
      },
      citizenId: 15,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      location: {
        x: 1234252.23,
        y: 1234252.23
      },
      missionInfo: {
        title: "더미 데이터 제목입니다.",
        content: "내용1",
        missionDate: "2023-12-4",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 10000
      },
      bookmarkCount: 0,
      missionStatus: "MATCHING_COMPLETED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 2,
      missionCategory: {
        id: 2,
        code: "MC_002",
        name: "주방"
      },
      citizenId: 11,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      location: {
        x: 1234252.23,
        y: 1234252.23
      },
      missionInfo: {
        title: "제목11",
        content: "내용11",
        missionDate: "2023-12-18",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 10000
      },
      bookmarkCount: 0,
      missionStatus: "MATCHING",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 3,
      missionCategory: {
        id: 4,
        code: "MC_004",
        name: "카페"
      },
      citizenId: 1,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      location: {
        x: 1234252.23,
        y: 1234252.23
      },
      missionInfo: {
        title: "제목111",
        content: "내용111",
        missionDate: "2023-11-27",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 270000
      },
      bookmarkCount: 0,
      missionStatus: "MATCHING",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 4,
      missionCategory: {
        id: 4,
        code: "MC_004",
        name: "카페"
      },
      citizenId: 1,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      location: {
        x: 1234252.23,
        y: 1234252.23
      },
      missionInfo: {
        title: "제목2",
        content: "내용2",
        missionDate: "2023-12-10",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 160000
      },
      bookmarkCount: 0,
      missionStatus: "MATCHING_COMPLETED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 5,
      missionCategory: {
        id: 4,
        code: "MC_004",
        name: "카페"
      },
      citizenId: 2,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      location: {
        x: 1234252.23,
        y: 1234252.23
      },
      missionInfo: {
        title: "제목3",
        content: "내용3",
        missionDate: "2023-12-10",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 110000
      },
      bookmarkCount: 0,
      missionStatus: "MISSION_COMPLETED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 6,
      missionCategory: {
        id: 1,
        code: "MC_001",
        name: "서빙"
      },
      citizenId: 3,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      location: {
        x: 1234252.23,
        y: 1234252.23
      },
      missionInfo: {
        title: "제목4",
        content: "내용4",
        missionDate: "2023-11-6",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 130000
      },
      bookmarkCount: 0,
      missionStatus: "MISSION_COMPLETED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 5,
      missionCategory: {
        id: 1,
        code: "MC_001",
        name: "서빙"
      },
      citizenId: 4,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      location: {
        x: 1234252.23,
        y: 1234252.23
      },
      missionInfo: {
        title: "제목5",
        content: "내용5",
        missionDate: "2023-11-15",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 100000
      },
      bookmarkCount: 0,
      missionStatus: "EXPIRED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 7,
      missionCategory: {
        id: 1,
        code: "MC_001",
        name: "서빙"
      },
      citizenId: 5,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      location: {
        x: 1234252.23,
        y: 1234252.23
      },
      missionInfo: {
        title: "제목6",
        content: "내용6",
        missionDate: "2023-11-26",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 1000
      },
      bookmarkCount: 0,
      missionStatus: "MATCHING",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    }
  ]
};

export const suggestedMissionList = {
  data: [
    {
      id: 1,
      missionCategory: {
        id: 1,
        code: "MC_001",
        name: "서빙"
      },
      citizenId: 6,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      location: {
        x: 1234252.23,
        y: 1234252.23
      },
      missionInfo: {
        title: "제목1",
        content: "내용1",
        missionDate: "2023-12-4",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 10000
      },
      bookmarkCount: 0,
      missionStatus: "MATCHING",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 8,
      missionCategory: {
        id: 1,
        code: "MC_001",
        name: "서빙"
      },
      citizenId: 7,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      location: {
        x: 1234252.23,
        y: 1234252.23
      },
      missionInfo: {
        title: "제목11",
        content: "내용11",
        missionDate: "2023-12-18",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 10000
      },
      bookmarkCount: 0,
      missionStatus: "MATCHING",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 9,
      missionCategory: {
        id: 1,
        code: "MC_001",
        name: "서빙"
      },
      citizenId: 8,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      location: {
        x: 1234252.23,
        y: 1234252.23
      },
      missionInfo: {
        title: "제목111",
        content: "내용111",
        missionDate: "2023-11-27",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 270000
      },
      bookmarkCount: 0,
      missionStatus: "MATCHING",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 2,
      missionCategory: {
        id: 1,
        code: "MC_001",
        name: "서빙"
      },
      citizenId: 9,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      location: {
        x: 1234252.23,
        y: 1234252.23
      },
      missionInfo: {
        title: "제목2",
        content: "내용2",
        missionDate: "2023-12-10",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 160000
      },
      bookmarkCount: 0,
      missionStatus: "MATCHING_COMPLETED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 10,
      missionCategory: {
        id: 1,
        code: "MC_001",
        name: "서빙"
      },
      citizenId: 10,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      location: {
        x: 1234252.23,
        y: 1234252.23
      },
      missionInfo: {
        title: "제목3",
        content: "내용3",
        missionDate: "2023-12-10",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 110000
      },
      bookmarkCount: 0,
      missionStatus: "MISSION_COMPLETED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 11,
      missionCategory: {
        id: 2,
        code: "MC_002",
        name: "주방"
      },
      citizenId: 11,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      location: {
        x: 1234252.23,
        y: 1234252.23
      },
      missionInfo: {
        title: "제목4",
        content: "내용4",
        missionDate: "2023-11-6",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 130000
      },
      bookmarkCount: 0,
      missionStatus: "MISSION_COMPLETED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 12,
      missionCategory: {
        id: 2,
        code: "MC_002",
        name: "주방"
      },
      citizenId: 12,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      location: {
        x: 1234252.23,
        y: 1234252.23
      },
      missionInfo: {
        title: "제목5",
        content: "내용5",
        missionDate: "2023-11-15",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 100000
      },
      bookmarkCount: 0,
      missionStatus: "EXPIRED",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    },
    {
      id: 13,
      missionCategory: {
        id: 2,
        code: "MC_002",
        name: "주방"
      },
      citizenId: 13,
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      location: {
        x: 1234252.23,
        y: 1234252.23
      },
      missionInfo: {
        title: "제목6",
        content: "내용6",
        missionDate: "2023-11-26",
        startTime: "10:00",
        endTime: "10:30",
        deadlineTime: "10:00",
        price: 1000
      },
      bookmarkCount: 0,
      missionStatus: "MATCHING",
      missionImage: {
        originalName: "xxx.jpeg",
        path: "~~~~"
      }
    }
  ]
};
