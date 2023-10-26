import MockTest from "./MockTest";

const HomePage = async () => {
  const res = await fetch("http://localhost:3000/api/missions");
  console.log(await res.json());

  return (
    <div>
      <MockTest />
      HomePage
    </div>
  );
};

export default HomePage;
