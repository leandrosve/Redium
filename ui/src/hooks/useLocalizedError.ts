import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const useLocalizedError = (keyPrefix?: string) => {
  const { t } = useTranslation();

  const getErrorMessage = useCallback(
    (errorKey?: string, omit?: boolean): string => {
      if (!errorKey || omit) return "";
      return t(`${keyPrefix ? keyPrefix + "." : ""}${errorKey}`);
    },
    [t, keyPrefix]
  );

  return { getErrorMessage };
};
