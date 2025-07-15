import { useTranslation } from "react-i18next";
import PostList from "./list/PostList";

const PostListPage = () => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col w-full max-w-5xl mt-20 gap-2 mb-20 items-stretch">
      <h1 className="text-4xl mb-4">{t("posts.title")}</h1>
      <PostList />
    </section>
  );
};

export default PostListPage;
