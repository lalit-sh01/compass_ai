import { ArrowRight, Play, CheckCircle } from 'lucide-react';

interface HeroActionProps {
    title: string;
    subtitle: string;
    type: 'build' | 'research' | 'share';
    onAction: () => void;
}

export function HeroAction({ title, subtitle, type, onAction }: HeroActionProps) {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white shadow-xl">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative z-10">
                <div className="mb-4 flex items-center gap-2 text-orange-400">
                    <Play className="h-4 w-4 fill-current" />
                    <span className="text-sm font-bold uppercase tracking-wider">Current Focus</span>
                </div>

                <h1 className="mb-2 text-3xl font-bold leading-tight md:text-4xl">
                    {title}
                </h1>
                <p className="mb-8 max-w-2xl text-lg text-gray-300">
                    {subtitle}
                </p>

                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={onAction}
                        className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-gray-900 transition-all hover:bg-gray-100 hover:shadow-lg active:scale-95"
                    >
                        <span>Start Session</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    <button className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10">
                        <CheckCircle className="h-4 w-4" />
                        <span>Mark Complete</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
