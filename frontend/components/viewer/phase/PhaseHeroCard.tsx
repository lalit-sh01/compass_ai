import { Clock, Database, Globe, Cpu } from 'lucide-react';
import BentoCard from './BentoCard';
import StatBadge from './StatBadge';

interface PhaseHeroCardProps {
  week: any; // Accept any week structure from roadmap
}

export default function PhaseHeroCard({ week }: PhaseHeroCardProps) {
  return (
    <BentoCard className="lg:col-span-8 lg:row-span-2 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <Cpu className="w-64 h-64" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-primary/10 rounded-full text-xs font-bold uppercase tracking-wider text-primary">
              Current Sprint
            </span>
            <span className="text-text-tertiary font-mono">Week {week.weekNumber}</span>
          </div>
          <h2 className="text-4xl font-bold text-text-primary mb-4 max-w-2xl leading-tight">
            {week.title}
          </h2>
          <p className="text-xl text-text-secondary max-w-xl">
            {week.theme}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <StatBadge icon={Clock} label="Hours" value={`${week.totalHours}h`} />
          <StatBadge icon={Database} label="Build" value={`${week.timeBreakdown.build}h`} />
          <StatBadge icon={Globe} label="Research" value={`${week.timeBreakdown.research}h`} />
        </div>
      </div>
    </BentoCard>
  );
}
