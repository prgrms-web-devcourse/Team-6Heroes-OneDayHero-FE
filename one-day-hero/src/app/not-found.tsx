import Image from "next/image";

import NotFoundImage from "/public/images/404notFound.jpg";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import LinkButton from "@/components/common/LinkButton";

export default function NotFound() {
  return (
    <>
      <Header>없는 데이터</Header>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h2 className="mb-20 mt-6 text-xl font-semibold">
          요청하신 데이터를 찾을 수 없어요..
        </h2>
        <Image src={NotFoundImage} alt="404 이미지" height={250} />
        <LinkButton href={"/"}>홈페이지로 돌아가기</LinkButton>
      </div>
      <Footer />
    </>
  );
}
