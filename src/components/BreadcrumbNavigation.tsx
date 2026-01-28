'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'

interface BreadcrumbItem {
  label: string
  href: string
}

export default function BreadcrumbNavigation() {
  const pathname = usePathname()
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = []
    const pathSegments = pathname.split('/').filter(Boolean)
    
    // Add home
    items.push({ label: 'Home', href: '/' })
    
    // Generate breadcrumb items based on path
    let currentPath = ''
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      
      // Convert kebab-case to readable format
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      // Special handling for known routes
      if (segment === 'learn') {
        items.push({ label: 'Learn', href: currentPath })
      } else if (segment === 'womens-financial-literacy') {
        items.push({ label: 'Women\'s Financial Literacy', href: currentPath })
      } else if (segment === 'finra-40-hour') {
        items.push({ label: 'FINRA 40-Hour Course', href: currentPath })
      } else if (segment === 'quiz') {
        items.push({ label: 'Quiz', href: currentPath })
      } else if (segment === 'personality') {
        items.push({ label: 'Personality Quiz', href: currentPath })
      } else if (segment === 'self-assessment') {
        items.push({ label: 'Self Assessment', href: currentPath })
      } else if (segment === 'blog') {
        items.push({ label: 'Blog', href: currentPath })
      } else if (segment === 'dashboard') {
        items.push({ label: 'Dashboard', href: currentPath })
      } else if (segment === 'community') {
        items.push({ label: 'Community', href: currentPath })
      } else if (segment === 'about') {
        items.push({ label: 'About', href: currentPath })
      } else if (segment === 'contact') {
        items.push({ label: 'Contact', href: currentPath })
      } else if (segment === 'faq') {
        items.push({ label: 'FAQ', href: currentPath })
      } else if (segment === 'courses') {
        items.push({ label: 'Courses', href: currentPath })
      } else if (segment === 'events') {
        items.push({ label: 'Events', href: currentPath })
      } else if (segment === 'partnerships') {
        items.push({ label: 'Partnerships', href: currentPath })
      } else if (segment === 'media') {
        items.push({ label: 'Media', href: currentPath })
      } else if (segment === 'newsletter') {
        items.push({ label: 'Newsletter', href: currentPath })
      } else if (segment === 'subscribe') {
        items.push({ label: 'Subscribe', href: currentPath })
      } else if (segment === 'privacy') {
        items.push({ label: 'Privacy Policy', href: currentPath })
      } else if (segment === 'terms') {
        items.push({ label: 'Terms of Service', href: currentPath })
      } else if (segment === 'auth') {
        items.push({ label: 'Account', href: currentPath })
      } else if (segment === 'login') {
        items.push({ label: 'Sign In', href: currentPath })
      } else if (segment === 'signup') {
        items.push({ label: 'Sign Up', href: currentPath })
      } else if (segment === 'profile') {
        items.push({ label: 'Profile', href: currentPath })
      } else if (segment === 'progress') {
        items.push({ label: 'Progress', href: currentPath })
      } else if (segment === 'bookmarks') {
        items.push({ label: 'Bookmarks', href: currentPath })
      } else if (segment === 'admin') {
        items.push({ label: 'Admin', href: currentPath })
      } else if (segment === 'subscribers') {
        items.push({ label: 'Subscribers', href: currentPath })
      } else if (segment === 'category') {
        // Skip category, it's part of quiz structure
        return
      } else {
        // For dynamic segments like course/lesson slugs, use the label
        items.push({ label, href: currentPath })
      }
    })
    
    return items
  }
  
  const breadcrumbs = generateBreadcrumbs()
  
  // Don't show breadcrumbs on home page
  if (pathname === '/') {
    return null
  }
  
  return (
    <nav className="bg-gray-50 border-b border-gray-200" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 py-3 text-sm">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index === 0 ? (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-purple-600 transition-colors flex items-center"
                >
                  <HomeIcon className="h-4 w-4 mr-1" />
                  {item.label}
                </Link>
              ) : (
                <>
                  <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2" />
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-gray-900 font-medium" aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-500 hover:text-purple-600 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
