'use client'

import { useEffect, useState, useCallback } from 'react'

interface JanaganaEventsProps {
  title?: string
}

export function JanaganaEvents({ title }: JanaganaEventsProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initializeWidget = useCallback((container: HTMLElement | null) => {
    console.log('[Debug] Container element:', container)
    console.log('[Debug] window.Janagana:', typeof window !== 'undefined' ? window.Janagana : 'window not defined')

    if (container && typeof window !== 'undefined' && window.Janagana) {
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
  }, [title])

  useEffect(() => {
    // Wait for DOM to be ready and script to load
    const checkAndInitialize = () => {
      const container = document.getElementById('janagana-events')
      if (container || (typeof window !== 'undefined' && window.Janagana)) {
        initializeWidget(container)
      }
    }

    // Try immediately first
    checkAndInitialize()

    // If not ready, wait and retry
    const retryInterval = setInterval(() => {
      if (!loaded) {
        checkAndInitialize()
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
  }, [title, initializeWidget])

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

  return <div id="janagana-events" />
}
