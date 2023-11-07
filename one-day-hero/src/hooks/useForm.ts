import { ChangeEvent, useState } from "react";
const useForm = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  return { value, handleChange };
};
export default useForm;
