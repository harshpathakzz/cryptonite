import { ThemeToggle } from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
export default function Home() {
  return (
    <>
      <ThemeToggle />
      <h1>Hello</h1>
      <SearchBar />
      <div className="p-4 space-y-4">
        <div className="bg-primary text-white p-4">--primary</div>
        <div className="bg-primary-foreground text-black p-4">
          --primary-foreground
        </div>
        <div className="bg-secondary text-black p-4">--secondary</div>
        <div className="bg-secondary-foreground text-white p-4">
          --secondary-foreground
        </div>
        <div className="bg-muted text-black p-4">--muted</div>
        <div className="bg-muted-foreground text-white p-4">
          --muted-foreground
        </div>
        <div className="bg-accent text-black p-4">--accent</div>
        <div className="bg-accent-foreground text-white p-4">
          --accent-foreground
        </div>
        <div className="bg-destructive text-white p-4">--destructive</div>
        <div className="bg-destructive-foreground text-black p-4">
          --destructive-foreground
        </div>
        <div className="bg-border text-black p-4">--border</div>
        <div className="bg-input text-black p-4">--input</div>
        <div className="bg-ring text-black p-4">--ring</div>
        <div className="bg-background text-black p-4">--background</div>
        <div className="bg-foreground text-white p-4">--foreground</div>
        <div className="bg-card text-black p-4">--card</div>
        <div className="bg-card-foreground text-white p-4">
          --card-foreground
        </div>
        <div className="bg-popover text-black p-4">--popover</div>
        <div className="bg-popover-foreground text-white p-4">
          --popover-foreground
        </div>
      </div>
    </>
  );
}
