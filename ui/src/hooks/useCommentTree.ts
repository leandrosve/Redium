import type { Comment, CommentNode } from "@/types/models/Comment";
import { useMemo } from "react";

/***  Exportada solo para testing*/
export function buildCommentTree(comments: Comment[]): CommentNode[] {
  const map = new Map<string, CommentNode>();
  const roots: CommentNode[] = [];

  // Inicializar nodos en el mapa
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    map.set(comment.id, { ...comment, children: [] });
  }

  // Armar jerarquía
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    const node = map.get(comment.id);
    if (!node) continue;

    if (comment.parentId) {
      // Si tiene parentId pero no se encuentra en el map, es hijo de un comentario eliminado
      if (map.has(comment.parentId)) {
        const parent = map.get(comment.parentId);
        if (parent) parent.children.push(node);
      }
    } else {
      roots.push(node);
    }
  }

  roots.sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();

    return timeB - timeA;
  });

  return roots;
}

const useCommentTree = (comments: Comment[]) => {
  const commentTree = useMemo(() => {
    return buildCommentTree(comments);
  }, [comments]);

  return commentTree;
};

export default useCommentTree;
