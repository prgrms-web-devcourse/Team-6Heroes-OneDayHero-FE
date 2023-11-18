import Category from "@/components/common/Category";
import Banner from "@/components/domain/home/Banner";
import HeroRecommendList from "@/components/domain/missionDetail/HeroRecommendList";

const defaultLabelStyle = "text-lg font-semibold";

const HomePage = async () => {
  return (
    <div className="flex w-full flex-col gap-8">
      <div>
        <Banner />
      </div>
      <div className="flex flex-col gap-2">
        <span className={`${defaultLabelStyle}`}>찾는 카테고리가 있나요?</span>
        <Category routeState size="lg" className="cs:gap-1" />
      </div>
      <div className="h-0 border border-neutral-200" />
      <div className="flex flex-col gap-2">
        <span className={`${defaultLabelStyle}`}>이 달의 히어로</span>
        <HeroRecommendList
          heroDataList={[
            { thumbnail: "", nickname: "rabbit", heroScore: 100 },
            { thumbnail: "", nickname: "rabbit", heroScore: 100 },
            { thumbnail: "", nickname: "rabbit", heroScore: 100 },
            { thumbnail: "", nickname: "rabbit", heroScore: 100 },
            { thumbnail: "", nickname: "rabbit", heroScore: 100 },
            { thumbnail: "", nickname: "rabbit", heroScore: 100 },
            { thumbnail: "", nickname: "rabbit", heroScore: 100 }
          ]}
        />
      </div>
      <div className="h-0 border border-neutral-200" />
      <div>
        <span className={`${defaultLabelStyle}`}>곧 마감돼요!</span>
      </div>
    </div>
  );
};

export default HomePage;
