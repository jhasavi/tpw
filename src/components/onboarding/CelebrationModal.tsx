'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface CelebrationModalProps {
  type: 'achievement' | 'milestone' | 'streak' | 'completion'
  title: string
  message: string
  icon?: string
  reward?: string
  shareText?: string
  onClose: () => void
}

export default function CelebrationModal({
  type,
  title,
  message,
  icon,
  reward,
  shareText,
  onClose
}: CelebrationModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTimeout(() => setIsVisible(true), 100)
    
    // Auto-close after 10 seconds
    const timer = setTimeout(() => {
      handleClose()
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(), 300)
  }

  const handleShare = async () => {
    if (shareText) {
      if (navigator.share) {
        try {
          await navigator.share({
            title: title,
            text: shareText,
            url: window.location.origin
          })
        } catch (error) {
          // User cancelled share
        }
      } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(shareText)
        alert('Copied to clipboard!')
      }
    }
  }

  const getBackgroundGradient = () => {
    switch (type) {
      case 'achievement':
        return 'from-yellow-400 via-orange-500 to-pink-500'
      case 'milestone':
        return 'from-purple-400 via-pink-500 to-red-500'
      case 'streak':
        return 'from-orange-400 via-red-500 to-pink-500'
      case 'completion':
        return 'from-green-400 via-blue-500 to-purple-500'
      default:
        return 'from-purple-400 to-pink-500'
    }
  }

  const getIconDisplay = () => {
    if (icon) return icon
    
    switch (type) {
      case 'achievement':
        return '🏆'
      case 'milestone':
        return '🎯'
      case 'streak':
        return '🔥'
      case 'completion':
        return '🎉'
      default:
        return '⭐'
    }
  }

  if (!mounted) return null

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'bg-black bg-opacity-50' : 'bg-transparent pointer-events-none'
      }`}
      onClick={handleClose}
    >
      {/* Confetti Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {['🎉', '⭐', '✨', '🎊', '🌟'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      {/* Modal */}
      <div
        className={`relative max-w-md w-full transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glowing background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient()} rounded-2xl blur-xl opacity-60 animate-pulse`}></div>

        {/* Content card */}
        <div className="relative bg-white rounded-2xl shadow-2xl p-8 text-center">
          {/* Icon */}
          <div className="text-8xl mb-4 animate-bounce">
            {getIconDisplay()}
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {title}
          </h2>

          {/* Message */}
          <p className="text-lg text-gray-600 mb-6">
            {message}
          </p>

          {/* Reward Badge */}
          {reward && (
            <div className={`inline-block px-6 py-3 bg-gradient-to-r ${getBackgroundGradient()} text-white rounded-full font-bold mb-6`}>
              {reward}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            {shareText && (
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share Achievement
              </button>
            )}
            
            <button
              onClick={handleClose}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all"
            >
              Continue Learning
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear infinite;
        }
      `}</style>
    </div>
  )

  return createPortal(modalContent, document.body)
}

// Hook to manage celebration queue
export function useCelebrationQueue(userId: string) {
  const [queue, setQueue] = useState<CelebrationModalProps[]>([])
  const [currentCelebration, setCurrentCelebration] = useState<CelebrationModalProps | null>(null)

  const addCelebration = (celebration: Omit<CelebrationModalProps, 'onClose'>) => {
    setQueue(prev => [...prev, celebration as CelebrationModalProps])
  }

  const showNext = () => {
    if (queue.length > 0 && !currentCelebration) {
      const [next, ...rest] = queue
      setCurrentCelebration(next)
      setQueue(rest)
    }
  }

  const handleClose = () => {
    setCurrentCelebration(null)
    // Show next after a brief delay
    setTimeout(() => showNext(), 500)
  }

  useEffect(() => {
    showNext()
  }, [queue, currentCelebration])

  return {
    addCelebration,
    CurrentCelebration: currentCelebration ? (
      <CelebrationModal {...currentCelebration} onClose={handleClose} />
    ) : null,
    queueLength: queue.length
  }
}
