import Category from "@/components/common/Category";
import Banner from "@/components/domain/home/Banner";
import HomeLocation from "@/components/domain/home/HomeLocation";
import Assets from "@/config/assets";
import { useGetMainFetch } from "@/services/home";

import { getServerToken } from "../utils/auth";

const banners = [Assets.Banner1, Assets.Banner2, Assets.Banner3];

const HomePage = async () => {
  const defaultLabelStyle = "text-lg font-semibold";

  const token = getServerToken();

  const { isError, response } = await useGetMainFetch(token!);

  return (
    <div className="flex w-full flex-col gap-8">
      <div>
        <Banner banners={banners} />
      </div>
      <div className="flex flex-col gap-2">
        <span className={`${defaultLabelStyle}`}>찾는 카테고리가 있나요?</span>
        <Category routeState size="lg" />
      </div>
      <div className="h-0 border border-neutral-200" />
      <div>
        <span className={`${defaultLabelStyle}`}>곧 마감돼요!</span>
      </div>
      <HomeLocation />
    </div>
  );
};

export default HomePage;
