import Link from "next/link";
import PublicShell from "@/components/public/PublicShell";

const SUPPORT_EMAIL = "support@paperpath.ca";

export default function SupportPage() {
  return (
    <PublicShell
      title="Support"
      subtitle="We are here to keep every connection smooth and joyful."
      supportEmail={SUPPORT_EMAIL}
    >
      <div className="space-y-8 text-sm text-white/70">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">How we can help</h2>
          <p>
            Japi support covers account access, vendor connections, and general
            questions about the experience.
          </p>
          <p>
            Email us at{" "}
            <a className="text-white underline" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>{" "}
            and include the email tied to your Japi account.
          </p>
          <p className="text-xs text-white/50">
            Typical response time: 1–2 business days.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Trouble signing in",
              copy: "Verify the email address you used for Japi and check for a recent sign-in link or reset email.",
            },
            {
              title: "Updating your profile",
              copy: "Most profile details can be edited in-app. If something is locked, reach out and we will help.",
            },
            {
              title: "Vendor/client connection issues",
              copy: "If a message or request is not going through, send us the vendor name or listing and we will investigate.",
            },
            {
              title: "Subscription or purchase help",
              copy: "If purchases exist in the app, we can help clarify billing or access. If you are unsure, contact us and we will confirm.",
            },
            {
              title: "Requesting account deletion",
              copy: "Use the delete account page or email us to confirm removal of your data.",
            },
            {
              title: "Privacy questions",
              copy: "We will gladly explain what data we collect and how it is used.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/60">{item.copy}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold text-white">Account help</h3>
            <p className="mt-2 text-sm text-white/60">
              Need access, updates, or help with your account? We will guide you
              through it quickly.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold text-white">
              Subscription or purchase help
            </h3>
            <p className="mt-2 text-sm text-white/60">
              If the app includes purchases, we can help verify access and
              resolve billing questions.
            </p>
          </div>
        </section>

        <section className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em]">
          <Link className="text-white/70 transition hover:text-white" href="/privacy">
            Privacy
          </Link>
          <Link className="text-white/70 transition hover:text-white" href="/terms">
            Terms
          </Link>
          <Link className="text-white/70 transition hover:text-white" href="/delete-account">
            Delete Account
          </Link>
        </section>
      </div>
    </PublicShell>
  );
}
