"use client";

import { useState } from "react";
import AdminHeader from "@/components/layouts/AdminHeader";
import AdminMain from "@/components/layouts/AdminMain";
import AdminSidebar from "@/components/layouts/AdminSidebar";

type AdminLayoutProps = {
  children: React.ReactNode;
  brand: string;
  title: string;
  viewSiteLabel: string;
  displayName: string;
  email?: string | null;
};

export default function AdminLayout({
  children,
  brand,
  title,
  viewSiteLabel,
  displayName,
  email,
}: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <section className="min-h-screen bg-neutral-50 text-slate-950">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-[288px_minmax(0,1fr)]">
        <AdminSidebar
          brand={brand}
          title={title}
          viewSiteLabel={viewSiteLabel}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="min-w-0">
          <AdminHeader
            displayName={displayName}
            email={email}
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen((value) => !value)}
          />
          <AdminMain>{children}</AdminMain>
        </div>
      </div>
    </section>
  );
}
