"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await supabaseBrowserClient.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.replace("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(248,250,252,0.9),rgba(241,245,249,1)_45%,rgba(226,232,240,1))] px-6 py-16 text-slate-900 dark:bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.9),rgba(9,14,28,1)_45%,rgba(6,10,20,1))] dark:text-slate-100">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.45)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
          Japi Admin
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Authorized admins only. Use your corporate credentials.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Email
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-300 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-100"
              required
            />
          </label>

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Password
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-300 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-100"
              required
            />
          </label>

          {error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
