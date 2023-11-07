import { BsFillCircleFill } from "react-icons/bs";

import { formatDate } from "@/app/utils/formatDate";
import Container from "@/components/common/Container";

type NotificationProps = {
  title: string;
  content: string;
  createdAt: string;
};

const NotificationItem = ({ title, content, createdAt }: NotificationProps) => {
  const date = formatDate(createdAt);

  return (
    <Container className="cs:w-full cs:p-4 flex">
      <div className="flex w-full flex-col gap-2">
        <h1 className="text-base font-semibold">{title}</h1>
        <p className="text-sm">{content}</p>
        <p className="text-inactive text-xs">{date}</p>
      </div>
      <BsFillCircleFill size="11" className="text-inactive" />
    </Container>
  );
};

export default NotificationItem;
