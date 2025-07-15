import useAPI from "@/hooks/useAPI";
import PostService from "@/services/PostService";
import type { Post } from "@/types/models/Post";
import PostListItem from "./list/PostListItem";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { useTranslation } from "react-i18next";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@/components/common/dropdown";
import Button from "@/components/common/Button";
import { ChevronDown, SearchIcon } from "lucide-react";
import { Input } from "@/components/common/Input";
import PostListSearchBar from "./list/PostListSearchBar";

const fetchPosts = () => PostService.list();
const PostListPage = () => {
  const {
    entity: posts,
    loading,
    error,
    fetchOther,
  } = useAPI<Post[]>({
    fetchFunction: fetchPosts,
  });

  const { t } = useTranslation();

  return (
    <section className="flex flex-col w-full max-w-5xl items-start mt-20 gap-2">
      <h1 className="text-4xl mb-4">{t("posts.posts")}</h1>

      {loading && <div>LOADING</div>}
      <PostListSearchBar />
      <div className="flex flex-col gap-4 ">
        {posts?.map((p) => (
          <Link key={p.id} to={ROUTES.POST_DETAIL.replace(":id", p.id)}>
            <PostListItem key={p.id} post={p} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PostListPage;
