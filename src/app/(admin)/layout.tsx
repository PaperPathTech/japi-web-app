import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/auth/admin";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  await requireAdmin();
  return <AdminShell>{children}</AdminShell>;
}
