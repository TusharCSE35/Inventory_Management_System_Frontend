import { SectionHeader } from "./SectionHeader";
import { Icon } from "@/components/ui/Icon";

const testimonials = [
  {
    quote:
      "We went from a 40-tab spreadsheet to a single source of truth in a weekend. Stockouts are down 64% and our buyers finally trust the numbers.",
    name: "Maya Chen",
    role: "Head of Operations",
    company: "Northwind Supply",
    initials: "MC",
    gradient: "from-indigo-400 to-violet-500",
    metric: "64% fewer stockouts",
  },
  {
    quote:
      "The reorder suggestions alone paid for the subscription in month one. It feels like having an extra operations analyst on the team.",
    name: "Jordan Lee",
    role: "Co-founder",
    company: "Coastline Goods",
    initials: "JL",
    gradient: "from-amber-300 to-orange-500",
    metric: "9 hrs saved weekly",
  },
  {
    quote:
      "We run four warehouses across two continents. Stockflow is the first tool that makes transfers and cycle counts feel genuinely simple.",
    name: "Priya Nair",
    role: "Supply Chain Lead",
    company: "Orbit Athletics",
    initials: "PN",
    gradient: "from-emerald-300 to-teal-500",
    metric: "4 warehouses synced",
  },
];

export function Testimonials() {
  return (
    <section
      id="customers"
      className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow="Customers"
          title="Teams grow faster when stock stops surprising them."
          description="From independent brands to multi-warehouse distributors, thousands of operators run their day on Stockflow."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="group relative flex flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-soft"
            >
              <Icon
                name="quote"
                size={28}
                className="text-slate-100 transition-colors group-hover:text-brand-100"
              />
              <div className="mt-3 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Icon
                    key={index}
                    name="star"
                    size={13}
                    className="text-amber-400"
                  />
                ))}
              </div>
              <blockquote className="mt-3 flex-1 text-[14px] leading-7 text-slate-600">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10.5px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-100">
                <Icon name="trending-up" size={12} />
                {testimonial.metric}
              </div>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <span
                  className={`grid size-9 place-items-center rounded-full bg-gradient-to-br ${testimonial.gradient} text-[11px] font-bold text-white`}
                >
                  {testimonial.initials}
                </span>
                <div>
                  <p className="text-[12.5px] font-semibold text-ink">
                    {testimonial.name}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11.5px] text-slate-500">
          <span className="font-medium text-slate-600">
            4.9/5 average rating across
          </span>
          {["G2", "Capterra", "Shopify App Store"].map((platform) => (
            <span
              key={platform}
              className="inline-flex items-center gap-1.5 font-semibold text-slate-400"
            >
              <Icon name="star" size={11} className="text-amber-400" />
              {platform}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
