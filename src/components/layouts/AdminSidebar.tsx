"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Blocks,
  Box,
  CreditCard,
  LayoutDashboard,
  Layers,
  Palette,
  Settings,
  Users,
  X,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Templates", href: "/admin/templates" },
  { label: "Modules", href: "/admin/modules" },
  { label: "Blocks", href: "/admin/blocks" },
  { label: "Themes", href: "/admin/themes" },
  { label: "Users", href: "/admin/users" },
  { label: "Plans", href: "/admin/plans" },
  { label: "Settings", href: "/admin/settings" },
];

const itemIcons = [
  LayoutDashboard,
  Layers,
  Box,
  Blocks,
  Palette,
  Users,
  CreditCard,
  Settings,
];

type AdminSidebarProps = {
  brand: string;
  title: string;
  viewSiteLabel: string;
  isOpen: boolean;
  onClose: () => void;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/admin/dashboard") {
    return pathname === "/admin" || pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminSidebar({
  title,
  viewSiteLabel,
  isOpen,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        aria-hidden={!isOpen}
        onClick={onClose}
        className={[
          "fixed inset-0 z-40 bg-slate-950/40 transition lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      />

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-800 bg-slate-950 text-white transition-transform lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-16 items-center justify-center border-b border-white/10 px-5">
          <div className="min-w-0 flex items-center gap-2 justify-center">
            <Image src="/logo.png"
                alt="Crafolio Logo"
                width={36}
                height={26}>
            </Image>
            <h1 className="truncate text-2xl font-semibold">{title}</h1>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            title="Close sidebar"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-300 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {menuItems.map((item, index) => {
            const Icon = itemIcons[index];
            const isActive = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "bg-cyan-400 text-slate-950"
                    : "text-slate-300 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <Link
            href="/"
            className="flex items-center justify-center rounded-md border border-white/10 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            {viewSiteLabel}
          </Link>
        </div>
      </aside>
    </>
  );
}
