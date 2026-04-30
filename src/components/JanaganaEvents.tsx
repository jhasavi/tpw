'use client'

import { useEffect, useState, useCallback } from 'react'

interface JanaganaEventsProps {
  title?: string
}

export function JanaganaEvents({ title }: JanaganaEventsProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initializeWidget = useCallback((container: HTMLElement | null) => {
    if (!container || typeof window === 'undefined' || !window.Janagana) {
      return
    }

    try {
      container.innerHTML = ''
      window.Janagana.events('janagana-events', {
        title: title || 'Upcoming Events'
      })
      setLoaded(true)
      setError(null)
    } catch (err) {
      console.error('JanaGana Events widget error:', err)
      setError('Failed to load events')
    }
  }, [title])

  useEffect(() => {
    const checkAndInitialize = () => {
      const container = document.getElementById('janagana-events')
      if (container && typeof window !== 'undefined' && window.Janagana) {
        initializeWidget(container)
        return true
      }
      return false
    }

    if (checkAndInitialize()) {
      return
    }

    const retryInterval = setInterval(() => {
      if (checkAndInitialize()) {
        clearInterval(retryInterval)
        clearTimeout(timeout)
      }
    }, 500)

    const timeout = setTimeout(() => {
      clearInterval(retryInterval)
      if (!loaded) {
        setError('Events widget failed to load')
      }
    }, 10000)

    return () => {
      clearInterval(retryInterval)
      clearTimeout(timeout)
    }
  }, [title, initializeWidget, loaded])

  return (
    <div>
      {!loaded && !error && (
        <div className="text-center py-8 text-gray-500">
          <p>Loading events...</p>
        </div>
      )}
      {error && (
        <div className="text-center py-8 text-gray-500">
          <p>{error}</p>
          <p className="text-sm mt-2">Please check browser console for details</p>
        </div>
      )}
      <div id="janagana-events" className={loaded || !error ? '' : 'hidden'} />
    </div>
  )
}
