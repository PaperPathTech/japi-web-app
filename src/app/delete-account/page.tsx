import Link from "next/link";
import PublicShell from "@/components/public/PublicShell";

const SUPPORT_EMAIL = "support@paperpath.ca";

export default function DeleteAccountPage() {
  return (
    <PublicShell
      title="Delete Account"
      subtitle="Account deletion requests are handled securely by our support team."
      supportEmail={SUPPORT_EMAIL}
    >
      <div className="space-y-8 text-sm text-white/70">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            Request account deletion
          </h2>
          <p>
            To request deletion, email us from the address associated with your
            Japi account. This is the official account deletion request path.
          </p>
          <p>
            Contact{" "}
            <a className="text-white underline" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>{" "}
            and include your account email so we can verify your request.
          </p>
          <p className="text-xs text-white/50">
            Typical processing window: 3–7 business days after verification.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            What deletion means
          </h2>
          <p>
            Deletion removes your account profile and associated personal data
            from active systems. Some information may be retained where required
            for legal, security, or fraud-prevention purposes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Need help?</h2>
          <p>
            For additional assistance or questions, visit{" "}
            <Link className="text-white underline" href="/support">
              /support
            </Link>{" "}
            or review our{" "}
            <Link className="text-white underline" href="/privacy">
              /privacy
            </Link>{" "}
            policy.
          </p>
        </section>
      </div>
    </PublicShell>
  );
}
