import { FaSearch } from "react-icons/fa";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

const HeroSearchPage = () => {
  return (
    <>
      <div
        className="fixed z-50 mt-[4.5rem] 
w-full max-w-screen-sm">
        <section className="border-background-darken flex justify-center border-b px-4 pb-6">
          <Input className="cs:h-11" />
          <Button
            theme="primary"
            className="cs:h-11 cs:w-11 cs:rounded-xl cs:px-3 cs:ml-2 cs:border-inactive border-2">
            <FaSearch className="text-black" />
          </Button>
        </section>
      </div>
      <section className="mt-44 flex w-full max-w-screen-sm flex-col items-center justify-center space-y-4">
        <div className="h-52 w-72 bg-green-400">임시</div>
        <div className="h-52 w-72 bg-green-400">임시</div>
        <div className="h-52 w-72 bg-green-400">임시</div>
        <div className="h-52 w-72 bg-green-400">임시</div>
        <div className="h-52 w-72 bg-green-400">임시</div>
        <div className="h-52 w-72 bg-green-400">임시</div>
      </section>
    </>
  );
};

export default HeroSearchPage;
