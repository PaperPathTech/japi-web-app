import { redirect } from "next/navigation";
import LoginForm from "./ui/LoginForm";
import { getAdminSession } from "@/lib/auth/admin";

export default async function LoginPage() {
  const session = await getAdminSession();

  if (session.status === "ok") {
    redirect("/");
  }

  if (session.status === "forbidden") {
    redirect("/access-denied");
  }

  return <LoginForm />;
}
