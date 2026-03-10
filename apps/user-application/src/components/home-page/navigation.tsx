import { Button } from "@/components/ui/button";
import { LoginPopup } from "@/components/auth/login-popup";
import { UserCircle } from "@/components/auth/user-icon";
import { authClient } from "@/components/auth/client";
import { Link as LinkIcon } from "lucide-react";

export function Navigation() {
  const { data: user, isPending } = authClient.useSession();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-[980px] mx-auto px-6 h-12 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <LinkIcon className="h-[18px] w-[18px] text-foreground" strokeWidth={2.5} />
          <span className="text-sm font-semibold tracking-tight text-foreground">smartl.inks</span>
        </a>

        {/* Auth actions */}
        {isPending ? (
          <div className="h-7 w-16 rounded-full bg-muted animate-pulse" />
        ) : user ? (
          <div className="flex items-center gap-2.5">
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
          <div className="flex items-center gap-0.5">
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
