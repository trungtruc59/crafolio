type AdminMainProps = {
  children: React.ReactNode;
};

export default function AdminMain({ children }: AdminMainProps) {
  return (
    <main className="min-w-0 bg-neutral-50 p-5 text-slate-950 sm:p-8">
      {children}
    </main>
  );
}
