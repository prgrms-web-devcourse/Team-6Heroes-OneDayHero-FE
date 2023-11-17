import { FORM_ERROR_MESSAGES } from "@/constants/errorMessage";

export type MissionInfoProps = {
  title: string;
  content: string;
  missionDate: string;
  startTime: string;
  endTime: string;
  price: number;
};

export type FormErrors = {
  missionCategoryId?: string;
  missionInfo?: Partial<Record<keyof MissionInfoProps, string>>;
};

export type FormRequest = {
  missionCategoryId: number;
  missionInfo: MissionInfoProps;
};

const useFormValidation = () => {
  const missionCreateValidation = (data: FormRequest) => {
    const errors: FormErrors = {};

    const {
      missionCategoryId,
      missionInfo: { title, missionDate, startTime, endTime, price, content }
    } = data;

    if (!missionCategoryId) {
      errors.missionCategoryId = FORM_ERROR_MESSAGES.CHECK_EMPTY_CATEGORY;
    }

    if (!title || title.trim().length <= 0) {
      errors.missionInfo = {
        ...errors.missionInfo,
        title: FORM_ERROR_MESSAGES.CHECK_EMPTY_TITLE
      };
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

    if (!price || isNaN(price)) {
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

  return { missionCreateValidation };
};

export default useFormValidation;
