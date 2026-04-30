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
    // Wait for both Janagana script and container to be ready
    const checkInterval = setInterval(() => {
      if (typeof window !== 'undefined' && window.Janagana && containerRef.current) {
        clearInterval(checkInterval)
        setLoaded(true)

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

    // Timeout after 5 seconds
    const timeout = setTimeout(() => {
      clearInterval(checkInterval)
      if (!loaded) {
        console.error('JanaGana script failed to load or container not found')
        setError('Events widget failed to load')
      }
    }, 5000)

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
