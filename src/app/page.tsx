import Image from "next/image";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import AdminDashboard from "@/components/admin/AdminDashboard";
import PublicFooter from "@/components/public/PublicFooter";
import { getAdminSession } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

const APP_STORE_URL = "";
const SUPPORT_EMAIL = "support@paperpath.ca";

export default async function HomePage() {
  const session = await getAdminSession();

  if (session.status === "ok") {
    return (
      <AdminShell>
        <AdminDashboard />
      </AdminShell>
    );
  }

  const primaryCta = APP_STORE_URL.trim()
    ? { label: "Download on the App Store", href: APP_STORE_URL.trim() }
    : { label: "Join the waitlist", href: "#waitlist" };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06070b] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.28),rgba(6,7,11,0)_60%)] blur-3xl" />
        <div className="absolute top-32 right-[-180px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.26),rgba(6,7,11,0)_60%)] blur-3xl" />
        <div className="absolute bottom-0 left-[-160px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.2),rgba(6,7,11,0)_65%)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col px-6 pb-24 pt-10 sm:px-10">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <a href="/" className="flex items-center transition hover:opacity-90">
            <Image
              src="/japi-logo.png"
              alt="Japi"
              width={140}
              height={48}
              priority
              className="h-auto w-[120px] sm:w-[140px]"
            />
          </a>

          <nav className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/70">
            <a href="/support" className="transition hover:text-white">
              Support
            </a>
            <a href="/privacy" className="transition hover:text-white">
              Privacy
            </a>
            <a href="/terms" className="transition hover:text-white">
              Terms
            </a>
          </nav>
        </header>

        <section id="top" className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
              Toronto vendor catalog
            </span>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              A more beautiful way to discover vendors in Toronto.
            </h1>
            <p className="max-w-xl text-base text-white/70 sm:text-lg">
              Browse snacks, sweets, decoration, cakes, face painting, and more
              — with pricing guidance, service details, and direct vendor links
              in one polished place.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={primaryCta.href}
                className="rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-900 shadow-[0_20px_60px_-30px_rgba(236,72,153,0.7)] transition hover:-translate-y-0.5"
              >
                {primaryCta.label}
              </a>
              <a
                href="#features"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 transition hover:border-white/30 hover:text-white"
              >
                Explore features
              </a>
            </div>
            {!APP_STORE_URL.trim() ? (
              <p className="text-xs text-white/50">
                App Store launch coming soon. Be first to try Japi.
              </p>
            ) : null}
          </div>

          <div className="relative">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-3xl bg-gradient-to-br from-pink-400/40 to-cyan-300/40 blur-2xl" />
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/60">
                <span>Japi preview</span>
                <span>iOS</span>
              </div>
              <div className="mt-6 rounded-[28px] border border-white/10 bg-gradient-to-br from-white/5 via-white/10 to-white/5 p-6">
                <div className="space-y-4">
                  <div className="h-4 w-24 rounded-full bg-white/20" />
                  <div className="h-8 w-48 rounded-xl bg-gradient-to-r from-pink-400/60 via-fuchsia-400/60 to-cyan-300/60" />
                  <div className="grid gap-3">
                    {[
                      "Curated Toronto vendors",
                      "Pricing guidance",
                      "Direct contact links",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70"
                      >
                        <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-pink-400 to-cyan-300" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60">
                A premium catalog for parties, birthdays, and celebrations.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Discover beautifully",
              copy: "Explore a refined directory of Toronto event vendors.",
            },
            {
              title: "Pricing at a glance",
              copy: "See helpful pricing guidance and package ranges.",
            },
            {
              title: "Direct vendor details",
              copy: "Quick links to Instagram, websites, and contact info.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm text-white/60">{item.copy}</p>
            </div>
          ))}
        </section>

        <section id="features" className="mt-24 space-y-10">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Features
            </p>
            <h2 className="text-3xl font-semibold">
              A premium catalog without the noise.
            </h2>
            <p className="max-w-2xl text-sm text-white/60">
              Browse with confidence and reach vendors directly.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Services and packages",
                copy: "Understand what is included before you reach out.",
              },
              {
                title: "Pricing guidance",
                copy: "Get a clear sense of estimated cost and ranges.",
              },
              {
                title: "Direct vendor details",
                copy: "View Instagram, websites, and contact information.",
              },
              {
                title: "Safer booking reminders",
                copy: "Review vendor details carefully before booking.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-2xl bg-gradient-to-br from-pink-400/70 via-fuchsia-400/70 to-cyan-300/70 shadow-[0_0_30px_rgba(59,130,246,0.25)]" />
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </div>
                <p className="mt-4 text-sm text-white/60">{feature.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="waitlist"
          className="mt-24 rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur"
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                Coming soon
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                Be first to try Japi.
              </h2>
              <p className="mt-2 text-sm text-white/60">
                Early access invites are limited. Join the waitlist for the iOS
                launch.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={primaryCta.href}
                className="rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-900 shadow-[0_20px_60px_-30px_rgba(59,130,246,0.55)] transition hover:-translate-y-0.5"
              >
                {primaryCta.label}
              </a>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 transition hover:border-white/30 hover:text-white"
              >
                Contact us
              </a>
            </div>
          </div>
        </section>

        <section id="support" className="mt-24 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold">Support</h3>
            <p className="mt-3 text-sm text-white/60">
              Need help or have questions? We are here to help you explore and
              connect with vendors confidently.
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="mt-4 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Email support
            </a>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold">Important</h3>
            <p className="mt-3 text-sm text-white/60">
              Japi is a vendor catalog. Vendors provide their own services and
              pricing, so review details carefully before booking.
            </p>
            <a
              href="#delete-account"
              className="mt-4 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Delete account
            </a>
          </div>
        </section>

        <section id="privacy" className="mt-20 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold">Privacy</h3>
            <p className="mt-3 text-sm text-white/60">
              We treat your information with care and keep your data protected
              throughout your browsing experience.
            </p>
          </div>
          <div
            id="terms"
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <h3 className="text-lg font-semibold">Terms</h3>
            <p className="mt-3 text-sm text-white/60">
              Transparent expectations for clients and vendors, written in
              clear, friendly language.
            </p>
          </div>
        </section>

        <section id="delete-account" className="mt-20">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold">Delete account</h3>
            <p className="mt-3 text-sm text-white/60">
              Email us from your Japi account address and we will confirm and
              process deletion promptly.
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="mt-4 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Request deletion
            </a>
          </div>
        </section>

        <PublicFooter supportEmail={SUPPORT_EMAIL} />
      </div>

      <div className="sr-only">
        <Link href="/login">Admin login</Link>
      </div>
    </main>
  );
}