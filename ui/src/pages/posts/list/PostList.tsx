import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { useTranslation } from "react-i18next";
import Skeleton from "@/components/common/Skeleton";
import InfiniteScrollDetector from "@/components/common/InfiniteScrollDetector";
import ErrorMessage from "@/components/common/ErrorMessage";
import PostListItem from "./PostListItem";
import PostListSearchBar from "./PostListSearchBar";
import usePosts from "./usePosts";
import { CircleOff } from "lucide-react";

const PostList = () => {
  const { posts, loading, loadingMore, fetchMore, hasMore, error } = usePosts();

  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full gap-2 items-stretch">
      <PostListSearchBar />
      {loading && <Skeleton repeat={5} className="h-30" />}
      <div className="flex flex-col gap-4 ">
        {posts?.map((p) => (
          <Link key={p.id} to={ROUTES.POST_DETAIL.replace(":id", p.id)}>
            <PostListItem key={p.id} post={p} />
          </Link>
        ))}
      </div>
      {error && <ErrorMessage />}
      {loadingMore && <Skeleton repeat={5} className="h-30" />}

      {posts.length == 0 && !error && !loading && (
        <div className="text-center w-full p-5 font-bold text-sm text-foreground-200 relative">
          <CircleOff className="h-14 w-14 opacity-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
          {t("posts.noResults")}
        </div>
      )}
      {posts.length > 0 && !hasMore && (
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
