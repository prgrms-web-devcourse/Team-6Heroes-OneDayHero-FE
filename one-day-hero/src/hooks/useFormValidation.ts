import { FORM_ERROR_MESSAGES } from "@/constants/errorMessage";

export type MissionInfoProps = {
  content: string;
  missionDate: string;
  startTime: string;
  endTime: string;
  price: string;
};

export type FormErrors = {
  categoryId?: string;
  missionInfo?: Partial<MissionInfoProps>;
};

export type FormRequest = {
  categoryId: number;
  missionInfo: MissionInfoProps;
};

const useFormValidation = () => {
  const formValidation = (data: FormRequest) => {
    const errors: FormErrors = {};
    const {
      categoryId,
      missionInfo: { missionDate, startTime, endTime, price, content }
    } = data;

    if (!categoryId) {
      errors.categoryId = FORM_ERROR_MESSAGES.CHECK_EMPTY_CATEGORY;
    }

    if (!missionDate || missionDate.length <= 0) {
      errors.missionInfo = {
        ...errors.missionInfo,
        missionDate: FORM_ERROR_MESSAGES.CHECK_EMPTY_DATE
      };
    }

    if (!startTime || !endTime || startTime === endTime) {
      errors.missionInfo = {
        ...errors.missionInfo,
        startTime: FORM_ERROR_MESSAGES.CHECK_SAME_TIME,
        endTime: FORM_ERROR_MESSAGES.CHECK_SAME_TIME
      };
    }

    if (!price || price.trim().length <= 0 || isNaN(Number(price))) {
      errors.missionInfo = {
        ...errors.missionInfo,
        price: FORM_ERROR_MESSAGES.CHECK_EMPTY_PRICE
      };
    }

    if (!content || content.trim().length <= 0) {
      errors.missionInfo = {
        ...errors.missionInfo,
        content: FORM_ERROR_MESSAGES.CHECK_EMPTY_CONTENT
      };
    }

    return errors;
  };

  return { formValidation };
};

export default useFormValidation;
