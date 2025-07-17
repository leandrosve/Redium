import PostDetail from "@/components/features/posts/PostDetail";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const PostDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  if (!id) return <div>missing page</div>

  return (
    <section className="flex flex-col w-full max-w-5xl mt-10 gap-2 mb-20 items-stretch flex-1">
      <PostDetail id={id} />
    </section>
  );
};


export default PostDetailPage;
