"use client"

export function StarryBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Dark Gradient Base */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] opacity-90" />

            {/* Stars */}
            <div className="absolute inset-0" style={{ background: 'radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 3px)', backgroundSize: '550px 550px', opacity: 0.3 }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 2px)', backgroundSize: '350px 350px', opacity: 0.3, transform: 'rotate(20deg)' }} />

            {/* Nebulas/Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent-primary/5 blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-light/5 blur-[100px]" />
        </div>
    )
}
