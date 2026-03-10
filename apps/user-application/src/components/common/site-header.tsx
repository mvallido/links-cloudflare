import { SidebarTrigger } from "@/components/ui/sidebar";
import { useRouterState } from "@tanstack/react-router";

export function SiteHeader() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const getPageTitle = (path: string) => {
    if (path === "/app") return "Dashboard";
    if (path === "/app/links") return "Links";
    if (path === "/app/create") return "Create Link";
    if (path.startsWith("/app/link/")) {
      return `Link`;
    }
    // Add more path mappings as needed
    return "Dashboard";
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center border-b border-border/60 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-3 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-sm font-medium text-foreground">{getPageTitle(pathname)}</h1>
      </div>
    </header>
  );
}
