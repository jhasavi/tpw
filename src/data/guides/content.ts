import type { Guide } from './types'

const CFPB = 'https://www.consumerfinance.gov'
const SEC = 'https://www.investor.gov'
const FTC = 'https://consumer.ftc.gov'

export const guides: Guide[] = [
  {
    slug: 'budgeting-for-women',
    title: 'Budgeting for Women: A Practical Self-Study Guide',
    metaTitle: 'Free Budgeting Guide for Women | Self-Study',
    metaDescription:
      'Learn how to build a realistic budget designed for women\'s real incomes, career breaks, and goals. Free step-by-step guide with action items.',
    keywords: ['budgeting for women', 'how to budget', 'women personal finance', 'free budgeting guide'],
    intro:
      'A budget is a plan for your money—not a punishment. Women often navigate unique financial pressures: the gender pay gap, caregiving breaks, longer life expectancy, and higher healthcare costs in retirement. This guide helps you build a budget that fits your life, based on principles from the CFPB and adapted for women\'s financial realities.',
    sections: [
      {
        id: 'why-budget',
        title: 'Why budgeting matters especially for women',
        content:
          'Women in the U.S. still earn less than men on average, are more likely to take career breaks for caregiving, and live longer—meaning savings must stretch further. A budget gives you visibility: where money goes today, and room to fund emergency savings, retirement, and goals. Without a plan, small leaks (subscriptions, dining out, unclear spending) compound into debt and stress.',
      },
      {
        id: 'methods',
        title: 'Choose a method that fits you',
        content:
          'Popular approaches include the 50/30/20 rule (needs, wants, savings), zero-based budgeting (every dollar assigned), and envelope-style limits per category. There is no single "right" method—the best one is the one you will use weekly. Start simple: list monthly take-home pay, then fixed bills, then variable spending, then savings goals.',
      },
      {
        id: 'steps',
        title: 'Five steps to your first working budget',
        content:
          '1) Track one month of spending (bank app or notebook). 2) List all income sources after tax. 3) Separate fixed vs. flexible expenses. 4) Set a realistic savings line—even $25/week counts. 5) Review weekly for 10 minutes and adjust. Expect the first month to be imperfect; iteration is normal.',
      },
      {
        id: 'women-tips',
        title: 'Women-specific budgeting tips',
        content:
          'Build a "career gap" line item if you may reduce hours. Negotiate salary and benefits—budgeting works better with higher inflows. Keep some discretionary money guilt-free; restrictive budgets fail. If you manage household finances jointly, maintain accounts or credit in your own name for long-term independence.',
      },
    ],
    faqs: [
      { question: 'How much should I save each month?', answer: 'Aim for at least 20% of take-home pay toward savings and debt payoff combined if possible. If that feels impossible, start with 5–10% and increase when you can. Emergency fund comes first.' },
      { question: 'What if my income varies?', answer: 'Budget using your lowest typical month, or a 3-month average. In high-income months, sweep extra to savings before lifestyle creep.' },
      { question: 'Do I need a budgeting app?', answer: 'No—a spreadsheet or notebook works. Apps help if they make review easier; choose free tools if paid subscriptions strain your budget.' },
      { question: 'Is budgeting different for single vs. married women?', answer: 'Core math is the same. Married or partnered women should clarify shared vs. personal goals and ensure individual retirement and credit visibility.' },
      { question: 'How often should I update my budget?', answer: 'Quick weekly check-ins and a deeper monthly review after bills cycle keep your plan accurate.' },
    ],
    courseCta: { label: 'Take the full Budgeting Basics course', href: '/learn/womens-financial-literacy/budgeting-basics' },
    sources: [
      { title: 'CFPB — Budgeting', url: `${CFPB}/consumer-tools/budgeting/` },
      { title: 'FDIC Money Smart', url: 'https://www.fdic.gov/resources/consumers/money-smart/' },
    ],
  },
  {
    slug: 'emergency-fund-guide',
    title: 'Emergency Fund Guide for Women',
    metaTitle: 'How Much Emergency Fund Do Women Need?',
    metaDescription:
      'Learn how much to save, where to keep it, and why an emergency fund is essential for women facing career gaps and caregiving costs.',
    keywords: ['emergency fund women', 'how much emergency savings', 'rainy day fund'],
    intro:
      'An emergency fund is cash set aside for true surprises—job loss, medical bills, car repairs—not vacations or sales. For women, who face higher odds of income interruption from caregiving, it is often the highest-priority savings goal after covering minimum debt payments.',
    sections: [
      {
        id: 'how-much',
        title: 'How much should you save?',
        content:
          'A common target is 3–6 months of essential expenses (housing, food, insurance, minimum debt payments—not your full lifestyle). Single earners or variable incomes may aim for 6+ months. Start with $500, then one month, then scale up. Progress matters more than perfection.',
      },
      {
        id: 'where',
        title: 'Where to keep emergency money',
        content:
          'Use a separate high-yield savings account—liquid, FDIC-insured, not invested in stocks. The goal is stability and quick access, not maximum growth. Keep it distinct from checking to reduce accidental spending.',
      },
      {
        id: 'what-counts',
        title: 'What counts as an emergency?',
        content:
          'True emergencies are urgent, necessary, and unexpected. Planned car maintenance, holidays, and wardrobe updates are not emergencies—they belong in separate sinking funds within your budget.',
      },
    ],
    faqs: [
      { question: 'Should I pay off debt or build emergency savings first?', answer: 'Build a starter fund ($500–$1,000) first so minor shocks do not add new debt. Then balance debt payoff with growing the fund.' },
      { question: 'Can I use a credit card as my emergency fund?', answer: 'Credit is a backup, not a fund—interest and limits make it risky. Cash savings prevent debt spirals.' },
      { question: 'What if I can only save $20 a week?', answer: 'That is still $1,040 in a year. Automate transfers on payday; small consistent amounts compound.' },
    ],
    courseCta: { label: 'Emergency Planning course', href: '/learn/womens-financial-literacy/emergency-planning' },
    sources: [{ title: 'CFPB — Emergency savings', url: `${CFPB}/consumer-tools/savings/` }],
  },
  {
    slug: 'credit-score-basics',
    title: 'Credit Score Basics for Women',
    metaTitle: 'Improve Your Credit Score — Women\'s Guide',
    metaDescription:
      'Understand credit reports, scores, and steps women can take to build credit in their own name—for independence and lower borrowing costs.',
    keywords: ['credit score women', 'build credit', 'credit report basics'],
    intro:
      'Your credit score affects loan rates, housing applications, and sometimes jobs. Women should especially maintain credit in their own name—not only on joint accounts—so career changes or life transitions do not leave them without a credit history.',
    sections: [
      {
        id: 'score-factors',
        title: 'What affects your score',
        content:
          'Payment history and amounts owed are the largest factors. Length of credit history, mix of account types, and recent applications also matter. Pay on time, keep balances low relative to limits, and avoid opening many new accounts at once.',
      },
      {
        id: 'reports',
        title: 'Reading your credit report',
        content:
          'You can request free weekly reports at AnnualCreditReport.com. Review for errors, unfamiliar accounts, and signs of identity theft. Dispute inaccuracies with bureaus and furnishers in writing.',
      },
      {
        id: 'build',
        title: 'Building or rebuilding credit',
        content:
          'Secured cards, becoming an authorized user responsibly, and credit-builder loans can help thin files. Always pay in full when possible; interest on carried balances works against wealth building.',
      },
    ],
    faqs: [
      { question: 'What is a good credit score?', answer: 'Scores roughly above 670 are often considered good; above 740 is very good. Lenders set their own thresholds.' },
      { question: 'Will checking my score hurt it?', answer: 'Checking your own score is a soft inquiry and does not harm your score.' },
      { question: 'Should I close old credit cards?', answer: 'Closing old cards can shorten credit history and raise utilization. Often keep old accounts open with occasional small charges paid off.' },
    ],
    courseCta: { label: 'Credit Management course', href: '/learn/womens-financial-literacy/credit-management' },
    sources: [
      { title: 'FTC — Credit reports', url: `${FTC}/articles/how-get-your-free-credit-report` },
      { title: 'CFPB — Credit scores', url: `${CFPB}/consumer-tools/credit/` },
    ],
  },
  {
    slug: 'investing-101-women',
    title: 'Investing 101 for Women',
    metaTitle: 'Investing for Beginners — Women\'s Guide',
    metaDescription:
      'Start investing with confidence: accounts, risk, diversification, and why women need to invest for longer retirements.',
    keywords: ['investing for women', 'beginner investing', 'how to start investing'],
    intro:
      'Investing is how savings grow faster than inflation over decades. Women live longer on average and may have fewer working years—making early, consistent investing critical. This guide covers concepts from SEC Investor.gov, framed for self-learners starting from zero.',
    sections: [
      {
        id: 'why-invest',
        title: 'Why women need to invest',
        content:
          'Savings accounts alone rarely keep pace with inflation. Retirement may last 25+ years. Employer plans (401k) and IRAs offer tax advantages. Starting early—even with small amounts—uses compound growth over time.',
      },
      {
        id: 'accounts',
        title: 'Common account types',
        content:
          '401(k) or 403(b) through work (especially if employer match). Traditional or Roth IRA for individual savings. Taxable brokerage for goals before retirement. Understand fees, risk tolerance, and time horizon before choosing investments.',
      },
      {
        id: 'diversify',
        title: 'Diversification and risk',
        content:
          'Do not put all money in one stock. Low-cost diversified funds (index funds, target-date funds) spread risk. Younger investors can often accept more stock exposure for long-term goals; near-retirement goals need more stability.',
      },
    ],
    faqs: [
      { question: 'How much money do I need to start?', answer: 'Many platforms allow small automatic investments. Start with what you can sustain monthly—even $50.' },
      { question: 'Is investing the same as gambling?', answer: 'Long-term diversified investing is based on economic growth and business earnings—not short-term speculation.' },
      { question: 'Should I invest before paying off debt?', answer: 'High-interest debt usually comes first. Low-rate student loans may coexist with investing, especially if you get an employer match.' },
    ],
    courseCta: { label: 'Browse women\'s curriculum', href: '/learn/womens-financial-literacy' },
    sources: [{ title: 'SEC Investor.gov', url: SEC }],
  },
  {
    slug: 'retirement-accounts-explained',
    title: 'Retirement Accounts Explained (401k, IRA, and More)',
    metaTitle: '401k vs IRA Explained for Women',
    metaDescription:
      'Compare 401k, traditional IRA, and Roth IRA. Learn contribution limits, taxes, and how to save for a longer retirement.',
    keywords: ['401k vs ira', 'retirement accounts explained', 'roth ira women'],
    intro:
      'Retirement accounts offer tax incentives to save for your future self. Women benefit disproportionately because they often live longer and may have years with lower earnings. Understanding account types helps you capture employer matches and choose Roth vs. traditional wisely.',
    sections: [
      {
        id: '401k',
        title: 'Employer plans (401k / 403b)',
        content:
          'Contributions often come pre-tax; growth is tax-deferred until withdrawal. Many employers match a portion—free money you should not leave behind. Vesting schedules determine when employer contributions are fully yours.',
      },
      {
        id: 'ira',
        title: 'Traditional vs. Roth IRA',
        content:
          'Traditional IRA: may be tax-deductible now; taxed on withdrawal. Roth IRA: after-tax contributions; qualified withdrawals tax-free in retirement. Roth can suit younger workers or those expecting higher future tax rates.',
      },
      {
        id: 'limits',
        title: 'Contribution limits and catch-ups',
        content:
          'IRS sets annual limits (check current year on IRS.gov). Workers 50+ may have catch-up contributions. Spousal IRA rules can help non-working spouses save in their own name.',
      },
    ],
    faqs: [
      { question: 'Can I have both 401k and IRA?', answer: 'Yes, subject to income limits for IRA deductibility and Roth eligibility.' },
      { question: 'What if I left a job with a 401k?', answer: 'Options include leave in plan, roll to new employer plan, or roll to IRA—compare fees and investment choices.' },
      { question: 'When can I withdraw without penalty?', answer: 'Generally age 59½ for retirement accounts, with exceptions for hardship and Roth contributions.' },
    ],
    courseCta: { label: 'Life stage: 50s planning', href: '/life-stage/50s' },
    sources: [{ title: 'IRS retirement plans', url: 'https://www.irs.gov/retirement-plans' }],
  },
  {
    slug: 'salary-negotiation-women',
    title: 'Salary Negotiation for Women',
    metaTitle: 'How to Negotiate Salary as a Woman',
    metaDescription:
      'Research pay, practice scripts, and negotiate total compensation—not just base salary. Close the gap one offer at a time.',
    keywords: ['salary negotiation women', 'negotiate pay women', 'gender pay gap'],
    intro:
      'Negotiation is a learnable skill. Research shows many women hesitate to negotiate—but even small increases compound over a career. Prepare with market data, practice your script, and negotiate benefits beyond base pay.',
    sections: [
      {
        id: 'research',
        title: 'Research your market value',
        content:
          'Use multiple salary sources (Glassdoor, levels.fyi, professional associations, peers). Adjust for location, experience, and industry. Document achievements with metrics before the conversation.',
      },
      {
        id: 'script',
        title: 'Scripts that work',
        content:
          'Express enthusiasm for the role, then state your research: "Based on my experience and market data for this role in this region, I was hoping for $X." Pause. Negotiate signing bonus, remote flexibility, professional development, or extra PTO if base is fixed.',
      },
      {
        id: 'raises',
        title: 'Asking for a raise',
        content:
          'Schedule a dedicated meeting, bring evidence of impact, and ask for a specific range. If denied, ask what milestones would justify a review in six months.',
      },
    ],
    faqs: [
      { question: 'What if they say the budget is fixed?', answer: 'Ask about signing bonus, title, review date, or benefits. Fixed budgets sometimes move for the right candidate.' },
      { question: 'Should I disclose my current salary?', answer: 'Where legally allowed, redirect to role requirements and market range rather than past pay.' },
      { question: 'When is the best time to negotiate?', answer: 'After an offer, before you accept. For raises, after a major win or annual review cycle.' },
    ],
    courseCta: { label: 'Try our salary tools', href: '/tools' },
    sources: [{ title: 'CFPB — Your money goals', url: `${CFPB}/consumer-tools/` }],
  },
  {
    slug: 'financial-independence-women',
    title: 'Financial Independence for Women: A Roadmap',
    metaTitle: 'Steps to Financial Independence for Women',
    metaDescription:
      'A self-study roadmap: budget, emergency fund, debt, credit, invest, and protect—built for women\'s longer horizons and unique risks.',
    keywords: ['financial independence women', 'financial freedom women', 'women money roadmap'],
    intro:
      'Financial independence means having enough resources and skills to make choices—stay in a job, leave a bad situation, retire comfortably, or fund caregiving. It is built in layers, not overnight.',
    sections: [
      {
        id: 'foundation',
        title: 'Foundation: clarity and cash flow',
        content:
          'Know your net worth and monthly cash flow. Build a working budget and starter emergency fund. Address high-interest debt aggressively.',
      },
      {
        id: 'growth',
        title: 'Growth: credit and investing',
        content:
          'Establish strong credit in your name. Capture employer retirement match. Automate IRA or brokerage contributions—even small amounts.',
      },
      {
        id: 'protection',
        title: 'Protection: insurance and estate basics',
        content:
          'Review health, disability, and life insurance needs. Maintain beneficiaries on retirement accounts. Basic estate documents (will, healthcare proxy) protect you and dependents.',
      },
    ],
    faqs: [
      { question: 'Where should I start if I feel overwhelmed?', answer: 'One lesson at a time: Financial Literacy Basics, then Budgeting, Emergency Planning, Credit.' },
      { question: 'Is financial independence only for high earners?', answer: 'No—habits, automation, and avoiding expensive debt matter at every income level.' },
      { question: 'How does this relate to FIRE?', answer: 'FIRE is an aggressive savings subset. This roadmap focuses on security and choice first.' },
    ],
    courseCta: { label: 'Start the self-study portal', href: '/learn' },
    sources: [{ title: 'SEC — Roadmap to saving', url: `${SEC}/additional-resources/general-resources/publications-research/saving-investing-roadmap` }],
  },
  {
    slug: 'money-after-life-changes',
    title: 'Money After Life Changes (Divorce, Job Loss, Caregiving)',
    metaTitle: 'Finances After Divorce or Job Loss — Women\'s Guide',
    metaDescription:
      'Practical steps when income or family structure changes: stabilize cash flow, protect credit, and rebuild.',
    keywords: ['divorce finances women', 'job loss money', 'caregiving financial planning'],
    intro:
      'Major life changes disrupt income and expenses simultaneously. Women disproportionately face caregiving interruptions and single-parent budgeting. Stabilize essentials first, then rebuild systematically.',
    sections: [
      {
        id: 'stabilize',
        title: 'First 30 days: stabilize',
        content:
          'List essential bills and due dates. Contact creditors if needed; many offer hardship programs. Pause non-essential spending. Use unemployment or support benefits you qualify for.',
      },
      {
        id: 'credit-legal',
        title: 'Credit and legal separation',
        content:
          'After divorce, close or convert joint accounts where possible. Monitor credit reports. Understand division of retirement assets (QDRO) with qualified professionals.',
      },
      {
        id: 'rebuild',
        title: 'Rebuild on your timeline',
        content:
          'Rebuild emergency fund before aggressive investing. Upskill if re-entering workforce. Our life-events hub has deeper guides for specific situations.',
      },
    ],
    faqs: [
      { question: 'Should I cash out retirement in a crisis?', answer: 'Usually last resort—penalties and lost compounding hurt long-term. Explore loans or hardship rules first.' },
      { question: 'How do I budget on unemployment?', answer: 'Strip to essentials, use benefits fully, and set a weekly spending cap until income returns.' },
      { question: 'Where can I get free help?', answer: 'Nonprofit credit counselors (NFCC), local workforce centers, and our free courses.' },
    ],
    courseCta: { label: 'Life events resource hub', href: '/life-events' },
    sources: [
      { title: 'CFPB — Housing and divorce', url: `${CFPB}/housing/` },
      { title: 'FTC — Dealing with debt', url: `${FTC}/articles/dealing-debt` },
    ],
  },
]

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug)
}
