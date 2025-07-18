import { ShieldQuestionMark } from "lucide-react";
import { useTranslation } from "react-i18next";

const MissingPage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center w-full mt-20">
      <ShieldQuestionMark className="h-30 w-30 opacity-55" />
      <div className="text-center w-full p-5 font-bold text-sm  relative">
        <h1 className="md:text-3xl opacity-55">
          {t("common.missingResource")}
        </h1>
      </div>
    </div>
  );
};

export default MissingPage;
