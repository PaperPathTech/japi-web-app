import Link from "next/link";
import { getAdminVendorReports } from "@/lib/data/admin";

export const dynamic = "force-dynamic";

function formatDate(dateString: string | null) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

type ReportsAdminPageProps = {
  searchParams: Promise<{
    q?: string;
    link?: string;
    page?: string;
  }>;
};

export default async function ReportsAdminPage({
  searchParams,
}: ReportsAdminPageProps) {
  const resolvedParams = await searchParams;
  const query =
    typeof resolvedParams?.q === "string" ? resolvedParams.q.trim() : "";
  const link =
    typeof resolvedParams?.link === "string" ? resolvedParams.link : "all";
  const normalizedLink = ["all", "linked", "orphaned"].includes(link)
    ? link
    : "all";
  const rawPage =
    typeof resolvedParams?.page === "string" ? resolvedParams.page : "";
  const parsedPage = Number.parseInt(rawPage, 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const { items: reports, pagination } = await getAdminVendorReports(
    query || undefined,
    normalizedLink as Parameters<typeof getAdminVendorReports>[1],
    page,
    20
  );
  const hasFilters = Boolean(query || normalizedLink !== "all");
  const queryParams = new URLSearchParams();

  if (query) {
    queryParams.set("q", query);
  }

  if (normalizedLink !== "all") {
    queryParams.set("link", normalizedLink);
  }

  const pageLabel = `${pagination.page} of ${pagination.totalPages}`;
  const prevPage =
    pagination.page > 1 ? pagination.page - 1 : pagination.page;
  const nextPage =
    pagination.page < pagination.totalPages
      ? pagination.page + 1
      : pagination.page;
  const buildPageHref = (next: number) => {
    const params = new URLSearchParams(queryParams);
    if (next > 1) {
      params.set("page", String(next));
    }
    const search = params.toString();
    return search ? `/reports?${search}` : "/reports";
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Reports
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Review vendor reports submitted by users.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <form
            action="/reports"
            method="get"
            className="flex flex-wrap items-center gap-2"
          >
            <input
              type="search"
              name="q"
              placeholder="Search reports"
              defaultValue={query}
              className="w-56 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-white/20 focus:bg-white/[0.07]"
            />
            <select
              name="link"
              defaultValue={normalizedLink}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-white/20 focus:bg-white/[0.07]"
            >
              <option value="all" className="bg-zinc-900 text-white">
                All reports
              </option>
              <option value="linked" className="bg-zinc-900 text-white">
                Linked to vendor
              </option>
              <option value="orphaned" className="bg-zinc-900 text-white">
                Orphaned (no vendor)
              </option>
            </select>
            <button
              type="submit"
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
            >
              Search
            </button>
            {hasFilters ? (
              <Link
                href="/reports"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 transition hover:text-white"
              >
                Clear
              </Link>
            ) : null}
          </form>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300">
            {pagination.total} report{pagination.total === 1 ? "" : "s"}
          </div>
        </div>
      </div>
      {normalizedLink === "orphaned" ? (
        <p className="text-xs text-zinc-500">
          Orphaned reports require a null vendor reference. If reports are
          always linked in your current schema, this filter will return no
          results.
        </p>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 shadow-2xl shadow-black/20">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5">
              <tr className="text-left text-xs uppercase tracking-[0.18em] text-zinc-400">
                <th className="px-4 py-3 font-medium">Vendor</th>
                <th className="px-4 py-3 font-medium">Reason</th>
                <th className="px-4 py-3 font-medium">Details</th>
                <th className="px-4 py-3 font-medium">Reporter</th>
                <th className="px-4 py-3 font-medium">Reported</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {reports.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-sm text-zinc-400"
                  >
                    {hasFilters
                      ? "No reports match your current filters."
                      : "No reports found."}
                  </td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr
                    key={report.id}
                    className="align-top transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-white">
                        {report.vendorName}
                      </div>
                      <div className="mt-1 text-xs text-zinc-500">
                        {report.vendorId ?? "-"}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm text-zinc-300">
                      {report.reason}
                    </td>

                    <td className="max-w-md px-4 py-4 text-sm text-zinc-300">
                      <p className="line-clamp-3 whitespace-pre-wrap">
                        {report.details}
                      </p>
                    </td>

                    <td className="px-4 py-4 text-sm text-zinc-400">
                      {report.reporterId ?? "-"}
                    </td>

                    <td className="px-4 py-4 text-sm text-zinc-400">
                      {formatDate(report.reportedAt)}
                    </td>

                    <td className="px-4 py-4 text-right">
                      {report.vendorId ? (
                        <Link
                          href={`/vendors/${report.vendorId}`}
                          className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
                        >
                          Open vendor
                        </Link>
                      ) : (
                        <span className="text-xs text-zinc-500">-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-400">
        <div>
          Page {pageLabel} · {pagination.total} total
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={buildPageHref(prevPage)}
            aria-disabled={pagination.page <= 1}
            className={`rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
              pagination.page <= 1
                ? "pointer-events-none bg-white/5 text-zinc-600"
                : "bg-white/5 text-white hover:bg-white/10"
            }`}
          >
            Previous
          </Link>
          <Link
            href={buildPageHref(nextPage)}
            aria-disabled={pagination.page >= pagination.totalPages}
            className={`rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
              pagination.page >= pagination.totalPages
                ? "pointer-events-none bg-white/5 text-zinc-600"
                : "bg-white/5 text-white hover:bg-white/10"
            }`}
          >
            Next
          </Link>
        </div>
      </div>
    </section>
  );
}
