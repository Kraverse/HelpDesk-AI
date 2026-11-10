# HelpDesk AI

HelpDesk AI is an enterprise customer-support SaaS project planned around trusted, document-grounded answers. The repository is at **Milestone 0: Development Foundation**. This milestone provides a web shell, a small health-check API, local development setup, and automated checks. Authentication, customer data, Supabase, document ingestion, embeddings, RAG, chat, and production hosting are not implemented.

## Architecture

The `frontend/` directory contains a Next.js App Router application using TypeScript and Tailwind CSS. It renders the user-facing shell and calls a same-origin health route. That route proxies a minimal health check to the FastAPI service without exposing backend configuration to browser code.

The `backend/` directory contains a modular FastAPI service. It currently exposes `GET /health` and FastAPI's standard OpenAPI documentation at `/docs`. Future integration points are separated for API, core settings, services, schemas, and models. `database/migrations/` is intentionally only a placeholder; no schema or Supabase project is configured in M0.

See [the architecture note](docs/architecture/overview.md) for the request flow and future integration boundaries.

## Prerequisites

- Node.js 22 or newer and npm.
- Python 3.12.
- Docker Engine and the Docker Compose plugin, if using containers.

No API keys, paid services, or external database are required for M0.

## Environment configuration

Copy the placeholder file and load it into your shell before starting services locally:

```sh
cp .env.example .env
set -a
. ./.env
set +a
```

The file contains local non-secret settings only. Do not add credentials to Git. The Next.js health proxy reads `BACKEND_API_URL` on the server. It defaults to `http://localhost:8000` for local processes; Docker Compose overrides it with the internal service address.

## Run locally without Docker

In one terminal, install and start the API:

```sh
cd backend
python3.12 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
set -a && . ../.env && set +a
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API health endpoint is [http://localhost:8000/health](http://localhost:8000/health); interactive API docs are at [http://localhost:8000/docs](http://localhost:8000/docs).

In a second terminal, load the same environment and start the frontend:

```sh
set -a && . ./.env && set +a
cd frontend
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The System status panel reports whether the backend health endpoint is responding.

## Run with Docker Compose

After copying `.env.example` to `.env`, run:

```sh
docker compose up --build
```

Compose starts only the frontend and API; it intentionally does not add a database container. The frontend waits for the API health check. Stop the services with `docker compose down`. For local hot reload, the Compose file bind-mounts the source directories and keeps frontend dependencies in a named volume.

## Checks and tests

Frontend:

```sh
cd frontend
npm ci
npm run lint
npm run typecheck
npm test -- --run
npm run build
npm audit --audit-level=moderate
```

Backend:

```sh
cd backend
python3.12 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
pip install -r requirements-audit.txt
ruff check app tests
ruff format --check app tests
pytest
python -c "from app.main import app; print(app.title)"
pip-audit --requirement requirements.txt
```

GitHub Actions runs frontend checks and npm audit, backend lint/format, tests, import checks and pip-audit, a Gitleaks secret scan, and a Docker Compose build/start smoke test. It runs on pull requests to `main` and pushes to `feature/project-foundation`. No deployment job is configured.

## M0 boundaries

This foundation does not create or modify a Supabase project, create database tables, implement authentication, process customer documents, call AI providers, or deploy an application. These require separate design and owner approval in later milestones.
