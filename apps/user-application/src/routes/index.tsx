import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/home-page/navigation";
import { HeroSection } from "@/components/home-page/hero-section";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <footer className="py-5 text-center text-[11px] text-muted-foreground">
        &copy; 2025 smartl.inks
      </footer>
    </div>
  );
}
