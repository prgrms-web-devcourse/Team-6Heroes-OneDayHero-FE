"use client";

const MockTest = async () => {
  const res = await fetch("http://localhost:3000/api/missions");
  console.log(await res.json());

  return <div>Mock Test</div>;
};

export default MockTest;
