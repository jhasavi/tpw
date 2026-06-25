import type { User } from '@supabase/supabase-js'
import { janaganaPurpleWings } from '@/lib/janagana-portal'

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
  external?: boolean
}

export interface UserMenuConfig {
  user: User | null
  loading: boolean
  onSignOut: () => void
}

const learnPaths = ['/courses', '/learn', '/guides', '/quiz/personality', '/quiz/retirement-readiness', '/life-stage', '/life-events', '/tools', '/faq']
const communityPaths = ['/events', '/stories', '/blog', '/community', '/get-involved', '/newsletter', '/media', '/come-back']
const aboutPaths = ['/about', '/impact', '/ambassador', '/campaigns', '/press', '/partnerships', '/corporate-sponsors', '/contact']

// Top-level nav: Learn | Community | About | CTA — mirrors footer structure
export const navigationConfig: NavItem[] = [
  {
    label: 'Learn',
    dropdown: [
      { label: 'Self-Study Portal', href: '/learn', icon: '📖' },
      { label: 'All Courses', href: '/courses', icon: '📚' },
      { label: 'Topic Guides', href: '/guides', icon: '📝' },
      { label: "Women's Curriculum", href: '/learn/womens-financial-literacy', icon: '💜' },
      { label: '40-Hour Professional', href: '/learn/finra-40-hour', icon: '🎓' },
      { label: 'Personality Quiz', href: '/quiz/personality', icon: '🧠' },
      { label: 'Life Stages', href: '/life-stage/40s', icon: '🌱' },
      { label: 'Life Events Guide', href: '/life-events', icon: '🌟' },
      { label: 'Financial Tools', href: '/tools', icon: '🛠️' },
      { label: 'FAQ', href: '/faq', icon: '❓' },
    ],
    isActive: (pathname) => learnPaths.some((path) => pathname.startsWith(path)),
  },
  {
    label: 'Community',
    dropdown: [
      { label: 'Events', href: '/events', icon: '📅' },
      {
        label: 'Classes on JanaGana',
        href: janaganaPurpleWings.events(),
        icon: '🎓',
        external: true,
      },
      { label: 'Success Stories', href: '/stories', icon: '✨' },
      { label: 'Blog', href: '/blog', icon: '✍️' },
      { label: 'Community Forum', href: '/community', icon: '👥' },
      { label: 'Get Involved', href: '/get-involved', icon: '🙋' },
      { label: 'Weekly Newsletter', href: '/newsletter/subscribe', icon: '📬' },
      {
        label: 'Class Updates (JanaGana)',
        href: janaganaPurpleWings.newsletter('/newsletter/subscribe'),
        icon: '📧',
        external: true,
      },
      { label: 'Media Coverage', href: '/media', icon: '📰' },
      { label: 'Comeback Plan', href: '/come-back', icon: '🔁' },
    ],
    isActive: (pathname) => communityPaths.some((path) => pathname.startsWith(path)),
  },
  {
    label: 'About',
    dropdown: [
      { label: 'Our Mission', href: '/about', icon: '💜' },
      { label: 'Impact Report', href: '/impact', icon: '📊' },
      { label: 'Ambassador Program', href: '/ambassador', icon: '🦋' },
      { label: 'Purple Wings Challenge', href: '/campaigns/purple-wings-challenge', icon: '🏆' },
      { label: 'Press Kit', href: '/press', icon: '📰' },
      { label: 'Partnerships', href: '/partnerships', icon: '🤝' },
      { label: 'Corporate Sponsors', href: '/corporate-sponsors', icon: '🏦' },
      { label: 'Contact', href: '/contact', icon: '📞' },
    ],
    isActive: (pathname) => aboutPaths.some((path) => pathname.startsWith(path)),
  },
  {
    label: 'Take Assessment',
    href: '/quiz/retirement-readiness',
    isActive: (pathname) => pathname === '/quiz/retirement-readiness',
    isCTA: true,
  },
]

export const getUserMenuItems = ({ user, loading, onSignOut }: UserMenuConfig): NavDropdownItem[] => {
  if (loading || !user) {
    return []
  }

  return [
    {
      label: user.email || 'User',
      divider: true,
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: '📊',
    },
    {
      label: 'Profile',
      href: '/dashboard?tab=profile',
      icon: '👤',
    },
    {
      divider: true,
    },
    {
      label: 'Sign Out',
      icon: '🚪',
      onClick: onSignOut,
      destructive: true,
    },
  ]
}
