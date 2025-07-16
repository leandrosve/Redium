import LanguageSelector from "./LanguageSelector";
import UserDisplay from "@/components/features/user/UserDisplay";

const Header = () => {
  return (
    <header className="flex justify-between text-xl items-center xl:px-80 px-10 z-10 border-b border-subtle h-24 fixed top-0 left-0 w-full bg-content-100/30 backdrop-blur-lg">
      <div className="text-3xl flex items-center gap-1">
        <a href="/">[Re]dium</a>
      </div>

      <div className="flex gap-5 items-center">
        <UserDisplay />
        <LanguageSelector />
      </div>
    </header>
  );
};

export default Header;
