import { Unplug } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center gap-4 rounded-lg bg-content-100 text-foreground-200 p-14 text-xl shadow-md">
      <Unplug className="w-10 h-10 shrink-0 text-foreground-200" />
      <span>{message ?? t("common.error")}</span>
    </div>
  );
};

export default ErrorMessage;
