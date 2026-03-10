import { EvaluationsTable } from "@/components/evaluations/evaluations-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/_authed/evaluations")({
  component: RouteComponent,
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(
      context.trpc.evaluations.recentEvaluations.queryOptions(),
    );
  },
});

function RouteComponent() {
  return (
    <div className="p-6">
      <EvaluationsTable />
    </div>
  );
}
