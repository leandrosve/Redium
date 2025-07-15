import { Check, ChevronDown, Languages } from "lucide-react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@/components/common/dropdown";
import Button from "@/components/common/Button";
import i18next from "i18next";
import { join, printIf } from "@/utils/ClassUtils";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const locales = [
  { label: "English", key: "en", image: "/images/languages/en.png" },
  { label: "Español", key: "es", image: "/images/languages/es.png" },
];

const LanguageSelector = () => {
  const handleSelect = (key: string) => {
    i18next.changeLanguage(key);
  };
  const { i18n } = useTranslation();

  return (
    <Dropdown onSelect={handleSelect}>
      <DropdownTrigger>
        <Button
          variant="outline"
          rightIcon={
            <ChevronDown className="w-[1em] h-[1em] text-foreground-200" />
          }
        >
          {i18n.language}
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {locales.map(({ label, key, image }) => (
          <DropdownItem
            key={key}
            className={join(
              "flex items-center px-5 py-2 text-lg cursor-pointer gap-4",
              printIf(
                "text-primary-600 dark:text-primary-300 bg-base-300/50",
                key == "NOT YET"
              )
            )}
            value={key}
          >
            <img
              alt={label}
              src={image}
              className="rounded-full h-[1.25em] w-[1.25em]"
            />
            {label}
            {key == i18n.language && <Check className="h-[1em] w-[1em]" />}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default LanguageSelector;
