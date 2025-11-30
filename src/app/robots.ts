import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/dashboard/',
          '/_next/',
          '/auth/callback',
        ],
      },
    ],
    sitemap: 'https://www.thepurplewings.org/sitemap.xml',
  }
}
