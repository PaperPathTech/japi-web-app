import ThemeToggle from "@/components/admin/ThemeToggle";
import {
  getAdminAllowlistMeta,
  isEmailAllowlisted,
  requireAdmin,
} from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

type StatusPillProps = {
  label: string;
  value: boolean;
};

function StatusPill({ label, value }: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${
        value
          ? "bg-emerald-500/10 text-emerald-300 ring-emerald-500/20"
          : "bg-rose-500/10 text-rose-300 ring-rose-500/20"
      }`}
    >
      {label}: {value ? "yes" : "no"}
    </span>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
        {label}
      </p>
      <p className="mt-2 break-words text-sm text-zinc-300">{value || "-"}</p>
    </div>
  );
}

export default async function AdminSettingsPage() {
  const admin = await requireAdmin();
  const allowlistMeta = getAdminAllowlistMeta();

  const envChecks = [
    {
      label: "Supabase URL",
      value: Boolean(
        process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
      ),
    },
    {
      label: "Supabase publishable key",
      value: Boolean(
        process.env.SUPABASE_PUBLISHABLE_KEY ??
          process.env.SUPABASE_ANON_KEY ??
          process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ),
    },
    {
      label: "Supabase service role key",
      value: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    },
    {
      label: "Admin allowlist",
      value: Boolean(process.env.ADMIN_ALLOWLIST?.trim()),
    },
  ];

  const isAllowlisted = isEmailAllowlisted(admin.email);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Admin Settings
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Secure administration controls for account access, environment
          readiness, and appearance.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 shadow-2xl shadow-black/20">
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="text-lg font-semibold text-white">Account</h2>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <InfoItem label="Admin email" value={admin.email} />
            <InfoItem label="Admin user ID" value={admin.id} />
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 shadow-2xl shadow-black/20">
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="text-lg font-semibold text-white">Access</h2>
          </div>
          <div className="space-y-4 p-5">
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill label="Allowlisted" value={isAllowlisted} />
              <StatusPill
                label="Allowlist configured"
                value={allowlistMeta.hasAdminAllowlist}
              />
            </div>
            <p className="text-sm text-zinc-300">
              Admin access is controlled by the `ADMIN_ALLOWLIST` environment
              variable. Update the allowlist to grant or revoke access for
              additional emails.
            </p>
            <p className="text-xs text-zinc-500">
              Configured entries: {allowlistMeta.allowlistCount}
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 shadow-2xl shadow-black/20">
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="text-lg font-semibold text-white">
              Environment readiness
            </h2>
          </div>
          <div className="space-y-4 p-5">
            <p className="text-sm text-zinc-300">
              These checks confirm required environment variables are present.
              Values are never shown.
            </p>
            <div className="flex flex-wrap gap-2">
              {envChecks.map((check) => (
                <StatusPill
                  key={check.label}
                  label={check.label}
                  value={check.value}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 shadow-2xl shadow-black/20">
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="text-lg font-semibold text-white">Appearance</h2>
          </div>
          <div className="space-y-4 p-5">
            <p className="text-sm text-zinc-300">
              Toggle the admin theme to match your current working environment.
            </p>
            <ThemeToggle />
          </div>
        </section>
      </div>
    </section>
  );
}
