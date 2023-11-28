import { getServerToken, getServerUserId } from "@/app/utils/auth";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import KebabMenu from "@/components/common/KebabMenu";
import { useGetReviewDetailFetch } from "@/services/review";

type ReviewDetailLayoutProps = {
  params: { slug: string };
  children: React.ReactNode;
};

const ReviewDetailLayout = async ({
  params,
  children
}: ReviewDetailLayoutProps) => {
  const reviewId = parseInt(params.slug);
  const token = getServerToken() ?? "";
  const userId = parseInt(getServerUserId() ?? "-1");

  const { isError, response } = await useGetReviewDetailFetch(reviewId, token);

  const senderId = response?.data.senderId;
  const isMyReview = senderId === userId;

  return (
    <>
      <Header
        right={isMyReview ? "info" : "none"}
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
