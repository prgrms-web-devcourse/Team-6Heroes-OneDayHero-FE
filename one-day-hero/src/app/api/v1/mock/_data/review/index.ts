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
