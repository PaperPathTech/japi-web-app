import Link from "next/link";
import PublicShell from "@/components/public/PublicShell";

const SUPPORT_EMAIL = "support@paperpath.ca";
const LAST_UPDATED = "March 12, 2026";

export default function PrivacyPage() {
  return (
    <PublicShell
      title="Privacy Policy"
      subtitle="This policy explains how Japi collects, uses, and protects your information."
      supportEmail={SUPPORT_EMAIL}
    >
      <div className="space-y-8 text-sm text-white/70">
        <p className="text-xs uppercase tracking-[0.25em] text-white/50">
          Last updated: {LAST_UPDATED}
        </p>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Introduction</h2>
          <p>
            Japi is a mobile experience that connects clients with vendors in a
            polished, joyful way. This Privacy Policy describes the information
            we collect, how we use it, and the choices you have.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            Information We Collect
          </h2>
          <p>
            We collect information you provide directly, such as your name,
            email, phone number, and account preferences. If you are a vendor,
            we may also collect profile details, pricing, and service
            information you choose to share.
          </p>
          <p>
            We may collect basic device and usage information when you use Japi,
            such as app interactions, device identifiers, and diagnostic data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            How We Use Information
          </h2>
          <p>
            We use information to provide and improve Japi, facilitate
            connections between clients and vendors, personalize your
            experience, and maintain safety and integrity.
          </p>
          <p>
            We may use information to communicate with you about your account,
            updates, or support requests.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            Account Information
          </h2>
          <p>
            You can review and update your account information within the app.
            If you need assistance, contact support for help with updates or
            access.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Communications</h2>
          <p>
            We may send you service-related messages, such as confirmations,
            updates, and security notices. You can opt out of non-essential
            communications where applicable.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            Analytics and Diagnostics
          </h2>
          <p>
            We may use analytics and diagnostic tools to understand app
            performance, troubleshoot issues, and improve the experience. These
            tools may collect aggregated or de-identified usage data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Data Retention</h2>
          <p>
            We retain information only as long as necessary to provide the
            service, comply with legal obligations, resolve disputes, and
            enforce our agreements. Retention periods may vary by data type.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Your Choices</h2>
          <p>
            You may access, update, or request deletion of your account
            information. Certain data may be retained for legal or operational
            reasons.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Account Deletion</h2>
          <p>
            To delete your account, visit{" "}
            <Link className="text-white underline" href="/delete-account">
              /delete-account
            </Link>{" "}
            or email support. We will verify your request and confirm once
            deletion is complete.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            Children’s Privacy
          </h2>
          <p>
            Japi is not intended for children under the age of 13, and we do
            not knowingly collect personal information from children. If you
            believe a child has provided information, contact us so we can
            delete it.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we
            will update the “Last updated” date above.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Contact</h2>
          <p>
            If you have privacy-related questions or requests, contact us at{" "}
            <a className="text-white underline" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
          <p>
            Support is available for account access, updates, and data requests.
          </p>
        </section>
      </div>
    </PublicShell>
  );
}
