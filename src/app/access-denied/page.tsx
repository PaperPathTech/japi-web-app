import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(248,250,252,0.9),rgba(241,245,249,1)_45%,rgba(226,232,240,1))] px-6 py-16 text-slate-900">
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.45)] backdrop-blur">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
          Access denied
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900">
          Admin access required
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          This area is restricted to approved administrators. Sign in with an
          allowlisted account or request access from your admin lead.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/login"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
