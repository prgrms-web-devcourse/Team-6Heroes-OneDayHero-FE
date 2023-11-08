import TitleBox from "@/components/common/TitleBox";
import ReviewForm from "@/components/domain/review/create/ReviewForm";

const ReviewCreatePage = () => {
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <TitleBox category="서빙" title="미션 타이틀" />
      <ReviewForm />
    </div>
  );
};

export default ReviewCreatePage;
