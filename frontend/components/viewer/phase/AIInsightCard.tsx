import { Zap } from 'lucide-react';
import CanvasCard from './CanvasCard';

interface AIInsightCardProps {
    insight?: string;
}

export default function AIInsightCard({ insight }: AIInsightCardProps) {
    const defaultInsight = "Focus on completing your build project this week. You're making great progress on research tasks.";

    return (
        <CanvasCard className="bg-gradient-to-br from-primary/5 to-surface">
            <div className="flex items-center gap-2 mb-3 text-primary">
                <Zap className="w-5 h-5" />
                <span className="text-xs font-bold uppercase">AI Insight</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
                {insight || defaultInsight}
            </p>
        </CanvasCard>
    );
}
