import DashboardShell from "@/components/dashboard/DashboardShell";
import { getCurrentSession } from "@/lib/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();

  return (
    <DashboardShell user={session?.user ?? {}}>
      {children}
    </DashboardShell>
  );
}
