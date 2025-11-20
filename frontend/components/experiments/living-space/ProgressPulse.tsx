import { cn } from '@/lib/utils';

interface ProgressPulseProps {
    isActive: boolean;
    children: React.ReactNode;
}

export function ProgressPulse({ isActive, children }: ProgressPulseProps) {
    return (
        <div className="relative">
            {isActive && (
                <>
                    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-orange-400 to-pink-600 opacity-30 blur transition duration-1000 group-hover:opacity-50 group-hover:duration-200 animate-pulse" />
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden xl:block">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                            </span>
                            <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">Active</span>
                        </div>
                    </div>
                </>
            )}
            <div className={cn(
                "relative rounded-xl bg-surface",
                isActive ? "ring-1 ring-orange-500/20" : ""
            )}>
                {children}
            </div>
        </div>
    );
}
