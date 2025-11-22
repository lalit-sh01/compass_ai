import { ArrowUpRight, Zap } from 'lucide-react';
import BentoCard from './BentoCard';

interface Resource {
  title: string;
  url?: string;
}

interface ResourceSpotlightProps {
  resource?: Resource;
}

export default function ResourceSpotlight({ resource }: ResourceSpotlightProps) {
  return (
    <BentoCard className="lg:col-span-4" delay={0.1}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-text-tertiary uppercase tracking-wider">Top Resource</h3>
        <ArrowUpRight className="w-4 h-4 text-text-tertiary" />
      </div>
      <div className="aspect-video bg-bg-secondary rounded-xl mb-4 flex items-center justify-center">
        <Zap className="w-8 h-8 text-text-tertiary" />
      </div>
      <p className="text-sm font-medium text-text-primary line-clamp-2">
        {resource?.title || "No resource selected"}
      </p>
    </BentoCard>
  );
}
