import Avatar from "@/components/common/Avatar";
import Spinner from "@/components/common/Spinner";
import useAPI from "@/hooks/useAPI";
import PostService from "@/services/PostService";
import type { Post } from "@/types/models/Post";
import { formatTime, formatTimeAgo } from "@/utils/FormatUtils";
import i18next from "i18next";
import { useMemo } from "react";
import CommentSection from "../comments/CommentSection";

interface Props {
  id: string;
}
const PostDetail = ({ id }: Props) => {
  const {
    entity: post,
    error,
    loading,
  } = useAPI<Post | null>({
    fetchFunction: () => PostService.detail(id),
  });

  if (loading) return <Spinner fullPage />;

  if (error || !post) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-4">
      <PostDetailContent post={post} />
      <div className="mt-8">
        <CommentSection postId={post.id}/>
      </div>
    </div>
  );
};

const PostDetailContent = ({ post }: { post: Post }) => {
  const [date, timeAgo] = useMemo(() => {
    const d = new Date(post.createdAt);
    return [
      formatTime(i18next.language, d),
      formatTimeAgo(i18next.language, d),
    ];
  }, [i18next.language, post]);
  return (
    <div >
      <div className="flex gap-2 items-center font-bold text-foreground-200 text-sm">
        <Avatar name={post.name} src={post.avatar} size="sm" />{" "}
        <span className="max-w-40 overflow-ellipsis line-clamp-1">
          {post.name}
        </span>
        <span className="select-none opacity-50">•</span>
        <span>{date}</span>
      </div>
      <h2 className="text-xl mt-4 font-bold">{post.title}</h2>
      <p className="mt-4 text-foreground-200">{post.content}</p>
    </div>
  );
};

export default PostDetail;
