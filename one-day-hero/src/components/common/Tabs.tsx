"use client";

import { useState } from "react";

const data = [
  {
    id: 1,
    title: "진행중인 미션",
    body: "쌸라쌸라"
  },
  {
    id: 2,
    title: "제안받은 미션",
    body: "이걸 어떻게 만들지.."
  }
];

const Tabs = () => {
  const [activeTabId, setActiveTabId] = useState<number>(1);

  const defaultStyle =
    "flex w-56 bg-white font-semibold justify-center items-center text-xs text-center my-10 h-12 cursor-pointer rounded-full list-none";

  const active = "bg-primary duration-500";

  return (
    <>
      <ul className={`${defaultStyle}`}>
        {data.map((item) => (
          <li
            key={item.id}
            className={`${
              item.id === activeTabId ? active : ""
            }  flex h-10 w-24 items-center justify-center rounded-full`}
            onClick={() => setActiveTabId(item.id)}>
            {item.title}
          </li>
        ))}
      </ul>
      {data.map(
        (item) =>
          activeTabId === item.id && <div key={item.id}>{item.body}</div>
      )}
    </>
  );
};

export default Tabs;
