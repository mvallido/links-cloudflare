# User Application

React SPA + tRPC API running as a Cloudflare Worker. Serves the dashboard UI and handles authentication, link management, and real-time click visualization.

## Domain Routing

| Path | Handler | Description |
|------|---------|-------------|
| `/trpc/*` | Worker (tRPC) | API calls from the frontend |
| `/api/auth/*` | Worker (Better Auth) | OAuth flow, sessions |
| `/click-socket` | Worker (WebSocket proxy) | Real-time click stream |
| `/*` | Assets (SPA) | React app with client-side routing |

Configured via `run_worker_first` in `wrangler.jsonc` -- matching paths hit the Worker before falling back to static assets.

## Project Structure

```
user-application/
├── src/                          # React frontend
│   ├── main.tsx                  # App entry point
│   ├── router.tsx                # TanStack Router setup
│   ├── routes/
│   │   ├── __root.tsx            # Root layout
│   │   ├── index.tsx             # Landing page
│   │   └── app/
│   │       ├── _authed.tsx       # Auth guard layout
│   │       ├── index.tsx         # Dashboard
│   │       ├── create.tsx        # Create link form
│   │       ├── links.tsx         # Links list
│   │       ├── link.$id.tsx      # Link detail editor
│   │       └── evaluations.tsx   # Evaluation results
│   ├── components/
│   │   ├── auth/                 # Login popup, user icon, auth client
│   │   ├── dashboard/            # Dashboard widgets
│   │   ├── link/                 # Link editor, destination manager
│   │   ├── home-page/            # Marketing/landing page
│   │   └── ui/                   # Shadcn UI primitives
│   └── hooks/
│       ├── clicks-socket.ts      # WebSocket connection for live clicks
│       └── geo-clicks-store.ts   # Zustand store for click data
│
├── worker/                       # Cloudflare Worker backend
│   ├── index.ts                  # Worker entry point
│   ├── hono/
│   │   └── app.ts                # Auth middleware, route dispatch
│   └── trpc/
│       ├── trpc-instance.ts      # tRPC init
│       ├── context.ts            # Request context (userId, env)
│       ├── router.ts             # Root router
│       └── routers/
│           ├── links.ts          # Link CRUD + analytics queries
│           ├── evaluations.ts    # Problematic destinations, recent evals
│           └── dummy-data.ts     # Placeholder analytics data
│
└── wrangler.jsonc                # Worker + assets config
```

## tRPC API

### Links Router

| Procedure | Type | Description |
|-----------|------|-------------|
| `linkList` | query | Paginated list of user's links |
| `createLink` | mutation | Create a new link |
| `getLink` | query | Single link with destinations |
| `updateLinkName` | mutation | Rename a link |
| `updateLinkDestinations` | mutation | Update routing destinations |

### Evaluations Router

| Procedure | Type | Description |
|-----------|------|-------------|
| `problematicDestinations` | query | Links with unavailable products |
| `recentEvaluations` | query | Paginated evaluation history |

## Auth Flow

1. User clicks "Sign in with Google" -> Better Auth initiates OAuth
2. Callback hits `/api/auth/callback/google` -> session created in D1
3. Auth middleware on `/trpc/*` validates session, injects `userId` into tRPC context
4. Protected routes in `src/routes/app/_authed.tsx` check session client-side via `beforeLoad`

## Development

```bash
# From repo root
pnpm build-package    # Build @repo/data-ops first
pnpm dev-frontend     # Starts Vite on port 3000
```

To generate Cloudflare binding types after changing `wrangler.jsonc`:

```bash
pnpm run cf-typegen
```

## Deployment

```bash
# From repo root
pnpm stage:deploy-frontend        # -> stage.smartl.ink
pnpm production:deploy-frontend   # -> smartl.ink
```

## Service Binding

The user-application connects to the data-service via a Cloudflare service binding (`BACKEND_SERVICE`). This is used to proxy WebSocket connections for the real-time click dashboard -- the frontend connects to `/click-socket`, which the Worker forwards to the data-service's Durable Object.
