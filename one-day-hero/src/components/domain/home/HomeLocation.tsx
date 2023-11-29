"use client";

import useLocation from "@/hooks/useLocation";

const HomeLocation = () => {
  const { address } = useLocation();

  return <div>{address}</div>;
};

export default HomeLocation;
