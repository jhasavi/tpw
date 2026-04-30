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
      if (!container) console.error('[Debug] Container is null/undefined')
      if (!window.Janagana) console.error('[Debug] Janagana script not loaded')
      setError('Events widget failed to load')
    }
  }, [title])

  useEffect(() => {
    // Wait for component to mount and DOM to be ready
    const timer = setTimeout(() => {
      const checkAndInitialize = () => {
        const container = document.getElementById('janagana-events')
        console.log('[Debug] Looking for container with ID: janagana-events')
        console.log('[Debug] Found container:', container)
        
        if (container && typeof window !== 'undefined' && window.Janagana) {
          initializeWidget(container)
        } else {
          // Try again if script is loaded but container not found
          if (typeof window !== 'undefined' && window.Janagana) {
            console.error('[Debug] Script loaded but container not found, retrying...')
            setTimeout(checkAndInitialize, 500)
          }
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
    }, 100) // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(timer)
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
