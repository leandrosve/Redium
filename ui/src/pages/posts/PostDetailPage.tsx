import PostDetail from "@/components/features/posts/PostDetail";
import { useParams } from "react-router-dom";
import MissingPage from "../MissingPage";

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <MissingPage />;

  return (
    <section className="flex flex-col w-full max-w-5xl mt-10 gap-2 mb-20 items-stretch flex-1">
      <PostDetail id={id} />
    </section>
  );
};

export default PostDetailPage;
