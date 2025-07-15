import Button from "@/components/common/Button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@/components/common/dropdown";
import { Input } from "@/components/common/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { join, printIf } from "@/utils/ClassUtils";
import { ChevronDown, SearchIcon, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

const PostListSearchBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [debouncedSearchTerm] = useDebounce<string>(searchTerm, 500);

  const inputRef = useRef<HTMLInputElement>(null);

  const onClearInput = () => {
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const onSortChange = useCallback(
    (sort: string) => {
      const params = new URLSearchParams(searchParams);

      if (sort) {
        params.set("sort", sort);
      } else {
        params.delete("sort");
      }

      setSort(sort);
      navigate({ search: params.toString() }, { replace: true });
    },
    [searchParams, navigate]
  );
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedSearchTerm) {
      params.set("q", debouncedSearchTerm);
    } else {
      params.delete("q");
    }

    navigate({ search: params.toString() }, { replace: true });
  }, [debouncedSearchTerm, navigate, searchParams]);

  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-3">
      <Dropdown onSelect={onSortChange}>
        <DropdownTrigger>
          <Button
            variant="outline"
            size="md"
            className="min-w-32 justify-between"
            rightIcon={<ChevronDown className="w-5 h-5" />}
          >
            {t(`posts.sort.${sort}`)}
          </Button>
        </DropdownTrigger>
        <DropdownMenu className="min-w-40">
          <DropdownItem value="newest">{t("posts.sort.newest")}</DropdownItem>
          <DropdownItem value="oldest">{t("posts.sort.oldest")}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Input
        icon={<SearchIcon />}
        placeholder={t("posts.searchPlaceholder")}
        value={searchTerm}
        ref={inputRef}
        onChange={(e) => setSearchTerm(e.target.value)}
        endElement={
          <span role="button" className={join("cursor-pointer text-foreground-200", printIf("pointer-events-none opacity-0", !searchTerm))} onClick={onClearInput}>
            <X />
          </span>
        }
      />
    </div>
  );
};

export default PostListSearchBar;
