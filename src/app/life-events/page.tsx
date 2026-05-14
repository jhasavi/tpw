import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Life Events Financial Guide | The Purple Wings',
  description:
    'Step-by-step financial guidance for life\'s biggest transitions: divorce, job loss, death of a spouse, new baby, and more. Free resources for women.',
  keywords:
    'financial guide divorce, women financial crisis, job loss money tips, death of spouse finances, new baby budget, women financial independence life events',
  openGraph: {
    title: 'Life Events Financial Guide | The Purple Wings',
    description:
      'Financial steps for every major life transition — divorce, job loss, new baby, widowhood. Practical guidance for women.',
    images: [{ url: '/images/Women-fin.png', width: 1200, height: 630, alt: 'Life Events Financial Guide' }],
  },
  alternates: { canonical: 'https://www.thepurplewings.org/life-events' },
}

const lifeEvents = [
  {
    id: 'divorce',
    emoji: '🔑',
    title: 'Going Through a Divorce',
    subtitle: 'Protecting your financial future during one of life\'s hardest transitions',
    urgency: 'Immediate',
    urgencyColor: 'red',
    immediateSteps: [
      'Open individual bank and credit card accounts in your name only',
      'Pull your credit report (free at AnnualCreditReport.com) to see all joint accounts',
      'Gather 3-5 years of tax returns, pay stubs, and bank statements',
      'Make copies of all financial documents before attorneys are involved',
      'Document all marital assets: home value, retirement accounts, investments, debts',
    ],
    financialConsiderations: [
      { title: 'Retirement Accounts', body: 'A QDRO (Qualified Domestic Relations Order) is needed to divide 401(k)s and pensions without tax penalties. Consult a divorce attorney.' },
      { title: 'Social Security', body: 'If married 10+ years, you may qualify for benefits on your ex-spouse\'s record (up to 50% of their benefit) — even if they remarry.' },
      { title: 'Health Insurance', body: 'COBRA coverage continues for 36 months post-divorce. Apply within 60 days. Compare with marketplace plans at healthcare.gov.' },
      { title: 'Tax Filing', body: 'Your filing status changes. Understand head-of-household rules if you have dependents. Keep records of all divorce-related expenses.' },
      { title: 'Credit', body: 'Remove yourself from joint accounts or refinance jointly held debt. Your credit score may change — monitor it monthly.' },
    ],
    resources: [
      { label: 'Free Credit Report', url: 'https://www.annualcreditreport.com' },
      { label: 'Healthcare Marketplace', url: 'https://www.healthcare.gov' },
      { label: 'Social Security Benefits', url: 'https://www.ssa.gov' },
    ],
    stat: '25% of women fall into poverty within 5 years of divorce',
    statSource: 'National Women\'s Law Center',
  },
  {
    id: 'job-loss',
    emoji: '💼',
    title: 'Losing a Job',
    subtitle: 'Financial steps to take in the first 30 days after job loss',
    urgency: 'Week 1',
    urgencyColor: 'orange',
    immediateSteps: [
      'File for unemployment insurance the same day you lose your job (benefits start from filing date)',
      'Calculate your "runway" — how many months of expenses do your savings cover?',
      'Review and cut all non-essential subscriptions and recurring charges',
      'Call lenders proactively — many have hardship programs before you miss payments',
      'Update your LinkedIn and resume immediately while your work is fresh',
    ],
    financialConsiderations: [
      { title: 'Unemployment Benefits', body: 'Apply at your state\'s unemployment website immediately. Massachusetts typically pays 50% of your average weekly wage, up to $1,015/week. Benefits last up to 30 weeks.' },
      { title: 'Health Insurance', body: 'You have 60 days to enroll in COBRA (expensive) or a marketplace plan. Job loss is a "qualifying life event" — you don\'t have to wait for open enrollment.' },
      { title: 'Emergency Fund', body: 'Prioritize: housing, utilities, food, minimum debt payments. Everything else is optional. The 50/30/20 budget becomes 70/0/30 during crisis mode.' },
      { title: 'Retirement Accounts', body: 'Avoid withdrawing from 401(k) unless absolutely necessary — you\'ll pay taxes + 10% penalty. Rolling to an IRA preserves the funds.' },
      { title: 'Side Income', body: 'Consider freelancing, consulting, tutoring, or gig work. Even $500/month buys you 2-4 extra months of runway.' },
    ],
    resources: [
      { label: 'MA Unemployment Filing', url: 'https://www.mass.gov/unemployment' },
      { label: 'Benefits.gov', url: 'https://www.benefits.gov' },
      { label: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs' },
    ],
    stat: 'Women have 6.6% lower unemployment benefits on average due to lower pre-job wages',
    statSource: 'National Employment Law Project',
  },
  {
    id: 'widowhood',
    emoji: '🌸',
    title: 'Death of a Spouse or Partner',
    subtitle: 'Financial tasks for the first year, so you can grieve without financial crisis',
    urgency: 'First 30 Days',
    urgencyColor: 'purple',
    immediateSteps: [
      'Get 10-15 certified copies of the death certificate (needed for every account)',
      'Notify Social Security (1-800-772-1213) within 30 days',
      'Contact your spouse\'s employer about final paycheck, life insurance, and pension',
      'Don\'t make major financial decisions for at least 6 months',
      'Freeze or reduce access to joint accounts temporarily to prevent fraud',
    ],
    financialConsiderations: [
      { title: 'Social Security Survivor Benefits', body: 'You may be eligible for your spouse\'s full Social Security benefit if it\'s larger than yours. Apply at your local SSA office. There is no automatic enrollment.' },
      { title: 'Life Insurance', body: 'File claims with every life insurance policy. Gather policy documents, the death certificate, and claim forms from each insurer. Benefits are typically tax-free.' },
      { title: 'Estate Probate', body: 'Assets without beneficiary designations go through probate (expensive, slow). A probate attorney can help. Assets with named beneficiaries transfer directly.' },
      { title: 'Tax Filing', body: 'You can file jointly for the year of death. For 2 more years after, you may qualify as a "qualifying surviving spouse" with better tax rates if you have dependents.' },
      { title: 'Retirement Accounts', body: 'As a spouse beneficiary, you can roll inherited IRAs into your own account — more flexibility than other beneficiaries. Consult a financial advisor on RMD rules.' },
    ],
    resources: [
      { label: 'Social Security Survivor Benefits', url: 'https://www.ssa.gov/benefits/survivors/' },
      { label: 'What to Do When Someone Dies', url: 'https://www.benefits.gov' },
      { label: 'Grief Financial Counseling', url: 'https://www.cfpboard.org' },
    ],
    stat: '80% of women will be solely responsible for their finances at some point in their lives',
    statSource: 'Fidelity Investments',
  },
  {
    id: 'new-baby',
    emoji: '👶',
    title: 'Having a New Baby',
    subtitle: 'Financial preparation before and after welcoming a child',
    urgency: 'Before Birth',
    urgencyColor: 'green',
    immediateSteps: [
      'Check your employer\'s paid/unpaid family leave policy — know your rights',
      'Open a 529 college savings account (even $25/month makes a difference)',
      'Update your life insurance — a $500,000 term policy typically costs $20-30/mo',
      'Create or update your will and name a guardian for your child',
      'Calculate your new monthly budget including childcare (often $1,500-$3,000/month)',
    ],
    financialConsiderations: [
      { title: 'Family & Medical Leave', body: 'Federal FMLA provides 12 weeks unpaid. Massachusetts PFML provides paid leave — up to 12 weeks at up to $1,149/week in 2024. Apply through mass.gov.' },
      { title: 'Childcare Costs', body: 'Average childcare in Massachusetts: $2,500-$4,000/month for infants. Start researching at least 12 months before your due date — waitlists are long.' },
      { title: 'Dependent Care FSA', body: 'Use your employer\'s FSA to pay for childcare with pre-tax dollars — saves 20-30% depending on your tax bracket. Enroll during open enrollment.' },
      { title: 'Child Tax Credit', body: 'You may qualify for the Child Tax Credit ($2,000 per child) and possibly the Child and Dependent Care Credit. Talk to a tax professional.' },
      { title: 'Emergency Fund', body: 'Grow your emergency fund to 6 months of expenses before birth. Children create unexpected costs — medical, childcare gaps, parental leave pay gaps.' },
    ],
    resources: [
      { label: 'MA Paid Family Leave', url: 'https://www.mass.gov/paid-family-and-medical-leave' },
      { label: '529 College Savings', url: 'https://www.ma529.com' },
      { label: 'WIC Program', url: 'https://www.mass.gov/wic' },
    ],
    stat: 'Mothers earn 69 cents for every dollar fathers earn — the "motherhood penalty"',
    statSource: 'National Partnership for Women & Families',
  },
  {
    id: 'career-change',
    emoji: '🚀',
    title: 'Changing Careers',
    subtitle: 'Managing finances through a career pivot, including income gaps and retraining',
    urgency: '3-6 Months Before',
    urgencyColor: 'blue',
    immediateSteps: [
      'Build a 6-month emergency fund before leaving your current job',
      'Research salary ranges for target roles at Glassdoor, Levels.fyi, and LinkedIn',
      'Roll over your old 401(k) to an IRA within 60 days to avoid taxes and penalties',
      'Update all professional profiles, resume, and LinkedIn before your last day',
      'Negotiate your end date to maximize benefits (vacation payout, vesting dates)',
    ],
    financialConsiderations: [
      { title: 'Income Gap Planning', body: 'If there\'s a gap between jobs, calculate exactly how long your savings last. Reduce non-essential spending by 30% during the gap period.' },
      { title: 'Benefits Bridge', body: 'Your health insurance, FSA, and other benefits end on your last day. Have a bridge plan ready — COBRA, spouse\'s plan, or marketplace coverage.' },
      { title: 'Salary Negotiation', body: 'A career change is your best opportunity to reset your salary. Negotiate aggressively — employers expect it, and the cost of under-negotiating compounds over your career.' },
      { title: 'Reskilling Costs', body: 'Many employers offer tuition reimbursement ($5,250/year tax-free). Take advantage before leaving. Community colleges often offer certification programs for $1,000-$5,000.' },
      { title: 'Networking ROI', body: 'Up to 80% of jobs are filled through networking. Invest in LinkedIn Premium ($40/month) during your search — it typically pays for itself with one introduction.' },
    ],
    resources: [
      { label: 'Glassdoor Salaries', url: 'https://www.glassdoor.com/Salaries' },
      { label: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning' },
      { label: 'SBA Women\'s Business Center', url: 'https://www.sba.gov/local-assistance/resource-partners/womens-business-centers' },
    ],
    stat: 'Women who negotiate their salary earn an average of $1 million more over their career',
    statSource: 'Carnegie Mellon University Research',
  },
  {
    id: 'retirement',
    emoji: '🏖️',
    title: 'Planning for Retirement',
    subtitle: 'Financial checklist for the 5-10 years before and after you stop working',
    urgency: '5-10 Years Before',
    urgencyColor: 'teal',
    immediateSteps: [
      'Run a Social Security benefit estimate at ssa.gov to see your projected benefit',
      'Calculate your retirement number: annual expenses × 25 (the 4% rule)',
      'Maximize catch-up contributions ($7,500 extra/year in 401(k) if age 50+)',
      'Review your investment allocation — most women hold too much cash as they approach retirement',
      'Enroll in Medicare Part A at 65 even if still working (no premium)',
    ],
    financialConsiderations: [
      { title: 'Claiming Social Security', body: 'Each year you delay claiming (from 62 to 70) increases your benefit by 5-8%. Women who live to their 80s typically benefit from waiting. Run the break-even analysis.' },
      { title: 'Medicare', body: 'Medicare begins at 65. You have a 7-month enrollment window around your 65th birthday. Missing it causes permanent premium penalties.' },
      { title: 'Sequence of Returns Risk', body: 'The order of investment returns matters more in retirement than accumulation. Consider a "bucket strategy" — keep 2-3 years of expenses in cash/bonds.' },
      { title: 'Required Minimum Distributions', body: 'Traditional IRA and 401(k) RMDs begin at age 73 (as of 2023). Plan withdrawals to manage your tax bracket in retirement.' },
      { title: 'Long-Term Care', body: 'Women are 3x more likely to need long-term care than men. A policy or a funded long-term care plan should be in place by your early 60s.' },
    ],
    resources: [
      { label: 'Social Security Estimator', url: 'https://www.ssa.gov/myaccount/' },
      { label: 'Medicare.gov', url: 'https://www.medicare.gov' },
      { label: 'Free Financial Counseling (CFPB)', url: 'https://www.consumerfinance.gov' },
    ],
    stat: 'Women retire with 30% less savings than men on average, yet live 5+ years longer',
    statSource: 'Vanguard Research, 2023',
  },
]

const urgencyColors: Record<string, string> = {
  red: 'bg-red-100 text-red-700 border-red-200',
  orange: 'bg-orange-100 text-orange-700 border-orange-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  green: 'bg-green-100 text-green-700 border-green-200',
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  teal: 'bg-teal-100 text-teal-700 border-teal-200',
}

export default function LifeEventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 text-sm font-semibold mb-6">
            🌟 Life Events Financial Guide
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Your Money Through Life&apos;s Biggest Moments
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Whether you&apos;re navigating divorce, job loss, widowhood, a new baby, or retirement —
            here are the exact financial steps to take, in plain language, built for women.
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-white border-b border-gray-200 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-2">
            {lifeEvents.map((e) => (
              <a
                key={e.id}
                href={`#${e.id}`}
                className="whitespace-nowrap px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors flex-shrink-0"
              >
                {e.emoji} {e.title.split(' ').slice(0, 2).join(' ')}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Life Events */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {lifeEvents.map((event) => (
            <div key={event.id} id={event.id} className="scroll-mt-20">
              {/* Event Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl flex-shrink-0">{event.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{event.title}</h2>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${urgencyColors[event.urgencyColor]}`}>
                      Act: {event.urgency}
                    </span>
                  </div>
                  <p className="text-gray-600 text-lg">{event.subtitle}</p>
                </div>
              </div>

              {/* Stat callout */}
              <div className="bg-purple-50 border-l-4 border-purple-600 rounded-r-xl p-4 mb-6">
                <p className="text-purple-900 font-semibold">📊 {event.stat}</p>
                <p className="text-purple-600 text-sm">— {event.statSource}</p>
              </div>

              {/* Immediate Steps */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-red-100 text-red-600 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">!</span>
                  Immediate Action Steps
                </h3>
                <ol className="space-y-3">
                  {event.immediateSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Financial Considerations */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {event.financialConsiderations.map((fc) => (
                  <div key={fc.title} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-2 text-sm">{fc.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{fc.body}</p>
                  </div>
                ))}
              </div>

              {/* Resources */}
              <div className="bg-white rounded-xl border border-purple-200 p-4">
                <h4 className="font-bold text-gray-900 mb-3 text-sm">🔗 Helpful Resources</h4>
                <div className="flex flex-wrap gap-2">
                  {event.resources.map((r) => (
                    <a
                      key={r.label}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm bg-purple-50 text-purple-700 hover:bg-purple-100 px-3 py-1.5 rounded-lg font-medium transition-colors border border-purple-200"
                    >
                      {r.label} ↗
                    </a>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-b border-gray-200 mt-12" />
            </div>
          ))}
        </div>
      </section>

      {/* Deep-dive CTA */}
      <section className="py-16 bg-gradient-to-br from-purple-700 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Go Deeper on Any Topic</h2>
          <p className="text-purple-100 text-lg mb-8">
            Our free courses cover each of these life events in detail — with real scenarios,
            worksheets, and quizzes to solidify your knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors shadow-lg"
            >
              Browse Free Courses →
            </Link>
            <Link
              href="/tools"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Use Financial Calculators
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
