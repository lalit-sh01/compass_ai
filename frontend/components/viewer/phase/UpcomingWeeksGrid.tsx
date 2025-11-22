import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import BentoCard from './BentoCard';

interface UpcomingWeeksGridProps {
    weeks: any[]; // Accept any week structure from roadmap
}

export default function UpcomingWeeksGrid({ weeks }: UpcomingWeeksGridProps) {
    if (weeks.length === 0) {
        return null;
    }

    return (
        <div className="lg:col-span-12 mt-8">
            <h3 className="text-lg font-bold text-text-primary mb-6">Upcoming Sprints</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {weeks.map((week, i) => (
                    <Link key={week.weekNumber} href={`/viewer/week/${week.weekNumber}`}>
                        <BentoCard delay={0.2 + (i * 0.1)} className="group cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-mono text-text-tertiary">WEEK {week.weekNumber}</span>
                                <div className="w-8 h-8 rounded-full bg-bg-secondary flex items-center justify-center group-hover:bg-bg-tertiary transition-colors">
                                    <ArrowUpRight className="w-4 h-4 text-text-tertiary" />
                                </div>
                            </div>
                            <h4 className="text-lg font-bold text-text-secondary mb-2 group-hover:text-text-primary transition-colors">
                                {week.title}
                            </h4>
                            <p className="text-sm text-text-tertiary line-clamp-2">
                                {week.theme}
                            </p>
                        </BentoCard>
                    </Link>
                ))}
            </div>
        </div>
    );
}
