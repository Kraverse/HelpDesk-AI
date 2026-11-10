"use client";

import { useEffect, useState } from "react";

type Status = "checking" | "online" | "offline";

export function BackendStatus() {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    const controller = new AbortController();

    async function checkBackend() {
      try {
        const response = await fetch("/api/health", {
          cache: "no-store",
          signal: controller.signal,
        });
        const result: unknown = await response.json();
        const healthy =
          response.ok &&
          typeof result === "object" &&
          result !== null &&
          "status" in result &&
          result.status === "ok";
        setStatus(healthy ? "online" : "offline");
      } catch {
        if (!controller.signal.aborted) setStatus("offline");
      }
    }

    void checkBackend();
    return () => controller.abort();
  }, []);

  const details = {
    checking: { label: "Checking API…", color: "bg-[#d5933f]" },
    online: { label: "API is responding", color: "bg-emerald-600" },
    offline: { label: "API is unavailable", color: "bg-rose-600" },
  } satisfies Record<Status, { label: string; color: string }>;
  const current = details[status];

  return (
    <div aria-live="polite" className="flex items-center gap-3 text-sm" role="status">
      <span aria-hidden="true" className={`size-2.5 shrink-0 rounded-full ${current.color}`} />
      <span className="font-medium">Backend API</span>
      <span className="ml-auto text-[#706777]">{current.label}</span>
    </div>
  );
}
