import Link from "next/link";
import PublicShell from "@/components/public/PublicShell";

const SUPPORT_EMAIL = "support@paperpath.ca";
const LAST_UPDATED = "March 12, 2026";

export default function TermsPage() {
  return (
    <PublicShell
      title="Terms of Use"
      subtitle="Clear expectations for using Japi as a client or vendor."
      supportEmail={SUPPORT_EMAIL}
    >
      <div className="space-y-8 text-sm text-white/70">
        <p className="text-xs uppercase tracking-[0.25em] text-white/50">
          Last updated: {LAST_UPDATED}
        </p>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            Acceptance of Terms
          </h2>
          <p>
            By accessing or using Japi, you agree to these Terms of Use. If you
            do not agree, do not use the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            Eligibility and Accounts
          </h2>
          <p>
            You must be able to form a binding agreement in your jurisdiction to
            use Japi. You are responsible for maintaining the accuracy of your
            account information and the security of your credentials.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            User Responsibilities
          </h2>
          <p>
            You agree to use Japi in a respectful, lawful manner and provide
            accurate information. You are responsible for your activity on the
            platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Platform Role</h2>
          <p>
            Japi facilitates connections between clients and vendors. We do not
            guarantee outcomes or the performance of any vendor or client.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            Vendor and Client Interactions
          </h2>
          <p>
            Vendors are responsible for their availability, pricing, and
            services. Clients are responsible for timely communication and
            payments. Disputes should be resolved directly between users.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            Content and Conduct
          </h2>
          <p>
            You may not post unlawful, harmful, or misleading content. We may
            remove content that violates these Terms or applicable laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Termination</h2>
          <p>
            We may suspend or terminate access if these Terms are violated or if
            required by law. You may stop using Japi at any time.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Disclaimers</h2>
          <p>
            Japi is provided “as is” and “as available.” We make no warranties
            about uninterrupted access or error-free performance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by law, Japi is not liable for
            indirect, incidental, or consequential damages arising from your use
            of the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            Changes to Terms
          </h2>
          <p>
            We may update these Terms from time to time. The “Last updated” date
            will reflect the latest changes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Contact</h2>
          <p>
            Questions about these Terms can be sent to{" "}
            <a className="text-white underline" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
          <p>
            For privacy-related topics, review{" "}
            <Link className="text-white underline" href="/privacy">
              /privacy
            </Link>{" "}
            or contact support at{" "}
            <Link className="text-white underline" href="/support">
              /support
            </Link>
            .
          </p>
        </section>
      </div>
    </PublicShell>
  );
}
