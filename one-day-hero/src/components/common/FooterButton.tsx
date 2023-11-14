import { PropsWithChildren } from "react";

import Button from "./Button";
import LinkButton from "./LinkButton";

type FooterButtonProps = {
  formId?: string;
  href?: string;
};

const FooterButton = ({
  formId,
  href,
  children
}: PropsWithChildren<FooterButtonProps>) => {
  const defaultStyle =
    "bg-background shadow-upper flex h-14 max-w-screen-sm w-full items-center justify-center fixed bottom-0";

  return (
    <div className={`${defaultStyle}`}>
      {href === undefined ? (
        <Button className="cs:h-11" type="submit" form={formId}>
          {children}
        </Button>
      ) : (
        <LinkButton className="cs:h-11" href={href}>
          {children}
        </LinkButton>
      )}
    </div>
  );
};

export default FooterButton;
