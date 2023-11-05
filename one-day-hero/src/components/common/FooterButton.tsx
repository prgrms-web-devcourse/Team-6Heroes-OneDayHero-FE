import { PropsWithChildren } from "react";

import Button from "./Button";

const FooterButton = ({ children }: PropsWithChildren) => {
  const defaultStyle =
    "bg-background shadow-upper flex h-14 max-w-screen-sm w-full items-center justify-center fixed bottom-0";

  return (
    <div className={`${defaultStyle}`}>
      <Button className="cs:h-11" type="submit">
        {children}
      </Button>
    </div>
  );
};

export default FooterButton;
