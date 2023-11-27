export type KebabMenuDataType = {
  name: string;
  apiPath: string;
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  requiredData?: { name: string; default?: any; options?: any[] }[];
  description?: string;
  redirectTo?: string;
};

export type ImageFileType = {
  id: string;
  file: File;
};

export type DateType = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export type Coordinates = [number, number];

export type MapType = naver.maps.Map;

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
