/* eslint-disable no-useless-escape */
export function getCookie(name: string) {
  if (typeof document === "undefined") return;

  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const getClientToken = () => {
  return getCookie("token");
};
