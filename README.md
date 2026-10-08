# AssistRep

AssistRep is a municipal information and incident-reporting platform for Tupi,
South Cotabato. This repository is being built in phases; the current Phase 0
provides the monorepo foundation and an API liveness endpoint. No official
municipal contacts, service details, or barangay boundaries are included yet.

## Phase 0 workspace

```text
apps/
  api/                 Express API and /api/v1/health
  web/                 Next.js public website
packages/
  shared/              Shared TypeScript types and Zod schemas
.github/workflows/     CI checks
docker-compose.yml     Local MySQL 8 and Redis
```

## Requirements

- Node.js 20 or newer and npm
- Docker Desktop with Docker Compose

## Local development

1. Copy `.env.example` to `.env` and replace the local MySQL passwords.
2. Start the local services:

   ```powershell
   docker compose up -d
   ```

3. Install JavaScript dependencies and build the shared package:

   ```powershell
   npm ci
   npm run build --workspace=@assistrep/shared
   ```

4. In separate PowerShell windows, start the web app and API:

   ```powershell
   npm run dev
   ```

   ```powershell
   npm run dev:api
   ```

   The web app runs at `http://localhost:3000`; the API liveness check is
   `http://localhost:4000/api/v1/health`.

5. Run the Phase 0 checks:

   ```powershell
   npm run lint
   npm run format:check
   npm run typecheck
   npm test
   npm run build
   ```

The API health route reports process liveness only; database readiness checks
will be added with the database-backed phase. Do not use the local Compose
credentials in a deployed environment.

## Deployment preparation

### Vercel (web)

Import the GitHub repository into Vercel, set the Root Directory to `apps/web`,
select the Next.js framework preset, and deploy. Keep environment secrets out
of `NEXT_PUBLIC_*` variables. The repository has not been connected to or
deployed on a Vercel account.

### Railway (API)

Create a Railway service from this repository with the repository root as its
root directory. `railway.json` configures the shared/API build, API start
command, and `/api/v1/health` health check. Railway supplies `PORT`; the API
binds to `0.0.0.0`. Add production secrets through Railway's variable manager,
not source control. MySQL/Redis connections and authenticated features will be
wired in later phases. The repository has not been connected to or deployed on
a Railway account.

## Decisions and assumptions

- npm workspaces keep the Next.js web app, Express API, and shared Zod package
  in one repository.
- Phase 0 uses a small versioned Express endpoint as a deployment smoke test;
  it does not claim database readiness.
- Local MySQL and Redis run in Docker and bind only to the local machine.
- Municipal information is intentionally omitted until it can be verified;
  sample contact details and boundary data will not be presented as official.
- Actual Vercel/Railway deployments require project ownership and provider
  access, so this phase prepares configuration and instructions only.
"# 8tut-choi" 
