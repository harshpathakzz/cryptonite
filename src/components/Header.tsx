import SearchBar from "@/components/SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4">
      <Link href="/">LOGO</Link>
      <div className="flex-1 mx-4">
        <SearchBar />
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
