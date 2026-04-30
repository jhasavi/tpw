'use client'

import { useEffect, useState, useRef } from 'react'

interface JanaganaEventsProps {
  title?: string
}

export function JanaganaEvents({ title }: JanaganaEventsProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Wait for DOM to be ready and script to load
    const initializeWidget = () => {
      console.log('[Debug] Container ref:', containerRef.current)
      console.log('[Debug] window.Janagana:', typeof window !== 'undefined' ? window.Janagana : 'window not defined')

      if (containerRef.current && typeof window !== 'undefined' && window.Janagana) {
        setLoaded(true)
        console.log('[Debug] Initializing widget...')

        try {
          window.Janagana.events('janagana-events', {
            title: title || 'Upcoming Events'
          })
        } catch (err) {
          console.error('JanaGana Events widget error:', err)
          setError('Failed to load events')
        }
      } else {
        console.error('[Debug] Missing container or script')
        setError('Events widget failed to load')
      }
    }

    // Try immediately first
    initializeWidget()

    // If not ready, wait and retry
    const retryInterval = setInterval(() => {
      if (!loaded) {
        initializeWidget()
      } else {
        clearInterval(retryInterval)
      }
    }, 1000)

    // Timeout after 10 seconds
    const timeout = setTimeout(() => {
      clearInterval(retryInterval)
      if (!loaded) {
        console.error('[Debug] Timeout reached')
        setError('Events widget failed to load')
      }
    }, 10000)

    return () => {
      clearInterval(retryInterval)
      clearTimeout(timeout)
    }
  }, [title])

  if (error) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>{error}</p>
        <p className="text-sm mt-2">Please check browser console for details</p>
      </div>
    )
  }

  if (!loaded) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Loading events...</p>
      </div>
    )
  }

  return <div id="janagana-events" ref={containerRef} />
}
