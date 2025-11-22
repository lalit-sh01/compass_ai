import { LucideIcon } from 'lucide-react';

interface StatBadgeProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export default function StatBadge({ icon: Icon, label, value }: StatBadgeProps) {
  return (
    <div className="flex items-center gap-3 bg-bg-secondary rounded-xl p-3">
      <div className="p-2 bg-bg-tertiary rounded-lg text-text-tertiary">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="text-xs text-text-tertiary uppercase tracking-wider font-bold">{label}</div>
        <div className="text-sm text-text-primary font-mono">{value}</div>
      </div>
    </div>
  );
}
