import { NextResponse } from "next/server";

export async function GET() {
  const backendUrl = process.env.BACKEND_API_URL ?? "http://localhost:8000";

  try {
    const response = await fetch(`${backendUrl.replace(/\/$/, "")}/health`, {
      cache: "no-store",
      signal: AbortSignal.timeout(2500),
    });
    if (!response.ok) {
      return NextResponse.json({ status: "unavailable" }, { status: 503 });
    }

    const payload: unknown = await response.json();
    if (
      typeof payload !== "object" ||
      payload === null ||
      !("status" in payload) ||
      payload.status !== "ok" ||
      !("service" in payload) ||
      payload.service !== "helpdesk-ai-api"
    ) {
      return NextResponse.json({ status: "unavailable" }, { status: 503 });
    }

    return NextResponse.json({ status: "ok", service: "helpdesk-ai-api" });
  } catch {
    return NextResponse.json({ status: "unavailable" }, { status: 503 });
  }
}
