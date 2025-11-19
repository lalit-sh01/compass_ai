"use client"

export function CompassIllustration() {
    return (
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-accent-primary/20 blur-[60px] rounded-full animate-pulse" />

            {/* Compass Body */}
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl relative z-10">
                {/* Outer Ring */}
                <circle cx="100" cy="100" r="90" fill="#E5E7EB" className="fill-surface" />
                <circle cx="100" cy="100" r="90" stroke="#94A3B8" strokeWidth="4" fill="none" />

                {/* Inner Face */}
                <circle cx="100" cy="100" r="80" fill="#1E293B" className="fill-bg-secondary" />

                {/* Ticks */}
                {[...Array(12)].map((_, i) => (
                    <line
                        key={i}
                        x1="100"
                        y1="25"
                        x2="100"
                        y2={i % 3 === 0 ? "35" : "30"}
                        transform={`rotate(${i * 30} 100 100)`}
                        stroke="#94A3B8"
                        strokeWidth={i % 3 === 0 ? "2" : "1"}
                    />
                ))}

                {/* Cardinal Directions */}
                <text x="100" y="48" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="bold">N</text>
                <text x="100" y="160" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="bold">S</text>
                <text x="155" y="104" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="bold">E</text>
                <text x="45" y="104" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="bold">W</text>

                {/* Compass Rose */}
                <g filter="url(#glow)">
                    {/* Main Points */}
                    <path d="M100 50 L115 90 L150 100 L115 110 L100 150 L85 110 L50 100 L85 90 Z" fill="#E2E8F0" />
                    <path d="M100 50 L100 100 L150 100" fill="#CBD5E1" opacity="0.5" />
                    <path d="M100 150 L100 100 L50 100" fill="#CBD5E1" opacity="0.5" />

                    {/* Needle (Cyan/Teal) */}
                    <path d="M100 60 L110 100 L100 140 L90 100 Z" fill="#22D3EE" className="fill-accent-primary" />
                    <circle cx="100" cy="100" r="4" fill="#0F172A" />
                </g>

                {/* Definitions for Glow */}
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
            </svg>
        </div>
    )
}
