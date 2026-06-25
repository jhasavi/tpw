import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thepurplewings.org').replace(/\/$/, '')

export async function GET() {
  let items: { title: string; slug: string; excerpt: string; published_date: string }[] = []

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('blog_posts')
      .select('title, slug, excerpt, published_date')
      .eq('is_published', true)
      .order('published_date', { ascending: false })
      .limit(50)
    items = data ?? []
  } catch {
    /* empty feed */
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Purple Wings — Financial Education Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Free financial literacy articles for women</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <pubDate>${new Date(post.published_date).toUTCString()}</pubDate>
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
