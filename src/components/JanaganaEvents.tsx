'use client'

import { useEffect } from 'react'

interface JanaganaEventsProps {
  title?: string
}

export function JanaganaEvents({ title }: JanaganaEventsProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Janagana) {
      window.Janagana.events('janagana-events', {
        title: title || 'Upcoming Events'
      })
    }
  }, [title])

  return <div id="janagana-events" />
}
