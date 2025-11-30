/**
 * Create initial blog posts for SEO and content marketing
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const blogPosts = [
  {
    title: "10 Financial Mistakes to Avoid in Your 20s",
    slug: "financial-mistakes-20s",
    excerpt: "Your 20s are crucial for building financial foundations. Learn the top mistakes to avoid and set yourself up for success.",
    content: `
# 10 Financial Mistakes to Avoid in Your 20s

Your 20s are a pivotal decade for your financial future. The habits you build now will compound over the next 40+ years. Here are the most common—and costly—mistakes to avoid.

## 1. Not Starting to Save for Retirement

**The Mistake:** "I'll start saving when I make more money."

**Why It Hurts:** A 25-year-old who saves $200/month until 65 will have $500,000+ (7% return). Wait until 35, and you'll only have $240,000—less than half!

**The Fix:** Start with just 3-5% of income in your 401(k), especially if your employer matches. Free money is the best return.

## 2. Carrying Credit Card Debt

**The Mistake:** Making minimum payments on high-interest cards.

**Why It Hurts:** At 18% APR, a $5,000 balance costs $900/year in interest alone. That's money you could be investing.

**The Fix:** Pay off credit cards aggressively. Use the debt avalanche method (highest interest first) or snowball (smallest balance first).

## 3. Not Having an Emergency Fund

**The Mistake:** Living paycheck to paycheck with zero savings buffer.

**Why It Hurts:** One car repair or medical bill forces you into expensive credit card debt.

**The Fix:** Build $1,000 immediately, then work toward 3-6 months of expenses. Auto-transfer $50-100/paycheck to savings.

## 4. Lifestyle Inflation

**The Mistake:** Spending every raise and bonus immediately.

**Why It Hurts:** You stay on the same financial treadmill despite earning more.

**The Fix:** Save at least 50% of every raise. Your lifestyle shouldn't inflate as fast as your income.

## 5. Not Investing in Skills

**The Mistake:** Spending on entertainment instead of education and career development.

**Why It Hurts:** Your earning potential is your biggest asset. Not developing it costs you millions over your career.

**The Fix:** Invest 5-10% of income in skills, courses, certifications, and networking. The ROI far exceeds stock market returns.

## 6. Buying a New Car

**The Mistake:** Financing a brand new car with a 5-7 year loan.

**Why It Hurts:** New cars lose 20% value immediately and 60% in 5 years. Plus, you pay interest on a depreciating asset.

**The Fix:** Buy a 2-3 year old reliable used car (Honda, Toyota). Let someone else take the depreciation hit.

## 7. Not Tracking Spending

**The Mistake:** Guessing where money goes instead of tracking it.

**Why It Hurts:** You can't optimize what you don't measure. Hidden spending leaks drain hundreds monthly.

**The Fix:** Use Mint, YNAB, or a simple spreadsheet. Track every dollar for 30 days—you'll be shocked at the insights.

## 8. Ignoring Health Insurance

**The Mistake:** Going uninsured or choosing the cheapest plan without understanding coverage.

**Why It Hurts:** One serious illness can cost $50,000-$500,000, destroying your financial future.

**The Fix:** Get comprehensive coverage. If young and healthy, high-deductible plans with HSA accounts work great.

## 9. Not Negotiating Salary

**The Mistake:** Accepting the first offer without negotiation.

**Why It Hurts:** A $5,000 negotiation win compounds over your career to $100,000+ in extra earnings.

**The Fix:** Always negotiate. Research market rates, practice your pitch, and ask for 10-20% more than the initial offer.

## 10. Following Financial Advice from Broke People

**The Mistake:** Taking money advice from friends/family who are struggling financially.

**Why It Hurts:** Poor money habits are learned and repeated across generations.

**The Fix:** Learn from people who have the results you want. Read books, take courses, find mentors who are financially successful.

## The Bottom Line

Your 20s are when small habits create massive long-term results. Avoid these mistakes, and you'll be ahead of 90% of your peers.

Start with one change this week. Future you will thank you.

---

**Ready to build better money habits?** [Start our free financial literacy course](/learn) and master the fundamentals.
    `,
    published: true,
    category: 'personal-finance'
  },
  {
    title: "Index Funds vs. Picking Stocks: What the Data Really Shows",
    slug: "index-funds-vs-stock-picking",
    excerpt: "Can you beat the market by picking individual stocks? Here's what decades of research reveals.",
    content: `
# Index Funds vs. Picking Stocks: What the Data Really Shows

Should you pick individual stocks or invest in boring index funds? Let's look at what the data actually shows.

## The Uncomfortable Truth

**Over 15 years, 92% of actively managed funds underperform the S&P 500 index.**

That's not a typo. Professional investors with teams of analysts, Bloomberg terminals, and insider access fail to beat a simple index fund 92% of the time.

If the pros can't do it, what chance do individual investors have?

## Why Stock Picking Usually Fails

### 1. You're Competing Against Algorithms

Modern markets have high-frequency trading firms that execute trades in microseconds. They have information and speed advantages you'll never match.

### 2. The Market Is Fairly Efficient

Any public information is already priced in. That "hot stock tip" you heard? Thousands of others heard it first and already traded on it.

### 3. Emotions Destroy Returns

Individual investors typically buy high (FOMO when stocks soar) and sell low (panic during crashes). The average investor underperforms the S&P 500 by 4-5% annually due to terrible timing.

### 4. Fees and Taxes

Frequent trading generates commissions and short-term capital gains taxes (up to 37% vs. 20% long-term rate). These friction costs destroy returns.

### 5. Concentration Risk

Picking individual stocks means concentrated bets. If 2-3 companies fail, your portfolio tanks. Enron employees who had all their 401(k) in company stock lost everything.

## The Case for Index Funds

Index funds are simple: they own everything in a market index.

**S&P 500 index = automatic ownership of America's 500 largest companies.**

### Advantages:

- **Instant diversification:** One fund = 500 companies
- **Rock-bottom fees:** 0.03-0.15% vs. 1%+ for active funds
- **Tax efficient:** Minimal trading = fewer capital gains
- **Proven performance:** Beats 92% of active managers long-term
- **Zero research required:** No need to analyze companies

### The Math of Fees

This is where index funds really shine.

**Scenario: $100,000 invested for 30 years at 10% annual return**

- **Index fund (0.03% fee):** $1,744,940
- **Active fund (1% fee):** $1,326,760
- **Difference:** $418,180 lost to fees!

That 0.97% fee difference costs you nearly half a million dollars.

## When Stock Picking Makes Sense

There are rare cases where individual stocks can work:

1. **You have genuine edge:** Deep industry expertise or access to unique information (legally obtained).

2. **You enjoy the research:** If analyzing companies is a hobby you love, go for it—but limit it to 5-10% of your portfolio.

3. **Tax-loss harvesting:** Holding individual stocks allows more sophisticated tax strategies for high earners.

4. **You're Warren Buffett:** If you're one of the 0.01% who can actually beat the market consistently, congratulations.

## What the Legends Say

**Warren Buffett's advice for his wife in his will:**

> "Put 10% in short-term government bonds and 90% in a very low-cost S&P 500 index fund. I believe the trust's long-term results from this policy will be superior to those attained by most investors."

The greatest investor in history recommends index funds for normal people.

**Jack Bogle, founder of Vanguard:**

> "Don't look for the needle in the haystack. Just buy the haystack!"

## The Verdict

For 95% of investors, index funds are the smart choice:

✅ Lower fees  
✅ Better returns (long-term)  
✅ Less stress  
✅ Less time required  
✅ Proven track record  

Stock picking can be fun with 5-10% of your portfolio, but make index funds your foundation.

## How to Start

1. Open account at Vanguard, Fidelity, or Schwab
2. Buy total market index fund: VTSAX, FZROX, or SWTSX
3. Set up automatic monthly investments
4. Ignore the noise
5. Check once per year
6. Retire wealthy

It's that simple. Boring works.

---

**Want to learn more about building wealth through investing?** [Explore our investing courses](/learn/investing-101).
    `,
    published: true,
    category: 'investing'
  },
  {
    title: "The 50/30/20 Budget Rule: Does It Actually Work?",
    slug: "50-30-20-budget-rule",
    excerpt: "Is the popular 50/30/20 budgeting framework realistic? We break down the pros, cons, and when to use it.",
    content: `
# The 50/30/20 Budget Rule: Does It Actually Work?

The 50/30/20 rule is everywhere in personal finance content. But does this simple budgeting framework actually work in real life?

## What Is the 50/30/20 Rule?

Split your after-tax income into three buckets:

- **50% Needs:** Housing, food, utilities, transportation, insurance
- **30% Wants:** Dining out, entertainment, hobbies, travel
- **20% Savings:** Emergency fund, retirement, debt payoff, investments

**Example: $4,000/month take-home pay**
- $2,000 → Needs
- $1,200 → Wants  
- $800 → Savings

Simple, right? But there's a catch...

## The Reality Check

### When 50/30/20 Works Great:

✅ **You live in a low/medium cost-of-living area**  
If rent is $1,000-1,500, keeping needs under 50% is doable.

✅ **You have a moderate-to-high income**  
Making $60K+ gives enough cushion to comfortably follow the rule.

✅ **You're debt-free or have minimal debt**  
No large student loans or credit card balances to tackle.

✅ **You're a budgeting beginner**  
The simplicity helps you start tracking without overwhelm.

### When 50/30/20 Breaks Down:

❌ **You live in an expensive city**  
In SF, NYC, or LA, housing alone can be 40-50% of income. Add transportation, and "needs" easily hit 70%.

❌ **You're paying off significant debt**  
With $500/month in student loans, that 20% savings bucket shrinks fast.

❌ **You're in a low-income situation**  
Making $30K/year means $500/month for wants—barely enough for basic quality of life.

❌ **You're aggressively pursuing FIRE**  
Financial Independence advocates save 50-70%, not 20%.

## The Percentages Aren't Magic

Here's what most articles won't tell you: **the 50/30/20 split is arbitrary.**

Senator Elizabeth Warren popularized it in "All Your Worth," but these aren't scientifically proven optimal ratios. They're rough guidelines.

What actually matters:

1. **Spending less than you earn**
2. **Saving consistently**
3. **Tracking where money goes**
4. **Optimizing over time**

The exact percentages? Less important than the habit of budgeting.

## Better Alternatives

### The Reverse Budget (Pay Yourself First)

Instead of allocating leftovers to savings:

1. Auto-transfer savings first (20-30%)
2. Spend the rest guilt-free
3. Adjust if you run short

**Benefit:** Guarantees savings happen. No willpower required.

### The Zero-Based Budget

Every dollar gets a job. Income minus expenses equals zero.

**Benefit:** Maximum control and awareness of spending.

**Drawback:** Requires more time and discipline.

### The Anti-Budget

Track spending only. No categories or restrictions.

**Benefit:** Freedom and flexibility.

**Drawback:** Requires high self-control and awareness.

## How to Make 50/30/20 Work for You

If you like the framework but need adjustments:

### 1. Customize the Percentages

Live in HCOL area? Try:
- 60% Needs
- 20% Wants
- 20% Savings

Early career with high debt? Try:
- 50% Needs
- 15% Wants
- 35% Debt payoff & savings

### 2. Define "Needs" Honestly

Be brutal. Do you *need* the $80/month gym membership, or is that a want? Do you *need* the latest iPhone, or would last year's model work?

Most people inflate needs to justify spending.

### 3. Track for 3 Months First

Don't force yourself into 50/30/20 immediately. Track spending for 90 days to see your actual patterns.

Then adjust toward 50/30/20 gradually.

### 4. Focus on the 20% Savings

If you're hitting 20%+ savings rate consistently, you're winning. The exact split between needs and wants matters less.

## The Verdict

**50/30/20 is a solid starting point, not a rigid rule.**

Use it as training wheels while you learn to budget. Once you understand your money, customize it to your situation.

The best budget is the one you'll actually follow for years. If that's 50/30/20, great. If not, find what works.

What matters: Save consistently, avoid lifestyle inflation, and optimize over time.

---

**Ready to create a budget that fits your life?** [Start our budgeting basics course](/learn/budgeting-basics).
    `,
    published: true,
    category: 'budgeting'
  }
]

async function createBlogPosts() {
  console.log('📝 Creating blog posts...\n')

  let created = 0
  let skipped = 0

  for (const post of blogPosts) {
    const { data: existing } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', post.slug)
      .single()

    if (existing) {
      console.log(`⏭️  ${post.title} (exists)`)
      skipped++
      continue
    }

    const { error } = await supabase
      .from('blog_posts')
      .insert({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        is_featured: post.published,
        published_at: new Date().toISOString()
      })

    if (error) {
      console.log(`❌ ${post.title}: ${error.message}`)
      skipped++
    } else {
      console.log(`✅ ${post.title}`)
      created++
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`✅ Created: ${created}`)
  console.log(`⏭️  Skipped: ${skipped}`)
  console.log(`📚 Total: ${created + skipped}`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━\n`)
}

createBlogPosts().catch(console.error)
