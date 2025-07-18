import { Link } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import UserDisplay from "@/components/features/user/UserDisplay";
import { ThemeSwitcher } from "./ThemeSwitcher";

const Header = () => {
  return (
    <header className="flex justify-between text-xl items-center xl:px-80 px-10 z-10 border-b border-subtle h-24 fixed top-0 left-0 bg-content-100/60 dark:bg-content-100/30 backdrop-blur-lg w-screen">
      <div className="text-3xl flex items-center gap-1">
        <Link to="/">[Re]dium</Link>
      </div>

      <div className="flex gap-5 items-center">
        <UserDisplay />
        <ThemeSwitcher />
        <LanguageSelector />
      </div>
    </header>
  );
};

export default Header;
