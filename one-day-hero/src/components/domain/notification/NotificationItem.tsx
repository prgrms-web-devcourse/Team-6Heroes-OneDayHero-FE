import { BsFillCircleFill } from "react-icons/bs";

import { formatDate } from "@/app/utils/formatDate";
import Container from "@/components/common/Container";

const NotificationItem = () => {
  const date = formatDate("2023-11-07T00:55:00Z");

  return (
    <Container className="cs:w-full cs:p-4 flex">
      <div className="flex w-full flex-col gap-2">
        <h1 className="text-base font-semibold">
          제안받은 미션을 확인해 보세요.
        </h1>
        <p className="text-sm">
          선량한 시민님께서 심부를 해주실 분을 찾습니다. 미션을 제안했습니다.
        </p>
        <p className="text-inactive text-xs">{date}</p>
      </div>
      <BsFillCircleFill size="11" className="text-inactive" />
    </Container>
  );
};

export default NotificationItem;
