# M0 architecture overview

## Components

- **Frontend (`frontend/`)** — Next.js App Router, TypeScript, and Tailwind CSS. It owns web presentation and user interaction. It does not contain privileged credentials or database access.
- **Frontend health proxy (`/api/health`)** — a server-side route that calls the backend using `BACKEND_API_URL`. It normalizes the response and returns only a minimal availability status to the browser. This avoids exposing internal backend configuration and avoids broad CORS settings for the status panel.
- **Backend (`backend/`)** — FastAPI owns future business logic, API validation, authorization, and integrations. M0 implements only liveness at `GET /health` and built-in API documentation at `/docs`.
- **Database placeholder (`database/migrations/`)** — reserved for future reviewed migrations. M0 creates no schema and connects to no Supabase project.

## Local request flow

```text
Browser → Next.js page → same-origin /api/health → FastAPI /health
```

The API is stateless in M0. No production secrets or real customer data are needed to run it. In Docker Compose, the frontend reaches the API at `http://backend:8000`; for separate local processes, it defaults to `http://localhost:8000`.

## Future integration boundaries

Later milestones may introduce Supabase Auth, PostgreSQL/pgvector, and private object storage after schema, tenant isolation, RLS, privacy, retention, and migration plans are reviewed and approved. Document extraction, background processing, embedding generation, retrieval, and LLM providers are not part of M0. They should be added behind backend service boundaries after data-flow and provider policies are approved. The frontend should consume typed backend APIs rather than connecting directly to privileged services.

## Security and scope notes

The health route reports service availability only; it is not a security, readiness, or dependency audit. FastAPI error responses avoid returning unexpected exception details. Credentials belong in local ignored environment files or an approved secret store, never in frontend code or version control. No database, authentication, paid API, external integration, or deployment is configured by this milestone.
