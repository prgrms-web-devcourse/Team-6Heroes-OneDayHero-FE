export const formatTime = (time: string, length?: number) => {
  const getTime = new Date(time);

  const year = getTime.getFullYear();
  const month = (getTime.getMonth() + 1).toString().padStart(2, "0");
  const day = getTime.getDate().toString().padStart(2, "0");
  const hours = getTime.getHours().toString().padStart(2, "0") ?? "";
  const minutes = getTime.getMinutes().toString().padStart(2, "0") ?? "";
  const seconds = getTime.getSeconds().toString().padStart(2, "0") ?? "";

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`.slice(
    0,
    length
  );
};
