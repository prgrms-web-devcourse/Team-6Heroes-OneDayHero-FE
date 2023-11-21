import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

const ReviewDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>리뷰 상세</Header>
      {children}
      <Footer />
    </>
  );
};

export default ReviewDetailLayout;
