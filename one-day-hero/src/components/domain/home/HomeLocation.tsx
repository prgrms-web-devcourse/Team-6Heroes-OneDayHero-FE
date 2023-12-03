"use client";

import useLocation from "@/hooks/useLocation";

const HomeLocation = () => {
  const { address } = useLocation();

  return <div className="font-semibold">{address}</div>;
};

export default HomeLocation;
