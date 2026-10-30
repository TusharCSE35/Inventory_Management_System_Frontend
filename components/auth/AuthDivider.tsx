export function AuthDivider({ label = "or continue with email" }: { label?: string }) {
  return (
    <div className="my-5 flex items-center gap-3">
      <span className="h-px flex-1 bg-line" />
      <span className="text-[10.5px] font-medium uppercase tracking-[0.1em] text-slate-400">
        {label}
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
