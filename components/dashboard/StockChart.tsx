import { chartData } from "@/lib/mock-data";
import { Icon } from "@/components/ui/Icon";
import { formatNumber } from "@/lib/utils";

const WIDTH = 640;
const HEIGHT = 240;
const PADDING = { top: 16, right: 14, bottom: 30, left: 38 };
const MAX = 900;

function scaleX(index: number) {
  const usable = WIDTH - PADDING.left - PADDING.right;
  return PADDING.left + (index / (chartData.length - 1)) * usable;
}

function scaleY(value: number) {
  const usable = HEIGHT - PADDING.top - PADDING.bottom;
  return PADDING.top + (1 - value / MAX) * usable;
}

function linePath(values: number[]) {
  return values
    .map((value, index) => `${index === 0 ? "M" : "L"}${scaleX(index)},${scaleY(value)}`)
    .join(" ");
}

const inboundPath = linePath(chartData.map((point) => point.inbound));
const outboundPath = linePath(chartData.map((point) => point.outbound));
const areaPath = `${inboundPath} L${scaleX(chartData.length - 1)},${scaleY(0)} L${scaleX(0)},${scaleY(0)} Z`;

const totalInbound = chartData.reduce((sum, point) => sum + point.inbound, 0);
const totalOutbound = chartData.reduce((sum, point) => sum + point.outbound, 0);

export function StockChart() {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-[14px] font-semibold text-ink">Stock movement</h3>
          <p className="mt-0.5 text-[11px] text-slate-500">
            Inbound vs. outbound units over the last 7 months
          </p>
        </div>
        <div className="flex items-center gap-3 text-[10.5px] font-medium text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-brand-500" />
            Inbound
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500" />
            Outbound
          </span>
        </div>
      </div>

      <div className="mt-4">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-auto w-full"
          role="img"
          aria-label="Chart comparing inbound and outbound stock units from April to October"
        >
          <defs>
            <linearGradient id="dashboard-chart-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 300, 600, 900].map((tick) => {
            const y = scaleY(tick);
            return (
              <g key={tick}>
                <line
                  x1={PADDING.left}
                  x2={WIDTH - PADDING.right}
                  y1={y}
                  y2={y}
                  stroke="#eef1f7"
                  strokeWidth="1"
                />
                <text
                  x={PADDING.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-slate-400 text-[9px]"
                >
                  {tick === 0 ? "0" : `${tick / 1000}k`}
                </text>
              </g>
            );
          })}

          <path d={areaPath} fill="url(#dashboard-chart-area)" />
          <path
            d={inboundPath}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={outboundPath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="5 5"
          />

          {chartData.map((point, index) => (
            <g key={point.label}>
              <circle
                cx={scaleX(index)}
                cy={scaleY(point.inbound)}
                r="3.2"
                fill="white"
                stroke="#6366f1"
                strokeWidth="2"
              />
              <text
                x={scaleX(index)}
                y={HEIGHT - 10}
                textAnchor="middle"
                className="fill-slate-400 text-[9.5px]"
              >
                {point.label}
              </text>
            </g>
          ))}

          <g>
            <circle
              cx={scaleX(chartData.length - 1)}
              cy={scaleY(chartData[chartData.length - 1].inbound)}
              r="6"
              fill="#6366f1"
              opacity="0.15"
            />
            <circle
              cx={scaleX(chartData.length - 1)}
              cy={scaleY(chartData[chartData.length - 1].inbound)}
              r="3.2"
              fill="#6366f1"
            />
          </g>
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-4">
        <div className="rounded-lg bg-slate-50/70 px-3 py-2">
          <p className="text-[9.5px] text-slate-400">Total inbound</p>
          <p className="mt-0.5 flex items-center gap-1 text-[13px] font-semibold text-ink">
            {formatNumber(totalInbound)}
            <Icon name="trending-up" size={12} className="text-emerald-500" />
          </p>
        </div>
        <div className="rounded-lg bg-slate-50/70 px-3 py-2">
          <p className="text-[9.5px] text-slate-400">Total outbound</p>
          <p className="mt-0.5 flex items-center gap-1 text-[13px] font-semibold text-ink">
            {formatNumber(totalOutbound)}
            <Icon name="trending-up" size={12} className="text-brand-500" />
          </p>
        </div>
        <div className="rounded-lg bg-slate-50/70 px-3 py-2">
          <p className="text-[9.5px] text-slate-400">Net change</p>
          <p className="mt-0.5 flex items-center gap-1 text-[13px] font-semibold text-emerald-600">
            +{formatNumber(totalInbound - totalOutbound)}
            <Icon name="arrow-up" size={12} />
          </p>
        </div>
      </div>
    </div>
  );
}
