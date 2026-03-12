import Link from "next/link";
import { getAdminDashboardSummary } from "@/lib/data/admin";

type SummaryCardProps = {
  label: string;
  value: string;
  trend?: string;
};

function formatDate(dateString: string | null) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function SummaryCard({ label, value, trend }: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.35)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
      <div className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
        {value}
      </div>
      {trend ? (
        <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {trend}
        </div>
      ) : null}
    </div>
  );
}

export default async function AdminDashboard() {
  const summary = await getAdminDashboardSummary();

  const summaryCards: SummaryCardProps[] = [
    { label: "Under Review", value: summary.vendorCounts.underReview.toString() },
    { label: "Active Vendors", value: summary.vendorCounts.active.toString() },
    { label: "Paused", value: summary.vendorCounts.paused.toString() },
    { label: "Suspended", value: summary.vendorCounts.suspended.toString() },
    { label: "Reports", value: summary.reportCount.toString() },
  ];

  const quickActions = [
    {
      label: "Review Vendors",
      description: "Audit onboarding submissions and verification docs.",
      href: "/vendors",
    },
    {
      label: "View Reports",
      description: "Triage incoming incident reports and flags.",
      href: "/reports",
    },
    {
      label: "Settings",
      description: "Update admin preferences and account configuration.",
      href: "/settings",
    },
  ];

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
          Overview
        </p>
        <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">
          Moderation Dashboard
        </h2>
        <p className="max-w-2xl text-base text-slate-600 sm:text-lg dark:text-slate-300">
          Real-time visibility into vendor status, reports, and compliance
          activity.
        </p>
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
            Total {summary.vendorCounts.total}
          </span>
          <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
            Draft {summary.vendorCounts.draft}
          </span>
          <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
            Under Review {summary.vendorCounts.underReview}
          </span>
          <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
            Active {summary.vendorCounts.active}
          </span>
          <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
            Paused {summary.vendorCounts.paused}
          </span>
          <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
            Suspended {summary.vendorCounts.suspended}
          </span>
        </div>
      </header>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {summaryCards.map((card) => (
          <SummaryCard key={card.label} {...card} />
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.45)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                Quick Actions
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                Jump back in
              </h3>
            </div>
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-white dark:bg-slate-100 dark:text-slate-900">
              Internal
            </span>
          </div>
          <div className="mt-6 grid gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="group flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_12px_30px_-20px_rgba(15,23,42,0.4)] dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-slate-700"
              >
                <div className="text-lg font-semibold text-slate-900 dark:text-white">
                  {action.label}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {action.description}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.45)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Recent Activity
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              Moderation feed
            </h3>
          </div>
          <div className="mt-6 space-y-4">
            {summary.recentReports.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                No recent reports yet.
              </div>
            ) : (
              summary.recentReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <span className="mt-1 inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 ring-1 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-200 dark:ring-rose-500/30">
                    Report
                  </span>
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      {report.reason}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {report.vendorName} · {formatDate(report.reportedAt)}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 dark:text-slate-400">
                      {report.details}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
