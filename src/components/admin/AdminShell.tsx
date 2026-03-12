import { Manrope, Newsreader } from "next/font/google";
import { redirect } from "next/navigation";
import AdminNav from "./AdminNav";
import ThemeToggle from "./ThemeToggle";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader" });

type AdminShellProps = {
  children: React.ReactNode;
};

async function logoutAction() {
  "use server";
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export default function AdminShell({ children }: AdminShellProps) {
  return (
    <div
      className={`${manrope.variable} ${newsreader.variable} min-h-screen bg-[radial-gradient(circle_at_top,rgba(248,250,252,0.9),rgba(241,245,249,1)_40%,rgba(226,232,240,1))] text-slate-900 dark:bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.9),rgba(9,14,28,1)_45%,rgba(6,10,20,1))] dark:text-slate-100`}
    >
      <div className="lg:flex">
        <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:gap-8 lg:border-r lg:border-slate-200/80 lg:bg-white/70 lg:px-6 lg:py-10 lg:backdrop-blur dark:lg:border-slate-800/80 dark:lg:bg-slate-950/70">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Japi Admin
            </p>
            <h2
              className={`${newsreader.className} mt-4 text-2xl font-semibold text-slate-900 dark:text-white`}
            >
              Moderation Console
            </h2>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Internal moderation and vendor operations
            </p>
          </div>
          <AdminNav />
          <div className="mt-auto rounded-2xl border border-slate-200 bg-white px-4 py-4 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
            Next audit window begins in 3 hours. Compliance queue at 92%.
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
                  Japi Admin
                </p>
                <h1
                  className={`${newsreader.className} mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl dark:text-white`}
                >
                  Internal moderation and vendor operations
                </h1>
              </div>
              <div className="hidden items-center gap-3 sm:flex">
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Moderation status: live
                </div>
                <ThemeToggle />
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-white"
                  >
                    Log out
                  </button>
                </form>
              </div>
            </div>
            <div className="border-t border-slate-200/60 px-6 py-3 sm:px-10 lg:hidden dark:border-slate-800/60">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <AdminNav variant="top" />
                <div className="flex">
                  <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <form action={logoutAction}>
                      <button
                        type="submit"
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-white"
                      >
                        Log out
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:px-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
