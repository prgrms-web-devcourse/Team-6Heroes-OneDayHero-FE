export const formatDate = (date: string) => {
  const today = new Date(new Date().toUTCString());
  const value = new Date(new Date(date).toUTCString());

  const diff = Math.floor((today.getTime() - value.getTime()) / 1000 / 60);

  if (diff < 1) return "방금 전";
  if (diff < 60) return `${diff}분 전`;

  const diffForHour = Math.floor(diff / 60);
  if (diffForHour < 24) return `${diffForHour}시간 전`;

  const diffForDay = Math.floor(diff / 60 / 24);
  if (diffForDay < 365) return `${diffForDay}일 전`;

  return `${Math.floor(diffForDay / 365)}년 전`;
};
