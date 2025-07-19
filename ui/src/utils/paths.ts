const isGhPages = import.meta.env.VITE_GH_PAGES === "true";

export const getPublicPath = (path: string): string => {
  return isGhPages ? `/redium/${path.replace(/^\//, "")}` : path;
};
