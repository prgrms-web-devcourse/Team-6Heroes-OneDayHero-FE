export const imageUrlToFile = async (url: string, uniqueName?: string) => {
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split(".").pop();
  const filename = url.split("/").pop();
  const metadata = { type: `image/${ext}` };
  console.log(filename, ext);

  return new File([data], uniqueName ?? filename!, metadata);
};
