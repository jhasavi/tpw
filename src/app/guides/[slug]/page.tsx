import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GUIDE_SLUGS, getGuideBySlug } from '@/data/guides'
import { generateSEO, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'

interface GuidePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) return { title: 'Guide not found' }
  return generateSEO({
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: guide.keywords,
    canonicalPath: `/guides/${slug}`,
  })
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) notFound()

  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thepurplewings.org'
  const pageUrl = `${base.replace(/\/$/, '')}/guides/${slug}`

  const schemas = [
    generateFAQSchema(guide.faqs),
    generateBreadcrumbSchema([
      { name: 'Home', url: base },
      { name: 'Guides', url: `${base}/guides` },
      { name: guide.title, url: pageUrl },
    ]),
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-indigo-50">
      <JsonLd data={schemas} />
      <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-purple-200 mb-4">
            <Link href="/guides" className="hover:text-white">Guides</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{guide.title}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold">{guide.title}</h1>
          <p className="mt-4 text-lg text-purple-100">{guide.intro}</p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="rounded-xl border border-purple-100 bg-white p-6 mb-10 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-3">On this page</h2>
          <ul className="space-y-2 text-sm">
            {guide.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-purple-700 hover:underline">{s.title}</a>
              </li>
            ))}
            <li><a href="#faq" className="text-purple-700 hover:underline">FAQ</a></li>
          </ul>
        </nav>

        {guide.sections.map((section) => (
          <section key={section.id} id={section.id} className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>
          </section>
        ))}

        <div className="my-10 rounded-xl bg-purple-600 p-6 text-center text-white">
          <p className="font-semibold">Ready to go deeper?</p>
          <Link href={guide.courseCta.href} className="mt-3 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-purple-700 hover:bg-purple-50">
            {guide.courseCta.label} →
          </Link>
        </div>

        <section id="faq" className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently asked questions</h2>
          <div className="space-y-4">
            {guide.faqs.map((faq) => (
              <details key={faq.question} className="rounded-xl border border-purple-100 bg-white p-5 shadow-sm group">
                <summary className="cursor-pointer font-semibold text-gray-900 list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sources & further reading</h2>
          <ul className="space-y-2">
            {guide.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                  {s.title} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  )
}
