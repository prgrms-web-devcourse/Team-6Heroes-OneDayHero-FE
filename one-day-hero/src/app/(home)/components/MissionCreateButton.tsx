import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

const MissionCreateButton = () => {
  const defaultStyle =
    "bg-primary shadow-down flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full text-white";

  return (
    <Link href="/mission/create">
      <button className={defaultStyle}>
        <AiOutlinePlus />
      </button>
    </Link>
  );
};

export default MissionCreateButton;
