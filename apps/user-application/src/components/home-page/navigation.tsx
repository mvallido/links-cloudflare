import { Button } from "@/components/ui/button";
import { LoginPopup } from "@/components/auth/login-popup";
import { UserCircle } from "@/components/auth/user-icon";
import { authClient } from "@/components/auth/client";
import { Link as LinkIcon, Github } from "lucide-react";

export function Navigation() {
  const { data: user, isPending } = authClient.useSession();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-[980px] mx-auto px-6 h-12 grid grid-cols-3 items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 justify-self-start">
          <LinkIcon className="h-[18px] w-[18px] text-foreground" strokeWidth={2.5} />
          <span className="text-sm font-semibold tracking-tight text-foreground">smartl.inks</span>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/mvallido/links-cloudflare"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/60 hover:text-foreground transition-colors justify-self-center"
        >
          <Github className="h-[18px] w-[18px]" strokeWidth={2} />
        </a>

        {/* Auth actions */}
        {isPending ? (
          <div className="h-7 w-16 rounded-full bg-muted animate-pulse justify-self-end" />
        ) : user ? (
          <div className="flex items-center gap-2.5 justify-self-end">
            <a href="/app">
              <Button
                size="sm"
                className="h-7 px-3.5 bg-background text-foreground border border-foreground hover:bg-foreground/5 rounded-full text-xs font-medium"
              >
                Dashboard
              </Button>
            </a>
            <UserCircle />
          </div>
        ) : (
          <div className="flex items-center gap-0.5 justify-self-end">
            <LoginPopup>
              <Button variant="ghost" size="sm" className="h-7 px-2.5 text-xs text-foreground/60 hover:text-foreground">
                Log in
              </Button>
            </LoginPopup>
            <LoginPopup>
              <Button
                size="sm"
                className="h-7 px-3.5 bg-background text-foreground border border-foreground hover:bg-foreground/5 rounded-full text-xs font-medium"
              >
                Try it Free
              </Button>
            </LoginPopup>
          </div>
        )}
      </div>
    </nav>
  );
}
