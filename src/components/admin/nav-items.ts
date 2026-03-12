export type AdminNavItem = {
  label: string;
  href: string;
};

export const adminNavItems: AdminNavItem[] = [
  { label: "Dashboard", href: "/" },
  { label: "Vendors", href: "/vendors" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];
