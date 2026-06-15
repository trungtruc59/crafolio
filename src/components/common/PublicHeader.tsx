"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import { UserRound, Settings, LogOut  } from 'lucide-react';

const navItems = [
  { label: "Home", href: "/" },
  { label: "Templates", href: "/templates" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();
  const userMenuRef = useRef<HTMLDetailsElement>(null);
  const [userMenuPathname, setUserMenuPathname] = useState<string | null>(null);
  const isUserMenuOpen = userMenuPathname === pathname;
  const { data: session } = useSession();
  const displayName =
    session?.user?.name || session?.user?.email || "Dashboard";
  const isLoggedIn = Boolean(session?.user);
  const userInitial = displayName.charAt(0).toUpperCase();

  function isActiveNavItem(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  useEffect(() => {
    if (!isUserMenuOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target;

      if (target instanceof Node && userMenuRef.current?.contains(target)) {
        return;
      }

      setUserMenuPathname(null);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setUserMenuPathname(null);
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
  }, [isUserMenuOpen]);

  return (
    <header className="sticky top-0 z-50 ">
      <Container>
        <div className="flex h-13 mt-1 mb-1 items-center justify-between bg-slate-100/60 backdrop-blur px-3 py-2 rounded-2xl shadow-md">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-white">
              <Image src="/logo.png"
                alt="Crafolio Logo"
                width={36}
                height={26}>
                
              </Image>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const isActive = isActiveNavItem(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "rounded-md px-3 py-2 text-md font-medium transition hover:bg-blue-400/10 hover:text-blue-600",
                    isActive
                      ? "text-blue-600"
                      : "text-slate-700 hover:text-blue-600",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            
            {isLoggedIn ? (
              <details
                ref={userMenuRef}
                open={isUserMenuOpen}
                onToggle={(event) =>
                  setUserMenuPathname(event.currentTarget.open ? pathname : null)
                }
                className="group relative"
              >
                <summary className="flex cursor-pointer list-none items-center rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate">
                    {userInitial}
                  </span>
                </summary>

                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                  <div className="border-b border-slate-100 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <summary className="flex cursor-pointer list-none items-center rounded-full bg-white text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate">
                          {userInitial}
                        </span>
                      </summary>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {session?.user?.name || "Crafolio user"}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {session?.user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setUserMenuPathname(null)}
                      className="flex px-4 py-2 gap-1 items-center text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                    >
                      <UserRound width={16} height={16} />
                      Thông tin
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setUserMenuPathname(null)}
                      className="flex items-center gap-1 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                    >
                      <Settings width={16} height={16} />
                      Thiết lập
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuPathname(null);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="flex items-center gap-1 cursor-pointer w-full px-4 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut width={16} height={16} />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </details>
            ) : (
              <Link
                href="/login">
                <button
                  type="button"
                  className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 cursor-pointer">
                  Login
                </button>
              </Link>
            )}
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </Container>
    </header>
  );
}
