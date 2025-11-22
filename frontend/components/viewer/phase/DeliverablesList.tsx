import BentoCard from './BentoCard';

interface Deliverable {
  description: string;
  isCompleted: boolean;
}

interface DeliverablesListProps {
  deliverables: Deliverable[];
}

export default function DeliverablesList({ deliverables }: DeliverablesListProps) {
  const displayDeliverables = deliverables?.slice(0, 3) || [];

  if (displayDeliverables.length === 0) {
    return (
      <BentoCard className="lg:col-span-4 bg-surface">
        <h3 className="text-sm font-bold text-text-tertiary uppercase tracking-wider mb-4">Active Deliverables</h3>
        <p className="text-sm text-text-secondary">No deliverables defined</p>
      </BentoCard>
    );
  }

  return (
    <BentoCard className="lg:col-span-4 bg-surface">
      <h3 className="text-sm font-bold text-text-tertiary uppercase tracking-wider mb-4">Active Deliverables</h3>
      <div className="space-y-3">
        {displayDeliverables.map((deliverable, i) => (
          <div 
            key={i} 
            className="flex items-center gap-3 p-3 bg-bg-secondary rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer group"
          >
            <div 
              className={`w-4 h-4 rounded-full border-2 ${
                deliverable.isCompleted 
                  ? 'bg-primary border-primary' 
                  : 'border-text-tertiary group-hover:border-primary'
              }`} 
            />
            <span className="text-sm text-text-secondary line-clamp-1">{deliverable.description}</span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
