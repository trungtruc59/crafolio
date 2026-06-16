import { getAdminLocale, getAdminMessages } from "@/i18n/admin";

export default async function AdminDashboardPage() {
  const locale = await getAdminLocale();
  const messages = await getAdminMessages(locale);
  const statCards = [
    { label: messages.dashboard.stats.totalUsers, value: "0" },
    { label: messages.dashboard.stats.publishedPortfolios, value: "0" },
    { label: messages.dashboard.stats.templates, value: "0" },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
          {messages.dashboard.eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">
          {messages.dashboard.title}
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {statCards.map((card) => (
          <section
            key={card.label}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">
              {card.value}
            </p>
          </section>
        ))}
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-950">
          {messages.dashboard.workspace.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {messages.dashboard.workspace.description}
        </p>
      </section>
    </div>
  );
}
