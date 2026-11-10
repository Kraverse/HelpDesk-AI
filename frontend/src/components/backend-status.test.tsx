import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { BackendStatus } from "./backend-status";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("BackendStatus", () => {
  it("announces the checking state and then reports a healthy API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ status: "ok", service: "helpdesk-ai-api" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    render(<BackendStatus />);
    expect(screen.getByRole("status")).toHaveTextContent("Checking API");

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent("API is responding");
    });
  });

  it("reports an unavailable API when the health check fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("connection refused")));

    render(<BackendStatus />);
    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent("API is unavailable");
    });
  });
});
