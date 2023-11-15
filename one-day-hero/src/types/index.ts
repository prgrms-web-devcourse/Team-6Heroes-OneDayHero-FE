export type KebabMenuDataType = {
  name: string;
  apiPath: string;
  requiredData: (string | { name: string; default?: any; options?: any[] })[];
  description?: string;
  redirectTo?: string;
};

export type ImageFileType = {
  id: string;
  file: File;
};

export type DateType = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
