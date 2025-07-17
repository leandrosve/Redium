import { Check, ChevronDown } from "lucide-react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@/components/common/dropdown";
import Button from "@/components/common/Button";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const locales = [
  { label: "English", key: "en", image: "/images/languages/en.png" },
  { label: "Español", key: "es", image: "/images/languages/es.png" },
];

const LanguageSelector = () => {
  const handleSelect = (key: string) => {
    i18next.changeLanguage(key);
  };
  const { i18n } = useTranslation();

  useEffect(() => {
  // Hago esto para precargar las imagenes, ya que si no, al abrir el dropdown pueden tardar un instante
  locales.forEach((l) => {
    const img = new Image();
    img.src = l.image;
  });
}, []);

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
          <DropdownItem key={key} value={key}>
            <span className="rounded-full h-5 w-5 bg-content-100 overflow-hidden">
            <img
              alt={label}
              src={image}
              className="rounded-full h-full w-full"
            /></span>
            {label}
            {key == i18n.language && (
              <div>
                <Check className="h-5 w-5 shrink-0 mr-4" />
              </div>
            )}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default LanguageSelector;
