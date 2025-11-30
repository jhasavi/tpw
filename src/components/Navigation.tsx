'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export default function Navigation() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [learnMenuOpen, setLearnMenuOpen] = useState(false)
  const [resourcesMenuOpen, setResourcesMenuOpen] = useState(false)
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
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
                <img src="/images/logo-nobg.png" alt="The Purple Wings" className="h-10 w-auto" />
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
              <img src="/images/logo-nobg.png" alt="The Purple Wings" className="h-10 w-auto" />
              <span className="text-xl font-bold text-purple-700">The Purple Wings</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <Link href="/" className="text-gray-700 hover:text-purple-600 px-4 py-2 text-sm font-medium rounded-md hover:bg-purple-50">
              Home
            </Link>
            
            {/* Learn Dropdown */}
            <div className="relative" onMouseEnter={() => setLearnMenuOpen(true)} onMouseLeave={() => setLearnMenuOpen(false)}>
              <button className="text-gray-700 hover:text-purple-600 px-4 py-2 text-sm font-medium rounded-md hover:bg-purple-50 flex items-center">
                Learn
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {learnMenuOpen && (
                <div className="absolute left-0 mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <Link href="/courses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                      📚 All Courses
                    </Link>
                    <Link href="/quiz/personality" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                      🧠 Personality Quiz
                    </Link>
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                      📊 My Dashboard
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative" onMouseEnter={() => setResourcesMenuOpen(true)} onMouseLeave={() => setResourcesMenuOpen(false)}>
              <button className="text-gray-700 hover:text-purple-600 px-4 py-2 text-sm font-medium rounded-md hover:bg-purple-50 flex items-center">
                Resources
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {resourcesMenuOpen && (
                <div className="absolute left-0 mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <Link href="/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                      ✍️ Blog
                    </Link>
                    <Link href="/faq" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                      ❓ FAQ
                    </Link>
                    <Link href="/newsletter/subscribe" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                      📧 Newsletter
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* About Dropdown */}
            <div className="relative" onMouseEnter={() => setAboutMenuOpen(true)} onMouseLeave={() => setAboutMenuOpen(false)}>
              <button className="text-gray-700 hover:text-purple-600 px-4 py-2 text-sm font-medium rounded-md hover:bg-purple-50 flex items-center">
                About
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {aboutMenuOpen && (
                <div className="absolute left-0 mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <Link href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                      💜 Our Mission
                    </Link>
                    <Link href="/partnerships" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                      🤝 Partnerships
                    </Link>
                    <Link href="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                      📞 Contact
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Account Menu */}
            {user ? (
              <div className="relative" onMouseEnter={() => setUserMenuOpen(true)} onMouseLeave={() => setUserMenuOpen(false)}>
                <button className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 px-4 py-2 text-sm font-medium rounded-md hover:bg-purple-50">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                    {user.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                        {user.email}
                      </div>
                      <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                        📊 Dashboard
                      </Link>
                      <Link href="/dashboard?tab=profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                        👤 Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      >
                        🚪 Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : !loading && (
              <>
                <Link href="/auth/login" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium"
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
            <Link href="/" className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium">
              🏠 Home
            </Link>
            <div className="px-3 py-2 text-xs font-semibold text-purple-600 uppercase">Learn</div>
            <Link href="/courses" className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium pl-6">
              📚 All Courses
            </Link>
            <Link href="/quiz/personality" className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium pl-6">
              🧠 Personality Quiz
            </Link>
            <Link href="/dashboard" className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium pl-6">
              📊 My Dashboard
            </Link>
            <div className="px-3 py-2 text-xs font-semibold text-purple-600 uppercase">Resources</div>
            <Link href="/blog" className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium pl-6">
              ✍️ Blog
            </Link>
            <Link href="/faq" className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium pl-6">
              ❓ FAQ
            </Link>
            <Link href="/newsletter/subscribe" className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium pl-6">
              📧 Newsletter
            </Link>
            <div className="px-3 py-2 text-xs font-semibold text-purple-600 uppercase">About</div>
            <Link href="/about" className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium pl-6">
              💜 Our Mission
            </Link>
            <Link href="/partnerships" className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium pl-6">
              🤝 Partnerships
            </Link>
            <Link href="/contact" className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium pl-6">
              📞 Contact
            </Link>
            
            {user ? (
              <>
                <div className="px-3 py-2 text-xs font-semibold text-purple-600 uppercase border-t border-purple-100 mt-2">Account</div>
                <div className="px-3 py-2 text-sm text-gray-500 pl-6">
                  {user.email}
                </div>
                <Link href="/dashboard" className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium pl-6">
                  📊 Dashboard
                </Link>
                <Link href="/dashboard?tab=profile" className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium pl-6">
                  👤 Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium pl-6"
                >
                  🚪 Sign Out
                </button>
              </>
            ) : !loading && (
              <>
                <div className="border-t border-purple-100 mt-2"></div>
                <Link href="/auth/login" className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium">
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="block bg-purple-600 text-white hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium text-center"
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
