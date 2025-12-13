import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase env vars missing')
}

const supabase = createClient(supabaseUrl, supabaseKey)

const lessons = [
  {
    slug: 'career-advancement',
    content: {
      introduction:
        'Career advancement directly impacts your earning power and long-term wealth. A strategic 5-year career plan can increase lifetime earnings by $250,000–$500,000 or more. This lesson provides a roadmap for skill-building, networking, internal mobility, and leveraging transitions to maximize compensation and satisfaction.',
      definitions: [
        { term: 'Career Capital', definition: 'The combination of skills, relationships, credentials, and reputation that make you valuable in the job market.' },
        { term: 'Internal Mobility', definition: 'Moving to different roles or teams within your current employer to gain experience and increase pay.' },
        { term: 'Total Compensation', definition: 'Base salary plus bonus, equity, benefits, retirement match, and perks (remote work, development budget, flexibility).' },
        { term: 'Skill Stacking', definition: 'Acquiring complementary skills (e.g., project management + data analysis) that multiply your market value.' }
      ],
      sections: [
        {
          title: 'Building Your 5-Year Career Map',
          content:
            'Year 1–2: Master your current role and add one adjacent skill. Seek feedback, document wins, and build relationships with managers and peers.\nYear 3: Position for promotion or internal move. Update your resume, quantify achievements, and express interest in stretch projects.\nYear 4: Promote internally or switch employers for a 10–20% raise. Negotiate total compensation, not just base.\nYear 5: Reassess career trajectory; consider leadership, specialization, or entrepreneurship paths. Update your map every 12 months.'
        },
        {
          title: 'Skill-Building for Market Value',
          content:
            'Identify in-demand skills for your industry via job postings, LinkedIn, and industry reports. Prioritize: (1) Technical skills (software, data, certifications). (2) Soft skills (communication, leadership, negotiation). (3) Business acumen (finance, strategy, operations).\n\nHow to build: Free/low-cost online courses (Coursera, LinkedIn Learning, Khan Academy), on-the-job stretch assignments, mentorship, and certifications (PMP, CFA, CPA, AWS, Google Analytics). Aim for 2–4 hours per week; consistency beats intensity.'
        },
        {
          title: 'Networking That Actually Works',
          content:
            'Build relationships before you need them. Attend 1–2 industry events per quarter (virtual or in-person). Join professional associations. Engage on LinkedIn: comment on posts, share insights, connect with peers and leaders.\n\nInformational interviews: Request 20-minute calls with people in roles you aspire to. Ask about their path, challenges, and advice—not for jobs. Follow up with a thank-you note and stay in touch quarterly.\n\nMentorship: Find 1–2 mentors (formal or informal) who can advise on career decisions, introduce you to opportunities, and review your progress.'
        },
        {
          title: 'Internal Mobility and Promotions',
          content:
            'Express interest early: Tell your manager your goals 6–12 months before you want to move. Ask what skills/outcomes are required.\n\nDocument wins: Keep a "brag file" of achievements with metrics ($, %, time). Update quarterly. Use it for reviews, promotion requests, and resume updates.\n\nStretch projects: Volunteer for cross-functional work, leadership of initiatives, or coverage during transitions. Visibility accelerates advancement.\n\nTiming: Most companies promote annually or bi-annually. Align your ask with review cycles and company performance.'
        },
        {
          title: 'Switching Employers Strategically',
          content:
            'Why switch: External moves often yield 10–20% raises vs. 3–5% internal. But consider total comp, growth potential, and culture fit—not just base salary.\n\nWhen to switch: After 2–3 years in a role (unless rapid internal growth), when you\'ve hit a ceiling, or when the market offers significantly better opportunities.\n\nHow to negotiate: Get multiple offers if possible. Anchor with market data. Negotiate base, bonus, equity, sign-on, remote work, title, review timing, and professional development budget. Never accept the first offer without a counter.'
        },
        {
          title: 'Financial Impact of Career Moves',
          content:
            'Example: Starting salary $60k. Annual 3% raises → $69k at year 5.\nWith strategic moves: Year 2 internal promo +8% → $64.8k. Year 4 external move +15% → $74.5k. Year 5 with 4% raise → $77.5k.\nDifference: $8k/year compounding over 30 years at conservative returns = $500k+ in lifetime earnings and retirement savings.'
        },
        {
          title: 'Case Study: Skill Stacking',
          content:
            'Priya worked in marketing with a $55k salary. She took a free SQL course and a $200 Google Analytics certification. She used those skills to automate reporting, saving her team 10 hours/week. She documented the impact and applied for a data-focused marketing role at another company, negotiating a $72k offer (+31%). Two years later, she added Python and moved into marketing analytics at $95k.'
        }
      ],
      keyTakeaways: [
        'A 5-year career map with skill targets and timing accelerates growth.',
        'Skill-building (technical + soft + business) compounds market value.',
        'Networking and mentorship open doors before you need them.',
        'Internal mobility and external moves both work; choose based on total comp and growth.',
        'Strategic career moves can add $250k–$500k+ to lifetime earnings.'
      ],
      actionItems: [
        { step: 1, action: 'Draft your 5-year career map', description: 'Write target roles, skills, and milestones for each year.' },
        { step: 2, action: 'Identify 2–3 high-value skills', description: 'Research job postings and pick skills to build in the next 6 months.' },
        { step: 3, action: 'Start a brag file', description: 'Document wins with metrics; update monthly.' },
        { step: 4, action: 'Schedule 2 informational interviews', description: 'Reach out to people in roles you want; ask about their path.' },
        { step: 5, action: 'Set quarterly skill-building time', description: 'Block 2–4 hours/week for courses, certifications, or practice.' }
      ],
      resources: [
        { title: 'LinkedIn Learning', type: 'Platform', url: 'https://www.linkedin.com/learning/', description: 'Thousands of courses on technical, soft, and business skills.' },
        { title: 'Coursera', type: 'Platform', url: 'https://www.coursera.org/', description: 'Free and paid courses from universities and companies.' },
        { title: 'Fidelity Career Planning', type: 'Guide', url: 'https://www.fidelity.com/learning-center/personal-finance/career-planning', description: 'Financial planning for career transitions and growth.' },
        { title: 'Payscale Salary Data', type: 'Tool', url: 'https://www.payscale.com/', description: 'Research compensation for target roles and locations.' },
        { title: 'Harvard Business Review', type: 'Resource', url: 'https://hbr.org/topic/career-planning', description: 'Articles on career strategy, networking, and leadership.' }
      ],
      quiz: {
        questions: [
          { q: 'What is career capital?', a: 'The combination of skills, relationships, credentials, and reputation that make you valuable.' },
          { q: 'What is skill stacking?', a: 'Acquiring complementary skills that multiply your market value.' },
          { q: 'How much can strategic career moves add to lifetime earnings?', a: '$250k–$500k or more.' },
          { q: 'What should you document in a brag file?', a: 'Achievements with metrics ($, %, time saved).' },
          { q: 'When is a good time to switch employers?', a: 'After 2–3 years, when you\'ve hit a ceiling, or when the market offers better opportunities.' }
        ]
      }
    }
  },
  {
    slug: 'portfolio-construction',
    content: {
      introduction:
        'Asset allocation—how you divide money across stocks, bonds, and cash—drives 90% of long-term returns and risk. This lesson teaches you how to build a diversified portfolio that matches your time horizon, risk tolerance, and goals, using low-cost index funds and a simple rebalancing routine.',
      definitions: [
        { term: 'Asset Allocation', definition: 'The percentage of your portfolio in each asset class: stocks (growth), bonds (stability), cash (liquidity).' },
        { term: 'Diversification', definition: 'Spreading investments across asset classes, geographies, and sectors to reduce risk.' },
        { term: 'Risk Tolerance', definition: 'Your ability and willingness to accept short-term losses for long-term gains.' },
        { term: 'Time Horizon', definition: 'How long until you need the money. Longer horizons allow more stock exposure.' },
        { term: 'Rebalancing', definition: 'Adjusting your portfolio back to target allocations when drift exceeds a threshold (e.g., 5%).' }
      ],
      sections: [
        {
          title: 'Why Asset Allocation Matters',
          content:
            'Studies show asset allocation explains ~90% of portfolio variance (Brinson, Hood, Beebower). Stock picking and market timing contribute far less. Getting allocation right reduces volatility and increases long-term growth. A portfolio that\'s too conservative (all bonds/cash) loses to inflation. Too aggressive (all stocks) can force panic selling in downturns.'
        },
        {
          title: 'Matching Allocation to Time Horizon',
          content:
            'Short-term (<3 years): 100% cash or short-term bonds. Stocks are too volatile.\nMedium-term (3–10 years): 40–60% stocks, 40–60% bonds. Balance growth and stability.\nLong-term (10+ years): 70–100% stocks, 0–30% bonds. Time smooths volatility; prioritize growth.\n\nRetirement example: If you\'re 30 and retiring at 65, you have 35 years. Start 90% stocks/10% bonds. Shift gradually to 60/40 by retirement. In retirement, shift to 40–50% stocks to fund 20–30 years of withdrawals.'
        },
        {
          title: 'Simple Three-Fund Portfolio',
          content:
            'Popularized by Bogleheads, this covers global diversification with minimal complexity:\n1. Total US Stock Market Index (60–70%): Broad exposure to all US companies.\n2. Total International Stock Index (20–30%): Diversifies across developed and emerging markets.\n3. Total Bond Market Index (10–30%): Stability and income; adjust based on time horizon.\n\nExample allocations:\n• Age 30: 70% US stocks, 20% international, 10% bonds.\n• Age 50: 50% US stocks, 20% international, 30% bonds.\n• Age 65: 40% US stocks, 15% international, 45% bonds.'
        },
        {
          title: 'Selecting Low-Cost Index Funds',
          content:
            'Prioritize funds with expense ratios <0.20%. Lower costs mean more of your return compounds.\n\nVanguard examples: VTSAX (US total market), VTIAX (international), VBTLX (bonds).\nFidelity examples: FSKAX, FTIHX, FXNAX.\nSchwab examples: SWTSX, SWISX, SWAGX.\n\nETF versions: VTI, VXUS, BND (tradable like stocks; same low costs).'
        },
        {
          title: 'Understanding Risk Tolerance',
          content:
            'Ask yourself: If my portfolio dropped 30% in one year, would I:\nA) Sell everything and go to cash → Low risk tolerance; more bonds.\nB) Hold and wait for recovery → Moderate; balanced allocation.\nC) Buy more at lower prices → High; more stocks.\n\nYour answer + time horizon = your allocation. Don\'t overestimate tolerance; market drops test emotions.'
        },
        {
          title: 'Rebalancing: When and How',
          content:
            'Why rebalance: Over time, stocks grow faster than bonds, skewing your allocation (e.g., 70/30 becomes 80/20). Rebalancing sells winners and buys laggards, maintaining your risk level.\n\nWhen: Annually, or when any asset class drifts >5% from target.\nHow: In tax-advantaged accounts, sell overweight assets and buy underweight. In taxable accounts, direct new contributions to underweight assets to avoid taxes.\n\nExample: Target 70% stocks/30% bonds. After one year, portfolio is 76% stocks/24% bonds. Sell 6% of stocks, buy bonds to restore 70/30.'
        },
        {
          title: 'Case Study: Long-Term Allocation',
          content:
            'Emma, age 28, starts with $10k and contributes $500/month. She chooses 80% stocks (60% US, 20% international) and 20% bonds. Over 35 years at 7% average return, her portfolio grows to ~$850k. If she had chosen 50/50, returns drop to ~6%, yielding $650k. The allocation difference: $200k over a lifetime.'
        }
      ],
      keyTakeaways: [
        'Asset allocation drives 90% of long-term returns and risk.',
        'Match allocation to time horizon: short = bonds/cash, long = stocks.',
        'A three-fund portfolio (US, international, bonds) is simple and effective.',
        'Use low-cost index funds with expense ratios <0.20%.',
        'Rebalance annually or when drift exceeds 5%; maintain your target risk.'
      ],
      actionItems: [
        { step: 1, action: 'Define your time horizon', description: 'When will you need this money? Short (<3y), medium (3–10y), long (10y+).' },
        { step: 2, action: 'Assess risk tolerance', description: 'How would you react to a 30% drop? Adjust allocation accordingly.' },
        { step: 3, action: 'Choose target allocation', description: 'Example: 70% stocks (50% US, 20% int\'l), 30% bonds.' },
        { step: 4, action: 'Select low-cost index funds', description: 'Pick funds with <0.20% expense ratios from Vanguard/Fidelity/Schwab.' },
        { step: 5, action: 'Set rebalance reminder', description: 'Add annual calendar event to review and rebalance portfolio.' }
      ],
      resources: [
        { title: 'Vanguard Portfolio Allocation Models', type: 'Guide', url: 'https://investor.vanguard.com/investor-resources-education/understanding-investment-types/asset-allocation', description: 'Sample allocations by age and risk.' },
        { title: 'Bogleheads Three-Fund Portfolio', type: 'Guide', url: 'https://www.bogleheads.org/wiki/Three-fund_portfolio', description: 'Simple, diversified portfolio strategy.' },
        { title: 'Morningstar Fund Screener', type: 'Tool', url: 'https://www.morningstar.com/', description: 'Compare expense ratios and performance.' },
        { title: 'Fidelity Asset Allocation Tool', type: 'Tool', url: 'https://www.fidelity.com/calculators-tools/asset-allocation-calculator', description: 'Interactive allocation planner.' }
      ],
      quiz: {
        questions: [
          { q: 'What percentage of portfolio variance does asset allocation explain?', a: '~90%.' },
          { q: 'What allocation is appropriate for a 5-year goal?', a: '40–60% stocks, 40–60% bonds.' },
          { q: 'Name the three funds in a simple diversified portfolio.', a: 'US stock index, international stock index, bond index.' },
          { q: 'What expense ratio should you target?', a: '<0.20%.' },
          { q: 'When should you rebalance?', a: 'Annually, or when drift exceeds 5% from target.' }
        ]
      }
    }
  },
  {
    slug: 'portfolio-rebalancing',
    content: {
      introduction:
        'Rebalancing keeps your portfolio aligned with your target risk and return. Without it, your allocation drifts over time, exposing you to more (or less) risk than planned. This lesson shows you when and how to rebalance, how to minimize taxes and fees, and how to automate the process for long-term discipline.',
      definitions: [
        { term: 'Drift', definition: 'When your actual allocation differs from your target due to market movements (e.g., stocks outperform bonds).' },
        { term: 'Threshold Rebalancing', definition: 'Rebalancing only when an asset class drifts beyond a set percentage (e.g., 5% from target).' },
        { term: 'Calendar Rebalancing', definition: 'Rebalancing on a fixed schedule (annually, semi-annually) regardless of drift.' },
        { term: 'Tax-Loss Harvesting', definition: 'Selling investments at a loss to offset capital gains and reduce taxes.' }
      ],
      sections: [
        {
          title: 'Why Rebalancing Matters',
          content:
            'Over time, high-performing assets grow faster, increasing their share of your portfolio. Example: A 70/30 stock/bond portfolio can become 80/20 after a strong stock year. This increases risk beyond your plan. Rebalancing forces you to "sell high" (trim winners) and "buy low" (add to laggards), maintaining your target risk and often improving long-term returns.'
        },
        {
          title: 'When to Rebalance: Two Approaches',
          content:
            'Calendar method: Rebalance once or twice per year on fixed dates (e.g., January 1, July 1). Simple, predictable, low-effort.\n\nThreshold method: Rebalance when any asset class drifts >5% from target. Example: 70% stock target drifts to 76% → rebalance. More responsive to market volatility but requires monitoring.\n\nBest practice: Combine both. Check quarterly; rebalance if drift >5% or annually if not.'
        },
        {
          title: 'How to Rebalance in Tax-Advantaged Accounts',
          content:
            'In IRAs, 401(k)s, and other tax-deferred accounts, rebalancing is tax-free. Sell overweight assets and buy underweight assets directly.\n\nExample: Target 60% stocks/40% bonds. Current: 68% stocks/32% bonds. Sell 8% of total value in stocks, buy bonds. No tax consequence.\n\nUse this freedom to rebalance aggressively and maintain exact targets.'
        },
        {
          title: 'How to Rebalance in Taxable Accounts',
          content:
            'Selling in taxable accounts triggers capital gains taxes. Minimize by:\n1. Direct new contributions to underweight assets instead of selling.\n2. Use dividends and interest to buy underweight assets.\n3. Harvest losses: If an asset is down, sell it to offset gains elsewhere, then buy a similar (but not identical) fund to avoid wash-sale rules.\n4. Only sell when drift is large (>10%) or you can pair with losses.\n\nExample: Target 70/30. Current 76/24. Instead of selling stocks, direct next 6 months of contributions entirely to bonds until back to 70/30.'
        },
        {
          title: 'Automating Rebalancing',
          content:
            'Many 401(k) plans and robo-advisors (Betterment, Wealthfront, Vanguard Digital Advisor) offer automatic rebalancing. Enable it and set thresholds (e.g., 5% drift or annual).\n\nFor DIY portfolios: Set a recurring calendar reminder (January 1) to review allocation. Use a simple spreadsheet to calculate current % and compare to target. Execute trades if needed.'
        },
        {
          title: 'Rebalancing and Market Volatility',
          content:
            'Rebalancing feels uncomfortable: you\'re selling winners (stocks after a rally) and buying losers (bonds or stocks after a drop). This is counterintuitive but disciplined. It prevents overconcentration in hot assets and keeps you buying low.\n\nExample: 2020 stock rally pushed portfolios to 85% stocks. Rebalancing sold stocks near highs and bought bonds. When markets corrected in 2022, balanced portfolios held up better.'
        },
        {
          title: 'Case Study: Disciplined Rebalancing',
          content:
            'Marcus maintained a 70/30 stock/bond portfolio. In 2021, stocks surged and his allocation drifted to 78/22. He rebalanced in January 2022, selling 8% of stocks and buying bonds. When stocks fell 18% in 2022, his losses were cushioned by the bond allocation he\'d reinforced. Without rebalancing, his portfolio would have been more volatile and recovered more slowly.'
        }
      ],
      keyTakeaways: [
        'Rebalancing maintains your target risk and forces disciplined buy-low, sell-high behavior.',
        'Use calendar (annual) or threshold (5% drift) methods—or combine both.',
        'In tax-advantaged accounts, rebalance freely by selling and buying.',
        'In taxable accounts, use new contributions and tax-loss harvesting to minimize taxes.',
        'Automate rebalancing when possible; set annual reminders if managing manually.'
      ],
      actionItems: [
        { step: 1, action: 'Choose rebalancing method', description: 'Calendar (annual), threshold (5% drift), or combined.' },
        { step: 2, action: 'Set calendar reminder', description: 'Add annual event (e.g., January 1) to review and rebalance.' },
        { step: 3, action: 'Calculate current allocation', description: 'Total value of each asset class ÷ total portfolio value.' },
        { step: 4, action: 'Compare to target', description: 'Note any asset class >5% from target.' },
        { step: 5, action: 'Execute rebalance', description: 'Sell overweight, buy underweight (or direct new contributions).' }
      ],
      resources: [
        { title: 'Vanguard Rebalancing Guide', type: 'Guide', url: 'https://investor.vanguard.com/investor-resources-education/online-trading/rebalance-portfolio', description: 'When and how to rebalance your portfolio.' },
        { title: 'Fidelity Rebalancing Calculator', type: 'Tool', url: 'https://www.fidelity.com/calculators-tools/rebalancing-calculator', description: 'See impact of rebalancing on returns and risk.' },
        { title: 'Bogleheads Rebalancing Wiki', type: 'Guide', url: 'https://www.bogleheads.org/wiki/Rebalancing', description: 'Detailed strategies and tax considerations.' },
        { title: 'Tax-Loss Harvesting Explained', type: 'Guide', url: 'https://www.investopedia.com/terms/t/taxgainlossharvesting.asp', description: 'How to use losses to offset gains.' }
      ],
      quiz: {
        questions: [
          { q: 'What is drift?', a: 'When your actual allocation differs from target due to market movements.' },
          { q: 'Name two rebalancing methods.', a: 'Calendar (annual) and threshold (5% drift).' },
          { q: 'Why is rebalancing tax-free in IRAs?', a: 'Gains and sales within IRAs are not taxed until withdrawal.' },
          { q: 'How can you rebalance in taxable accounts without selling?', a: 'Direct new contributions to underweight assets.' },
          { q: 'What psychological challenge does rebalancing address?', a: 'It forces you to sell winners and buy losers, maintaining discipline.' }
        ]
      }
    }
  }
]

async function run() {
  console.log('🚀 Upgrading batch 2 of lessons...\n')

  for (const lesson of lessons) {
    const { data, error } = await supabase
      .from('lessons')
      .update({ content: lesson.content })
      .eq('slug', lesson.slug)
      .select('id, title')
      .limit(1)

    if (error) {
      console.error(`❌ ${lesson.slug}:`, error.message)
      continue
    }

    if (!data || data.length === 0) {
      console.warn(`⚠️  ${lesson.slug}: No rows updated`)
      continue
    }

    console.log(`✅ Updated: ${data[0].title}`)
  }

  console.log('\n🎉 Batch 2 complete')
}

run().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
