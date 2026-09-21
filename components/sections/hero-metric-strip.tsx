import { Container } from "@/components/ui/container";
import { StatMetricIcon, type StatMetricIconKind } from "@/components/ui/stat-metric-icon";
import type { Metric } from "@/lib/types";

type HeroMetricStripProps = {
  metrics: Metric[];
};

const metricIcons: StatMetricIconKind[] = ["award", "clipboard", "users", "headset"];

export function HeroMetricStrip({ metrics }: HeroMetricStripProps) {
  return (
    <section className="bg-[#FAF7F0] py-14 [--stat-icon-primary:#252B33] [--stat-icon-accent:#F2A900] [--stat-icon-surface:#FAF7F0] [--stat-icon-dots:#F2A900] sm:py-16">
      <Container>
        <div className="overflow-hidden rounded-[1.75rem] border border-[#252B33]/10 bg-white">
          <div className="grid divide-y divide-[#252B33]/12 md:grid-cols-4 md:divide-x md:divide-y-0">
            {metrics.map((metric, index) => {
              const icon = metricIcons[index % metricIcons.length];

              return (
                <article
                  key={metric.label}
                  className="relative flex min-h-[16rem] flex-col items-center justify-center px-6 py-9 text-center"
                >
                  <StatMetricIcon kind={icon} />
                  <p className="mt-8 text-[1.5rem] font-semibold leading-none tracking-normal text-[#252B33] sm:text-[2.5rem]">
                    {metric.value}
                  </p>
                  <span className="mt-6 h-1 w-16 rounded-full bg-[#F2A900]" />
                  <p className="mt-6 text-lg font-semibold text-[#252B33]">
                    {metric.label}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
