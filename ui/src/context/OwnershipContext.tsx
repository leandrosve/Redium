import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type OwnershipContextType = {
  isPostOwned: (id: string) => boolean;
  isCommentOwned: (id: string) => boolean;
  markPostAsOwned: (id: string) => void;
  markCommentAsOwned: (id: string) => void;
  clearAll: () => void;
};

const OwnershipContext = createContext<OwnershipContextType | null>(null);

// Keys del localstorage
const OWNED_POSTS_KEY = "owned_posts";
const OWNED_COMMENTS_KEY = "owned_comments";

function getStoredIds(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    localStorage.removeItem(key);
    return new Set();
  }
}

function saveToStorage(key: string, set: Set<string>) {
  localStorage.setItem(key, JSON.stringify(Array.from(set)));
}

/* Lo uso para dejar registro y consultar los posts que creo el usuario, ya que la api no almacena un userId*/
export const OwnershipProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Set<string>>(new Set());
  const [comments, setComments] = useState<Set<string>>(new Set());

  useEffect(() => {
    setPosts(getStoredIds(OWNED_POSTS_KEY));
    setComments(getStoredIds(OWNED_COMMENTS_KEY));
  }, []);

  const isPostOwned = (id: string) => posts.has(id);
  const isCommentOwned = (id: string) => comments.has(id);

  const markPostAsOwned = (id: string) => {
    setPosts((prev) => {
      const next = new Set(prev).add(id);
      saveToStorage(OWNED_POSTS_KEY, next);
      return next;
    });
  };

  const markCommentAsOwned = (id: string) => {
    setComments((prev) => {
      const next = new Set(prev).add(id);
      saveToStorage(OWNED_COMMENTS_KEY, next);
      return next;
    });
  };

  const clearAll = () => {
    setPosts(new Set());
    setComments(new Set());
    localStorage.removeItem(OWNED_POSTS_KEY);
    localStorage.removeItem(OWNED_COMMENTS_KEY);
  };

  return (
    <OwnershipContext.Provider
      value={{
        isPostOwned,
        isCommentOwned,
        markPostAsOwned,
        markCommentAsOwned,
        clearAll,
      }}
    >
      {children}
    </OwnershipContext.Provider>
  );
};

export function useOwnershipContext() {
  const ctx = useContext(OwnershipContext);
  if (!ctx) throw new Error("Debe usarse dentro de OwnershipProvider");
  return ctx;
}
