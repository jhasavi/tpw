import Link from 'next/link'

type RevisitIdea = {
  id: number
  title: string
  description: string
  href: string
  cadence: string
  icon: string
}

const REVISIT_IDEAS: RevisitIdea[] = [
  {
    id: 1,
    title: 'Resume Your Last Lesson',
    description: 'Return in one click and continue exactly where you paused your learning.',
    href: '/dashboard',
    cadence: '2-3x per week',
    icon: '📘',
  },
  {
    id: 2,
    title: 'Take A 5-Minute Quiz',
    description: 'Build confidence quickly with short assessment check-ins.',
    href: '/quiz/personality',
    cadence: 'Weekly',
    icon: '🧠',
  },
  {
    id: 3,
    title: 'Join The Monthly Challenge',
    description: 'Stay accountable with a fresh monthly financial habit challenge.',
    href: '/campaigns/purple-wings-challenge',
    cadence: 'Monthly',
    icon: '🏆',
  },
  {
    id: 4,
    title: 'Register For Events',
    description: 'Attend free workshops so learning feels social and consistent.',
    href: '/events',
    cadence: 'Monthly',
    icon: '📅',
  },
  {
    id: 5,
    title: 'Use Financial Tools',
    description: 'Turn knowledge into action with calculators and planning tools.',
    href: '/tools',
    cadence: 'Weekly',
    icon: '🛠️',
  },
  {
    id: 6,
    title: 'Run A Life Event Checkup',
    description: 'Get tailored guidance for caregiving, divorce, retirement, or career shifts.',
    href: '/life-events',
    cadence: 'Monthly',
    icon: '🌟',
  },
  {
    id: 7,
    title: 'Revisit Saved Bookmarks',
    description: 'Pick up from saved lessons and close your learning loop.',
    href: '/bookmarks',
    cadence: 'Weekly',
    icon: '🔖',
  },
  {
    id: 8,
    title: 'Protect Your Streak',
    description: 'Small daily progress compounds into lasting confidence.',
    href: '/progress',
    cadence: 'Daily quick check',
    icon: '🔥',
  },
  {
    id: 9,
    title: 'Read A Success Story',
    description: 'See how women with similar challenges made measurable progress.',
    href: '/stories',
    cadence: 'Weekly inspiration',
    icon: '💜',
  },
  {
    id: 10,
    title: 'Get Weekly Email Nudges',
    description: 'Receive practical reminders so you do not lose momentum.',
    href: '/newsletter/subscribe',
    cadence: 'Weekly',
    icon: '📬',
  },
]

interface RevisitActionHubProps {
  title?: string
  description?: string
  className?: string
}

export default function RevisitActionHub({
  title = '10 Ways To Keep Users Coming Back',
  description = 'Each idea is now live on the site with a direct action path for returning users.',
  className = '',
}: RevisitActionHubProps) {
  return (
    <section className={`rounded-3xl border border-purple-100 bg-white p-8 shadow-lg ${className}`}>
      <div className="max-w-3xl">
        <p className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-700">
          Revisit Engine
        </p>
        <h2 className="mt-3 text-3xl font-bold text-gray-900">{title}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {REVISIT_IDEAS.map((idea) => (
          <Link
            key={idea.id}
            href={idea.href}
            className="group rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-purple-50 p-5 transition-all hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">Idea {idea.id}</p>
                <h3 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-purple-700">{idea.title}</h3>
              </div>
              <span className="text-2xl" aria-hidden="true">
                {idea.icon}
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-600">{idea.description}</p>
            <p className="mt-4 text-xs font-medium text-gray-500">Recommended cadence: {idea.cadence}</p>
            <p className="mt-3 text-sm font-semibold text-purple-700">Open action →</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
