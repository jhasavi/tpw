'use client'

import { useState } from 'react'
import Link from 'next/link'

const tiers = [
  {
    name: 'Community Partner',
    price: '$1,000',
    period: 'per year',
    color: 'gray',
    icon: '🌱',
    highlight: false,
    benefits: [
      'Logo on our website Partners page',
      'Mention in monthly newsletter (5,000+ subscribers)',
      'Tax-deductible donation receipt',
      'Annual impact report with your contribution noted',
      'Certificate of Appreciation',
    ],
    cra: 'Qualifies as community development contribution toward CRA exam',
    best_for: 'Credit unions, small community banks',
  },
  {
    name: 'Silver Partner',
    price: '$5,000',
    period: 'per year',
    color: 'silver',
    icon: '🥈',
    highlight: false,
    benefits: [
      'Everything in Community Partner, plus:',
      '"Supported by [Your Name]" on 1 course module',
      'Logo on homepage & partnerships page',
      'Quarterly impact updates with engagement data',
      '1 co-branded workshop per year (virtual or in-person)',
      'Social media shout-out (3 posts)',
    ],
    cra: 'Strong CRA credit — documented community development education activity',
    best_for: 'Regional banks, credit unions',
  },
  {
    name: 'Gold Partner',
    price: '$10,000',
    period: 'per year',
    color: 'gold',
    icon: '🥇',
    highlight: true,
    benefits: [
      'Everything in Silver, plus:',
      '"Presented by [Your Name]" on 2 course modules',
      'Featured case study on our website & social media',
      '2 co-branded workshops per year',
      'Employee financial wellness workshop for your staff',
      'Speaking slot at 1 Purple Wings event',
      'Quarterly executive briefings with impact data',
      'Custom demographics report of your sponsored audience',
    ],
    cra: 'Excellent CRA credit — can be documented in your CRA plan as targeted financial education for LMI populations',
    best_for: 'Mid-size regional banks, insurance companies',
  },
  {
    name: 'Platinum Founding Partner',
    price: '$25,000+',
    period: 'per year',
    color: 'platinum',
    icon: '💎',
    highlight: false,
    benefits: [
      'Everything in Gold, plus:',
      '"Founding Partner" designation on all marketing materials',
      'Named scholarship fund ("Your Bank Financial Empowerment Fund")',
      'Unlimited co-branded workshops',
      'Advisory Board seat (if desired)',
      'Full curriculum naming rights for one learning track',
      'Priority speaking opportunities at community events',
      'Dedicated partnership manager',
      'Custom impact report for your board/ESG report',
    ],
    cra: 'Premier CRA credit — qualifies as significant community development activity with documented LMI outreach',
    best_for: 'National banks, large financial institutions, corporate foundations',
  },
]

const craStats = [
  {
    icon: '🏘️',
    title: 'LMI Outreach',
    body: 'Our programs directly serve Low-to-Moderate Income women — a core CRA assessment criterion under the Community Development prong.',
  },
  {
    icon: '📋',
    title: 'Documented Activity',
    body: 'We provide detailed participation records, demographic data, and outcome reports for your CRA examination file.',
  },
  {
    icon: '🎓',
    title: 'Financial Education',
    body: 'CRA examiners give credit for financial literacy education that benefits underserved communities — exactly what we deliver.',
  },
  {
    icon: '🏆',
    title: 'Community Development',
    body: 'As a 501(c)(3) nonprofit, donations to The Purple Wings qualify as community development investments under CRA.',
  },
]

const faqs = [
  {
    q: 'How does this help with our CRA rating?',
    a: 'The Community Reinvestment Act requires banks to serve all communities in their assessment area, including Low-to-Moderate Income populations. Supporting The Purple Wings creates documented evidence of financial education outreach. We provide all the documentation you need for your CRA examination.',
  },
  {
    q: 'Can we brand course modules with our logo?',
    a: 'Yes — Silver tier and above allows co-branding on specific course modules. Your institution\'s name appears as "Supported by [Your Name]" or "Presented by [Your Name]" within the course. This gives you visibility to thousands of women completing that content.',
  },
  {
    q: 'What demographics do your users represent?',
    a: 'Our platform serves women of all ages and backgrounds, with a significant portion of LMI women in Eastern Massachusetts. We can provide aggregate demographic data for your reporting needs. Our Needham, MA roots give us strong community connections throughout Greater Boston.',
  },
  {
    q: 'Can we conduct employee financial wellness workshops?',
    a: 'Absolutely. Gold and Platinum partners receive in-person or virtual financial wellness workshops for your employees. This is a tangible benefit for your team while demonstrating community investment.',
  },
  {
    q: 'How do we document this for our annual report?',
    a: 'We issue a formal partnership letter, provide quarterly impact data, and produce a custom year-end report documenting your contribution\'s community reach. This is designed to satisfy both CRA examiners and ESG/DEI report requirements.',
  },
]

function DonationCalculator() {
  const [amount, setAmount] = useState(5000)

  const women = Math.round((amount / 100) * 5)
  const workshops = Math.round(amount / 500)
  const months = Math.round(amount / 100 * 12)

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-200 max-w-lg mx-auto">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">💰 Donation Impact Calculator</h3>
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Your contribution: <span className="text-purple-700 text-lg">${amount.toLocaleString()}</span>
        </label>
        <input
          type="range"
          min="1000"
          max="50000"
          step="1000"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>$1,000</span>
          <span>$25,000</span>
          <span>$50,000</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-purple-50 rounded-xl p-4">
          <div className="text-3xl font-bold text-purple-700">{women}</div>
          <div className="text-xs text-gray-600 mt-1">women gain full-year access</div>
        </div>
        <div className="bg-indigo-50 rounded-xl p-4">
          <div className="text-3xl font-bold text-indigo-700">{workshops}</div>
          <div className="text-xs text-gray-600 mt-1">community workshops funded</div>
        </div>
        <div className="bg-purple-50 rounded-xl p-4">
          <div className="text-3xl font-bold text-purple-700">{months}</div>
          <div className="text-xs text-gray-600 mt-1">months of content development</div>
        </div>
      </div>
      <p className="text-xs text-gray-400 text-center mt-4">Estimates based on program operating costs</p>
    </div>
  )
}

export default function CorporateSponsorsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 text-sm font-semibold mb-6">
            🏦 Corporate & Institutional Giving
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Invest in Women&apos;s Financial Independence
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-4">
            Partner with The Purple Wings — a 501(c)(3) nonprofit delivering free financial literacy education.
            Your investment qualifies for CRA credit, enhances ESG reporting, and creates measurable community impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/contact?subject=partnership"
              className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Talk to Our Partnerships Team →
            </Link>
            <a
              href="#tiers"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              View Sponsorship Tiers ↓
            </a>
          </div>
        </div>
      </section>

      {/* CRA Compliance Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-green-100 text-green-800 rounded-full px-4 py-2 text-sm font-semibold mb-4">
              ✅ Community Reinvestment Act (CRA) Compliant
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Donation Works Twice
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Supporting The Purple Wings isn&apos;t just charitable giving — it&apos;s a strategic investment that
              satisfies CRA community development requirements, strengthens your ESG profile, and builds
              genuine goodwill in the communities your institution serves.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {craStats.map((stat) => (
              <div key={stat.title} className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="text-3xl mb-3">{stat.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{stat.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{stat.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-blue-50 border border-blue-200 rounded-2xl p-6 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <span className="text-3xl">📑</span>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">What We Provide for CRA Documentation</h3>
                <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                  <li>Formal 501(c)(3) donation acknowledgment letter</li>
                  <li>Quarterly participation and engagement reports</li>
                  <li>Demographic data on population served (aggregate, privacy-compliant)</li>
                  <li>Year-end comprehensive impact report formatted for CRA examiners</li>
                  <li>Program description aligned with CRA Community Development criteria</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Calculator */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">See Your Impact</h2>
            <p className="text-lg text-gray-600">Move the slider to calculate the impact of your contribution</p>
          </div>
          <DonationCalculator />
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section id="tiers" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sponsorship Tiers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the partnership level that aligns with your institution&apos;s community investment goals.
              All tiers provide tax-deductible donations to a 501(c)(3) organization.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-6 flex flex-col border-2 ${
                  tier.highlight
                    ? 'border-purple-500 shadow-xl bg-gradient-to-br from-purple-50 to-indigo-50 scale-105'
                    : 'border-gray-200 bg-white shadow-sm hover:shadow-md'
                } transition-all`}
              >
                {tier.highlight && (
                  <div className="text-center mb-3">
                    <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <div className="text-3xl mb-2 text-center">{tier.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-1">{tier.name}</h3>
                <div className="text-center mb-4">
                  <span className="text-3xl font-extrabold text-purple-700">{tier.price}</span>
                  <span className="text-gray-400 text-sm"> / {tier.period}</span>
                </div>
                <p className="text-xs text-gray-500 text-center mb-4 italic">Best for: {tier.best_for}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {tier.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-xs text-green-800 font-medium">🏦 CRA: {tier.cra}</p>
                </div>
                <Link
                  href="/contact?subject=partnership"
                  className={`block text-center py-3 rounded-xl font-bold transition-colors ${
                    tier.highlight
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  Get Started →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESG Alignment */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">ESG & DEI Alignment</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Supporting The Purple Wings directly advances your institution&apos;s Environmental, Social,
              and Governance (ESG) and Diversity, Equity & Inclusion (DEI) commitments.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                pillar: 'Social (S)',
                icon: '👥',
                points: [
                  'Financial inclusion for underserved women',
                  'Reducing the gender wealth gap',
                  'Community education & empowerment',
                  'LMI population outreach',
                ],
              },
              {
                pillar: 'Governance (G)',
                icon: '🏛️',
                points: [
                  'Supports regulatory CRA requirements',
                  'Transparent impact reporting',
                  'Documented community development',
                  '501(c)(3) accountability',
                ],
              },
              {
                pillar: 'DEI',
                icon: '🌍',
                points: [
                  'Serves women of all backgrounds',
                  'Free access removes economic barriers',
                  'Multilingual-ready content',
                  'Mentorship across demographics',
                ],
              },
            ].map((item) => (
              <div key={item.pillar} className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{item.pillar}</h3>
                <ul className="space-y-2">
                  {item.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-purple-400 mt-0.5">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <span className="text-purple-600 font-bold text-xl ml-4">
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-700 to-indigo-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Invest in Women&apos;s Financial Independence?
          </h2>
          <p className="text-purple-100 text-lg mb-8">
            Let&apos;s discuss a partnership that meets your CRA requirements, advances your ESG goals,
            and genuinely changes women&apos;s financial lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?subject=partnership"
              className="bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors shadow-lg"
            >
              Schedule a Partnership Call →
            </Link>
            <Link
              href="/impact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
            >
              View Our Impact Report
            </Link>
          </div>
          <p className="text-purple-200 text-sm mt-6">
            501(c)(3) EIN available upon request. All donations are tax-deductible.
          </p>
        </div>
      </section>
    </div>
  )
}
