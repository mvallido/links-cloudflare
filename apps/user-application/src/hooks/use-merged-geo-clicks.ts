import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { trpc } from "@/router";
import { useGeoClickStore } from "@/hooks/geo-clicks-store";
import { DurableObjectGeoClickSchemaType } from "@repo/data-ops/zod-schema/links";

export function useMergedGeoClicks(): DurableObjectGeoClickSchemaType[] {
  const { data: historicalClicks } = useSuspenseQuery(
    trpc.links.recentGeoClicks.queryOptions(),
  );
  const { clicks: liveClicks } = useGeoClickStore();

  return useMemo(() => {
    const historical: DurableObjectGeoClickSchemaType[] =
      historicalClicks?.map((c) => ({
        latitude: c.latitude!,
        longitude: c.longitude!,
        time: new Date(c.clickedTime).getTime(),
        country: c.country ?? "",
      })) ?? [];
    return [...historical, ...liveClicks];
  }, [historicalClicks, liveClicks]);
}
