import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import KebabMenu from "@/components/common/KebabMenu";

const ReviewDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header
        right="info"
        rightNode={
          <KebabMenu
            menuList={[
              {
                name: "수정하기",
                apiPath: `/reviews/${0}`,
                method: "POST"
              },
              {
                name: "삭제하기",
                apiPath: `/reviews/${0}`,
                method: "DELETE"
              }
            ]}
            size={24}
          />
        }>
        리뷰 상세
      </Header>
      {children}
      <Footer />
    </>
  );
};

export default ReviewDetailLayout;
