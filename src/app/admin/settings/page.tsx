import {
  Globe2,
  HardDriveUpload,
  LockKeyhole,
  Mail,
  Save,
  Search,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { getAdminLocale, getAdminMessages } from "@/i18n/admin";
import { getAdminSettings } from "@/lib/settings/admin-settings";

const inputClass =
  "mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10";
const textareaClass =
  "mt-2 min-h-28 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10";

type SettingField = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
  autoComplete?: string;
  as?: "input" | "textarea" | "select";
  options?: {
    label: string;
    value: string;
  }[];
};

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    saved?: string;
    error?: string;
  }>;
}) {
  const locale = await getAdminLocale();
  const messages = await getAdminMessages(locale);
  const settings = await getAdminSettings();
  const status = await searchParams;

  const emailFields: SettingField[] = [
    {
      name: "mailFromName",
      label: messages.settings.email.form.fromName.label,
      placeholder: messages.settings.email.form.fromName.placeholder,
      defaultValue: settings.mail.fromName,
    },
    {
      name: "mailFromAddress",
      label: messages.settings.email.form.fromAddress.label,
      placeholder: messages.settings.email.form.fromAddress.placeholder,
      type: "email",
      autoComplete: "email",
      defaultValue: settings.mail.fromAddress,
    },
    {
      name: "smtpServer",
      label: messages.settings.email.form.smtpServer.label,
      placeholder: messages.settings.email.form.smtpServer.placeholder,
      autoComplete: "url",
      defaultValue: settings.mail.smtpServer,
    },
    {
      name: "smtpPort",
      label: messages.settings.email.form.smtpPort.label,
      placeholder: messages.settings.email.form.smtpPort.placeholder,
      type: "number",
      defaultValue: String(settings.mail.smtpPort),
    },
    {
      name: "smtpEncryption",
      label: messages.settings.email.form.smtpEncryption.label,
      as: "select",
      options: [
        {
          label: messages.settings.email.form.smtpEncryption.options[0],
          value: "tls",
        },
        {
          label: messages.settings.email.form.smtpEncryption.options[1],
          value: "ssl",
        },
        {
          label: messages.settings.email.form.smtpEncryption.options[2],
          value: "none",
        },
      ],
      defaultValue: settings.mail.smtpEncryption,
    },
    {
      name: "smtpUsername",
      label: messages.settings.email.form.smtpUsername.label,
      placeholder: messages.settings.email.form.smtpUsername.placeholder,
      autoComplete: "username",
      defaultValue: settings.mail.smtpUsername,
    },
    {
      name: "smtpPassword",
      label: messages.settings.email.form.smtpPassword.label,
      placeholder: messages.settings.email.form.smtpPassword.placeholder,
      type: "password",
      autoComplete: "new-password",
      defaultValue: settings.mail.smtpPassword,
    },
    {
      name: "testEmail",
      label: messages.settings.email.form.testEmail.label,
      placeholder: messages.settings.email.form.testEmail.placeholder,
      type: "email",
      autoComplete: "email",
      defaultValue: settings.mail.testEmail,
    },
  ];

  const systemFields: SettingField[] = [
    {
      name: "siteName",
      label: messages.settings.system.form.siteName.label,
      placeholder: messages.settings.system.form.siteName.placeholder,
      defaultValue: settings.system.siteName,
    },
    {
      name: "siteUrl",
      label: messages.settings.system.form.siteUrl.label,
      placeholder: messages.settings.system.form.siteUrl.placeholder,
      type: "url",
      defaultValue: settings.system.siteUrl,
      autoComplete: "url",
    },
    {
      name: "adminEmail",
      label: messages.settings.system.form.adminEmail.label,
      placeholder: messages.settings.system.form.adminEmail.placeholder,
      type: "email",
      autoComplete: "email",
      defaultValue: settings.system.adminEmail,
    },
    {
      name: "language",
      label: messages.settings.system.form.language.label,
      as: "select",
      options: [
        {
          label: messages.settings.system.form.language.options[0],
          value: "vi",
        },
        {
          label: messages.settings.system.form.language.options[1],
          value: "en",
        },
      ],
      defaultValue: settings.system.language,
    },
    {
      name: "timezone",
      label: messages.settings.system.form.timezone.label,
      as: "select",
      options: messages.settings.system.form.timezone.options.map((option) => ({
        label: option,
        value: option,
      })),
      defaultValue: settings.system.timezone,
    },
    {
      name: "uploadLimit",
      label: messages.settings.system.form.uploadLimit.label,
      placeholder: messages.settings.system.form.uploadLimit.placeholder,
      type: "number",
      defaultValue: String(settings.system.uploadLimit),
    },
    {
      name: "sessionTimeout",
      label: messages.settings.system.form.sessionTimeout.label,
      placeholder: messages.settings.system.form.sessionTimeout.placeholder,
      type: "number",
      defaultValue: String(settings.system.sessionTimeout),
    },
  ];

  const seoFields: SettingField[] = [
    {
      name: "seoTitle",
      label: messages.settings.seo.form.metaTitle.label,
      placeholder: messages.settings.seo.form.metaTitle.placeholder,
      defaultValue: settings.seo.title,
    },
    {
      name: "seoKeywords",
      label: messages.settings.seo.form.keywords.label,
      placeholder: messages.settings.seo.form.keywords.placeholder,
      defaultValue: settings.seo.keywords,
    },
    {
      name: "seoCanonicalUrl",
      label: messages.settings.seo.form.canonicalUrl.label,
      placeholder: messages.settings.seo.form.canonicalUrl.placeholder,
      type: "url",
      autoComplete: "url",
      defaultValue: settings.seo.canonicalUrl,
    },
    {
      name: "seoOgImage",
      label: messages.settings.seo.form.ogImage.label,
      placeholder: messages.settings.seo.form.ogImage.placeholder,
      type: "url",
      autoComplete: "url",
      defaultValue: settings.seo.ogImage,
    },
    {
      name: "seoDescription",
      label: messages.settings.seo.form.metaDescription.label,
      placeholder: messages.settings.seo.form.metaDescription.placeholder,
      as: "textarea",
      defaultValue: settings.seo.description,
    },
  ];

  const systemToggles = [
    {
      name: "allowRegistration",
      label: messages.settings.system.toggles.allowRegistration.label,
      description: messages.settings.system.toggles.allowRegistration.description,
      defaultChecked: settings.system.allowRegistration,
    },
    {
      name: "maintenanceMode",
      label: messages.settings.system.toggles.maintenanceMode.label,
      description: messages.settings.system.toggles.maintenanceMode.description,
      defaultChecked: settings.system.maintenanceMode,
    },
  ];

  const seoToggles = [
    {
      name: "seoIndexing",
      label: messages.settings.seo.toggles.indexing.label,
      description: messages.settings.seo.toggles.indexing.description,
      defaultChecked: settings.seo.indexing,
    },
    {
      name: "seoOpenGraph",
      label: messages.settings.seo.toggles.openGraph.label,
      description: messages.settings.seo.toggles.openGraph.description,
      defaultChecked: settings.seo.openGraph,
    },
    {
      name: "seoTwitterCard",
      label: messages.settings.seo.toggles.twitterCard.label,
      description: messages.settings.seo.toggles.twitterCard.description,
      defaultChecked: settings.seo.twitterCard,
    },
    {
      name: "seoSitemap",
      label: messages.settings.seo.toggles.sitemap.label,
      description: messages.settings.seo.toggles.sitemap.description,
      defaultChecked: settings.seo.sitemap,
    },
    {
      name: "seoJsonLd",
      label: messages.settings.seo.toggles.jsonLd.label,
      description: messages.settings.seo.toggles.jsonLd.description,
      defaultChecked: settings.seo.jsonLd,
    },
  ];

  return (
    <form
      method="POST"
      action="/api/settings"
      className="mx-auto max-w-6xl space-y-6"
    >
      <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
            {messages.settings.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950">
            {messages.settings.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {messages.settings.description}
          </p>
          {status?.saved ? (
            <p className="mt-3 text-sm font-medium text-emerald-700">
              {messages.settings.feedback.saved}
            </p>
          ) : null}
          {status?.error ? (
            <p className="mt-3 text-sm font-medium text-red-600">
              {messages.settings.feedback.error}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-cyan-700"
        >
          <Save className="h-4 w-4" />
          {messages.settings.actions.saveAll}
        </button>
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <SectionHeader
          icon={Mail}
          title={messages.settings.email.title}
          description={messages.settings.email.description}
        />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {emailFields.map((field) => (
            <SettingControl key={field.name} field={field} />
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <SectionHeader
          icon={Settings}
          title={messages.settings.system.title}
          description={messages.settings.system.description}
        />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {systemFields.map((field) => (
            <SettingControl key={field.name} field={field} />
          ))}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {systemToggles.map((toggle) => (
            <SettingToggle key={toggle.name} {...toggle} />
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <SectionHeader
          icon={Search}
          title={messages.settings.seo.title}
          description={messages.settings.seo.description}
        />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {seoFields.map((field) => (
            <SettingControl key={field.name} field={field} />
          ))}
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {seoToggles.map((toggle) => (
            <SettingToggle key={toggle.name} {...toggle} />
          ))}
        </div>
      </section>
    </form>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Mail;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-cyan-50 text-cyan-700">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-slate-950">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function SettingControl({ field }: { field: SettingField }) {
  return (
    <label
      className={
        field.as === "textarea" ? "block md:col-span-2" : "block"
      }
    >
      <span className="text-sm font-medium text-slate-700">{field.label}</span>
      {field.as === "textarea" ? (
        <textarea
          name={field.name}
          placeholder={field.placeholder}
          defaultValue={field.defaultValue}
          className={textareaClass}
        />
      ) : field.as === "select" ? (
        <select
          name={field.name}
          defaultValue={field.defaultValue}
          className={inputClass}
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={field.name}
          type={field.type ?? "text"}
          placeholder={field.placeholder}
          defaultValue={field.defaultValue}
          autoComplete={field.autoComplete}
          className={inputClass}
        />
      )}
    </label>
  );
}

function SettingToggle({
  name,
  label,
  description,
  defaultChecked,
}: {
  name: string;
  label: string;
  description: string;
  defaultChecked?: boolean;
}) {
  const Icon = name.includes("seo")
    ? Globe2
    : name.includes("maintenance")
      ? LockKeyhole
      : name.includes("upload")
        ? HardDriveUpload
        : ShieldCheck;

  return (
    <label className="flex min-h-24 items-start justify-between gap-4 rounded-md border border-slate-200 px-3 py-3 transition hover:border-slate-300 hover:bg-slate-50">
      <span className="flex min-w-0 gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600">
          <Icon className="h-4 w-4" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium text-slate-800">
            {label}
          </span>
          <span className="mt-1 block text-sm leading-5 text-slate-500">
            {description}
          </span>
        </span>
      </span>
      <input
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 accent-slate-950"
      />
    </label>
  );
}
