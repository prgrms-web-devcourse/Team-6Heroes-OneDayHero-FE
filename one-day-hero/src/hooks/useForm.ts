import { ChangeEvent, useState } from "react";
const useForm = (initialValue: string) => {
  const [changeValue, setChangeValue] = useState<string>(initialValue);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setChangeValue(e.target.value);
  };

  return { changeValue, handleChange };
};
export default useForm;
