type EmptyBuilderStateProps = {
  title?: string;
  message?: string;
};

export default function EmptyBuilderState({
  title = "Nothing to show",
  message = "Builder data is not available yet.",
}: EmptyBuilderStateProps) {
  return (
    <div className="flex min-h-64 items-center justify-center rounded-md border border-dashed border-slate-300 bg-white p-8 text-center">
      <div>
        <h2 className="text-base font-semibold text-slate-950">{title}</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          {message}
        </p>
      </div>
    </div>
  );
}
