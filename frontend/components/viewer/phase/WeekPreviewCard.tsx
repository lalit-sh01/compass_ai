import { ArrowUpRight, Clock } from 'lucide-react';
import Link from 'next/link';
import CanvasCard from './CanvasCard';

interface WeekPreviewCardProps {
    week: any;
    label?: string;
}

export default function WeekPreviewCard({ week, label }: WeekPreviewCardProps) {
    return (
        <Link href={`/viewer/week/${week.weekNumber}`}>
            <CanvasCard className="group cursor-pointer hover:border-primary/30">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono text-text-tertiary">
                        {label || `WEEK ${week.weekNumber}`}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-2">
                    {week.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <Clock className="w-3 h-3" />
                    {week.totalHours}h Estimated
                </div>
            </CanvasCard>
        </Link>
    );
}
