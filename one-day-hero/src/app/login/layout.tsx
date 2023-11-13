import { Providers } from "@/components/common/Oauth/Providers";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <Providers>{children}</Providers>;
};

export default layout;
