export default function AdminTemplatesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
          Admin
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">
          Templates
        </h2>
      </div>

      <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-950">
          Template management
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Manage portfolio templates from this admin area.
        </p>
      </section>
    </div>
  );
}
