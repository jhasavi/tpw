'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface TooltipProps {
  id: string
  target: string
  title: string
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  showOnce?: boolean
  isVisible: boolean
  onDismiss: () => void
}

function Tooltip({ id, title, content, position = 'bottom', isVisible, onDismiss }: TooltipProps) {
  if (!isVisible) return null

  const positionClasses = {
    top: '-top-2 left-1/2 -translate-x-1/2 -translate-y-full mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  }

  const arrowClasses = {
    top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-gray-900',
    bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-gray-900',
    left: 'right-0 top-1/2 -translate-y-1/2 translate-x-full border-l-gray-900',
    right: 'left-0 top-1/2 -translate-y-1/2 -translate-x-full border-r-gray-900'
  }

  return (
    <div className={`absolute ${positionClasses[position]} z-50 w-80`}>
      <div className="bg-gray-900 text-white rounded-lg shadow-xl p-4 relative">
        {/* Arrow */}
        <div className={`absolute w-0 h-0 border-8 border-transparent ${arrowClasses[position]}`} />
        
        {/* Content */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">{title}</h4>
            <p className="text-xs text-gray-300">{content}</p>
          </div>
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-white flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Got it button */}
        <button
          onClick={onDismiss}
          className="mt-3 w-full bg-white text-gray-900 px-4 py-2 rounded text-xs font-medium hover:bg-gray-100"
        >
          Got it!
        </button>
      </div>
    </div>
  )
}

interface TooltipConfig {
  id: string
  target: string
  title: string
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  showOnce?: boolean
  order: number
}

const TOOLTIP_CONFIGS: TooltipConfig[] = [
  {
    id: 'dashboard-welcome',
    target: 'dashboard',
    title: '👋 Welcome to your Dashboard!',
    content: 'This is your personal learning hub. Track progress, view achievements, and access your courses.',
    position: 'bottom',
    showOnce: true,
    order: 1
  },
  {
    id: 'profile-avatar',
    target: 'profile-avatar',
    title: '📸 Personalize Your Profile',
    content: 'Upload an avatar and complete your profile to unlock achievements!',
    position: 'left',
    showOnce: true,
    order: 2
  },
  {
    id: 'progress-tab',
    target: 'progress-tab',
    title: '📊 Track Your Progress',
    content: 'View detailed statistics, achievements, and learning streaks here.',
    position: 'bottom',
    showOnce: true,
    order: 3
  },
  {
    id: 'bookmarks-feature',
    target: 'bookmarks',
    title: '🔖 Save for Later',
    content: 'Bookmark courses and lessons to quickly access them later.',
    position: 'bottom',
    showOnce: true,
    order: 4
  },
  {
    id: 'quiz-system',
    target: 'quiz-button',
    title: '🎯 Test Your Knowledge',
    content: 'Take quizzes to earn points and track your understanding.',
    position: 'top',
    showOnce: true,
    order: 5
  },
  {
    id: 'streak-tracker',
    target: 'streak',
    title: '🔥 Build Your Streak',
    content: 'Complete lessons daily to maintain your learning streak!',
    position: 'bottom',
    showOnce: true,
    order: 6
  }
]

interface TooltipSystemProps {
  user: User
  currentPage: string
}

export default function TooltipSystem({ user, currentPage }: TooltipSystemProps) {
  const supabase = createClient()
  const [seenTooltips, setSeenTooltips] = useState<Set<string>>(new Set())
  const [currentTooltip, setCurrentTooltip] = useState<TooltipConfig | null>(null)
  const [visibleTooltips, setVisibleTooltips] = useState<Set<string>>(new Set())

  useEffect(() => {
    loadSeenTooltips()
  }, [user.id])

  useEffect(() => {
    showNextTooltip()
  }, [seenTooltips, currentPage])

  const loadSeenTooltips = async () => {
    const { data } = await supabase
      .from('user_tooltips_seen')
      .select('tooltip_id')
      .eq('user_id', user.id)

    if (data) {
      setSeenTooltips(new Set(data.map((t: any) => t.tooltip_id)))
    }
  }

  const showNextTooltip = () => {
    // Find page-relevant tooltips that haven't been seen
    const relevantTooltips = TOOLTIP_CONFIGS
      .filter(t => 
        t.target.includes(currentPage) && 
        !seenTooltips.has(t.id) &&
        !visibleTooltips.has(t.id)
      )
      .sort((a, b) => a.order - b.order)

    if (relevantTooltips.length > 0) {
      const next = relevantTooltips[0]
      setCurrentTooltip(next)
      setVisibleTooltips(prev => new Set([...prev, next.id]))
      
      // Auto-show after 1 second
      setTimeout(() => {
        const element = document.querySelector(`[data-tooltip="${next.target}"]`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 1000)
    }
  }

  const dismissTooltip = async (tooltipId: string) => {
    // Mark as seen in database
    await supabase
      .from('user_tooltips_seen')
      .insert({
        user_id: user.id,
        tooltip_id: tooltipId
      })

    // Update local state
    setSeenTooltips(prev => new Set([...prev, tooltipId]))
    setCurrentTooltip(null)
    
    // Show next tooltip after a delay
    setTimeout(() => showNextTooltip(), 1500)
  }

  // Wrapper components for attaching tooltips
  return {
    Tooltip: (props: Omit<TooltipProps, 'isVisible' | 'onDismiss'>) => (
      <Tooltip
        {...props}
        isVisible={currentTooltip?.id === props.id}
        onDismiss={() => dismissTooltip(props.id)}
      />
    ),
    
    // Helper to wrap elements with tooltip targets
    TooltipTarget: ({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) => (
      <div data-tooltip={id} className={`relative ${className}`}>
        {children}
        {currentTooltip?.target === id && (
          <Tooltip
            id={currentTooltip.id}
            target={currentTooltip.target}
            title={currentTooltip.title}
            content={currentTooltip.content}
            position={currentTooltip.position}
            isVisible={true}
            onDismiss={() => dismissTooltip(currentTooltip.id)}
          />
        )}
      </div>
    ),

    seenCount: seenTooltips.size,
    totalCount: TOOLTIP_CONFIGS.length
  }
}

// Export individual component for direct use
export { Tooltip, TOOLTIP_CONFIGS }
