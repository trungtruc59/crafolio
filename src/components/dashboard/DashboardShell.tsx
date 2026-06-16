"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import {
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";


type DashboardUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

const sidebarItems = [
  {
    label: "dashboard.profile",
    href: "/dashboard",
    icon: UserRound,
  },
  {
    label: "dashboard.settings.title",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function DashboardShell({
  user,
  children,
}: {
  user: DashboardUser;
  children: React.ReactNode;
}) {
  const t = useTranslations();
  const pathname = usePathname();
  const displayName = user.name || user.email || "Crafolio user";
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <section className=" min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="space-y-4 sticky top-20 self-start">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-950 text-xl font-semibold text-white">
                {userInitial}
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-xl font-semibold text-slate-950">
                  {displayName}
                </h1>
                <p className="mt-1 truncate text-sm text-slate-500">
                  {user.email || "Chua co email"}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">{t("dashboard.profile")}</span>
                <span className="font-semibold text-emerald-600">5%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div className="h-full w-[5%] rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>

          <nav className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "mt-1 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition first:mt-0",
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" />
                  {t(item.label)}
                </Link>
              );
            })}

           
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="mt-1 flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              {t("common.logout")}
            </button>
          </nav>

          
        </aside>

        <div className="min-w-0 space-y-6">{children}</div>
      </div>
    </section>
  );
}
