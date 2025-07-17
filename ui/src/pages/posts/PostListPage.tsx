import PostCreateButton from "@/components/features/posts/PostCreateButton";
import PostFormModal from "@/components/features/posts/PostFormModal";
import PostList from "@/components/features/posts/PostList";
import type { Post } from "@/types/models/Post";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const PostListPage = () => {
  const { t } = useTranslation();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    post: Post | null;
  }>({ isOpen: false, post: null });

  return (
    <section className="flex flex-col w-full max-w-5xl mt-10 gap-2 mb-20 items-stretch">
      <PostCreateButton onClick={() => setModalState({isOpen: true, post:null})}/>
      <h1 className="text-4xl mb-4 mt-4">{t("posts.title")}</h1>
      <PostList onEdit={(p) => setModalState({isOpen: true, post:p})}/>
      <PostFormModal
        isOpen={modalState.isOpen}
        post={modalState.post}
        onClose={() => setModalState({ isOpen: false, post: null })}
      />
    </section>
  );
};

export default PostListPage;
