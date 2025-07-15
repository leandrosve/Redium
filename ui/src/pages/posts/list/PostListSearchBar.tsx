import Button from "@/components/common/Button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@/components/common/dropdown";
import { Input } from "@/components/common/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { ChevronDown, SearchIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PostListSearchBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [debouncedSearchTerm] = useDebounce<string>(searchTerm, 500);

  const onSortChange = useCallback(
    (sort: string) => {
      const params = new URLSearchParams(searchParams);

      if (sort) {
        params.set("sort", sort);
      } else {
        params.delete("sort");
      }
      
      setSort(sort)
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
            {sort}
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem value="newest">Newest</DropdownItem>
          <DropdownItem value="oldest">Oldest</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Input
        icon={<SearchIcon />}
        placeholder="Search posts"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default PostListSearchBar;
