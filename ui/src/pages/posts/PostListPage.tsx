import PostListItem from "./list/PostListItem";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { useTranslation } from "react-i18next";
import PostListSearchBar from "./list/PostListSearchBar";
import usePosts from "./list/usePosts";
import Skeleton from "@/components/common/Skeleton";
import InfiniteScrollDetector from "@/components/common/InfiniteScrollDetector";

const PostListPage = () => {
  const { posts, loading, loadingMore, fetchMore, hasMore } = usePosts();

  const { t } = useTranslation();

  return (
    <section className="flex flex-col w-full max-w-5xl items-start mt-20 gap-2 mb-20 items-stretch">
      <h1 className="text-4xl mb-4">{t("posts.posts")}</h1>

      <PostListSearchBar />
      {loading && <Skeleton repeat={5} className="h-30" />}
      <div className="flex flex-col gap-4 ">
        {posts?.map((p) => (
          <Link key={p.id} to={ROUTES.POST_DETAIL.replace(":id", p.id)}>
            <PostListItem key={p.id} post={p} />
          </Link>
        ))}
      </div>

      {loadingMore && <Skeleton repeat={5} className="h-30" />}

      {!hasMore && (
        <div className="text-center w-full p-5 font-bold text-sm text-foreground-200">
          Nada más que ver... por ahora.
        </div>
      )}

      <InfiniteScrollDetector
        onLoadMore={() => fetchMore()}
        disabled={loading || loadingMore || !hasMore}
      />
    </section>
  );
};

export default PostListPage;
