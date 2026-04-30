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
    // Debug: Log script loading status
    console.log('[Debug] Checking for window.Janagana:', typeof window !== 'undefined' ? window.Janagana : 'window not defined')
    console.log('[Debug] Container ref:', containerRef.current)

    // Wait for both Janagana script and container to be ready
    const checkInterval = setInterval(() => {
      if (typeof window !== 'undefined' && window.Janagana && containerRef.current) {
        clearInterval(checkInterval)
        setLoaded(true)
        console.log('[Debug] Both script and container ready, initializing widget')

        try {
          window.Janagana.events('janagana-events', {
            title: title || 'Upcoming Events'
          })
        } catch (err) {
          console.error('JanaGana Events widget error:', err)
          setError('Failed to load events')
        }
      }
    }, 100)

    // Timeout after 10 seconds
    const timeout = setTimeout(() => {
      clearInterval(checkInterval)
      if (!loaded) {
        console.error('[Debug] Timeout - Script status:', typeof window !== 'undefined' ? window.Janagana : 'window not defined')
        console.error('[Debug] Container status:', containerRef.current)
        setError('Events widget failed to load')
      }
    }, 10000)

    return () => {
      clearInterval(checkInterval)
      clearTimeout(timeout)
    }
  }, [title])

  if (error) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>{error}</p>
        <p className="text-sm mt-2">Please check browser console for details</p>
        <p className="text-xs mt-2 text-gray-400">Debug info logged above</p>
      </div>
    )
  }

  if (!loaded) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Loading events...</p>
        <p className="text-xs mt-2 text-gray-400">Checking script and container...</p>
      </div>
    )
  }

  return <div id="janagana-events" ref={containerRef} />
}
