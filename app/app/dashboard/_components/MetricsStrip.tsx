import type { MetricItem } from '../types';

interface Props {
  metrics: MetricItem[];
}

export default function MetricsStrip({ metrics }: Props) {
  return (
    <div className="dash-metrics-strip">
      {metrics.map((m) => (
        <div key={m.label} className="dash-metric">
          <div className="dash-metric-value">{m.value}</div>
          <div className="dash-metric-label">{m.label}</div>
          <div className="dash-metric-sub">{m.sub}</div>
        </div>
      ))}
    </div>
  );
}
