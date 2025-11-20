import { Lightbulb, X } from 'lucide-react';

interface MicroTipCardProps {
    title: string;
    content: string;
    onDismiss?: () => void;
}

export function MicroTipCard({ title, content, onDismiss }: MicroTipCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-lg border border-yellow-200 bg-yellow-50/50 p-4 transition-all hover:bg-yellow-50 dark:border-yellow-900/50 dark:bg-yellow-900/10 dark:hover:bg-yellow-900/20">
            <div className="mb-2 flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
                <Lightbulb className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wide">Micro-Tip</span>
            </div>

            <h4 className="mb-1 text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h4>
            <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">{content}</p>

            <button
                onClick={onDismiss}
                className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100 text-gray-400 hover:text-gray-600"
            >
                <X className="h-3 w-3" />
            </button>
        </div>
    );
}
