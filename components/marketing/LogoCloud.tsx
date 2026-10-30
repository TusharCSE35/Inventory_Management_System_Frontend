import { trustedBrands } from "@/config/app.config";
import { Icon, type IconName } from "@/components/ui/Icon";

const brandIcons: IconName[] = [
  "warehouse",
  "zap",
  "cloud",
  "globe",
  "activity",
  "boxes",
];

export function LogoCloud() {
  return (
    <section className="border-y border-line/80 bg-white/70">
      <div className="mx-auto w-full max-w-7xl px-5 py-9 sm:px-8 lg:px-10">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between lg:gap-10">
          <p className="shrink-0 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400 lg:text-left">
            Powering inventory at
          </p>
          <div className="grid w-full grid-cols-3 items-center gap-x-6 gap-y-5 sm:grid-cols-6 lg:w-auto lg:gap-x-9">
            {trustedBrands.map((brand, index) => (
              <div
                key={brand}
                className="flex items-center justify-center gap-1.5 text-slate-400 transition-colors hover:text-slate-600"
              >
                <Icon name={brandIcons[index]} size={16} strokeWidth={1.5} />
                <span className="text-[13.5px] font-semibold tracking-tight">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
