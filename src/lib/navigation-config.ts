import type { User } from '@supabase/supabase-js'

export interface NavItem {
  label: string
  href?: string
  icon?: string
  dropdown?: NavDropdownItem[]
  isActive?: (pathname: string) => boolean
  isCTA?: boolean
}

export interface NavDropdownItem {
  label?: string
  href?: string
  icon?: string
  onClick?: () => void
  destructive?: boolean
  divider?: boolean
}

export interface UserMenuConfig {
  user: User | null
  loading: boolean
  onSignOut: () => void
}

// Navigation configuration
export const navigationConfig: NavItem[] = [
  {
    label: 'Stories',
    href: '/stories',
    isActive: (pathname) => pathname === '/stories'
  },
  {
    label: 'Life Stages',
    href: '/life-stage/40s',
    isActive: (pathname) => pathname.startsWith('/life-stage')
  },
  {
    label: 'Learn',
    dropdown: [
      {
        label: 'All Courses',
        href: '/courses',
        icon: '📚'
      },
      {
        label: 'Personality Quiz',
        href: '/quiz/personality',
        icon: '🧠'
      }
    ],
    isActive: (pathname) => ['/courses', '/quiz/personality'].some(path => pathname.startsWith(path))
  },
  {
    label: 'Resources',
    dropdown: [
      {
        label: 'Blog',
        href: '/blog',
        icon: '✍️'
      },
      {
        label: 'Media Coverage',
        href: '/media',
        icon: '📰'
      },
      {
        label: 'FAQ',
        href: '/faq',
        icon: '❓'
      },
      {
        label: 'Newsletter',
        href: '/newsletter/subscribe',
        icon: '📧'
      }
    ],
    isActive: (pathname) => ['/blog', '/media', '/faq', '/newsletter'].some(path => pathname.startsWith(path))
  },
  {
    label: 'About',
    dropdown: [
      {
        label: 'Our Mission',
        href: '/about',
        icon: '💜'
      },
      {
        label: 'Events',
        href: '/events',
        icon: '📅'
      },
      {
        label: 'Challenge',
        href: '/campaigns/purple-wings-challenge',
        icon: '🏆'
      },
      {
        label: 'Partnerships',
        href: '/partnerships',
        icon: '🤝'
      },
      {
        label: 'Contact',
        href: '/contact',
        icon: '📞'
      }
    ],
    isActive: (pathname) => ['/about', '/events', '/campaigns', '/partnerships', '/contact'].some(path => pathname.startsWith(path))
  },
  {
    label: 'Start Assessment',
    href: '/quiz/retirement-readiness',
    isActive: (pathname) => pathname === '/quiz/retirement-readiness',
    isCTA: true
  }
]

export const getUserMenuItems = ({ user, loading, onSignOut }: UserMenuConfig): NavDropdownItem[] => {
  if (loading) {
    return []
  }

  if (!user) {
    return []
  }

  return [
    {
      label: user.email || 'User',
      divider: true
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: '📊'
    },
    {
      label: 'Profile',
      href: '/dashboard?tab=profile',
      icon: '👤'
    },
    {
      divider: true
    },
    {
      label: 'Sign Out',
      icon: '🚪',
      onClick: onSignOut,
      destructive: true
    }
  ]
}
