import type { Metadata } from 'next'
import Link from 'next/link'
import DonateButton from '@/components/DonateButton'

export const metadata: Metadata = {
  title: 'Get Involved - Boston Women Empowerment Movement | The Purple Wings',
  description: 'Join The Purple Wings in Greater Boston. Volunteer, donate, partner, attend events, and help expand free financial education for women across Massachusetts.',
  alternates: {
    canonical: 'https://www.thepurplewings.org/get-involved',
  },
  openGraph: {
    title: 'Get Involved With The Purple Wings',
    description: 'Help build Greater Boston’s most trusted women’s financial empowerment movement.',
    url: 'https://www.thepurplewings.org/get-involved',
    type: 'website',
  },
}

const actionTracks = [
  {
    title: 'Volunteer',
    icon: '🤝',
    description: 'Teach workshops, mentor women, review lesson content, or host a local event in Greater Boston.',
    href: '/contact?subject=volunteer',
    cta: 'Volunteer With Us',
    accent: 'pink',
  },
  {
    title: 'Donate',
    icon: '🌱',
    description: 'Fund free education, local workshops, and practical resources for women who need financial confidence now.',
    href: '/contact?subject=donation',
    cta: 'Support The Mission',
    accent: 'emerald',
  },
  {
    title: 'Partner',
    icon: '🏛️',
    description: 'Bring your company, nonprofit, or community organization into an education-first partnership with local impact.',
    href: '/partnerships',
    cta: 'Explore Partnerships',
    accent: 'amber',
  },
  {
    title: 'Attend',
    icon: '📅',
    description: 'Join upcoming workshops, gatherings, and community events designed for women across Boston and Massachusetts.',
    href: '/events',
    cta: 'See Events',
    accent: 'purple',
  },
]

const ninetyDayPlan = [
  {
    phase: 'Days 1-30',
    title: 'Clarify The Movement',
    points: [
      'Lead with one clear message: free financial education for women in Greater Boston.',
      'Make volunteering, donating, and partnering as visible as signing up to learn.',
      'Use founder story, Boston 25 coverage, and local events as trust signals.',
    ],
  },
  {
    phase: 'Days 31-60',
    title: 'Build The Local Growth Engine',
    points: [
      'Recruit volunteer educators, mentors, and event hosts.',
      'Turn workshops and community events into repeatable lead-generation moments.',
      'Package clear sponsorship offers for Boston-area partners and employers.',
    ],
  },
  {
    phase: 'Days 61-90',
    title: 'Show Measurable Impact',
    points: [
      'Publish a simple Boston impact scoreboard with women served, events held, and supporters engaged.',
      'Share participant stories and supporter testimonials across the site.',
      'Create a repeatable monthly cadence for events, fundraising, and media outreach.',
    ],
  },
]

const impactRows = [
  ['A $100 gift', 'Supports outreach and educational materials for a local workshop.'],
  ['A $500 gift', 'Helps fund a free event, speaker logistics, or community programming.'],
  ['A corporate partner', 'Expands trusted financial education to women at scale across Greater Boston.'],
  ['A volunteer educator', 'Transforms expertise into real confidence for women making money decisions.'],
]

export default function GetInvolvedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <section className="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-purple-100">
              Greater Boston Action Plan
            </p>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
              Help build Boston&apos;s most trusted women&apos;s financial empowerment movement.
            </h1>
            <p className="mt-6 max-w-3xl text-xl text-purple-100 leading-relaxed">
              The Purple Wings is building a stronger future for women through free financial education, local community programming, and practical support designed for real life. This page turns that mission into action.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact?subject=volunteer"
                className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-4 font-semibold text-purple-900 hover:bg-purple-50 transition-colors"
              >
                Join As A Volunteer
              </Link>
              <DonateButton size="lg" variant="secondary" className="rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Four ways to move the mission forward</h2>
            <p className="mt-4 text-lg text-gray-600">
              If The Purple Wings is going to become the leading women&apos;s empowerment nonprofit in the Boston area, the site must make participation obvious. These are the four action paths we are building around.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {actionTracks.map((track) => (
              <div key={track.title} className="rounded-3xl border border-purple-100 bg-gradient-to-br from-white to-purple-50 p-8 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all">
                <div className="text-4xl mb-5">{track.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{track.title}</h3>
                <p className="text-gray-600 min-h-[120px]">{track.description}</p>
                <Link
                  href={track.href}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white hover:bg-purple-800 transition-colors"
                >
                  {track.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The 90-day execution roadmap</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Becoming the most trusted cause for women&apos;s empowerment in Greater Boston requires a repeatable operating rhythm, not just inspiration.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {ninetyDayPlan.map((item) => (
              <div key={item.phase} className="rounded-3xl bg-white p-8 shadow-sm border border-purple-100">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-600">{item.phase}</p>
                <h3 className="mt-3 text-2xl font-bold text-gray-900">{item.title}</h3>
                <ul className="mt-5 space-y-3 text-gray-600">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-1 text-purple-600">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl bg-slate-950 p-8 md:p-10 text-white shadow-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-300">Impact model</p>
              <h2 className="mt-3 text-3xl font-bold">What support makes possible</h2>
              <div className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
                {impactRows.map(([label, description]) => (
                  <div key={label} className="grid gap-3 px-6 py-5 md:grid-cols-[180px_1fr] md:items-center">
                    <div className="font-semibold text-purple-100">{label}</div>
                    <div className="text-slate-300">{description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Boston scoreboard</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-900">What we should measure every month</h2>
              <ul className="mt-6 space-y-4 text-gray-700">
                <li className="flex gap-3"><span className="text-amber-600">01</span><span>Women reached through courses, events, and local outreach</span></li>
                <li className="flex gap-3"><span className="text-amber-600">02</span><span>Volunteer inquiries, accepted roles, and active educators</span></li>
                <li className="flex gap-3"><span className="text-amber-600">03</span><span>Donation inquiries, completed gifts, and repeat donors</span></li>
                <li className="flex gap-3"><span className="text-amber-600">04</span><span>Boston-area partners, event registrations, and media mentions</span></li>
                <li className="flex gap-3"><span className="text-amber-600">05</span><span>Real stories collected from women whose confidence changed</span></li>
              </ul>
              <Link
                href="/stories"
                className="mt-8 inline-flex items-center justify-center rounded-xl border-2 border-amber-500 px-6 py-3 font-semibold text-amber-800 hover:bg-amber-100 transition-colors"
              >
                Read Community Stories
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-purple-700 to-indigo-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to help this cause lead in Boston?</h2>
          <p className="mt-4 text-xl text-purple-100">
            Start where you are. Learn, volunteer, donate, attend an event, or open a partnership conversation.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-4 font-semibold text-purple-900 hover:bg-purple-50 transition-colors"
            >
              Start Learning
            </Link>
            <Link
              href="/contact?subject=partnership"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white px-7 py-4 font-semibold text-white hover:bg-white hover:text-purple-900 transition-colors"
            >
              Talk About Partnership
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}