import PublicFooter from "./PublicFooter";

type PublicShellProps = {
  title: string;
  subtitle?: string;
  supportEmail: string;
  children: React.ReactNode;
};

export default function PublicShell({
  title,
  subtitle,
  supportEmail,
  children,
}: PublicShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06070b] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.22),rgba(6,7,11,0)_60%)] blur-3xl" />
        <div className="absolute top-36 right-[-180px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.22),rgba(6,7,11,0)_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col px-6 pb-20 pt-12 sm:px-10">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">
            Japi
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
          {subtitle ? (
            <p className="max-w-2xl text-sm text-white/60">{subtitle}</p>
          ) : null}
        </header>

        <section className="mt-10 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
          {children}
        </section>

        <PublicFooter supportEmail={supportEmail} />
      </div>
    </main>
  );
}
