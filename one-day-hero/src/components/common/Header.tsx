import { BsChevronLeft, BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";

type HeaderProps = {
  left?: "back" | "none";
  right?: "edit" | "info" | "none";
  children: React.ReactNode;
};

const Header = ({ left = "back", right = "none", children }: HeaderProps) => {
  const leftArea = {
    back: <BsChevronLeft />,
    none: <div className="w-5" />
  };

  const rightArea = {
    edit: <FiEdit3 />,
    info: <BsThreeDotsVertical />,
    none: <div className="w-6" />
  };

  const defaultStyle =
    "flex items-center w-96 px-4 bg-stone-100 justify-between space-x-4 h-[4.375rem]";

  return (
    <header className={defaultStyle}>
      <div className="text-xl">{leftArea[left]}</div>
      <div className="mx-auto px-0 text-center text-xl font-semibold">
        {children}
      </div>
      <div className="text-2xl">{rightArea[right]}</div>
    </header>
  );
};

export default Header;
