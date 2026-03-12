import { createFileRoute } from "@tanstack/react-router";
import {
  MetricsCards,
  ActiveAreasMap,
  TopCountriesTable,
  ProblematicLinksTable,
  ActiveLinksTable,
  ActiveRegionMap,
} from "@/components/dashboard";
import { useClickSocket } from "@/hooks/clicks-socket";

export const Route = createFileRoute("/app/_authed/")({
  component: RouteComponent,
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(
      context.trpc.links.activeLinks.queryOptions(),
    );
    context.queryClient.prefetchQuery(
      context.trpc.links.totalLinkClickLastHour.queryOptions(),
    );
    context.queryClient.prefetchQuery(
      context.trpc.links.last24HourClicks.queryOptions(),
    );
    context.queryClient.prefetchQuery(
      context.trpc.links.last30DaysClicks.queryOptions(),
    );
    context.queryClient.prefetchQuery(
      context.trpc.evaluations.problematicDestinations.queryOptions(),
    );
    context.queryClient.prefetchQuery(
      context.trpc.links.clicksByCountry.queryOptions(),
    );
    context.queryClient.prefetchQuery(
      context.trpc.links.recentGeoClicks.queryOptions(),
    );
  },
});

function RouteComponent() {
  const { isConnected } = useClickSocket();

  return (
    <div className="flex w-full min-w-0">
      <main className="flex-1 min-w-0">
        <div className="mx-auto px-6 lg:px-8 py-4 space-y-5 max-w-full">
          <div className="flex items-center gap-1.5">
            <div
              className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-emerald-500" : "bg-red-400"}`}
            />
            <span className="text-[11px] text-muted-foreground">
              {isConnected ? "Live" : "Disconnected"}
            </span>
          </div>

          <MetricsCards />

          <div className="grid gap-6 lg:grid-cols-2">
            <ActiveRegionMap />
            <ActiveAreasMap />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="min-w-0">
              <TopCountriesTable />
            </div>
            <div className="min-w-0">
              <ProblematicLinksTable />
            </div>
          </div>

          <ActiveLinksTable />
        </div>
      </main>
    </div>
  );
}
