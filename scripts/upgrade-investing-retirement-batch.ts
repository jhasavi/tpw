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
    slug: 'investment-fundamentals',
    content: {
      learningObjectives: [
        'Understand the relationship between risk, time horizon, and expected returns.',
        'Identify appropriate investment vehicles (stocks, bonds, cash) for different goals.',
        'Calculate basic investment returns and evaluate performance vs. benchmarks.',
        'Recognize the impact of fees and inflation on long-term wealth.',
        'Build a simple investment plan aligned to life stages.'
      ],
      introduction:
        'Investing is how you grow wealth faster than inflation. Over 30 years, $10,000 in a savings account earning 0.5% grows to $11,610. The same amount in a diversified stock portfolio earning 7% grows to $76,123—a difference of $64,513. This lesson teaches the fundamental principles of investing: how to match investments to your time horizon and goals, understand risk-adjusted returns, and avoid costly mistakes.',
      definitions: [
        { term: 'Time Horizon', definition: 'The number of years until you need the money. Longer horizons (10+ years) can tolerate more stock volatility.' },
        { term: 'Risk Tolerance', definition: 'Your emotional and financial ability to accept short-term losses for long-term gains. High tolerance = more stocks; low = more bonds.' },
        { term: 'Asset Class', definition: 'A category of investments: stocks (growth), bonds (income/stability), cash (liquidity).' },
        { term: 'Expected Return', definition: 'The historical average annual return of an investment. US stocks: ~10% nominal, ~7% real (inflation-adjusted).' },
        { term: 'Volatility', definition: 'How much an investment\'s value fluctuates. Higher volatility = higher potential return but more risk.' },
        { term: 'Diversification', definition: 'Spreading investments across asset classes and sectors to reduce risk without sacrificing returns.' },
        { term: 'Expense Ratio', definition: 'The annual cost of owning a fund (as a % of assets). Lower is better; aim <0.20% for index funds.' }
      ],
      sections: [
        {
          title: 'Why Invest?',
          content:
            'Money loses purchasing power over time due to inflation. A dollar today buys less tomorrow. Inflation averages 2–3% annually. If you keep cash earning 0.5%, you lose 1.5–2.5% in real purchasing power each year.\n\nInvesting in a diversified portfolio of stocks and bonds historically earns 5–7% real returns, outpacing inflation and allowing you to build wealth. Over decades, this difference is dramatic.'
        },
        {
          title: 'Three Pillars: Risk, Return, Time Horizon',
          content:
            'Risk: Stocks are volatile (can drop 20–40% in a downturn) but recover over time. Bonds are stable but have lower returns. Cash earns almost nothing but is safe.\n\nReturn: Stocks return ~10% nominal (7% inflation-adjusted). Bonds return 3–5%. Cash returns <1%.\n\nTime Horizon: If you need money in 3 years, hold bonds/cash to avoid forced selling at a loss. If you have 20+ years, hold mostly stocks; you can buy the dips.\n\nFormula: Time horizon → risk tolerance → asset allocation → expected return.'
        },
        {
          title: 'Understanding Risk-Adjusted Returns',
          content:
            'Two portfolios might earn 7% average return, but one is much riskier:\nPortfolio A (balanced): +8% year 1, +6% year 2, -2% year 3. Average: 4% volatility = safe.\nPortfolio B (all-stock): +20% year 1, +15% year 2, -30% year 3. Average: 35% volatility = risky.\n\nBoth average 4–5% over 3 years, but Portfolio B lost 30% in year 3, which might force you to sell at a loss if you needed money. Portfolio A\'s lower volatility lets you stay invested through downturns.\n\nLesson: Pick an allocation (stocks/bonds mix) you can stick with during market chaos.'
        },
        {
          title: 'Real Scenario: Three Women Investing',
          content:
            'Emma, age 28: 30-year time horizon to retirement. Allocates 85% stocks, 15% bonds. Can weather 3–4 downturns; historically buys more shares when prices drop.\n\nMaya, age 45: 20-year horizon to age 65. Allocates 60% stocks, 40% bonds. More balanced; volatility is uncomfortable but tolerable.\n\nSarah, age 60: 10-year horizon to age 70. Allocates 40% stocks, 60% bonds. Needs stability to fund withdrawals starting in 5 years. Can\'t afford a 40% loss.\n\nKey: Each chose an allocation matching her time horizon and ability to tolerate loss. Their risk tolerance came from life circumstances, not personality.'
        },
        {
          title: 'Common Mistakes to Avoid',
          content:
            '1. Chasing performance: Buying the "hot" fund that was up 30% last year. Often leads to buying high and selling low.\n2. Overtrading: Frequent buying/selling costs taxes and fees, reducing returns by 1–2% annually.\n3. Timing the market: Trying to buy low and sell high. No one predicts market turns; missing the 10 best days in 20 years cuts returns in half.\n4. Overlooking fees: A 1% fee vs. 0.1% fee costs you ~$300k over 30 years ($10k starting, 7% return). Always check expense ratios.\n5. Not diversifying: Owning one stock or sector exposes you to company/sector-specific risk. Diversify across sectors and asset classes.'
        },
        {
          title: 'Practice Exercise: Build Your First Investment Plan',
          content:
            'Step 1: Define your goal. Example: "Save $50,000 for a home down payment in 7 years."\n\nStep 2: Assess time horizon and risk tolerance.\n7-year horizon + need for capital → moderate risk. Allocate 60% stocks, 40% bonds.\n\nStep 3: Calculate required return. Start: $10k. Target: $50k. Years: 7.\nRequired annual return: Solve for r in FV = PV × (1+r)^n: $50k = $10k × (1+r)^7 → r ≈ 25.9% annual. Unrealistic.\nAdjust: If you add $400/month, required return drops to ~4% annually (achievable with 60/40).\n\nStep 4: Pick low-cost index funds (expense ratio <0.20%).\n60% VTI (US stocks) or VTSAX.\n40% BND (bonds) or VBTLX.\n\nStep 5: Set up auto-contributions ($400/month on payday) and rebalance annually.'
        },
        {
          title: 'The Role of Women in Investing',
          content:
            'Research (Vanguard, Fidelity): Women investors often:\n• Are more conservative than needed for long time horizons (losing growth potential).\n• Delay investing due to "wanting to learn more" (losing years of returns).\n• Are underrepresented in financial advisory conversations (missing guidance).\n\nEvidence: Women who invest in diversified portfolios 10+ years earlier accumulate $100k–$300k more by retirement (Fidelity data).\n\nKey for women: Start early, automate contributions, and stay invested through downturns. You don\'t need to be an expert; simplicity (3-fund portfolio) beats complex stock-picking.'
        }
      ],
      keyTakeaways: [
        'Investing beats inflation and builds wealth over decades.',
        'Match your asset allocation (stocks/bonds) to your time horizon.',
        'Lower costs (0.03–0.20% expense ratios) compound to huge savings over 30 years.',
        'Diversification reduces risk without sacrificing long-term returns.',
        'Stay invested through downturns; market timing fails for most investors.'
      ],
      actionItems: [
        'Calculate your time horizon (years until you need the money).',
        'Determine your risk tolerance (can you tolerate -30% drops without selling?).',
        'Choose an asset allocation matching your time horizon.',
        'Open a brokerage or IRA account.',
        'Set up automatic monthly contributions.'
      ],
      checklist: [
        '☐ Define your investment goal (retirement, home, college, other) and target amount.',
        '☐ Calculate your time horizon (years until you need the money).',
        '☐ Assess your risk tolerance (high/medium/low based on comfort with -30% drops).',
        '☐ Match time horizon to allocation: 10+ years = 70–90% stocks; 5–10 = 40–60%; <5 = 20% stocks or less.',
        '☐ Research low-cost index funds (Vanguard, Fidelity, Schwab); target expense ratios <0.20%.',
        '☐ Choose a simple portfolio: 3-fund (US, international, bonds) or target-date fund.',
        '☐ Open a brokerage or IRA account.',
        '☐ Set up automatic contributions on payday (even $50/month adds up).',
        '☐ Set annual rebalancing reminder (check in January; rebalance if drift >5%).',
        '☐ Commit to staying invested; avoid selling in downturns.'
      ],
      practiceExercise: {
        title: 'Build Your First Investment Plan',
        steps: [
          'Define: What are you saving for? How much? By when?',
          'Calculate time horizon: Years from today until you need the money.',
          'Choose allocation: Match time horizon to stocks/bonds split.',
          'Find funds: Use Morningstar or Bogleheads to pick 3 index funds with low fees.',
          'Set up auto-invest: $50–$500/month on the same date each month.',
          'Document and review: Add to calendar; review annually.'
        ]
      },
      resources: [
        { title: 'Bogleheads Investment Philosophy', type: 'Guide', url: 'https://www.bogleheads.org/wiki/Bogleheads_investment_philosophy', description: 'Simple, evidence-based investing for long-term wealth.' },
        { title: 'SEC Investor Education', type: 'Guide', url: 'https://www.investor.gov/introduction-investing', description: 'Plain-language guides from the SEC.' },
        { title: 'Morningstar Fund Research', type: 'Tool', url: 'https://www.morningstar.com/', description: 'Research funds and compare expense ratios.' },
        { title: 'Vanguard Investing Basics', type: 'Guide', url: 'https://investor.vanguard.com/investor-resources-education', description: 'Tutorials on asset allocation and long-term investing.' }
      ],
      quiz: [
        { q: 'A 30-year-old with $20,000 and a 30-year time horizon should allocate approximately what % to stocks?', a: '80–90%. Long time horizon allows recovery from downturns.' },
        { q: 'What is the average historical real (inflation-adjusted) return for US stocks?', a: 'About 7% annually.' },
        { q: 'How often should you rebalance a diversified portfolio?', a: 'Annually, or when any asset class drifts >5% from target.' },
        { q: 'Name the biggest investing mistake most people make.', a: 'Chasing performance (buying winners after they\'ve run up) or market timing.' },
        { q: 'If you have 7 years until you need $50k and start with $10k, what\'s a realistic allocation?', a: '60% stocks, 40% bonds with $400/month contributions.' }
      ]
    }
  },
  {
    slug: 'index-funds-vs-stocks',
    content: {
      learningObjectives: [
        'Understand why index funds outperform 80% of active investors.',
        'Calculate the cost of stock-picking (fees, taxes, time) vs. index investing.',
        'Recognize common biases that lead to poor stock selection.',
        'Know when (if ever) individual stocks make sense.',
        'Build a hybrid portfolio (mostly index, optional individual stocks).'
      ],
      introduction:
        'Professional investors spend their entire careers analyzing stocks, yet 80–90% of them underperform the market average (the S&P 500 index). If experts can\'t beat the market, what chance do individual investors have? This lesson explains why index funds are the evidence-based choice for most people, and when (rarely) individual stocks might make sense.',
      definitions: [
        { term: 'Index Fund', definition: 'A fund that holds all (or a representative sample) of securities in a market index (e.g., S&P 500). Tracks the market, not above/below.' },
        { term: 'Active Management', definition: 'Hiring managers to pick individual stocks to "beat the market." Usually underperforms due to fees and turnover.' },
        { term: 'Alpha', definition: 'The return above the market average. A fund with +2% alpha beats the S&P 500 by 2% annually. Rare and often temporary.' },
        { term: 'Beta', definition: 'How much a stock/fund\'s volatility matches the broader market. Beta 1.0 = moves with market; 1.5 = 50% more volatile.' },
        { term: 'Expense Ratio', definition: 'The annual cost of owning a fund. Index: 0.03–0.20%. Active: 0.5–2.0%.' }
      ],
      sections: [
        {
          title: 'The Index Fund Evidence',
          content:
            'Morningstar data (20+ years): Over any 15-year period, 80–90% of actively managed funds underperform the S&P 500 index.\n\nWhy?\n• Fees: Active funds cost 0.5–2.0% annually; index funds cost 0.03–0.20%. Over 30 years, a 1% fee difference costs ~$300,000 in growth.\n• Turnover: Active managers trade frequently (tax inefficiency, trading costs). Index funds buy and hold (tax efficient).\n• Luck vs. skill: Some managers beat the market for 5–10 years, but research shows it\'s usually luck, not skill. Few repeat winners.\n• Reversion to mean: High performers regress; you can\'t predict which managers will beat the market next year.'
        },
        {
          title: 'Real Scenario: Sarah vs. Marcus (30-Year Comparison)',
          content:
            'Both start with $10,000 and add $300/month. Market returns 8% annually.\n\nSarah (Index Fund): Buys low-cost S&P 500 index (0.03% expense ratio). No trading. After 30 years: ~$850,000.\n\nMarcus (Active Stock-Picker): Buys active mutual fund (1.5% expense ratio), trades frequently (high taxes), and underperforms the market by 1% annually. After 30 years: ~$580,000.\n\nDifference: Sarah has $270,000 more ($850k vs $580k)—just from choosing an index fund and leaving it alone. Marcus spent time researching stocks, paid fees, and ended up with less.'
        },
        {
          title: 'Why Stock-Picking Usually Fails',
          content:
            'Cognitive biases:\n• Overconfidence: We think we can pick winners; research shows we can\'t.\n• Recency bias: Buying hot stocks after they\'ve risen (buying high).\n• Familiarity bias: Investing in companies we know (underweighting diversification).\n• Loss aversion: Holding losers too long to avoid "admitting" a mistake.\n\nPractical barriers:\n• Information: Companies hide risks in fine print. Hedge fund analysts with teams miss dangers.\n• Timing: You can\'t know when to buy/sell. Missing the 10 best days in 20 years cuts returns in half.\n• Costs: Every trade (buy/sell) triggers taxes and fees. After costs, you need to beat the market by 2–3% just to break even.'
        },
        {
          title: 'When Individual Stocks Make Sense (Rarely)',
          content:
            'If you invest 90% in index funds, you could allocate 10% to individual stocks for learning/interest.\n\nExample: $100k portfolio:\n• $90k in index funds (VTI, VXUS, BND).\n• $10k to experiment with 2–3 individual stocks.\n\nRules for individual stocks:\n1. Never more than 5% of total portfolio in any one stock.\n2. Hold for 3+ years; ignore daily/monthly noise.\n3. Only buy companies you understand (competitive advantage, strong financials).\n4. Diversify across sectors (tech, healthcare, finance, consumer).\n5. Reinvest dividends; don\'t trade frequently.\n\nWorst reasons to buy individual stocks:\n• A friend recommended it.\n• You read about it in the news.\n• It\'s "hot" and up 50% this year.\n• You think you\'ve found a "secret."\n\nBetter: Stick with index funds. The math and evidence favor simplicity.'
        },
        {
          title: 'Building a Hybrid Portfolio',
          content:
            'If you insist on picking some stocks, here\'s a framework:\n\nCore (90%): Low-cost index funds.\n• 50% VTI (US large/mid/small cap).\n• 20% VXUS (international).\n• 20% BND (bonds).\n\nSatellite (10%): Individual stocks (optional).\n• Research companies with durable competitive advantages (Buffett\'s "moat").\n• Look for strong balance sheets, consistent earnings, reasonable valuations.\n• Diversify: no more than 2% per stock.\n• Hold 3+ years; ignore volatility.\n\nExample stock ideas (not recommendations; for learning):\n• Healthcare: Johnson & Johnson (J&J) — diversified healthcare, strong dividend.\n• Tech: Microsoft (MSFT) — dominant software, recurring revenue.\n• Consumer: Coca-Cola (KO) — global brand, pricing power.\n\nRule: If you can\'t explain why you own a stock in 1–2 sentences, don\'t own it.'
        },
        {
          title: 'The Cost of Stock-Picking',
          content:
            'Assume you pick a fund that underperforms the market by 1% annually (typical for active managers).\n\nStarting amount: $100,000.\nTime horizon: 30 years.\nMarket return: 8%.\n\nIndex fund (8% annual): Grows to ~$1,006,000.\nActive fund (7% annual from underperformance): Grows to ~$761,000.\n\nCost of underperformance: $245,000.\n\nNow add taxes (active funds trade more, triggering capital gains taxes you pay annually; index funds defer taxes). Realistic after-tax difference: $300,000–$500,000 over 30 years.\n\nLesson: Fees and underperformance compound. Small differences become huge over decades.'
        }
      ],
      keyTakeaways: [
        'Research shows 80–90% of active managers underperform index funds over 15+ years.',
        'Fees and trading costs are the primary reason active managers underperform.',
        'Index funds offer simplicity, tax efficiency, and lower costs.',
        'A hybrid approach (90% index, 10% individual stocks) is reasonable if you want to learn.',
        'Focus on businesses with strong competitive advantages if you pick individual stocks.'
      ],
      actionItems: [
        'Compare your current fund\'s expense ratio to index alternatives.',
        'Calculate the 30-year cost of a 1% fee difference.',
        'If holding active funds, consider switching to index funds.',
        'If interested in individual stocks, allocate no more than 10% of portfolio to them.'
      ],
      checklist: [
        '☐ Understand the data: 80–90% of active managers underperform index funds over 15+ years.',
        '☐ Calculate your fees: Compare active fund (0.5–2.0% typical) vs. index fund (0.03–0.20%).',
        '☐ Know the cost of trading: Each trade triggers taxes and fees; index funds minimize both.',
        '☐ Build a core-satellite portfolio: 90% index funds (core), optionally 10% individual stocks (satellite).',
        '☐ If picking stocks: Only invest 2–5% of portfolio per stock; hold 3+ years; focus on business fundamentals.',
        '☐ Avoid the behavioral traps: Don\'t chase hot stocks, try to time markets, or trade frequently.',
        '☐ Rebalance index portfolio annually; never trade individual stocks based on daily news.',
        '☐ Track your performance: Compare your returns to the S&P 500; if underperforming, shift more to index funds.'
      ],
      practiceExercise: {
        title: 'Compare Index vs. Active Fund Returns',
        steps: [
          'Pick an active mutual fund (check Morningstar or your 401k statement).',
          'Note its expense ratio (usually 0.5–2.0%).',
          'Compare 10-year returns to the S&P 500 index.',
          'Calculate the difference: If S&P returned 10% and the fund returned 8%, the fund underperformed by 2% annually.',
          'Calculate the cost: $100,000 × (1.10^10 vs 1.08^10) = $259,400 vs $215,900 = $43,500 cost of underperformance.',
          'Ask: Is the active fund worth it? Usually no.'
        ]
      },
      resources: [
        { title: 'Morningstar Active vs Passive Analysis', type: 'Research', url: 'https://www.morningstar.com/articles/1024548/active-managers-largely-fail-to-outperform-indexes', description: 'Long-term data on active vs. index fund performance.' },
        { title: 'Bogleheads Investing Philosophy', type: 'Guide', url: 'https://www.bogleheads.org/', description: 'Evidence-based case for index investing.' },
        { title: 'SEC Investor Education: Index Funds', type: 'Guide', url: 'https://www.investor.gov/', description: 'Plain-language primer on index investing.' },
        { title: 'Vanguard Case for Low Costs', type: 'Whitepaper', url: 'https://investor.vanguard.com/investment-products/mutual-funds/index-funds', description: 'How fees impact long-term returns.' }
      ],
      quiz: [
        { q: 'What percentage of active managers beat the S&P 500 index over 15+ years?', a: 'About 10–20%; 80–90% underperform.' },
        { q: 'What is the typical expense ratio for an active mutual fund?', a: '0.5–2.0% annually.' },
        { q: 'What is the typical expense ratio for an index fund?', a: '0.03–0.20% annually.' },
        { q: 'Over 30 years, how much does a 1% annual fee difference cost?', a: 'Approximately $300,000 in lost growth (on a $10k starting amount).' },
        { q: 'If you want to pick individual stocks, what should be the maximum portfolio allocation to them?', a: 'No more than 10%, with no single stock >5% of the portfolio.' }
      ]
    }
  }
]

async function run() {
  console.log('🚀 Upgrading Investing and Retirement lessons with CFP-aligned content...\n')

  for (const lesson of lessons) {
    try {
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
        console.warn(`⚠️  ${lesson.slug}: Not found in database`)
        continue
      }

      console.log(`✅ Updated: ${data[0].title}`)
    } catch (e) {
      console.error(`❌ ${lesson.slug}: Unexpected error`, e)
    }
  }

  console.log('\n✨ Batch update complete')
}

run().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
