import { ThemeToggle } from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
import PublicCompaniesHoldings from "@/components/PublicCompaniesHoldings";
import Header from "@/components/Header";
export default function Home() {
  return (
    <>
      <Header />
      <div></div>
      <div>
        <PublicCompaniesHoldings />
      </div>
    </>
  );
}
