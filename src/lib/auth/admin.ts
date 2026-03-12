import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type AdminAccessResult = {
  email: string;
  id: string;
};

type AdminSessionResult =
  | { status: "unauthenticated" }
  | { status: "forbidden"; email: string }
  | { status: "ok"; email: string; id: string };

type AdminAllowlistMeta = {
  hasAdminAllowlist: boolean;
  allowlistCount: number;
};

const FALLBACK_ALLOWLIST = ["admin@paperpath.ca"];

function normalizeAllowlistEntries(raw: string): string[] {
  return raw
    .split(/[\s,;]+/)
    .map((entry) => entry.trim().toLowerCase())
    .filter((entry) => Boolean(entry) && entry.includes("@"));
}

function getAdminAllowlist() {
  const envEmails = normalizeAllowlistEntries(
    process.env.ADMIN_ALLOWLIST ?? ""
  );

  return Array.from(new Set([...envEmails, ...FALLBACK_ALLOWLIST]));
}

export function getAdminAllowlistMeta(): AdminAllowlistMeta {
  const envEmails = normalizeAllowlistEntries(
    process.env.ADMIN_ALLOWLIST ?? ""
  );

  return {
    hasAdminAllowlist: envEmails.length > 0,
    allowlistCount: envEmails.length,
  };
}

export function isEmailAllowlisted(email: string): boolean {
  if (!email) return false;
  const allowlist = getAdminAllowlist();
  return allowlist.includes(email.trim().toLowerCase());
}

export async function requireAdmin(): Promise<AdminAccessResult> {
  const result = await getAdminSession();

  if (result.status === "unauthenticated") {
    redirect("/login");
  }

  if (result.status === "forbidden") {
    redirect("/access-denied");
  }

  return { email: result.email, id: result.id };
}

export async function getAdminSession(): Promise<AdminSessionResult> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return { status: "unauthenticated" };
  }

  if (!user || !user.email) {
    return { status: "unauthenticated" };
  }

  const allowlist = getAdminAllowlist();
  const email = user.email.trim().toLowerCase();

  if (!allowlist.includes(email)) {
    return { status: "forbidden", email };
  }

  return { status: "ok", email, id: user.id };
}
