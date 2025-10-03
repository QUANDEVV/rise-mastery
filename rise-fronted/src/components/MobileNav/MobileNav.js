
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Flame, Users, Anchor, BookOpen, BarChart3 , Ban } from "lucide-react"

const navItems = [
  { href: "/", label: "NULL", icon: Ban }, 
  { href: "/Community", label: "NULL", icon: Ban },
  { href: "/Transmute", label: "NULL", icon: Ban },
  { href: "/Anchor", label: "NULL", icon: Ban },
  { href: "/Spiral", label: "NULL", icon: Ban },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-lg h-auto p-2 text-sm font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-primary/80"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
