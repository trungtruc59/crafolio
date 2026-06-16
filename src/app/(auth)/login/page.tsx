import { LoginForm } from "@/components/auth/loginForm";
import { auth } from "@/auth";
import { getRoleRedirectPath } from "@/lib/role-redirect";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect(getRoleRedirectPath(session.user.role));
  }

  return <LoginForm />;
}
