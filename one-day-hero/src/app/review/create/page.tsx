import Button from "@/components/common/Button";
import TitleBox from "@/components/common/TitleBox";
import ReviewForm from "@/components/domain/review/ReviewForm";

const ReviewCreatePage = () => {
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <TitleBox category="서빙" title="미션 타이틀" />
      <ReviewForm />
      <Button form="createReview" type="submit" className="cs:mt-3">
        제출하기
      </Button>
    </div>
  );
};

export default ReviewCreatePage;
