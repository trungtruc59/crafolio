import Link from "next/link";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { getAdminLocale, getAdminMessages } from "@/i18n/admin";

export default async function AdminNotFound() {
  const locale = await getAdminLocale();
  const messages = await getAdminMessages(locale);

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <section className="w-full max-w-2xl rounded-md border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
          {messages.notFound.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-950">
          {messages.notFound.title}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">
          {messages.notFound.description}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <LayoutDashboard className="h-4 w-4" />
            {messages.notFound.dashboard}
          </Link>
          <Link
            href="/admin/templates"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            {messages.notFound.templates}
          </Link>
        </div>
      </section>
    </div>
  );
}
