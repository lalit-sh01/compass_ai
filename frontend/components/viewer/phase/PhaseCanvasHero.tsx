import { MoreHorizontal } from 'lucide-react';
import CanvasCard from './CanvasCard';

interface PhaseCanvasHeroProps {
    week: any;
}

export default function PhaseCanvasHero({ week }: PhaseCanvasHeroProps) {
    return (
        <CanvasCard className="md:col-span-2 md:row-span-2 flex flex-col justify-between" priority="high">
            <div>
                <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-primary text-on-primary text-xs font-bold rounded-full">
                        CURRENT FOCUS
                    </span>
                    <button className="p-2 hover:bg-bg-secondary rounded-full transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-text-tertiary" />
                    </button>
                </div>

                <h2 className="text-3xl font-bold text-text-primary mb-3">
                    Week {week.weekNumber}: {week.title}
                </h2>
                <p className="text-lg text-text-secondary italic mb-6">
                    "{week.theme}"
                </p>
            </div>

            <div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-bg-secondary/50 rounded-xl">
                        <div className="text-xs text-text-tertiary uppercase font-bold mb-1">Build Goal</div>
                        <div className="text-sm font-medium text-text-primary line-clamp-2">
                            {week.buildSection?.projectTitle || "No build project defined"}
                        </div>
                    </div>
                    <div className="p-4 bg-bg-secondary/50 rounded-xl">
                        <div className="text-xs text-text-tertiary uppercase font-bold mb-1">Top Resource</div>
                        <div className="text-sm font-medium text-text-primary line-clamp-2">
                            {week.researchSection?.deepDiveTopics?.[0]?.description || "No resources defined"}
                        </div>
                    </div>
                </div>

                <button className="w-full py-3 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary-hover transition-colors shadow-sm">
                    Continue Week {week.weekNumber}
                </button>
            </div>
        </CanvasCard>
    );
}
