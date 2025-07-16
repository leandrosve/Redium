import PostCreateButton from "@/components/features/posts/PostCreateButton";
import PostList from "@/components/features/posts/PostList";
import { useTranslation } from "react-i18next";

const PostListPage = () => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col w-full max-w-5xl mt-10 gap-2 mb-20 items-stretch">
      <PostCreateButton />
      <h1 className="text-4xl mb-4 mt-4">{t("posts.title")}</h1>
      <PostList />
    </section>
  );
};

export default PostListPage;
