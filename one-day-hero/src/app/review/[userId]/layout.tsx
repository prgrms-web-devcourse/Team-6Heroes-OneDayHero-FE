import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

const SendReviewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>리뷰</Header>
      {children}
      <Footer />
    </>
  );
};

export default SendReviewLayout;
