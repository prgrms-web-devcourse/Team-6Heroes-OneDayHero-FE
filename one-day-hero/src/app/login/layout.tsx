import { Providers } from "@/components/common/Providers";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <Providers>{children}</Providers>;
};

export default layout;
