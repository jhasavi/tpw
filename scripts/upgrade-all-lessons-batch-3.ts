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
    slug: 'identity-theft',
    content: {
      introduction:
        'Identity theft affects 1 in 15 Americans annually, costing victims an average of $1,100 and months of recovery time. This lesson teaches prevention tactics—security freezes, monitoring, and safe practices—and a step-by-step recovery plan if theft occurs.',
      definitions: [
        { term: 'Identity Theft', definition: 'Unauthorized use of your personal information (SSN, accounts, credit) to commit fraud.' },
        { term: 'Credit Freeze', definition: 'Blocks lenders from accessing your credit report, preventing new accounts from being opened.' },
        { term: 'Fraud Alert', definition: 'Notifies lenders to verify your identity before opening new accounts; lasts 1 year (or 7 for extended).' },
        { term: 'Data Breach', definition: 'Unauthorized access to a company\'s database exposing customer data (SSNs, passwords, payment info).' }
      ],
      sections: [
        {
          title: 'Prevention: Security Freeze',
          content:
            'A credit freeze is the strongest protection. It blocks lenders from pulling your report, preventing identity thieves from opening accounts in your name. It\'s free and does not affect your credit score.\n\nHow to freeze: Contact all three bureaus online:\n• Equifax: equifax.com/personal/credit-report-services/credit-freeze\n• Experian: experian.com/freeze/center.html\n• TransUnion: transunion.com/credit-freeze\n\nYou receive a PIN to lift the freeze temporarily when you apply for credit. Lift takes minutes online. Freeze your credit if you\'re not actively applying for loans or credit cards.'
        },
        {
          title: 'Prevention: Strong Passwords and 2FA',
          content:
            'Use unique passwords for every account (never reuse). Use a password manager (Bitwarden, 1Password, Dashlane) to generate and store 16+ character passwords.\n\nEnable two-factor authentication (2FA) on all accounts: bank, email, social media, utilities. Prefer authenticator apps (Google Authenticator, Authy) over SMS when possible—SMS can be intercepted.'
        },
        {
          title: 'Prevention: Monitor Accounts and Reports',
          content:
            'Check bank and credit card transactions weekly. Enable alerts for:\n• Transactions over $50.\n• International purchases.\n• Failed login attempts.\n\nPull credit reports quarterly from AnnualCreditReport.com (free weekly through 2025). Review for unfamiliar accounts, inquiries, or addresses. Use free monitoring (Credit Karma, bank apps) for real-time alerts.'
        },
        {
          title: 'Prevention: Safe Online Practices',
          content:
            'Never share SSN, account numbers, or passwords via email or text.\n\nVerify requests: If a "bank" or "IRS" emails/calls, hang up and call the official number yourself.\n\nSecure Wi-Fi: Avoid financial transactions on public Wi-Fi. Use a VPN (NordVPN, ProtonVPN) if needed.\n\nPhishing: Watch for urgent language, misspellings, and suspicious links. Hover over links to see real URLs before clicking.'
        },
        {
          title: 'Recovery Step 1: Confirm the Theft',
          content:
            'Signs: unfamiliar accounts, denied credit, bills for services you didn\'t use, IRS notice of duplicate return.\n\nImmediate actions:\n1. Check credit reports for unfamiliar activity.\n2. Review bank/card statements for unauthorized charges.\n3. Contact affected institutions to freeze accounts or dispute charges.'
        },
        {
          title: 'Recovery Step 2: Report and Document',
          content:
            'File an FTC report at IdentityTheft.gov. This creates an official Identity Theft Report and recovery plan.\n\nFile a police report in your city. Some creditors require it for fraud investigations.\n\nDocument everything: Save emails, call logs, letters, and dispute forms. Keep a timeline.'
        },
        {
          title: 'Recovery Step 3: Freeze Credit and Close Accounts',
          content:
            'Place credit freezes with all three bureaus immediately.\n\nPlace a fraud alert (free, 1 year) as a backup. Lenders must verify your identity before opening accounts.\n\nClose fraudulent accounts: Write to each lender with your Identity Theft Report and police report. Request closure and removal from your credit report.'
        },
        {
          title: 'Recovery Step 4: Dispute and Monitor',
          content:
            'Dispute fraudulent charges with banks/credit cards. Federal law limits liability to $50 (often $0) if reported promptly.\n\nDispute fraudulent accounts with credit bureaus. Attach your Identity Theft Report and police report.\n\nMonitor weekly for 6–12 months. Set calendar reminders to pull reports and review accounts.'
        },
        {
          title: 'Case Study: Data Breach Recovery',
          content:
            'After a data breach exposed her SSN, Lisa placed credit freezes and a fraud alert. Two months later, she received a denial letter for a credit card she didn\'t apply for. She filed an FTC report, contacted the card issuer, and disputed the inquiry with the credit bureau. The account was closed and removed from her report within 30 days. The freeze prevented further attempts.'
        }
      ],
      keyTakeaways: [
        'Credit freezes are the strongest prevention tool and are free.',
        'Use unique passwords, password managers, and 2FA on all accounts.',
        'Monitor accounts weekly and pull credit reports quarterly.',
        'If theft occurs, file FTC and police reports immediately and freeze credit.',
        'Document all steps and follow up with lenders and bureaus to remove fraud.'
      ],
      actionItems: [
        { step: 1, action: 'Freeze your credit', description: 'Contact Equifax, Experian, and TransUnion online; save PINs.' },
        { step: 2, action: 'Set up 2FA', description: 'Enable two-factor authentication on bank, email, and social accounts.' },
        { step: 3, action: 'Enable account alerts', description: 'Turn on alerts for transactions >$50 and failed logins.' },
        { step: 4, action: 'Pull credit reports', description: 'Go to AnnualCreditReport.com; review for unfamiliar activity.' },
        { step: 5, action: 'Bookmark IdentityTheft.gov', description: 'Save the FTC recovery site for quick access if theft occurs.' }
      ],
      resources: [
        { title: 'IdentityTheft.gov', type: 'Tool', url: 'https://www.identitytheft.gov/', description: 'FTC\'s official recovery plan and report filing.' },
        { title: 'Credit Freeze Guide (FTC)', type: 'Guide', url: 'https://consumer.ftc.gov/articles/what-know-about-credit-freezes-fraud-alerts', description: 'How to freeze and lift your credit.' },
        { title: 'Bitwarden', type: 'App', url: 'https://bitwarden.com/', description: 'Free, open-source password manager.' },
        { title: 'Have I Been Pwned', type: 'Tool', url: 'https://haveibeenpwned.com/', description: 'Check if your email/password was exposed in a breach.' }
      ],
      quiz: {
        questions: [
          { q: 'What is the strongest identity theft prevention tool?', a: 'A credit freeze.' },
          { q: 'How often should you check credit reports?', a: 'Quarterly, or weekly if available.' },
          { q: 'What should you do if you suspect identity theft?', a: 'File FTC report, freeze credit, contact affected institutions, file police report.' },
          { q: 'Why use 2FA?', a: 'It adds a second verification step, blocking unauthorized logins even if passwords are stolen.' },
          { q: 'What is a fraud alert?', a: 'A flag on your credit requiring lenders to verify identity before opening accounts; lasts 1 year.' }
        ]
      }
    }
  },
  {
    slug: 'insurance-fundamentals',
    content: {
      introduction:
        'Insurance transfers financial risk from you to an insurer in exchange for premiums. The right coverage prevents catastrophic financial loss from health issues, accidents, property damage, or death. This lesson explains the four essential types of insurance, how much coverage you need, and how to shop smart without overpaying.',
      definitions: [
        { term: 'Premium', definition: 'The amount you pay (monthly or annually) to maintain coverage.' },
        { term: 'Deductible', definition: 'The amount you pay out-of-pocket before insurance kicks in.' },
        { term: 'Coverage Limit', definition: 'The maximum the insurer will pay for a claim.' },
        { term: 'Term Life Insurance', definition: 'Temporary life insurance covering a fixed period (10, 20, 30 years). Cheaper than permanent.' },
        { term: 'Whole Life Insurance', definition: 'Permanent life insurance with a cash value component. More expensive; often unnecessary.' }
      ],
      sections: [
        {
          title: 'Health Insurance: The Foundation',
          content:
            'Health insurance covers medical care: doctor visits, hospital stays, prescriptions, preventive care.\n\nKey terms:\n• Premium: monthly cost.\n• Deductible: pay this first before insurance covers costs (e.g., $2,000).\n• Out-of-pocket max: the most you pay in a year; after this, insurance pays 100%.\n• Network: in-network providers cost less.\n\nHow much: Choose based on health needs. Healthy, young? High-deductible plan (lower premium, higher deductible). Chronic conditions or planned surgery? Low-deductible plan. Always get coverage—one hospitalization can cost $50k–$100k+.'
        },
        {
          title: 'Auto Insurance: State-Required',
          content:
            'Auto insurance covers damage and liability from car accidents. Most states require minimum coverage.\n\nTypes:\n• Liability: Pays for damage you cause to others (required). Minimum 100/300/100 (injury per person/per accident/property).\n• Collision: Pays for damage to your car.\n• Comprehensive: Covers theft, weather, vandalism.\n• Uninsured motorist: Protects you if hit by someone without insurance.\n\nHow much: If your car is worth <$3k, drop collision/comprehensive. Otherwise, carry all four. Increase liability limits to 250/500/100 or more if you have assets to protect.'
        },
        {
          title: 'Homeowners/Renters Insurance',
          content:
            'Homeowners: Covers your home, belongings, and liability. Required by mortgage lenders. Replacement cost coverage is best (pays to rebuild/replace at current prices).\n\nRenters: Covers your belongings and liability; does not cover the building (landlord\'s responsibility). Costs $15–$30/month. Essential—covers theft, fire, and liability if someone is injured in your unit.\n\nHow much: Homeowners: insure to replacement cost + $300k–$500k liability. Renters: $20k–$30k belongings + $300k liability.'
        },
        {
          title: 'Life Insurance: Income Replacement',
          content:
            'Life insurance pays a lump sum to beneficiaries if you die. Essential if anyone depends on your income (spouse, kids, aging parents).\n\nTerm life: Covers 10–30 years. Cheap, simple. Example: $500k 20-year term for a healthy 30-year-old = $25–$40/month.\n\nWhole life: Permanent coverage with cash value. Expensive and complex. Most people don\'t need it.\n\nHow much: 10–12x your annual income. Example: $60k income → $600k–$720k coverage. Cover until kids are independent or debts are paid.'
        },
        {
          title: 'Disability Insurance: Income Protection',
          content:
            'Disability insurance replaces income if you\'re unable to work due to injury or illness. Often overlooked but critical—1 in 4 workers become disabled before retirement.\n\nShort-term: Covers 3–6 months. Often provided by employers.\n\nLong-term: Covers years or until retirement. Replace 60–70% of income.\n\nHow to get: Check employer benefits first. If not offered, buy individual policy. Cost: 1–3% of income.'
        },
        {
          title: 'Shopping Smart: How to Save',
          content:
            'Bundle: Combine auto + home/renters with one insurer for 15–25% discounts.\n\nIncrease deductibles: Raising deductible from $500 to $1,000 can cut premiums 10–20%. Keep emergency fund to cover higher deductible.\n\nShop annually: Compare quotes from 3–5 insurers. Prices change; switching can save hundreds.\n\nAsk for discounts: good driver, good student, safety features, paid-in-full, autopay, loyalty.\n\nAvoid: Whole life (unless very specific estate planning need), extended warranties, credit life insurance, travel insurance for healthy trips.'
        },
        {
          title: 'Case Study: Term Life Savings',
          content:
            'Jenna, 32, was sold a $250k whole life policy for $180/month ($2,160/year). She switched to a $500k 20-year term policy for $35/month ($420/year), saving $1,740/year. She invested the difference in her Roth IRA. Over 20 years at 7% return, the savings grew to $85k—far exceeding any "cash value" the whole life policy would have built.'
        }
      ],
      keyTakeaways: [
        'Health, auto, home/renters, and term life are the four essential insurances.',
        'Buy enough coverage to prevent catastrophic loss; avoid overinsuring low-value items.',
        'Term life is cheaper and simpler than whole life for most people.',
        'Shop annually, bundle policies, and raise deductibles to save.',
        'Disability insurance protects income if you can\'t work—often overlooked but critical.'
      ],
      actionItems: [
        { step: 1, action: 'Review current coverage', description: 'List all policies: health, auto, home/renters, life, disability.' },
        { step: 2, action: 'Calculate coverage gaps', description: 'Life: 10–12x income. Auto: 250/500/100 liability. Renters: $20k–$30k + $300k liability.' },
        { step: 3, action: 'Get 3–5 quotes', description: 'Use comparison sites (Policygenius, Gabi, Insurify) or contact insurers directly.' },
        { step: 4, action: 'Bundle and ask for discounts', description: 'Combine auto + home/renters; request all available discounts.' },
        { step: 5, action: 'Set annual review reminder', description: 'Add calendar event to re-shop policies every 12 months.' }
      ],
      resources: [
        { title: 'Policygenius', type: 'Tool', url: 'https://www.policygenius.com/', description: 'Compare life, auto, home, and disability insurance quotes.' },
        { title: 'NAIC Consumer Guide', type: 'Guide', url: 'https://content.naic.org/consumer.htm', description: 'State-by-state insurance guides and consumer protections.' },
        { title: 'Term Life Calculator', type: 'Tool', url: 'https://www.fidelity.com/life-insurance/estimator', description: 'Estimate coverage needs based on income and dependents.' },
        { title: 'Healthcare.gov', type: 'Tool', url: 'https://www.healthcare.gov/', description: 'Compare health insurance plans and subsidies.' }
      ],
      quiz: {
        questions: [
          { q: 'What are the four essential types of insurance?', a: 'Health, auto, home/renters, and term life.' },
          { q: 'How much life insurance coverage do you need?', a: '10–12x your annual income.' },
          { q: 'What is the difference between term and whole life?', a: 'Term covers a fixed period and is cheaper; whole is permanent with cash value and is more expensive.' },
          { q: 'How can you save on insurance?', a: 'Bundle policies, raise deductibles, shop annually, and ask for discounts.' },
          { q: 'What does disability insurance cover?', a: 'Lost income if you\'re unable to work due to injury or illness.' }
        ]
      }
    }
  },
  {
    slug: 'financial-advisors',
    content: {
      introduction:
        'A financial advisor can provide expertise, accountability, and personalized planning—but only if you choose the right one. This lesson explains advisor types, fee structures, fiduciary duty, and how to evaluate credentials so you hire someone who works in your best interest.',
      definitions: [
        { term: 'Fiduciary', definition: 'An advisor legally required to act in your best interest, not their own or their firm\'s.' },
        { term: 'Fee-Only', definition: 'Advisors paid only by clients (flat fee, hourly, or % of assets). No commissions or product sales.' },
        { term: 'Fee-Based', definition: 'Advisors who charge fees but also earn commissions from product sales. Potential conflicts of interest.' },
        { term: 'CFP (Certified Financial Planner)', definition: 'A credential requiring education, exams, experience, and ethics standards. CFPs are fiduciaries.' },
        { term: 'Robo-Advisor', definition: 'Automated investment management using algorithms. Low-cost alternative to human advisors.' }
      ],
      sections: [
        {
          title: 'When You Need an Advisor',
          content:
            'You may benefit from an advisor if you:\n• Have complex situations (multiple income sources, business ownership, estate planning).\n• Lack time or confidence to manage investments.\n• Want accountability and behavior coaching to avoid emotional decisions.\n• Are approaching retirement and need withdrawal strategies.\n• Have experienced a major life change (inheritance, divorce, windfall).\n\nYou may not need one if:\n• You\'re comfortable with DIY investing (index funds, rebalancing).\n• Your situation is simple (one job, one retirement account, no estate complexity).\n• You prefer learning and managing yourself.'
        },
        {
          title: 'Advisor Types and Fee Structures',
          content:
            'Fee-only: Best for avoiding conflicts. Pay flat fee ($2k–$10k/year), hourly ($150–$400/hr), or % of assets (0.5–1.5%). Advisors are fiduciaries.\n\nFee-based: Charge fees plus earn commissions on products they sell (insurance, annuities, mutual funds). Not always fiduciaries. Watch for conflicts.\n\nCommission-only: Earn money only from product sales. High risk of conflicts; often push expensive, unnecessary products. Avoid unless you verify fiduciary status.\n\nRobo-advisors: Automated platforms (Betterment, Wealthfront, Vanguard Digital) charge 0.25–0.5% of assets. Good for simple situations and low-cost diversification.'
        },
        {
          title: 'Fiduciary Duty: Why It Matters',
          content:
            'Fiduciaries are legally required to put your interests first. Non-fiduciaries operate under a "suitability" standard—recommendations must be suitable, but not necessarily best for you.\n\nAlways ask: "Are you a fiduciary 100% of the time?" If no, walk away. CFPs, RIAs (Registered Investment Advisors), and fee-only planners are fiduciaries. Broker-dealers and insurance agents often are not.'
        },
        {
          title: 'Credentials to Look For',
          content:
            'CFP (Certified Financial Planner): Gold standard for comprehensive planning. Requires education, exam, experience, and ethics.\n\nCFA (Chartered Financial Analyst): Investment analysis expertise. Good for portfolio management.\n\nCPA/PFS (Personal Financial Specialist): Tax-focused planning.\n\nChFC (Chartered Financial Consultant): Comprehensive planning, but less rigorous than CFP.\n\nAvoid: Advisors with no recognized credentials or those pushing proprietary products.'
        },
        {
          title: 'Questions to Ask Before Hiring',
          content:
            '1. Are you a fiduciary 100% of the time?\n2. How are you compensated? (Fee-only, fee-based, commission?)\n3. What are your credentials? (CFP, CFA, CPA?)\n4. What services do you provide? (Investment management, tax, estate, insurance?)\n5. Do you have any conflicts of interest or product affiliations?\n6. Can I see a sample financial plan?\n7. What are your total fees, including fund expenses?\n8. How often will we meet and communicate?\n\nRed flags: Vague answers, pressure to buy products, refusal to disclose fees, guarantees of returns, no fiduciary commitment.'
        },
        {
          title: 'DIY vs. Robo vs. Human Advisor',
          content:
            'DIY: Best if you enjoy learning, have time, and a simple situation. Use low-cost index funds and rebalance annually. Cost: <0.10% in fund expenses.\n\nRobo: Good for hands-off investors with straightforward goals. Automated rebalancing, tax-loss harvesting. Cost: 0.25–0.5%.\n\nHuman: Best for complex situations, behavior coaching, and personalized planning. Cost: 0.5–1.5% of assets or flat fee.\n\nHybrid: Some advisors offer low-cost advice on an hourly or project basis (e.g., $1k–$3k for a one-time plan). Good middle ground.'
        },
        {
          title: 'Case Study: Fee Transparency',
          content:
            'Mark hired an advisor charging 1% of assets ($400k portfolio = $4k/year). The advisor also placed him in high-expense mutual funds (1.2% expense ratios), adding $4,800/year in hidden costs. Total: $8,800/year (2.2%). Mark switched to a fee-only CFP charging $3k flat fee and moved to index funds (0.05% expenses = $200/year). Total savings: $5,600/year. Over 20 years at 7% return, that saved him $250k+.'
        }
      ],
      keyTakeaways: [
        'Always hire a fiduciary advisor who is legally required to act in your best interest.',
        'Fee-only advisors (flat fee, hourly, or % of assets) avoid conflicts from commissions.',
        'Look for CFP, CFA, or CPA credentials; verify fiduciary status.',
        'Ask about fees, services, conflicts, and credentials before hiring.',
        'DIY and robo-advisors work well for simple situations; human advisors for complexity.'
      ],
      actionItems: [
        { step: 1, action: 'Assess your need', description: 'Do you have complexity, lack time, or want accountability?' },
        { step: 2, action: 'Search for fee-only CFPs', description: 'Use NAPFA.org or XY Planning Network to find fiduciary advisors.' },
        { step: 3, action: 'Prepare interview questions', description: 'Write down the 8 questions above and take notes during calls.' },
        { step: 4, action: 'Compare 2–3 advisors', description: 'Interview at least two; compare fees, services, and fit.' },
        { step: 5, action: 'Verify credentials', description: 'Check CFP Board (cfp.net) or SEC (adviserinfo.sec.gov) for disciplinary history.' }
      ],
      resources: [
        { title: 'NAPFA (Fee-Only Advisors)', type: 'Directory', url: 'https://www.napfa.org/', description: 'Find fee-only, fiduciary financial planners.' },
        { title: 'CFP Board Verification', type: 'Tool', url: 'https://www.cfp.net/verify-a-cfp-professional', description: 'Verify CFP credentials and check disciplinary history.' },
        { title: 'SEC Investment Adviser Search', type: 'Tool', url: 'https://adviserinfo.sec.gov/', description: 'Research RIA firms and advisors; check disclosure documents.' },
        { title: 'XY Planning Network', type: 'Directory', url: 'https://www.xyplanningnetwork.com/', description: 'Fee-only CFPs specializing in younger clients and flat/hourly fees.' }
      ],
      quiz: {
        questions: [
          { q: 'What is a fiduciary?', a: 'An advisor legally required to act in your best interest.' },
          { q: 'What is the difference between fee-only and fee-based?', a: 'Fee-only advisors are paid only by clients; fee-based also earn commissions from product sales.' },
          { q: 'What credential is the gold standard for financial planning?', a: 'CFP (Certified Financial Planner).' },
          { q: 'Name two red flags when interviewing an advisor.', a: 'Refusal to disclose fees, pressure to buy products, no fiduciary commitment.' },
          { q: 'When might a robo-advisor be a good choice?', a: 'For straightforward situations and hands-off investors who want low-cost automation.' }
        ]
      }
    }
  }
]

async function run() {
  console.log('🚀 Upgrading batch 3 of lessons...\n')

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

  console.log('\n🎉 Batch 3 complete')
}

run().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
