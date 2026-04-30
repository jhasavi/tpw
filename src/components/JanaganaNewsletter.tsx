'use client'

import { useEffect } from 'react'

interface JanaganaNewsletterProps {
  title?: string
  description?: string
}

export function JanaganaNewsletter({ title, description }: JanaganaNewsletterProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Janagana) {
      window.Janagana.newsletter('janagana-newsletter', {
        title: title || 'Subscribe to Our Newsletter',
        description: description || 'Get weekly financial tips and event updates'
      })
    }
  }, [title, description])

  return <div id="janagana-newsletter" />
}
