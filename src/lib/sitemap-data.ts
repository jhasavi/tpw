import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'
import { GUIDE_SLUGS } from '@/data/guides'

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thepurplewings.org').replace(/\/$/, '')

export async function buildSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/learn`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/courses`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/guides`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/quiz`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/quiz/personality`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/quiz/retirement-readiness`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/life-events`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/life-stage/40s`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/life-stage/50s`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/life-stage/60s`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/get-involved`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/newsletter/subscribe`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/search`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const guidePages: MetadataRoute.Sitemap = GUIDE_SLUGS.map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const quizCategoryPages: MetadataRoute.Sitemap = Array.from({ length: 11 }, (_, i) => ({
    url: `${baseUrl}/quiz/category/${i + 1}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  let learnPages: MetadataRoute.Sitemap = []
  let blogPages: MetadataRoute.Sitemap = []

  try {
    const supabase = await createClient()

    const { data: curricula } = await supabase.from('curricula').select('slug')
    for (const c of curricula ?? []) {
      learnPages.push({
        url: `${baseUrl}/learn/${c.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.9,
      })
    }

    const { data: courses } = await supabase
      .from('courses')
      .select('slug, curricula!inner(slug)')
      .order('display_order')

    for (const course of courses ?? []) {
      const row = course as { slug: string; curricula: { slug: string } | { slug: string }[] }
      const curriculumSlug = Array.isArray(row.curricula) ? row.curricula[0]?.slug : row.curricula?.slug
      if (!curriculumSlug) continue
      learnPages.push({
        url: `${baseUrl}/learn/${curriculumSlug}/${row.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.85,
      })
    }

    const { data: lessons } = await supabase
      .from('lessons')
      .select('slug, courses!inner(slug, curricula!inner(slug))')
      .order('display_order')

    for (const lesson of lessons ?? []) {
      const raw = lesson as unknown as {
        slug: string
        courses: { slug: string; curricula: { slug: string } } | { slug: string; curricula: { slug: string } }[]
      }
      const coursesRel = raw.courses
      const courseObj = Array.isArray(coursesRel) ? coursesRel[0] : coursesRel
      const courseSlug = courseObj?.slug
      const curriculumSlug = courseObj?.curricula?.slug
      if (!courseSlug || !curriculumSlug) continue
      learnPages.push({
        url: `${baseUrl}/learn/${curriculumSlug}/${courseSlug}/${lesson.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }

    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_date')
      .eq('is_published', true)

    blogPages = (posts ?? []).map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updated_at ? new Date(post.updated_at) : new Date(post.published_date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  } catch (e) {
    console.error('Sitemap: Supabase fetch failed, using static entries only', e)
  }

  return [...staticPages, ...guidePages, ...quizCategoryPages, ...learnPages, ...blogPages]
}
