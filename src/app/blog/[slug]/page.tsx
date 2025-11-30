import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  published_date: string
  category: string
  tags: string[]
  featured_image_url: string
  is_featured: boolean
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  return data
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  return {
    title: `${post.title} | The Purple Wings Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-4 text-purple-200">
            <Link href="/blog" className="hover:text-white">
              ← Back to Blog
            </Link>
            <span>|</span>
            <span className="text-sm">{post.category}</span>
            <span>|</span>
            <span className="text-sm">
              {new Date(post.published_date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-purple-100 mb-6">
            {post.excerpt}
          </p>
          <div className="text-sm text-purple-200">
            By {post.author}
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.featured_image_url && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-12">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="prose prose-lg prose-purple max-w-none">
            {post.content.split('\n').map((paragraph, idx) => {
              if (paragraph.startsWith('# ')) {
                return <h1 key={idx} className="text-4xl font-bold text-gray-900 mt-8 mb-4">{paragraph.substring(2)}</h1>
              } else if (paragraph.startsWith('## ')) {
                return <h2 key={idx} className="text-3xl font-bold text-gray-900 mt-8 mb-4">{paragraph.substring(3)}</h2>
              } else if (paragraph.startsWith('### ')) {
                return <h3 key={idx} className="text-2xl font-bold text-gray-900 mt-6 mb-3">{paragraph.substring(4)}</h3>
              } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <p key={idx} className="font-bold text-gray-900 mb-2">{paragraph.replace(/\*\*/g, '')}</p>
              } else if (paragraph.startsWith('- ')) {
                return <li key={idx} className="text-gray-700 ml-6 mb-2">{paragraph.substring(2)}</li>
              } else if (paragraph.trim() === '') {
                return <div key={idx} className="h-4"></div>
              } else {
                return <p key={idx} className="text-gray-700 mb-4 leading-relaxed">{paragraph}</p>
              }
            })}
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">📬 Enjoyed this article?</h3>
          <p className="text-purple-100 mb-6">Subscribe to get more financial wisdom delivered weekly!</p>
          <Link href="/newsletter/subscribe">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              Subscribe to Newsletter
            </button>
          </Link>
        </div>

        {/* Back to Blog */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            <span>←</span> Back to All Articles
          </Link>
        </div>
      </article>
    </div>
  )
}
