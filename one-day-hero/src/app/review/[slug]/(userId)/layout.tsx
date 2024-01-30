import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Tabs from "@/components/common/Tabs";
import { getServerUserId } from "@/utils/auth";

type SendReviewLayoutProps = {
  params: { slug: string };
  children: React.ReactNode;
};

const SendReviewLayout = ({ params, children }: SendReviewLayoutProps) => {
  const myUserId = getServerUserId();

  return (
    <>
      <Header>리뷰</Header>
      {myUserId === params.slug && (
        <>
          <div className="bg-background fixed top-16 z-50 h-28 w-full max-w-screen-sm" />
          <div className="fixed z-50 flex w-full max-w-screen-sm justify-center">
            <Tabs
              leftRoute={{
                name: "받은 리뷰",
                path: `/review/${params.slug}/receive`
              }}
              rightRoute={{
                name: "내가 쓴 리뷰",
                path: `/review/${params.slug}/send`
              }}
            />
          </div>
        </>
      )}
      {children}
      <Footer />
    </>
  );
};

export default SendReviewLayout;
