import { motion } from 'framer-motion';

interface CanvasCardProps {
    children: React.ReactNode;
    className?: string;
    priority?: "normal" | "high" | "completed";
}

export default function CanvasCard({
    children,
    className = "",
    priority = "normal"
}: CanvasCardProps) {
    return (
        <motion.div
            layout
            className={`relative p-6 rounded-2xl border transition-all hover:shadow-md ${priority === "high"
                    ? 'bg-surface border-primary/30 shadow-lg ring-1 ring-primary/10'
                    : priority === "completed"
                        ? 'bg-bg-secondary/30 border-border opacity-60 hover:opacity-100'
                        : 'bg-surface border-border hover:border-primary/20'
                } ${className}`}
        >
            {children}
        </motion.div>
    );
}
