"use client"

import * as React from "react"
import { UserButton } from "@clerk/nextjs"

export function UserMenu() {
  return (
    <UserButton 
      appearance={{
        elements: {
          avatarBox: "h-9 w-9",
          userButtonPopoverCard: "bg-surface border-border",
          userButtonPopoverActionButton: "text-text-secondary hover:bg-bg-secondary hover:text-text-primary",
          userButtonPopoverActionButtonText: "text-text-secondary",
          userButtonPopoverFooter: "hidden"
        }
      }}
    />
  )
}
