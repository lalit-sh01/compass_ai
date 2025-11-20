'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollFocusWrapperProps {
    children: React.ReactNode;
    className?: string;
    threshold?: number;
    defaultInFocus?: boolean;
    rootMargin?: string;
}

export function ScrollFocusWrapper({
    children,
    className,
    threshold = 0.5, // Lowered threshold slightly to ensure easier triggering
    defaultInFocus = false,
    rootMargin = '-20% 0px -20% 0px'
}: ScrollFocusWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(defaultInFocus);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update focus state based on intersection ratio
                setIsFocused(entry.isIntersecting);
            },
            {
                root: null, // viewport
                rootMargin: rootMargin, // Trigger when element is in the middle 60% of screen
                threshold: threshold
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    return (
        <div
            ref={ref}
            className={cn(
                "transition-all duration-700 ease-in-out transform",
                isFocused
                    ? "opacity-100 blur-0 scale-100 grayscale-0"
                    : "opacity-40 blur-[2px] scale-95 grayscale",
                className
            )}
        >
            {children}
        </div>
    );
}
