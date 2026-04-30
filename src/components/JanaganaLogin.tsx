'use client'

import { useEffect } from 'react'

interface JanaganaLoginProps {
  title?: string
}

export function JanaganaLogin({ title }: JanaganaLoginProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Janagana) {
      window.Janagana.login('janagana-login', {
        title: title || 'Member Portal'
      })
    }
  }, [title])

  return <div id="janagana-login" />
}
