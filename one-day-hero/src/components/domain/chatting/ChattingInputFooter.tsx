import { AiOutlineArrowUp } from "react-icons/ai";

const ChattingInputFooter = () => {
  const defaultStyle =
    "bg-background shadow-upper flex h-[4.5rem] max-w-screen-sm w-full items-center justify-around fixed bottom-0";

  return (
    <div className={`${defaultStyle}`}>
      <div className="flex-between flex h-[2.45rem] w-11/12 max-w-screen-sm items-center justify-center rounded-full bg-zinc-300 pl-3">
        <input
          className="h-9 w-11/12 rounded-full bg-zinc-300 px-2 focus:outline-0"
          type="text"
        />
        <button className="bg-primary hover:bg-primary-darken m-1 flex h-[2.2rem] w-[2.2rem] items-center justify-center rounded-full">
          <AiOutlineArrowUp className="m-1 h-full w-full" />
        </button>
      </div>
    </div>
  );
};

export default ChattingInputFooter;