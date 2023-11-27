import Button from "@/components/common/Button";
import TitleBox from "@/components/common/TitleBox";
import ReviewForm from "@/components/domain/review/ReviewForm";

const ReviewEditPage = () => {
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <TitleBox category="서빙" title="미션 타이틀" />
      <ReviewForm editMode />
      <Button form="editReview" type="submit" className="cs:mt-3">
        제출하기
      </Button>
    </div>
  );
};

export default ReviewEditPage;
