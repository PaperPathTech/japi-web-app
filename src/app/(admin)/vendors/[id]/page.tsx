import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  getAdminVendorDetail,
  updateVendorStatus,
  type VendorStatus,
} from "@/lib/data/admin";

export const dynamic = "force-dynamic";

const STATUS_OPTIONS: VendorStatus[] = [
  "draft",
  "under_review",
  "active",
  "paused",
  "suspended",
];

function formatDate(dateString: string | null) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatStatusLabel(status: string) {
  return status.replaceAll("_", " ");
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

async function updateVendorStatusAction(formData: FormData) {
  "use server";

  const vendorId = String(formData.get("vendorId") ?? "");
  const status = String(formData.get("status") ?? "") as VendorStatus;

  if (!vendorId) {
    throw new Error("Missing vendorId");
  }

  if (!STATUS_OPTIONS.includes(status)) {
    throw new Error("Invalid vendor status");
  }

  await updateVendorStatus(vendorId, status);

  revalidatePath("/vendors");
  revalidatePath(`/vendors/${vendorId}`);
}

type VendorDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function VendorDetailPage({
  params,
}: VendorDetailPageProps) {
  const { id } = await params;
  const vendor = await getAdminVendorDetail(id);

  if (!vendor) {
    notFound();
  }

  const { profile, services, reports } = vendor;

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <Link
            href="/vendors"
            className="inline-flex items-center text-sm text-zinc-400 transition hover:text-white"
          >
            ← Back to vendors
          </Link>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              {profile.businessName}
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Vendor profile details, services, and reports.
            </p>
          </div>
        </div>

        <span
          className={`inline-flex rounded-full px-3 py-1.5 text-sm font-medium capitalize ${getStatusClasses(
            profile.status
          )}`}
        >
          {formatStatusLabel(profile.status)}
        </span>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 shadow-2xl shadow-black/20">
            <div className="border-b border-white/10 px-5 py-4">
              <h2 className="text-lg font-semibold text-white">Profile</h2>
            </div>

            <div className="grid gap-4 p-5 sm:grid-cols-2">
              <InfoItem label="Business name" value={profile.businessName} />
              <InfoItem label="Category" value={profile.category} />
              <InfoItem label="City" value={profile.city} />
              <InfoItem label="Email" value={profile.email} />
              <InfoItem label="Phone" value={profile.phone} />
              <InfoItem label="Website" value={profile.website} />
              <InfoItem label="Instagram" value={profile.instagram} />
              <InfoItem label="Updated" value={formatDate(profile.updatedAt)} />

              <div className="sm:col-span-2">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Description
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-300">
                  {profile.description}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Cover image URL
                </p>
                <p className="mt-2 break-all text-sm text-zinc-300">
                  {profile.coverImageUrl || "-"}
                </p>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 shadow-2xl shadow-black/20">
            <div className="border-b border-white/10 px-5 py-4">
              <h2 className="text-lg font-semibold text-white">Services</h2>
            </div>

            <div className="p-5">
              {services.length === 0 ? (
                <p className="text-sm text-zinc-400">
                  No services found for this vendor.
                </p>
              ) : (
                <div className="space-y-4">
                  {services.map((service) => (
                    <article
                      key={service.id}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <h3 className="text-sm font-medium text-white">
                        {service.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-400">
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1">
                          {service.category}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1">
                          From {service.priceFrom}
                        </span>
                        {service.isPackage ? (
                          <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1">
                            Package
                          </span>
                        ) : null}
                      </div>

                      <p className="mt-3 text-sm text-zinc-300">
                        {service.summary}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 shadow-2xl shadow-black/20">
            <div className="border-b border-white/10 px-5 py-4">
              <h2 className="text-lg font-semibold text-white">
                Admin controls
              </h2>
            </div>

            <div className="p-5">
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Quick actions
                </p>
                <form action={updateVendorStatusAction}>
                  <input type="hidden" name="vendorId" value={profile.id} />
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "Activate", value: "active" },
                      { label: "Pause", value: "paused" },
                      { label: "Suspend", value: "suspended" },
                    ].map((action) => {
                      const isActive = profile.status === action.value;
                      return (
                        <button
                          key={action.value}
                          type="submit"
                          name="status"
                          value={action.value}
                          disabled={isActive}
                          className={`rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                            isActive
                              ? "cursor-not-allowed bg-white/5 text-zinc-500"
                              : "bg-white/5 text-white hover:bg-white/10"
                          }`}
                        >
                          {action.label}
                        </button>
                      );
                    })}
                  </div>
                </form>
              </div>

              <form action={updateVendorStatusAction} className="mt-6 space-y-4">
                <input type="hidden" name="vendorId" value={profile.id} />

                <div className="space-y-2">
                  <label
                    htmlFor="status"
                    className="text-sm font-medium text-zinc-200"
                  >
                    Vendor status
                  </label>

                  <select
                    id="status"
                    name="status"
                    defaultValue={profile.status}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition focus:border-white/20 focus:bg-white/[0.07]"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option
                        key={status}
                        value={status}
                        className="bg-zinc-900 text-white"
                      >
                        {formatStatusLabel(status)}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Save status
                </button>
              </form>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 shadow-2xl shadow-black/20">
            <div className="border-b border-white/10 px-5 py-4">
              <h2 className="text-lg font-semibold text-white">Reports</h2>
            </div>

            <div className="p-5">
              {reports.length === 0 ? (
                <p className="text-sm text-zinc-400">
                  No reports found for this vendor.
                </p>
              ) : (
                <div className="space-y-4">
                  {reports.map((report) => (
                    <article
                      key={report.id}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h3 className="text-sm font-medium text-white">
                          {report.reason}
                        </h3>
                        <span className="text-xs text-zinc-500">
                          {formatDate(report.createdAt)}
                        </span>
                      </div>

                      <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-300">
                        {report.details}
                      </p>

                      <p className="mt-3 text-xs text-zinc-500">
                        Reporter ID: {report.reporterId ?? "-"}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
        {label}
      </p>
      <p className="mt-2 break-words text-sm text-zinc-300">{value || "-"}</p>
    </div>
  );
}
