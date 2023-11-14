export const calculateAge = (birth: string) => {
  const diffms = Date.now() - new Date(birth).getTime();
  return Math.abs(new Date(diffms).getUTCFullYear() - 1970);
};

export const parseGender = (gender: string) => {
  return gender === "MALE" ? "남" : "여";
};
