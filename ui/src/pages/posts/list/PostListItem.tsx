import Avatar from "@/components/common/Avatar";
import type { Post } from "@/types/models/Post";
import { formatTimeAgo } from "@/utils/FormatUtils";
import i18next from "i18next";
import { useMemo } from "react";

interface Props {
  post: Post;
}

const PostListItem = ({ post }: Props) => {
  const date = useMemo(() => {
    return formatTimeAgo(i18next.language, new Date(post.createdAt));
  }, [i18next.language, post]);
  return (
    <div className="bg-content-100 rounded-2xl p-5 flex flex-col shadow-md gap-2 hover:bg-content-200">
      <div className="flex gap-2 items-center font-bold text-foreground-200 text-sm">
        <Avatar name={post.name} src={post.avatar} size="sm" /> {post.name}
        <span className="select-none opacity-50">•</span>
        <span>{date}</span>
      </div>

      <div className="font-bold line-clamp-1">{post.title}</div>
      <div className="line-clamp-3 text-sm text-foreground-200">{post.content}</div>
    </div>
  );
};

export default PostListItem;
