type PublicFooterProps = {
  supportEmail: string;
};

export default function PublicFooter({ supportEmail }: PublicFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-white/10 pt-8 text-sm text-white/60">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">
            Japi
          </p>
          <p className="mt-2 text-sm">
            Japi — a polished way to connect clients and vendors.
          </p>
          <p className="mt-2 text-xs text-white/40">© {year} Japi</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.3em]">
          <a href="/privacy" className="transition hover:text-white">
            Privacy
          </a>
          <a href="/terms" className="transition hover:text-white">
            Terms
          </a>
          <a href="/support" className="transition hover:text-white">
            Support
          </a>
          <a href="/delete-account" className="transition hover:text-white">
            Delete Account
          </a>
          <a
            href={`mailto:${supportEmail}`}
            className="transition hover:text-white"
          >
            Contact
          </a>
          <a href="/login" className="text-white/40 transition hover:text-white">
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
