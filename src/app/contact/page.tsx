import Link from "next/link";
import PublicShell from "@/components/public/PublicShell";

const SUPPORT_EMAIL = "support@paperpath.ca";

export default function ContactPage() {
  return (
    <PublicShell
      title="Contact"
      subtitle="Connect with the Japi team for support or general inquiries."
      supportEmail={SUPPORT_EMAIL}
    >
      <div className="space-y-6 text-sm text-white/70">
        <p>
          Reach out for account help, vendor/client questions, partnerships, or
          press inquiries.
        </p>
        <p>
          Email{" "}
          <a className="text-white underline" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>{" "}
          and we will respond promptly.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em]">
          <Link className="text-white/70 transition hover:text-white" href="/support">
            Support
          </Link>
          <Link className="text-white/70 transition hover:text-white" href="/privacy">
            Privacy
          </Link>
          <Link
            className="text-white/70 transition hover:text-white"
            href="/delete-account"
          >
            Delete Account
          </Link>
        </div>
      </div>
    </PublicShell>
  );
}
