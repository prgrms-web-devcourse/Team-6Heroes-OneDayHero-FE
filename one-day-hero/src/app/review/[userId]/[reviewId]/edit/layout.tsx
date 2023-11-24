import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

const ReviewEditLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>리뷰 수정</Header>
      {children}
      <Footer />
    </>
  );
};

export default ReviewEditLayout;
