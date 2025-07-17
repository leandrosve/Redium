import type { Comment, CommentNode } from "@/types/models/Comment";
import React, { useMemo } from "react";

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

    if (comment.parentId && map.has(comment.parentId)) {
      const parent = map.get(comment.parentId);
      if (parent) parent.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

const useCommentTree = (comments: Comment[]) => {
  const commentTree = useMemo(() => {
    return buildCommentTree(comments);
  }, [comments]);
  
  return commentTree;
};

export default useCommentTree;
