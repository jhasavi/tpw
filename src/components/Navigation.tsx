'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import ThemeToggle from './ThemeToggle'
import { Dropdown } from './ui/Dropdown'
import { navigationConfig, getUserMenuItems } from '@/lib/navigation-config'

export default function Navigation() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    setMounted(true)
    
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  // Hide nav on auth pages
  if (pathname?.startsWith('/auth/')) {
    return null
  }

  // Prevent hydration mismatch by not rendering auth-dependent content until mounted
  if (!mounted) {
    return (
      <nav className="bg-white shadow-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <Image src="/images/logo-nobg.png" alt="The Purple Wings" width={40} height={40} className="h-10 w-auto" priority />
                <span className="text-xl font-bold text-purple-700">The Purple Wings</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white shadow-sm border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/images/logo-nobg.png" alt="The Purple Wings" width={40} height={40} className="h-10 w-auto" priority />
              <span className="text-xl font-bold text-purple-700">The Purple Wings</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
{navigationConfig.map((item) => {
              const isActive = item.isActive ? item.isActive(pathname) : false
              
              if (item.dropdown) {
                return (
                  <Dropdown
                    key={item.label}
                    trigger={
                      <button
                        className={`
                          text-gray-700 hover:text-purple-600 px-4 py-2 text-sm font-medium rounded-md 
                          hover:bg-purple-50 flex items-center transition-colors duration-150
                          ${isActive ? 'text-purple-600 bg-purple-50' : ''}
                        `}
                        aria-label={`${item.label} dropdown menu`}
                      >
                        {item.label}
                        <svg 
                          className="ml-1 h-4 w-4 transition-transform duration-200" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
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
                      bg-purple-600 text-white hover:bg-purple-700 px-6 py-2 text-sm font-medium rounded-md 
                      transition-colors duration-150 shadow-sm hover:shadow-md
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
                  className={`
                    text-gray-700 hover:text-purple-600 px-4 py-2 text-sm font-medium rounded-md 
                    hover:bg-purple-50 transition-colors duration-150
                    ${isActive ? 'text-purple-600 bg-purple-50' : ''}
                  `}
                  aria-label={`${item.label} page`}
                >
                  {item.label}
                </Link>
              )
            })}

            {/* User Account Menu */}
            <ThemeToggle />
            {user ? (
              <Dropdown
                trigger={
                  <button
                    className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 
                             px-4 py-2 text-sm font-medium rounded-md hover:bg-purple-50 
                             transition-colors duration-150"
                    aria-label="User account menu"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <svg 
                      className="h-4 w-4 transition-transform duration-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                }
                items={getUserMenuItems({ user, loading, onSignOut: handleSignOut })}
                position="right"
              />
            ) : !loading && (
              <>
                <Link 
                  href="/auth/login" 
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors duration-150"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-purple-600 p-2"
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
        <div className="md:hidden border-t border-purple-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
{navigationConfig.map((item) => {
              const isActive = item.isActive ? item.isActive(pathname) : false
              
              if (item.dropdown) {
                return (
                  <div key={item.label}>
                    <div className="px-3 py-2 text-xs font-semibold text-purple-600 uppercase">
                      {item.label}
                    </div>
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.href || subItem.label}
                        href={subItem.href!}
                        className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium pl-6 transition-colors duration-150"
                        onClick={() => setMenuOpen(false)}
                      >
                        {subItem.icon && <span className="mr-3">{subItem.icon}</span>}
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )
              }
              
              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`block text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ${
                    isActive ? 'text-purple-600 bg-purple-50' : ''
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
            
            {user && (
              <>
                <div className="px-3 py-2 text-xs font-semibold text-purple-600 uppercase border-t border-purple-100 mt-2">
                  Account
                </div>
                <div className="px-3 py-2 text-sm text-gray-500 pl-6">
                  {user.email}
                </div>
                {getUserMenuItems({ user, loading, onSignOut: handleSignOut }).map((item, index) => {
                  if (item.divider && !item.label) {
                    return <div key={index} className="border-t border-gray-100 my-1 mx-3" />
                  }
                  
                  if (item.href) {
                    return (
                      <Link
                        key={index}
                        href={item.href}
                        className={`block text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium pl-6 transition-colors duration-150 ${
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
                        className={`block w-full text-left text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium pl-6 transition-colors duration-150 ${
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
                <div className="border-t border-purple-100 mt-2"></div>
                <Link 
                  href="/auth/login" 
                  className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-150"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="block bg-purple-600 text-white hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium text-center transition-colors duration-150"
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
