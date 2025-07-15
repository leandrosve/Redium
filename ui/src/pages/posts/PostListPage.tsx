import useAPI from "@/hooks/useAPI";
import PostService from "@/services/PostService";
import type { Post } from "@/types/models/Post";
import PostListItem from "./list/PostListItem";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { useTranslation } from "react-i18next";

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

  const {t} = useTranslation();

  return (
    <section className="flex flex-col w-full max-w-5xl items-start mt-20">
      <h1 className="text-4xl">{t('posts.latestPosts')}</h1>

      {loading && <div>LOADING</div>}

      <div className="flex flex-col gap-4 mt-4">
        {posts?.map((p) => (
          <Link to={ROUTES.POST_DETAIL.replace(":id", p.id)}>
            <PostListItem key={p.id} post={p} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PostListPage;
