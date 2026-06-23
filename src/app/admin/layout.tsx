import { redirect } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { auth } from "@/auth";
import AdminLayoutShell from "@/components/common/AdminLayout";
import { getAdminLocale, getAdminMessages } from "@/i18n/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  const locale = await getAdminLocale();
  const messages = await getAdminMessages(locale);
  const displayName =
    session.user.name ||
    session.user.email ||
    messages.layout.fallbackName;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AdminLayoutShell
        brand={messages.layout.brand}
        title={messages.layout.title}
        viewSiteLabel={messages.layout.viewSite}
        navigationLabels={messages.layout.navigation}
        headerLabels={messages.layout.header}
        closeSidebarLabel={messages.layout.sidebar.closeSidebar}
        displayName={displayName}
        email={session.user.email}
      >
        {children}
      </AdminLayoutShell>
    </NextIntlClientProvider>
  );
}
