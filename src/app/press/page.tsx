import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import CopyBoilerplateButton from '@/components/CopyBoilerplateButton'

export const metadata: Metadata = {
  title: 'Press Kit & Media Resources | The Purple Wings',
  description:
    'Download press materials, access brand assets, and contact our media team. The Purple Wings is a 501(c)(3) nonprofit empowering women through free financial literacy education.',
  keywords:
    'The Purple Wings press kit, Shalini Jha media, women financial literacy nonprofit press, purple wings media resources',
  openGraph: {
    title: 'Press Kit & Media Resources | The Purple Wings',
    description:
      'Official press kit for The Purple Wings — a nonprofit empowering women through free financial education.',
    images: [{ url: '/images/Women-fin.png', width: 1200, height: 630, alt: 'The Purple Wings Press Kit' }],
  },
  alternates: { canonical: 'https://www.thepurplewings.org/press' },
}

const mediaCoverage = [
  {
    outlet: 'Needham Observer',
    headline: 'Program Encourages Women to Spread Financial Literacy Wings',
    date: 'March 2023',
    url: 'https://needhamobserver.com/program-encourages-women-to-spread-financial-literacy-wings/',
    logo: '📰',
    type: 'Feature Story',
  },
  {
    outlet: 'Boston 25 News',
    headline: 'Local Nonprofit Teaches Women to Take Control of Their Finances',
    date: 'April 2023',
    url: 'https://www.boston25.com',
    logo: '📺',
    type: 'TV Feature',
  },
  {
    outlet: 'Yahoo News',
    headline: 'The Purple Wings: Free Financial Education for Women in Massachusetts',
    date: 'May 2023',
    url: 'https://news.yahoo.com',
    logo: '🌐',
    type: 'Syndicated',
  },
]

const keyFacts = [
  { stat: '135+', label: 'Lessons Available', icon: '📚' },
  { stat: '1,000+', label: 'Quiz Questions', icon: '🧠' },
  { stat: '15', label: 'Finance Categories', icon: '📊' },
  { stat: '100%', label: 'Free to Users', icon: '💜' },
  { stat: '501(c)(3)', label: 'Nonprofit Status', icon: '🏛️' },
  { stat: 'Needham, MA', label: 'Founded', icon: '📍' },
]

const speakerTopics = [
  'Women & Wealth: Closing the Financial Confidence Gap',
  'Financial Literacy as a Social Justice Issue',
  'Building a Nonprofit Platform from Scratch: The Purple Wings Story',
  'Practical Budgeting for Women at Every Life Stage',
  'Investing Basics: Why Women are the Fastest-Growing Investor Group',
  'Navigating Financial Transitions: Divorce, Career Change & Widowhood',
]

export default function PressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 text-sm font-semibold mb-6">
            📰 Media & Press Resources
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Press Kit</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8">
            Everything journalists, podcast hosts, and media professionals need to cover
            The Purple Wings story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:media@thepurplewings.org"
              className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              📧 Contact Media Team
            </a>
            <Link
              href="/contact?subject=media"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              📅 Request an Interview
            </Link>
          </div>
        </div>
      </section>

      {/* Fast Facts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Fast Facts
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {keyFacts.map((fact) => (
              <div key={fact.stat} className="text-center bg-purple-50 rounded-xl p-6">
                <div className="text-3xl mb-2">{fact.icon}</div>
                <div className="text-2xl font-bold text-purple-700 mb-1">{fact.stat}</div>
                <div className="text-sm text-gray-600">{fact.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Organization */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About The Purple Wings</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  <strong>The Purple Wings</strong> is a 501(c)(3) nonprofit organization founded by Shalini Jha
                  in Needham, Massachusetts. Born during the COVID-19 pandemic when women faced unprecedented
                  financial vulnerability, the organization delivers comprehensive, free financial literacy
                  education designed specifically for women.
                </p>
                <p>
                  The platform offers 135+ lessons across topics including budgeting, investing, retirement
                  planning, insurance, real estate, and navigating financial transitions like divorce or job
                  loss — all available at no cost to users.
                </p>
                <p>
                  The Purple Wings serves women across Massachusetts and nationally, with a growing community
                  of learners building financial confidence and independence.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Boilerplate Copy</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed mb-4">
                <p>
                  The Purple Wings is a 501(c)(3) nonprofit organization empowering women through free
                  financial literacy education. Founded in Needham, MA by Shalini Jha, The Purple Wings
                  offers 135+ free lessons, 1,000+ quiz questions, and community support across 15
                  financial topics. The organization serves women at every life stage, from budgeting
                  basics to advanced investment strategies. Learn more at{' '}
                  <span className="text-purple-600 font-semibold">thepurplewings.org</span>.
                </p>
              </div>
              <CopyBoilerplateButton text="The Purple Wings is a 501(c)(3) nonprofit organization empowering women through free financial literacy education. Founded in Needham, MA by Shalini Jha, The Purple Wings offers 135+ free lessons, 1,000+ quiz questions, and community support across 15 financial topics. The organization serves women at every life stage, from budgeting basics to advanced investment strategies. Learn more at thepurplewings.org." />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Spotlight */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Founder & Spokesperson
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full bg-purple-200 flex items-center justify-center text-5xl overflow-hidden">
                    <Image
                      src="/images/Shalini.jpg"
                      alt="Shalini Jha, Founder of The Purple Wings"
                      width={128}
                      height={128}
                      className="rounded-full object-cover w-32 h-32"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Shalini Jha</h3>
                  <p className="text-purple-600 font-semibold mb-4">
                    President & Founder, The Purple Wings
                  </p>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Shalini Jha founded The Purple Wings during the COVID-19 pandemic after witnessing
                    firsthand how financial unpreparedness left many women vulnerable during times of
                    crisis. A community leader and financial literacy advocate based in Needham, MA,
                    she has built a free platform serving women across Massachusetts and beyond.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/contact?subject=media"
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
                    >
                      Book Shalini to Speak
                    </Link>
                    <Link
                      href="/about"
                      className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-50 transition-colors"
                    >
                      Full Biography →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speaking Topics */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Speaking Topics</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Shalini Jha is available for keynotes, panels, podcast appearances, and media interviews.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {speakerTopics.map((topic, i) => (
              <div key={i} className="bg-white rounded-xl p-5 flex items-start gap-3 shadow-sm border border-purple-100">
                <span className="text-purple-500 text-xl mt-0.5">🎤</span>
                <span className="text-gray-800 font-medium">{topic}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/contact?subject=media"
              className="inline-flex items-center bg-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition-colors shadow-md"
            >
              Request Shalini as a Speaker →
            </Link>
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            In the News
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {mediaCoverage.map((item) => (
              <a
                key={item.outlet}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-purple-300 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{item.logo}</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                    {item.type}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                  {item.headline}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-semibold text-gray-500">{item.outlet}</span>
                  <span className="text-sm text-gray-400">{item.date}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Brand Assets</h2>
            <p className="text-lg text-gray-600">
              Use these assets in your coverage. Please follow our brand guidelines.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center border border-purple-100 shadow-sm">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/images/logo-nobg.png" alt="The Purple Wings Logo" width={60} height={60} className="object-contain" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Logo (PNG)</h3>
              <p className="text-sm text-gray-500 mb-4">Transparent background, high resolution</p>
              <a
                href="/images/logo-nobg.png"
                download
                className="text-purple-600 text-sm font-semibold hover:text-purple-800"
              >
                ⬇ Download Logo
              </a>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-purple-100 shadow-sm">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                Aa
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Brand Colors</h3>
              <p className="text-sm text-gray-500 mb-4">Primary: #7C3AED · Secondary: #4338CA</p>
              <span className="text-purple-600 text-sm font-semibold">Purple & Indigo Palette</span>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-purple-100 shadow-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl">
                🦋
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Photo Library</h3>
              <p className="text-sm text-gray-500 mb-4">Workshop photos, founder portraits</p>
              <Link href="/contact?subject=media" className="text-purple-600 text-sm font-semibold hover:text-purple-800">
                Request Photos →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-16 bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Media Inquiries</h2>
          <p className="text-purple-100 text-lg mb-8">
            For interviews, podcast bookings, quotes, or additional materials, reach out to our media team.
            We typically respond within 24 hours.
          </p>
          <div className="bg-white/10 rounded-2xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <div className="text-purple-200 text-sm font-semibold uppercase tracking-wide mb-2">Media Contact</div>
                <div className="text-white font-bold text-lg">Shalini Jha</div>
                <div className="text-purple-100">President & Founder</div>
                <a href="mailto:media@thepurplewings.org" className="text-yellow-300 hover:text-yellow-200 mt-2 block">
                  media@thepurplewings.org
                </a>
              </div>
              <div>
                <div className="text-purple-200 text-sm font-semibold uppercase tracking-wide mb-2">Website</div>
                <div className="text-white font-bold text-lg">thepurplewings.org</div>
                <div className="text-purple-100">Needham, Massachusetts</div>
                <div className="text-purple-100 mt-2">501(c)(3) Nonprofit</div>
              </div>
            </div>
          </div>
          <Link
            href="/contact?subject=media"
            className="inline-flex items-center bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors shadow-lg"
          >
            Send Media Inquiry →
          </Link>
        </div>
      </section>
    </div>
  )
}
