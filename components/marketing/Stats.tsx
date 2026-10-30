const stats = [
  { value: "4,000+", label: "Operations teams onboarded" },
  { value: "12M", label: "SKUs tracked every day" },
  { value: "$2.4B", label: "Inventory value managed" },
  { value: "99.2%", label: "Average stock accuracy" },
];

export function Stats() {
  return (
    <section className="border-y border-line/70 bg-surface/60">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-y-8 px-5 py-10 sm:px-8 lg:grid-cols-4 lg:gap-0 lg:px-10">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`px-2 text-center lg:px-8 ${
              index !== 0 ? "lg:border-l lg:border-line" : ""
            }`}
          >
            <p className="text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-[12px] leading-5 text-slate-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
