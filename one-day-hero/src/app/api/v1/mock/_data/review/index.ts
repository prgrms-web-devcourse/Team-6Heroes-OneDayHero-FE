export const reviewDetail = {
  status: 200,
  data: {
    id: 1,
    senderId: 1,
    receiverId: 2,
    senderNickName: "슈퍼 히어로 토끼",
    missionCategory: {
      id: 1,
      code: "MC_001",
      name: "서빙"
    },
    missionTitle: "서빙 구함",
    content: "리뷰 내용",
    starScore: 5,
    reviewImageResponses: [
      {
        id: 1,
        uniqueName: "A",
        path: "S3 이미지 주소A"
      },
      {
        id: 2,
        uniqueName: "B",
        path: "S3 이미지 주소B"
      }
    ],
    createdAt: "2023-11-16T16:08:24"
  },
  serverDateTime: "2023-11-16T16:08:24"
};

export const sendReview = {
  status: 200,
  data: {
    userId: 1,
    content: [
      {
        reviewId: 1,
        categoryName: "심부름",
        missionTitle: "심부름 미션",
        starScore: 3,
        createdAt: "2023-11-16T16:08:24"
      },
      {
        reviewId: 2,
        categoryName: "청소",
        missionTitle: "청소 미션",
        starScore: 4,
        createdAt: "2023-11-16T16:08:24"
      }
    ],
    pageable: {
      pageNumber: 0,
      pageSize: 5,
      sort: {
        sorted: false,
        unsorted: true,
        empty: true
      },
      offset: 0,
      paged: true,
      unpaged: false
    },
    numberOfElements: 2,
    first: true,
    last: false,
    size: 5,
    number: 0,
    sort: {
      sorted: false,
      unsorted: true,
      empty: true
    },
    empty: false
  },
  serverDateTime: "2023-11-16T16:08:24"
};

export const receiveReview = {
  status: 200,
  data: {
    content: [
      {
        reviewId: 1,
        senderId: 5,
        senderNickname: "nickname A",
        categoryName: "청소",
        missionTitle: "청소 미션",
        starScore: 4,
        createdAt: "2023-11-20T15:41:28"
      },
      {
        reviewId: 2,
        senderId: 8,
        senderNickname: "nickname B",
        categoryName: "심부름",
        missionTitle: "심부름 미션",
        starScore: 3,
        createdAt: "2023-11-20T15:41:28"
      }
    ],
    pageable: {
      pageNumber: 0,
      pageSize: 5,
      sort: {
        sorted: false,
        unsorted: true,
        empty: true
      },
      offset: 0,
      paged: true,
      unpaged: false
    },
    numberOfElements: 2,
    first: true,
    last: false,
    size: 5,
    number: 0,
    sort: {
      sorted: false,
      unsorted: true,
      empty: true
    },
    empty: false
  },
  serverDateTime: "2023-11-20T15:41:28"
};
