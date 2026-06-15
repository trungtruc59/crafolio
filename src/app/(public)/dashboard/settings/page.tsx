import {
  Bell,
  Eye,
  Globe,
  LockKeyhole,
  Palette,
  Save,
} from "lucide-react";
import { useTranslations } from "next-intl";



export default function DashboardSettingsPage() {
  const tglobal = useTranslations();
  const t = useTranslations("dashboard.settings");
  const settingGroups = [
    {
      title: "settingPortfolio",
      description: "descriptionSettingPortfolio",
      icon: Eye,
      controls: [
        t("settingPortfolioOptions.op1"),
        t("settingPortfolioOptions.op2"),
        t("settingPortfolioOptions.op3"),
      ],
    },
    {
      title: "settingSecurity",
      description: "descriptionSettingSecurity",
      icon: LockKeyhole,
      controls: [
        t("settingSecurityOptions.op1"),
        t("settingSecurityOptions.op2"),
      ],
    },
  ];
  return (
    <>
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">
              {t("title")}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              {t("description")}
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-slate-700 px-4 text-sm font-medium text-white transition hover:bg-blue-500"
          >
            <Save className="h-4 w-4" />
            {tglobal("common.button.update")}
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {settingGroups.map((group) => {
          const Icon = group.icon;

          return (
            <section
              key={t(group.title)}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-950">
                    {t(group.title)}
                  </h3>
                  <p className="text-sm leading-6 text-slate-500">
                    {t(group.description)}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {group.controls.map((control, index) => (
                  <label
                    key={control}
                    className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-3"
                  >
                    <span className="text-sm font-medium text-slate-700">
                      {control}
                    </span>
                    <input
                      type="checkbox"
                      defaultChecked={index === 0}
                      className="h-4 w-4 rounded border-slate-300 accent-slate-950"
                    />
                  </label>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Palette className="h-4 w-4 text-slate-400" />
              Giao dien
            </span>
            <select className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10">
              <option>System</option>
              <option>Light</option>
              <option>Dark</option>
            </select>
          </label>

          <label className="block">
            <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Globe className="h-4 w-4 text-slate-400" />
              Ngon ngu
            </span>
            <select className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10">
              <option>Vietnamese</option>
              <option>English</option>
            </select>
          </label>

          <label className="block">
            <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Bell className="h-4 w-4 text-slate-400" />
              Tan suat thong bao
            </span>
            <select className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10">
              <option>Hang tuan</option>
              <option>Hang ngay</option>
              <option>Tat thong bao</option>
            </select>
          </label>
        </div>
      </section>
    </>
  );
}
