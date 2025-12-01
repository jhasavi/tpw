import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

const blogPosts = [
  {
    title: 'Taking the First Step: Starting The Purple Wings',
    slug: 'taking-the-first-step',
    excerpt: 'The story of how The Purple Wings began - from a personal passion to help women overcome financial fear to building a community of learners.',
    content: `# Taking the First Step: Starting The Purple Wings

January 2021 marked the beginning of an incredible journey. After witnessing too many women struggle with financial decisions during life-changing moments, I knew something had to change.

## The Moment That Changed Everything

When my father passed away, I watched my mother face financial uncertainty with fear and confusion. Despite being an educated, capable woman, she felt lost in a world of financial jargon and complex decisions. This wasn't just her story - it was the story of countless women I met in our community.

## Why Financial Literacy Matters

Financial literacy isn't just about money - it's about confidence, independence, and security. It's about women having the knowledge to:
- Make informed decisions about their future
- Protect themselves during life transitions
- Build wealth for their families
- Achieve their dreams without financial fear

## The Vision

I envisioned a place where women could learn at their own pace, ask questions without judgment, and build confidence in their financial abilities. The Purple Wings was born from this vision - a safe space for financial empowerment.

## Starting Small

We began with just a few friends meeting in my living room. Those early conversations were transformative. Women who had never discussed money openly began sharing their concerns, asking questions, and supporting each other.

## What I Learned

Those first months taught me invaluable lessons:
- Women hunger for financial knowledge but often don't know where to start
- Community and peer support are as important as the education itself
- There's no such thing as a "stupid question" when it comes to money
- Every woman's financial journey is unique and deserves respect

## Looking Forward

As I write this first blog post, I'm filled with hope and excitement. The Purple Wings is more than a financial education platform - it's a movement. A movement of women empowering women, learning together, and building brighter financial futures.

To every woman reading this: Your financial journey starts with a single step. Let's take that step together.

*Shalini Jha*  
*President & Founder, The Purple Wings*`,
    author: 'Shalini Jha',
    published_date: '2021-01-15',
    category: 'Community',
    tags: ['personal journey', 'community', 'women empowerment', 'getting started'],
    featured_image_url: '/images/Shalini.jpg',
    is_published: true,
    is_featured: true
  },
  {
    title: 'From Living Room to Community: Our First Year',
    slug: 'first-year-journey',
    excerpt: 'Reflecting on the challenges, surprises, and incredible growth during The Purple Wings\' first year of operation.',
    content: `# From Living Room to Community: Our First Year

As we celebrate our first anniversary, I find myself amazed at how far we've come. What started as informal gatherings has grown into a thriving community of women committed to financial empowerment.

## The Early Days

Our first "class" had six attendees - five friends and one brave woman who responded to a community board posting. We sat around my dining table, drinking chai and discussing budgeting basics. The nervousness I felt that day was palpable, but so was the hunger for knowledge.

*Shalini Jha - January 2022*`,
    author: 'Shalini Jha',
    published_date: '2022-01-20',
    category: 'Community',
    tags: ['first year', 'growth', 'community building', 'reflection'],
    featured_image_url: '/images/1st-gathering_Jul23-2.jpeg',
    is_published: true,
    is_featured: true
  },
  {
    title: 'Partnerships and Growth: Finding Our Wings',
    slug: 'partnerships-and-growth',
    excerpt: 'How collaborations with local organizations and financial institutions helped The Purple Wings soar to new heights.',
    content: `# Partnerships and Growth: Finding Our Wings

Two years into our journey, The Purple Wings experienced transformational growth through strategic partnerships that amplified our impact and expanded our reach.

*Shalini Jha - June 2023*`,
    author: 'Shalini Jha',
    published_date: '2023-06-10',
    category: 'Growth',
    tags: ['partnerships', 'growth', 'collaboration', 'community'],
    featured_image_url: '/images/Class-4.jpeg',
    is_published: true,
    is_featured: false
  },
  {
    title: 'Voices of Change: Stories from Our Community',
    slug: 'voices-of-change',
    excerpt: 'Powerful stories from women whose lives have been transformed through financial education and community support.',
    content: `# Voices of Change: Stories from Our Community

The true measure of The Purple Wings' impact isn't in our numbers or partnerships - it's in the transformed lives of the women we serve.

*Shalini Jha - March 2024*`,
    author: 'Shalini Jha',
    published_date: '2024-03-15',
    category: 'Success Stories',
    tags: ['testimonials', 'success stories', 'women empowerment', 'transformation'],
    featured_image_url: '/images/learners-3.jpg',
    is_published: true,
    is_featured: true
  },
  {
    title: 'Going Digital: Building Our Online Home',
    slug: 'going-digital',
    excerpt: 'The journey of creating a comprehensive online platform to reach women beyond Needham and provide 24/7 access to financial education.',
    content: `# Going Digital: Building Our Online Home

In 2025, The Purple Wings took a monumental step: creating a comprehensive online platform to extend our reach beyond in-person workshops and serve women everywhere.

*Shalini Jha - President & Founder - June 2025*`,
    author: 'Shalini Jha',
    published_date: '2025-06-20',
    category: 'Technology',
    tags: ['digital transformation', 'online learning', 'platform launch', 'nonprofit'],
    featured_image_url: '/images/TPW3.jpeg',
    is_published: true,
    is_featured: true
  }
]

async function insertBlogPosts() {
  console.log('Inserting blog posts...')
  
  for (const post of blogPosts) {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select()
    
    if (error) {
      console.error(`Error inserting "${post.title}":`, error.message)
    } else {
      console.log(`✓ Inserted: ${post.title}`)
    }
  }
  
  console.log('\\nDone!')
}

insertBlogPosts()
