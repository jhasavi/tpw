import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Become a Brand Ambassador | The Purple Wings',
  description:
    'Join The Purple Wings Ambassador Program. Share free financial education with women in your community. No experience required — just passion for women\'s financial independence.',
  keywords:
    'The Purple Wings ambassador, women financial literacy volunteer, brand ambassador nonprofit, women empowerment ambassador program',
  openGraph: {
    title: 'Become a Purple Wings Ambassador',
    description:
      'Help us reach every woman who needs free financial education. Join our ambassador community.',
    images: [{ url: '/images/Women-fin.png', width: 1200, height: 630, alt: 'Purple Wings Ambassador Program' }],
  },
  alternates: { canonical: 'https://www.thepurplewings.org/ambassador' },
}

const ambassadorBenefits = [
  {
    icon: '🎓',
    title: 'Free Premium Access',
    body: 'Full access to all 135+ lessons, quizzes, and tools — forever free as a thank-you for spreading the mission.',
  },
  {
    icon: '🏆',
    title: 'Official Ambassador Badge',
    body: 'Digital badge for your LinkedIn profile, email signature, and social media — visible proof of your commitment to women\'s empowerment.',
  },
  {
    icon: '📦',
    title: 'Ambassador Toolkit',
    body: 'Ready-to-share social media posts, flyers, email templates, and talking points to spread the word effortlessly.',
  },
  {
    icon: '🤝',
    title: 'Private Community Access',
    body: 'Join our exclusive Ambassador Slack channel with direct access to the Purple Wings team, monthly calls, and peer support.',
  },
  {
    icon: '📰',
    title: 'Featured Recognition',
    body: 'Top ambassadors are featured on our website, in our newsletter, and in our social media — amplifying your personal brand.',
  },
  {
    icon: '🌱',
    title: 'Leadership Opportunities',
    body: 'Path to becoming a Chapter Leader, workshop facilitator, or advisory council member as the program grows.',
  },
]

const ambassadorTracks = [
  {
    track: 'Social Media Advocate',
    icon: '📱',
    commitment: '1-2 hours/month',
    activities: [
      'Share 4 Purple Wings posts per month on social media',
      'Create 1 original story/reel about your financial journey',
      'Engage with our content (likes, comments, shares)',
      'Recruit 5 women to sign up for free courses',
    ],
    best_for: 'Anyone active on Instagram, LinkedIn, TikTok, or Facebook',
  },
  {
    track: 'Community Connector',
    icon: '🏘️',
    commitment: '3-5 hours/month',
    activities: [
      'Host 1 in-person or virtual Purple Wings event per quarter',
      'Partner with local organizations (churches, libraries, women\'s groups)',
      'Table at community events to share our free resources',
      'Collect testimonials and success stories from participants',
    ],
    best_for: 'Community leaders, PTA members, faith community leaders, HR professionals',
  },
  {
    track: 'Workshop Facilitator',
    icon: '🎤',
    commitment: '5-8 hours/month',
    activities: [
      'Facilitate monthly financial literacy workshops using our curriculum',
      'Adapt content for specific groups (immigrants, young women, seniors)',
      'Provide feedback on curriculum to improve quality',
      'Mentor 1-2 women through their financial learning journey',
    ],
    best_for: 'Financial professionals, educators, coaches, HR/benefits specialists',
  },
]

const impactStats = [
  { number: '1 post', becomes: '~150 women reached', icon: '📲' },
  { number: '1 event', becomes: '25-50 women introduced', icon: '🎪' },
  { number: '1 referral', becomes: 'Free education for life', icon: '🎁' },
  { number: '1 year', becomes: 'Hundreds of lives changed', icon: '🦋' },
]

const testimonials = [
  {
    name: 'Maria R.',
    role: 'Community Ambassador, Needham MA',
    quote: 'I shared The Purple Wings with my book club of 12 women. Three of them have now completed entire courses. Seeing my friends gain financial confidence is the most rewarding thing I\'ve ever done.',
    avatar: 'M',
  },
  {
    name: 'Jennifer K.',
    role: 'Workshop Facilitator',
    quote: 'As a financial planner, I was looking for free resources I could share with clients who couldn\'t afford professional advice. The Purple Wings curriculum is genuinely excellent — I recommend it constantly.',
    avatar: 'J',
  },
  {
    name: 'Priya S.',
    role: 'Social Media Advocate',
    quote: 'I post about The Purple Wings on LinkedIn and I regularly get messages from women saying they needed exactly this. It takes 10 minutes a month and the impact is real.',
    avatar: 'P',
  },
]

export default function AmbassadorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-700 to-indigo-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 text-sm font-semibold mb-6">
            🦋 Ambassador Program
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Spread Your Financial Wings
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto mb-10">
            Become a Purple Wings Ambassador. Help us put free financial education in the hands of
            every woman who needs it — in your community and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?subject=ambassador"
              className="bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors shadow-lg"
            >
              Apply Now — It&apos;s Free →
            </Link>
            <a
              href="#tracks"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Explore Tracks ↓
            </a>
          </div>
          <p className="text-purple-200 text-sm mt-4">No financial background required. Just a passion for women&apos;s empowerment.</p>
        </div>
      </section>

      {/* Impact at a Glance */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">Your Action → Real Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {impactStats.map((stat) => (
              <div key={stat.number} className="text-center bg-purple-50 rounded-xl p-6">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="font-bold text-purple-700 text-lg mb-1">{stat.number}</div>
                <div className="text-gray-500 text-sm">→ {stat.becomes}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ambassador Benefits */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What You Receive</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ambassadorship is a two-way relationship. Here&apos;s what The Purple Wings provides to support your impact.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ambassadorBenefits.map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ambassador Tracks */}
      <section id="tracks" className="py-16 bg-white scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Track</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every ambassador chooses the level of involvement that fits their life. All tracks make a real difference.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {ambassadorTracks.map((track) => (
              <div key={track.track} className="border-2 border-purple-200 rounded-2xl p-6 hover:border-purple-500 hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">{track.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{track.track}</h3>
                <div className="inline-flex items-center bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-xs font-semibold mb-4">
                  ⏱ {track.commitment}
                </div>
                <ul className="space-y-2 mb-4">
                  {track.activities.map((act, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-purple-400 mt-0.5 flex-shrink-0">✓</span>
                      {act}
                    </li>
                  ))}
                </ul>
                <div className="bg-gray-50 rounded-lg p-3 mt-auto">
                  <p className="text-xs text-gray-500 font-medium">Best for: {track.best_for}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            From Our Ambassadors
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
                <p className="text-gray-700 italic leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-700 to-indigo-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Become an Ambassador?
          </h2>
          <p className="text-purple-100 text-lg mb-10 max-w-xl mx-auto">
            Tell us about yourself and the track that interests you. We&apos;ll send your
            ambassador toolkit within 48 hours.
          </p>
          <div className="bg-white/10 rounded-2xl p-8 mb-8 text-left max-w-xl mx-auto">
            <h3 className="font-bold text-white mb-4">What to include in your application:</h3>
            <ul className="space-y-2 text-purple-100 text-sm">
              <li>✓ Your name and location</li>
              <li>✓ Which ambassador track interests you</li>
              <li>✓ Why you care about women&apos;s financial independence</li>
              <li>✓ Your social media handles (if Social Media track)</li>
              <li>✓ Any professional background in finance, education, or community work</li>
            </ul>
          </div>
          <Link
            href="/contact?subject=ambassador"
            className="inline-flex items-center bg-white text-purple-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors shadow-lg"
          >
            Submit Your Application →
          </Link>
          <p className="text-purple-200 text-sm mt-4">
            100% free. No financial background required. Open to all women (and allies).
          </p>
        </div>
      </section>
    </div>
  )
}
