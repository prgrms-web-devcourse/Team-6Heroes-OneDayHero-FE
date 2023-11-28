import { ImageDataType } from "@/types";

export const imageUrlToFile = async (url: string, uniqueName?: string) => {
  if (typeof File === "undefined")
    return {
      fileBits: [],
      fileName: uniqueName,
      options: {}
    } as ImageDataType["file"];

  console.log("url", url);
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split(".").pop();
  const filename = url.split("/").pop();
  const metadata = { type: `image/${ext}` };
  console.log(filename, ext);

  return {
    fileBits: [data],
    fileName: uniqueName ?? filename!,
    options: metadata
  };
};
