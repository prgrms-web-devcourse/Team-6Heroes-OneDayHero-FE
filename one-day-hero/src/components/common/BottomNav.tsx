import IconGroup from "./IconGroup";
import { BiMap, BiChat, BiHome, BiCalendarCheck, BiUser } from "react-icons/bi";

const BottomNav = () => {
  return (
    <div className="bg-stone-200 flex justify-center items-center w-96 h-14 gap-10 shadow-[0px_-2px_5px_rgba(0,0,0,0.07)]">
      <IconGroup title="채팅" route="chat">
        <BiChat />
      </IconGroup>
      <IconGroup title="지도" route="map">
        <BiMap />
      </IconGroup>
      <IconGroup title="홈" route="/">
        <BiHome />
      </IconGroup>
      <IconGroup title="미션" route="mission">
        <BiCalendarCheck />
      </IconGroup>
      <IconGroup title="프로필" route="profile">
        <BiUser />
      </IconGroup>
    </div>
  );
};

export default BottomNav;
