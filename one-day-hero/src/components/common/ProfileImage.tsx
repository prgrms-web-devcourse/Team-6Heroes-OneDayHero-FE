import Image, { ImageProps } from "next/image";

import DefaultProfileImage from "/public/images/OneDayHero_logo_sm.svg";

const ProfileImage = ({ src, className, alt, ...rest }: ImageProps) => {
  return (
    <Image
      {...rest}
      src={src || DefaultProfileImage}
      alt={alt || "profileImage"}
      className={`pointer-events-none rounded-full bg-neutral-200 object-contain ${className}`}
    />
  );
};

export default ProfileImage;
