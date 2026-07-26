import { MapPin, ShieldCheck, Trophy, Users } from "lucide-react";
import { approvedMetrics } from "@/content/site";

const icons = [ShieldCheck, Trophy, MapPin, Users];

export function Metrics({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "metrics metrics-compact" : "metrics"}>
      {approvedMetrics.map((metric, index) => {
        const Icon = icons[index] ?? ShieldCheck;
        return (
          <div className="metric" key={metric.label}>
            <Icon size={21} aria-hidden="true" />
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        );
      })}
    </div>
  );
}
