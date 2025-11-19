import Link from 'next/link';
import { CompassIllustration } from "@/components/compass-illustration";
import { StarryBackground } from "@/components/starry-background";
import { DarkModeToggle } from "@/components/dark-mode-toggle";

export default function Home() {

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300 font-secondary relative overflow-hidden flex flex-col">
      {/* Background Effects (Visible in Dark Mode) */}
      <div className="hidden [data-theme='twilight']_& [data-theme='dusk']_& block">
        <StarryBackground />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 w-full pt-6 px-6 md:px-12">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-sm glow-accent">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-on-primary" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12l5 5l10 -10" />
              </svg>
            </div>
            <span className="text-xl font-bold text-text-primary font-primary tracking-tight">Compass.ai</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Features', 'Pricing', 'Blog'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-text-secondary hover:text-primary transition-colors font-medium"
              >
                {item}
              </Link>
            ))}
          </div>
          <DarkModeToggle />
        </div>
      </nav>

      {/* Main Content (Centered) */}
      <main className="flex-grow flex items-center justify-center relative z-10 px-6">
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Compass Illustration */}
          <div className="flex justify-center lg:justify-end order-2 lg:order-1">
            <CompassIllustration />
          </div>

          {/* Right: Text Content */}
          <div className="text-center lg:text-left order-1 lg:order-2">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary font-primary leading-[1.1] mb-6 drop-shadow-sm">
              Find Your Direction.
              <span className="block text-text-primary mt-2">Keep Your Peace.</span>
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8">
              <Link
                href="/learn-more"
                className="w-full sm:w-auto rounded-full bg-primary px-8 py-3 text-base font-semibold text-on-primary shadow-lg hover:bg-primary-hover hover:shadow-xl transition-all duration-200 glow-accent min-w-[160px] text-center"
              >
                Learn More
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto rounded-full px-8 py-3 text-base font-semibold text-text-primary ring-2 ring-primary hover:bg-primary/10 transition-all duration-200 min-w-[160px] text-center"
              >
                Get Started
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
