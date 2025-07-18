import { useEffect, useState } from "react";
import Button from "../common/Button";
import { Moon, Sun } from "lucide-react";

const getPreferredTheme = (): "light" | "dark" => {
  const saved = localStorage.getItem("theme") as "light" | "dark" | null;
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => getPreferredTheme());

  useEffect(() => {
    document.documentElement.classList.add("disable-transitions");
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    requestAnimationFrame(() => {
      // Esperar un poco más para asegurarse
      setTimeout(() => {
        document.documentElement.classList.remove("disable-transitions");
      }, 0);
    });

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Button onClick={toggleTheme} aria-label="Toggle theme" variant="ghost" className="h-[2.5em] w-[2.5em] p-3">
      {theme === "dark" ? <Moon /> : <Sun />}
    </Button>
  );
};
