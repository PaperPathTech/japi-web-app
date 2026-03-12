import Link from "next/link";
import { getAdminVendorList } from "@/lib/data/admin";

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

function getStatusClasses(status: string) {
  switch (status) {
    case "active":
      return "bg-green-500/10 text-green-300 ring-1 ring-inset ring-green-500/20";
    case "under_review":
      return "bg-yellow-500/10 text-yellow-300 ring-1 ring-inset ring-yellow-500/20";
    case "paused":
      return "bg-orange-500/10 text-orange-300 ring-1 ring-inset ring-orange-500/20";
    case "suspended":
      return "bg-red-500/10 text-red-300 ring-1 ring-inset ring-red-500/20";
    case "draft":
    default:
      return "bg-zinc-500/10 text-zinc-300 ring-1 ring-inset ring-zinc-500/20";
  }
}

function formatStatusLabel(status: string) {
  return status.replaceAll("_", " ");
}

type VendorsAdminPageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
    page?: string;
  }>;
};

export default async function VendorsAdminPage({
  searchParams,
}: VendorsAdminPageProps) {
  const resolvedParams = await searchParams;
  const query =
    typeof resolvedParams?.q === "string" ? resolvedParams.q.trim() : "";
  const status =
    typeof resolvedParams?.status === "string" ? resolvedParams.status : "all";
  const normalizedStatus = [
    "all",
    "draft",
    "under_review",
    "active",
    "paused",
    "suspended",
  ].includes(status)
    ? status
    : "all";
  const rawPage =
    typeof resolvedParams?.page === "string" ? resolvedParams.page : "";
  const parsedPage = Number.parseInt(rawPage, 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const { items: vendors, pagination } = await getAdminVendorList(
    query || undefined,
    normalizedStatus as Parameters<typeof getAdminVendorList>[1],
    page,
    20
  );
  const hasFilters = Boolean(query || normalizedStatus !== "all");
  const queryParams = new URLSearchParams();

  if (query) {
    queryParams.set("q", query);
  }

  if (normalizedStatus !== "all") {
    queryParams.set("status", normalizedStatus);
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
    return search ? `/vendors?${search}` : "/vendors";
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Vendors
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Manage vendor profiles, review statuses, and inspect details.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <form
            action="/vendors"
            method="get"
            className="flex flex-wrap items-center gap-2"
          >
            <input
              type="search"
              name="q"
              placeholder="Search vendors"
              defaultValue={query}
              className="w-56 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-white/20 focus:bg-white/[0.07]"
            />
            <select
              name="status"
              defaultValue={normalizedStatus}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-white/20 focus:bg-white/[0.07]"
            >
              <option value="all" className="bg-zinc-900 text-white">
                All statuses
              </option>
              <option value="draft" className="bg-zinc-900 text-white">
                Draft
              </option>
              <option value="under_review" className="bg-zinc-900 text-white">
                Under review
              </option>
              <option value="active" className="bg-zinc-900 text-white">
                Active
              </option>
              <option value="paused" className="bg-zinc-900 text-white">
                Paused
              </option>
              <option value="suspended" className="bg-zinc-900 text-white">
                Suspended
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
                href="/vendors"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 transition hover:text-white"
              >
                Clear
              </Link>
            ) : null}
          </form>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300">
            {pagination.total} vendor{pagination.total === 1 ? "" : "s"}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 shadow-2xl shadow-black/20">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5">
              <tr className="text-left text-xs uppercase tracking-[0.18em] text-zinc-400">
                <th className="px-4 py-3 font-medium">Business</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">City</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {vendors.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-sm text-zinc-400"
                  >
                    {hasFilters
                      ? "No vendors match your current filters."
                      : "No vendors found."}
                  </td>
                </tr>
              ) : (
                vendors.map((vendor) => (
                  <tr
                    key={vendor.id}
                    className="transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-4">
                      <div className="font-medium text-white">
                        {vendor.businessName}
                      </div>
                      <div className="mt-1 text-xs text-zinc-500">
                        {vendor.id}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm text-zinc-300">
                      {vendor.category}
                    </td>

                    <td className="px-4 py-4 text-sm text-zinc-300">
                      {vendor.city}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getStatusClasses(
                          vendor.status
                        )}`}
                      >
                        {formatStatusLabel(vendor.status)}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm text-zinc-400">
                      {formatDate(vendor.updatedAt)}
                    </td>

                    <td className="px-4 py-4 text-right">
                      <Link
                        href={`/vendors/${vendor.id}`}
                        className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                      >
                        Open
                      </Link>
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
