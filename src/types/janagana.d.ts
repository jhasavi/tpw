declare global {
  interface Window {
    Janagana: {
      init: (options: { tenantSlug: string; apiUrl?: string; debug?: boolean }) => void
      newsletter: (containerId: string, options?: { title?: string; description?: string }) => void
      events: (containerId: string, options?: { title?: string }) => void
      login: (containerId: string, options?: { title?: string }) => void
    }
  }
}

export {}
