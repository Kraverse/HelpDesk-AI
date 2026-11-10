import { BackendStatus } from "@/components/backend-status";
import Link from "next/link";

const foundationItems = [
  {
    title: "Customer experience",
    description: "A dedicated space for future support conversations and trusted answers.",
  },
  {
    title: "Knowledge workspace",
    description: "A clear home for approved sources, document processing, and citations.",
  },
  {
    title: "Built for careful growth",
    description: "The foundation keeps the web interface and API independently testable.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f7f5] text-[#241d2b]">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="border-b border-[#e8e3e8] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link aria-label="HelpDesk AI home" className="flex items-center gap-3" href="/">
            <span aria-hidden="true" className="grid size-10 place-items-center rounded-xl bg-[#412544] text-lg font-semibold text-white">
              H
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-tight">HelpDesk AI</span>
              <span className="block text-xs text-[#706777]">Support workspace</span>
            </span>
          </Link>
          <span className="rounded-full border border-[#e6dce6] bg-[#fbf8fb] px-3 py-1.5 text-xs font-medium text-[#5b4660]">
            Development foundation
          </span>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <section aria-labelledby="welcome-heading" className="max-w-3xl" id="main-content">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#9a5a13]">
            A more helpful support experience
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Answers grounded in your team’s knowledge.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#655d69]">
            HelpDesk AI is being built to help customers find clear, trustworthy support while giving teams a simple place to manage their knowledge.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {foundationItems.map((item, index) => (
              <article
                className={`rounded-2xl border border-[#e8e3e8] bg-white p-5 shadow-[0_2px_10px_rgba(36,29,43,0.03)] ${index === 0 ? "sm:col-span-2" : ""}`}
                key={item.title}
              >
                <span aria-hidden="true" className="mb-4 grid size-9 place-items-center rounded-lg bg-[#f6eee2] text-sm font-semibold text-[#895214]">
                  0{index + 1}
                </span>
                <h2 className="text-base font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#706777]">{item.description}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 border-l-2 border-[#d5933f] pl-4 text-sm leading-6 text-[#655d69]">
            This is an early development foundation. Sign-in, chat, document ingestion, and AI answers are not implemented yet.
          </p>
        </section>

        <aside aria-label="Service status" className="h-fit rounded-2xl border border-[#e8e3e8] bg-white p-5 shadow-[0_2px_10px_rgba(36,29,43,0.03)]">
          <h2 className="text-base font-semibold">System status</h2>
          <p className="mt-1 text-sm text-[#706777]">Live checks for the local development services.</p>
          <div className="mt-5 border-t border-[#eee9ef] pt-4">
            <BackendStatus />
          </div>
        </aside>
      </div>

      <footer className="border-t border-[#e8e3e8] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-5 text-xs text-[#706777] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>HelpDesk AI · Development foundation</span>
          <span>Designed for clarity, privacy, and reliable support.</span>
        </div>
      </footer>
    </main>
  );
}
