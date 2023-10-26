"use client";

import { getTestMissions } from "@/services/missions";

const MockTest = () => {
  console.log(getTestMissions());

  return <div>Mock Test</div>;
};

export default MockTest;
