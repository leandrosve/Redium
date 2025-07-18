import { useCallback } from "react";
import { useTranslation } from "react-i18next";

/* Pequeño wraper para i18next, para facilitar los valores por defecto y utilizar prefijos*/
export const useLocalized = () => {
  const { t } = useTranslation();

  const translate = useCallback(
    (
      key: string | null | undefined,
      options: {
        ignorePrefix?: boolean;
        defaultKey?: string;
        prefix?: string;
        defaultValue?: string;
      } = {}
    ): string => {
      const { ignorePrefix, defaultKey, prefix, defaultValue } = options;

      if (!key) return "";

      const fullKey = ignorePrefix ? key : `${prefix ? prefix + "." : ""}${key}`;

      const message = t(fullKey, { defaultValue: defaultValue, returnObjects: false });

      if (message) return message;
      if (defaultKey) return t(defaultKey);

      return "";
    },
    [t]
  );

  return { translate };
};
