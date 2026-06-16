"use client";

import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import {
  Bell,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
} from "lucide-react";

type AdminHeaderProps = {
  displayName: string;
  email?: string | null;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export default function AdminHeader({
  displayName,
  email,
  isSidebarOpen,
  onToggleSidebar,
}: AdminHeaderProps) {
  const accountMenuRef = useRef<HTMLDetailsElement>(null);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const userInitial = displayName.charAt(0).toUpperCase();

  useEffect(() => {
    if (!isAccountMenuOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target;

      if (
        target instanceof Node &&
        accountMenuRef.current?.contains(target)
      ) {
        return;
      }

      setIsAccountMenuOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsAccountMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAccountMenuOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-expanded={isSidebarOpen}
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
        >
          <Menu className="h-5 w-5" />
        </button>

        <label className="relative hidden min-w-0 flex-1 md:block">
          <span className="sr-only">Search admin</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search"
            className="h-10 w-full max-w-xl rounded-md border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-100"
          />
        </label>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            aria-label="Notifications"
            title="Notifications"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-cyan-500" />
          </button>

          <button
            type="button"
            onClick={() => setIsDarkMode((value) => !value)}
            aria-pressed={isDarkMode}
            aria-label="Toggle theme"
            title="Toggle theme"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <details
            ref={accountMenuRef}
            open={isAccountMenuOpen}
            onToggle={(event) =>
              setIsAccountMenuOpen(event.currentTarget.open)
            }
            className="relative"
          >
            <summary className="flex cursor-pointer list-none items-center gap-2 bg-white  text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
              <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-950 text-xs font-semibold text-white">
                {userInitial}
              </span>
            </summary>

            <div className="absolute right-0 mt-2 w-72 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg">
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="truncate text-sm font-semibold text-slate-950">
                  {displayName}
                </p>
                {email ? (
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {email}
                  </p>
                ) : null}
              </div>

              <div className="py-2">
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  <Settings className="h-4 w-4" />
                  Account settings
                </button>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
