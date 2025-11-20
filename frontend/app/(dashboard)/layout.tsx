import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300">
      {/* Main Content */}
      <main>{children}</main>
    </div>
  )
}
