import React from 'react';

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

export function Sidebar({ children, className = '' }: SidebarProps) {
  return (
    <div className={`space-y-6 sticky top-8 ${className}`}>
      {children}
    </div>
  );
}
