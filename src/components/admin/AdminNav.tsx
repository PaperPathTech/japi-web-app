"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems } from "./nav-items";

type AdminNavProps = {
  variant?: "sidebar" | "top";
};

export default function AdminNav({ variant = "sidebar" }: AdminNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={
        variant === "top"
          ? "flex flex-wrap items-center gap-2"
          : "flex flex-col gap-2"
      }
      aria-label="Admin navigation"
    >
      {adminNavItems.map((item) => {
        const isRoot = item.href === "/";
        const isActive = isRoot
          ? pathname === "/"
          : pathname.startsWith(item.href);
        const baseClasses =
          "flex items-center justify-between rounded-xl border border-transparent px-4 py-3 text-sm font-medium transition";
        const activeClasses =
          "bg-slate-900 text-white shadow-[0_10px_30px_-20px_rgba(15,23,42,0.6)] dark:bg-slate-100 dark:text-slate-900 dark:shadow-[0_10px_30px_-20px_rgba(15,23,42,0.8)]";
        const inactiveClasses =
          "text-slate-600 hover:border-slate-200 hover:bg-white dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900/60";
        const className = `${baseClasses} ${
          isActive ? activeClasses : inactiveClasses
        }`;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={className}
            aria-current={isActive ? "page" : undefined}
          >
            <span>{item.label}</span>
            <span
              className={
                variant === "sidebar"
                  ? "text-xs text-slate-400"
                  : "hidden"
              }
            >
              {isActive ? "Active" : "Open"}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
