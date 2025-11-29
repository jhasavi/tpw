import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Financial Education & Tips | The Purple Wings',
  description: 'Read expert articles on financial literacy, women\'s empowerment, budgeting, investing, and more.',
}

const blogPosts = [
  {
    id: 'fi-why-matters',
    title: "Why Financial Independence Matters for Women",
    slug: 'why-financial-independence-matters-for-women',
    excerpt: 'Financial independence is about freedom, security, and the power to choose. Here is why it uniquely matters for women and how to get started.',
    author: 'Editorial Team',
    publishedAt: '2025-10-30',
    category: 'Financial Independence',
    tags: ['financial-independence', 'women-and-money', 'foundations'],
    featuredImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200',
    isFeatured: true,
  },
  {
    id: 'fi-10-steps',
    title: '10 Practical Steps to Build Financial Independence',
    slug: '10-practical-steps-financial-independence',
    excerpt: 'From budgeting and emergency savings to credit, debt, and retirement—ten focused actions to build momentum without overwhelm.',
    author: 'Editorial Team',
    publishedAt: '2025-10-30',
    category: 'Guides',
    tags: ['checklist', 'budgeting', 'credit', 'retirement'],
    featuredImage: 'https://images.unsplash.com/photo-1553729784-e91953dec042?w=1200',
    isFeatured: true,
  },
  {
    id: 'negotiation-comp',
    title: 'Negotiation for Women: Beyond Base Salary',
    slug: 'negotiation-for-women-beyond-base-salary',
    excerpt: 'Compensation is more than base pay. Learn what to negotiate and how to frame your value.',
    author: 'Career Finance Team',
    publishedAt: '2025-10-30',
    category: 'Career',
    tags: ['career', 'negotiation', 'compensation'],
    featuredImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=1200',
  },
  {
    id: 'life-changes-plan',
    title: 'Planning for Life Changes: Caregiving, Divorce, and Loss',
    slug: 'planning-for-life-changes-caregiving-divorce-loss',
    excerpt: 'Build resilience with a readiness plan for caregiving, separation, or loss, without derailing long-term goals.',
    author: 'Editorial Team',
    publishedAt: '2025-10-30',
    category: 'Planning',
    tags: ['caregiving', 'divorce', 'resilience'],
    featuredImage: 'https://images.unsplash.com/photo-1484980859177-5ac1249fda6f?w=1200',
  },
]

export default function BlogPage() {
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col">
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    {post.isFeatured && (
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
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { 
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
        </div>
      </section>
    </div>
  )
}
