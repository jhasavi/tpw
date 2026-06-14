'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import ThemeToggle from './ThemeToggle'
import { Dropdown } from './ui/Dropdown'
import { navigationConfig, getUserMenuItems } from '@/lib/navigation-config'

const navLinkClass = `
  text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400
  px-3 py-2 text-sm font-medium rounded-md hover:bg-purple-50 dark:hover:bg-purple-900/30
  transition-colors duration-150 whitespace-nowrap
`

function BrandLink({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 min-w-0 flex-shrink-0">
      <Image
        src="/images/logo-nobg.png"
        alt="The Purple Wings"
        width={36}
        height={36}
        className="h-9 w-9 flex-shrink-0"
        priority
      />
      <span
        className={`font-bold text-purple-700 dark:text-purple-300 whitespace-nowrap ${
          compact ? 'text-base xl:text-lg' : 'text-lg'
        }`}
      >
        The Purple Wings
      </span>
    </Link>
  )
}

export default function Navigation() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    router.push('/')
    router.refresh()
  }

  if (pathname?.startsWith('/auth/')) {
    return null
  }

  if (!mounted) {
    return (
      <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-purple-100 dark:border-purple-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <BrandLink />
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-purple-100 dark:border-purple-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          <BrandLink compact />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-0.5 lg:flex-shrink min-w-0">
            {navigationConfig.map((item) => {
              const isActive = item.isActive ? item.isActive(pathname) : false

              if (item.dropdown) {
                return (
                  <Dropdown
                    key={item.label}
                    menuLabel={`${item.label} menu`}
                    trigger={
                      <span
                        className={`${navLinkClass} flex items-center ${isActive ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30' : ''}`}
                      >
                        {item.label}
                        <svg className="ml-1 h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    }
                    items={item.dropdown}
                    position="left"
                  />
                )
              }

              if (item.isCTA) {
                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className={`
                      bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 text-sm font-medium rounded-md
                      transition-colors duration-150 shadow-sm hover:shadow-md whitespace-nowrap ml-1
                      ${isActive ? 'bg-purple-700' : ''}
                    `}
                    aria-label={`${item.label} page`}
                  >
                    {item.label}
                  </Link>
                )
              }

              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`${navLinkClass} ${isActive ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30' : ''}`}
                  aria-label={`${item.label} page`}
                >
                  {item.label}
                </Link>
              )
            })}

            <Link
              href="/search"
              className={`${navLinkClass} px-2`}
              aria-label="Search site"
              title="Search"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </Link>
            <ThemeToggle />
            {user ? (
              <Dropdown
                menuLabel="Account menu"
                trigger={
                  <span
                    className={`${navLinkClass} flex items-center gap-2`}
                    aria-hidden="true"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                }
                items={getUserMenuItems({ user, loading, onSignOut: handleSignOut })}
                position="right"
              />
            ) : (
              !loading && (
                <div className="flex items-center gap-1 ml-1 flex-shrink-0">
                  <Link href="/auth/login" className={`${navLinkClass} px-2`}>
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-purple-600 text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 whitespace-nowrap"
                  >
                    Get Started
                  </Link>
                </div>
              )
            )}
          </div>

          {/* Mobile: theme + menu toggle */}
          <div className="flex items-center gap-1 lg:hidden flex-shrink-0">
            <Link href="/search" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 p-2" aria-label="Search">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </Link>
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-purple-600 p-2"
              aria-label="Toggle mobile menu"
              aria-expanded={menuOpen}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-purple-100 dark:border-purple-900/50 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navigationConfig.map((item) => {
              const isActive = item.isActive ? item.isActive(pathname) : false

              if (item.dropdown) {
                return (
                  <div key={item.label}>
                    <div className="px-3 py-2 text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                      {item.label}
                    </div>
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.href || subItem.label}
                        href={subItem.href!}
                        className="block text-gray-700 dark:text-gray-200 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 px-3 py-2 rounded-md text-base font-medium pl-6 transition-colors duration-150"
                        onClick={() => setMenuOpen(false)}
                        {...(subItem.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {subItem.icon && <span className="mr-3">{subItem.icon}</span>}
                        {subItem.label}
                        {subItem.external && <span className="ml-1 text-xs text-gray-400">↗</span>}
                      </Link>
                    ))}
                  </div>
                )
              }

              if (item.isCTA) {
                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className="block bg-purple-600 text-white hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium text-center transition-colors duration-150 mx-1 mt-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              }

              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`block text-gray-700 dark:text-gray-200 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ${
                    isActive ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/30' : ''
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}

            {user && (
              <>
                <div className="px-3 py-2 text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase border-t border-purple-100 dark:border-purple-900/50 mt-2 tracking-wide">
                  Account
                </div>
                <div className="px-3 py-2 text-sm text-gray-500 pl-6 truncate">{user.email}</div>
                {getUserMenuItems({ user, loading, onSignOut: handleSignOut }).map((item, index) => {
                  if (item.divider && !item.label) {
                    return <div key={index} className="border-t border-gray-100 dark:border-gray-800 my-1 mx-3" />
                  }

                  if (item.href) {
                    return (
                      <Link
                        key={index}
                        href={item.href}
                        className={`block text-gray-700 dark:text-gray-200 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 px-3 py-2 rounded-md text-base font-medium pl-6 transition-colors duration-150 ${
                          item.destructive ? 'text-red-600 hover:bg-red-50' : ''
                        }`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.icon && <span className="mr-3">{item.icon}</span>}
                        {item.label}
                      </Link>
                    )
                  }

                  if (item.onClick) {
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          item.onClick!()
                          setMenuOpen(false)
                        }}
                        className={`block w-full text-left text-gray-700 dark:text-gray-200 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 px-3 py-2 rounded-md text-base font-medium pl-6 transition-colors duration-150 ${
                          item.destructive ? 'text-red-600 hover:bg-red-50' : ''
                        }`}
                      >
                        {item.icon && <span className="mr-3">{item.icon}</span>}
                        {item.label}
                      </button>
                    )
                  }

                  return null
                })}
              </>
            )}

            {!user && !loading && (
              <>
                <div className="border-t border-purple-100 dark:border-purple-900/50 mt-2" />
                <Link
                  href="/auth/login"
                  className="block text-gray-700 dark:text-gray-200 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-150"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="block bg-purple-600 text-white hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium text-center transition-colors duration-150 mx-1"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
