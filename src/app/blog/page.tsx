import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Blog - Financial Education & Tips | The Purple Wings',
  description: 'Read expert articles on financial literacy, women\'s empowerment, budgeting, investing, and more.',
}

export const dynamic = 'force-dynamic'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  author: string
  published_date: string
  category: string
  tags: string[]
  featured_image_url: string
  is_featured: boolean
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_date', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }

  return data || []
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()
  const featuredPosts = blogPosts.filter(post => post.is_featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Financial Wisdom Blog</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Expert insights, practical tips, and inspiring stories to help you achieve financial independence.
          </p>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-center text-white shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">📬 Subscribe to Our Newsletter</h2>
            <p className="text-purple-100 mb-6">Get weekly financial tips delivered to your inbox!</p>
            <Link href="/newsletter/subscribe" className="inline-block">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                Subscribe Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-block p-6 bg-purple-100 rounded-full mb-4">
                <svg className="w-16 h-16 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon!</h2>
              <p className="text-gray-600 mb-6">
                We're working on exciting new blog content. Check back soon for financial tips and insights!
              </p>
              <Link href="/courses" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Explore Courses Instead
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col">
                  <div className="relative h-48 bg-gray-200">
                    <Image
                      src={post.featured_image_url}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    {post.is_featured && (
                      <span className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(post.published_date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-purple-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">By {post.author}</span>
                      <span className="text-purple-600 font-medium hover:text-purple-700">
                        Read more →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          )}
        </div>
      </section>
    </div>
  )
}
