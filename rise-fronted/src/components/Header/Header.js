"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-slate-900 dark:bg-slate-50 flex items-center justify-center">
            <span className="font-bold text-lg text-white dark:text-black">R</span>
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-slate-50">Rise</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Link href="/">
            <Button variant="ghost">NULL</Button>
          </Link>
          <Link href="/">
            <Button>NULL</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-800">
              <Link href="/" className="flex-1">
                <Button variant="ghost" className="w-full">NULL</Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button className="w-full">NULL</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}