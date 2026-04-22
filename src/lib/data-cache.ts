import { unstable_cache } from 'next/cache'

// Cache duration constants (in seconds)
export const CACHE_DURATIONS = {
  SHORT: 60,        // 1 minute
  MEDIUM: 300,      // 5 minutes  
  LONG: 3600,       // 1 hour
  DAILY: 86400,    // 24 hours
} as const

// Cached Supabase client for public data
export const cachedSupabaseFetch = unstable_cache(
  async (query: string, variables: any[] = []) => {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    
    // Execute the query dynamically
    const result = await supabase.rpc('execute_cached_query', {
      query_string: query,
      query_variables: variables
    })
    
    return result
  },
  ['supabase-cache'],
  {
    revalidate: CACHE_DURATIONS.MEDIUM,
    tags: ['supabase-data']
  }
)

// Simple cache wrapper for common fetch patterns
export const cacheWrapper = <T>(
  key: string,
  fetcher: () => Promise<T>,
  revalidate: number = CACHE_DURATIONS.MEDIUM
) => {
  return unstable_cache(fetcher, [key], {
    revalidate,
    tags: [key]
  })()
}
