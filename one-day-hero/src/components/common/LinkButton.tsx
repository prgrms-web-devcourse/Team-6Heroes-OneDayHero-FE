import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";
import { BiChevronRight } from "react-icons/bi";

/**@note next/link module의 LinkProps 타입 정의에서 갖고 옴 */
type NextLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps & {
    children?: React.ReactNode;
  } & React.RefAttributes<HTMLAnchorElement>;

interface LinkButtonProps extends NextLinkProps {
  theme?: "primary" | "active" | "cancel" | "inactive";
  size?: "sm" | "md" | "lg";
  textSize?: "sm" | "md" | "lg";
  showChevron?: boolean;
}

const LinkButton = ({
  theme = "primary",
  size = "lg",
  textSize = "lg",
  showChevron = true,
  children,
  className,
  ...props
}: PropsWithChildren<LinkButtonProps>) => {
  const themes = {
    primary: "bg-primary text-white hover:bg-primary-lighten",
    active: "bg-active text-white hover:bg-active-lighten",
    cancel: "bg-cancel text-white hover:bg-cancel-lighten",
    inactive: "bg-inactive text-inactive-darken"
  };

  const sizes = {
    sm: "w-6/12",
    md: "w-10/12",
    lg: "w-11/12"
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-xl"
  };

  const defaultStyle =
    "flex h-14 items-center justify-between rounded-xl px-3 font-semibold";

  return (
    <Link
      className={`${themes[theme]} ${sizes[size]} ${textSizes[textSize]} ${defaultStyle} ${className}`}
      {...props}>
      <div className={showChevron ? "w-6" : ""} />
      {children}
      <div>{showChevron && <BiChevronRight size="24" />}</div>
    </Link>
  );
};

export default LinkButton;
