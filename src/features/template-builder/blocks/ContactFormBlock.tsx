import type { BlockComponentProps } from "@/features/template-builder/types";

export default function ContactFormBlock({ block }: BlockComponentProps) {
  return (
    <form className="space-y-3" aria-label={block.name}>
      <input
        disabled
        placeholder="Name"
        className="h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm"
      />
      <input
        disabled
        placeholder="Email"
        className="h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm"
      />
      <textarea
        disabled
        placeholder="Message"
        className="min-h-24 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
      />
      <button
        type="button"
        disabled
        className="inline-flex h-10 items-center rounded-md bg-slate-950 px-4 text-sm font-medium text-white disabled:opacity-70"
      >
        Send message
      </button>
    </form>
  );
}
