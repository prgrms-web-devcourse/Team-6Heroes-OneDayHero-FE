import { ChangeEvent, useEffect, useState } from "react";
const useForm = (initialValue: string, error: string) => {
  const [value, setValue] = useState<string>(initialValue);
  const [errorState, setErrorState] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
    errorState && setErrorState(false);
  };

  useEffect(() => {
    error && setErrorState(true);
  }, [error, errorState]);

  return { value, errorState, handleChange };
};
export default useForm;
