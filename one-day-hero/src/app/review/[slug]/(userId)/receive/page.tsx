import ReceivedReviewList from "@/components/domain/review/ReceivedReviewList";

const ReceiveReviewPage = ({ params }: { params: { slug: string } }) => {
  const userId = parseInt(params.slug);

  return <ReceivedReviewList userId={userId} />;
};

export default ReceiveReviewPage;
