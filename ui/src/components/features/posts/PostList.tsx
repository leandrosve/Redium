import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { useTranslation } from "react-i18next";
import Skeleton from "@/components/common/Skeleton";
import InfiniteScrollDetector from "@/components/common/InfiniteScrollDetector";
import ErrorMessage from "@/components/common/ErrorMessage";
import PostListItem from "./PostListItem";
import PostListSearchBar from "./PostListSearchBar";
import { CircleOff } from "lucide-react";
import usePosts from "@/hooks/usePosts";
import type { Post } from "@/types/models/Post";

interface Props {
  onEdit: (post:Post) => void;
}
const PostList = ({onEdit}:Props) => {
  const { posts, loading, loadingMore, fetchMore, hasMore, error } = usePosts();

  const isEmpty = !loading && posts.length === 0 && !error;
  const showEndMessage = posts.length > 0 && !hasMore;

  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full gap-2 items-stretch">
      <PostListSearchBar />
      
      {loading ? (
        <Skeleton repeat={5} className="h-30" />
      ) : (
        <div className="flex flex-col gap-4 ">
          {/* No puedo usar el id como key porque hay ids repetidos en los mockup*/}
          {posts?.map((p, i) => (
            <Link key={i} to={ROUTES.POST_DETAIL.replace(":id", p.id)}>
              <PostListItem post={p} onEdit={() => onEdit(p)}/>
            </Link>
          ))}
        </div>
      )}
      
      {error && <ErrorMessage />}

      {!loading && loadingMore && <Skeleton repeat={5} className="h-30" />}

      {isEmpty && (
        <div className="text-center w-full p-5 font-bold text-sm text-foreground-200 relative">
          <CircleOff className="h-14 w-14 opacity-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          {t("posts.noResults")}
        </div>
      )}
      {showEndMessage && (
        <div className="text-center w-full p-5 font-bold text-sm text-foreground-200">
          {t("posts.endReached")}
        </div>
      )}

      <InfiniteScrollDetector
        onLoadMore={() => fetchMore()}
        disabled={loading || loadingMore || !hasMore || !!error}
      />
    </div>
  );
};

export default PostList;
