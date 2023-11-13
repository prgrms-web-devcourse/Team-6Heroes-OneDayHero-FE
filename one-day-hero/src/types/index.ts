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
