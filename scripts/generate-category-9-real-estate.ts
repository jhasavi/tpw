import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const CATEGORY_9_REAL_ESTATE = [
  // BEGINNER LEVEL (25 questions)
  {
    question_text: "What is the primary advantage of owning vs renting a home?",
    correct_answer: "Building equity through mortgage payments",
    incorrect_answers: [
      "Never having to pay for repairs",
      "Guaranteed property value increase",
      "Lower monthly costs than renting"
    ],
    explanation: "Homeownership builds equity as you pay down the mortgage and property appreciates. You also gain tax benefits and stability, though you're responsible for all maintenance and costs.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is a down payment?",
    correct_answer: "The upfront cash payment when buying a home",
    incorrect_answers: [
      "The final payment when you own the home outright",
      "A penalty for late mortgage payments",
      "The monthly mortgage payment"
    ],
    explanation: "A down payment is the initial cash you pay when purchasing a home, typically 3-20% of the purchase price. A larger down payment means lower monthly payments and potentially avoiding PMI.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is PMI (Private Mortgage Insurance)?",
    correct_answer: "Insurance protecting the lender if you default with less than 20% down",
    incorrect_answers: [
      "Insurance protecting you if you lose your job",
      "Required insurance on all mortgages",
      "Insurance for property damage"
    ],
    explanation: "PMI is required when you put down less than 20%. It protects the lender (not you) if you default. It typically costs 0.5-1% of the loan annually and can be removed once you reach 20% equity.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What are closing costs?",
    correct_answer: "Fees and expenses due at the completion of a real estate transaction",
    incorrect_answers: [
      "The final mortgage payment",
      "Costs to close on a rental apartment",
      "Penalties for paying off a mortgage early"
    ],
    explanation: "Closing costs include lender fees, title insurance, appraisal, attorney fees, and other expenses, typically 2-5% of the home price. These are paid at closing when you finalize the purchase.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is a fixed-rate mortgage?",
    correct_answer: "A mortgage with an interest rate that stays the same for the entire loan term",
    incorrect_answers: [
      "A mortgage that must be paid off in 15 years",
      "A mortgage with increasing monthly payments",
      "A mortgage only for first-time buyers"
    ],
    explanation: "A fixed-rate mortgage has the same interest rate for the life of the loan (typically 15 or 30 years). Your principal and interest payment remains constant, making budgeting easier.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is an adjustable-rate mortgage (ARM)?",
    correct_answer: "A mortgage with an interest rate that can change periodically",
    incorrect_answers: [
      "A mortgage that adjusts based on your income",
      "A mortgage you can pay whenever you want",
      "A mortgage only for rental properties"
    ],
    explanation: "ARMs have interest rates that adjust based on market conditions after an initial fixed period (e.g., 5/1 ARM is fixed for 5 years, then adjusts annually). They start with lower rates but carry more risk.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is home equity?",
    correct_answer: "The portion of your home's value that you actually own",
    incorrect_answers: [
      "The total market value of your home",
      "The amount you owe on your mortgage",
      "A type of home insurance"
    ],
    explanation: "Equity = Home Value - Mortgage Balance. If your home is worth $300,000 and you owe $200,000, you have $100,000 in equity. It grows as you pay down the loan and/or the home appreciates.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is pre-approval for a mortgage?",
    correct_answer: "A lender's conditional commitment to loan you a specific amount",
    incorrect_answers: [
      "Automatic approval for any home you want",
      "The same as getting the actual mortgage",
      "A guarantee your offer will be accepted"
    ],
    explanation: "Pre-approval involves a lender reviewing your finances and determining how much they'll likely lend you. It strengthens your offer and shows sellers you're a serious buyer.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is an escrow account in relation to mortgages?",
    correct_answer: "An account where you deposit money for property taxes and insurance",
    incorrect_answers: [
      "A savings account for home repairs",
      "The lender's profit from your mortgage",
      "A penalty account for late payments"
    ],
    explanation: "Your monthly mortgage payment often includes extra money deposited into escrow to pay property taxes and homeowners insurance when they're due. The lender manages these payments.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is a home appraisal?",
    correct_answer: "A professional estimate of a property's market value",
    incorrect_answers: [
      "A home inspection for defects",
      "The listing price set by the seller",
      "A tax assessment by the county"
    ],
    explanation: "An appraisal is an unbiased professional opinion of a home's value, required by lenders to ensure the property is worth the loan amount. It's different from an inspection which checks condition.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is the difference between a home inspection and an appraisal?",
    correct_answer: "Inspection checks condition; appraisal determines value",
    incorrect_answers: [
      "They are the same thing",
      "Inspection determines value; appraisal checks condition",
      "Only appraisals are required for buying"
    ],
    explanation: "Inspections evaluate the home's physical condition and identify problems. Appraisals determine market value for the lender. Both are important but serve different purposes.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What does it mean to be 'underwater' on a mortgage?",
    correct_answer: "You owe more than the home is worth",
    incorrect_answers: [
      "Your basement is flooded",
      "You've missed several payments",
      "You're paying too much interest"
    ],
    explanation: "Being underwater (or upside-down) means your mortgage balance exceeds your home's current market value. This can happen when home values drop or you made a very low down payment.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is a mortgage broker?",
    correct_answer: "A professional who shops multiple lenders to find you a mortgage",
    incorrect_answers: [
      "Someone who sells homes",
      "A lender who only works for one bank",
      "A home inspector"
    ],
    explanation: "Mortgage brokers work with multiple lenders to find you the best loan terms. They can save you time and potentially get better rates, though they charge fees for their services.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is the loan-to-value (LTV) ratio?",
    correct_answer: "The mortgage amount divided by the home's value",
    incorrect_answers: [
      "Your income divided by the loan amount",
      "The interest rate on your loan",
      "The time it takes to pay off the loan"
    ],
    explanation: "LTV = (Loan Amount / Home Value) × 100. An $180,000 loan on a $200,000 home is 90% LTV. Lower LTV means more equity, better rates, and no PMI if below 80%.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is earnest money?",
    correct_answer: "A deposit showing you're serious about buying the home",
    incorrect_answers: [
      "The down payment on the home",
      "Money paid to the real estate agent",
      "A fee for the home inspection"
    ],
    explanation: "Earnest money (typically 1-3% of purchase price) is deposited when your offer is accepted. It's held in escrow and applied to your down payment or closing costs. You may lose it if you back out without a valid contingency.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is a contingency in a real estate offer?",
    correct_answer: "A condition that must be met for the sale to proceed",
    incorrect_answers: [
      "A backup offer if the first one fails",
      "Extra money offered above asking price",
      "A penalty for the seller backing out"
    ],
    explanation: "Common contingencies include financing (getting approved for a loan), inspection (home passes inspection), and appraisal (home appraises at purchase price). They protect buyers from losing earnest money.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is principal in a mortgage payment?",
    correct_answer: "The amount that goes toward paying down the loan balance",
    incorrect_answers: [
      "The total monthly payment amount",
      "The interest charged on the loan",
      "The amount paid to the school principal"
    ],
    explanation: "Each mortgage payment includes principal (reduces loan balance) and interest (lender's fee). Early in the loan, most goes to interest. Over time, more goes to principal.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is a seller's market?",
    correct_answer: "More buyers than available homes, favoring sellers",
    incorrect_answers: [
      "When sellers pay all closing costs",
      "A market only for professional sellers",
      "When homes sell below market value"
    ],
    explanation: "In a seller's market, low inventory and high demand give sellers the advantage. Homes sell quickly, often with multiple offers above asking price. Buyers have less negotiating power.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is a buyer's market?",
    correct_answer: "More homes available than buyers, favoring buyers",
    incorrect_answers: [
      "When only first-time buyers can purchase",
      "A market with special programs for buyers",
      "When homes sell above market value"
    ],
    explanation: "In a buyer's market, more inventory than demand gives buyers leverage. Homes stay on the market longer, prices may drop, and buyers can negotiate better terms and contingencies.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is the purpose of title insurance?",
    correct_answer: "To protect against ownership disputes and liens on the property",
    incorrect_answers: [
      "To insure the home against damage",
      "To guarantee your mortgage approval",
      "To protect against property value decline"
    ],
    explanation: "Title insurance protects you from past issues like unpaid liens, ownership disputes, or errors in public records. Lender's title insurance (required) protects the lender; owner's policy (optional) protects you.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is a VA loan?",
    correct_answer: "A government-backed mortgage for military veterans with no down payment",
    incorrect_answers: [
      "A loan only available in Virginia",
      "A variable-rate loan for all buyers",
      "A penalty for veteran homebuyers"
    ],
    explanation: "VA loans are backed by the Department of Veterans Affairs, offering qualified veterans and service members 0% down, no PMI, and competitive rates. A VA funding fee applies.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is an FHA loan?",
    correct_answer: "A government-insured loan requiring as little as 3.5% down",
    incorrect_answers: [
      "A loan only for first-time buyers",
      "A loan with the highest interest rates",
      "A loan that doesn't require credit checks"
    ],
    explanation: "FHA (Federal Housing Administration) loans are designed for borrowers with lower credit scores or less money for a down payment. They require 3.5% down and charge mortgage insurance premiums.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is a conventional loan?",
    correct_answer: "A mortgage not insured or guaranteed by the federal government",
    incorrect_answers: [
      "The most common type of loan for everyone",
      "A loan with unconventional requirements",
      "Always requires 20% down"
    ],
    explanation: "Conventional loans aren't backed by the government. They typically require higher credit scores and larger down payments than FHA/VA loans, but offer more flexibility and potentially lower costs.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is a HELOC?",
    correct_answer: "A Home Equity Line of Credit allowing you to borrow against your home equity",
    incorrect_answers: [
      "A type of homeowners insurance",
      "A home energy efficiency loan",
      "A helicopter pad on your property"
    ],
    explanation: "A HELOC works like a credit card secured by your home. You can borrow up to a limit during the draw period (usually 10 years), then repay it. Interest rates are variable.",
    difficulty_level: "beginner",
    category_id: 9
  },
  {
    question_text: "What is foreclosure?",
    correct_answer: "When a lender takes possession of a home due to non-payment",
    incorrect_answers: [
      "When you pay off your mortgage early",
      "A type of home insurance claim",
      "Selling your home for profit"
    ],
    explanation: "Foreclosure is the legal process where the lender repossesses and sells your home if you fail to make mortgage payments. It severely damages credit and you lose all equity invested.",
    difficulty_level: "beginner",
    category_id: 9
  },

  // INTERMEDIATE LEVEL (25 questions)
  {
    question_text: "What is the debt-to-income (DTI) ratio and why does it matter for mortgages?",
    correct_answer: "Monthly debt payments divided by gross income; lenders use it to assess loan affordability",
    incorrect_answers: [
      "Your total debt divided by your home value",
      "Only credit card debt matters for this ratio",
      "It determines your down payment amount"
    ],
    explanation: "DTI = (Total Monthly Debt / Gross Monthly Income) × 100. Most lenders want DTI under 43% for conventional loans, though FHA may allow higher. It shows your ability to manage monthly payments.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is the difference between pre-qualification and pre-approval?",
    correct_answer: "Pre-qualification is an estimate; pre-approval involves verifying your finances",
    incorrect_answers: [
      "They are exactly the same thing",
      "Pre-approval is less thorough than pre-qualification",
      "Only pre-qualification matters to sellers"
    ],
    explanation: "Pre-qualification is a quick estimate based on self-reported info. Pre-approval requires documentation (pay stubs, tax returns, credit check) and is a conditional commitment, making your offer much stronger.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is a jumbo loan?",
    correct_answer: "A mortgage exceeding conforming loan limits set by Fannie Mae and Freddie Mac",
    incorrect_answers: [
      "Any large mortgage over $200,000",
      "A loan with extra-long repayment terms",
      "A government-backed loan for expensive homes"
    ],
    explanation: "Jumbo loans exceed the conforming limit ($766,550 in most areas for 2024). They typically require larger down payments, higher credit scores, and have stricter underwriting because they can't be sold to Fannie/Freddie.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is mortgage points and when does buying them make sense?",
    correct_answer: "Upfront fees to lower your interest rate; beneficial if you keep the loan long enough to recoup the cost",
    incorrect_answers: [
      "Rewards points like credit cards",
      "Penalties for paying late",
      "Always a bad deal for buyers"
    ],
    explanation: "One point = 1% of loan amount and typically lowers rate by 0.25%. Calculate break-even: if points cost $3,000 and save $100/month, you break even in 30 months. Worth it if you'll keep the loan longer.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is the difference between a home equity loan and a HELOC?",
    correct_answer: "Home equity loan is a lump sum with fixed rate; HELOC is a line of credit with variable rate",
    incorrect_answers: [
      "They are the same product with different names",
      "HELOC has a fixed rate; home equity loan has variable rate",
      "Only HELOCs require collateral"
    ],
    explanation: "Home equity loans give you a lump sum at a fixed rate, like a second mortgage. HELOCs let you borrow as needed up to a limit at a variable rate, more like a credit card secured by your home.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is mortgage recasting?",
    correct_answer: "Making a lump sum payment to reduce your monthly payment while keeping the same rate and term",
    incorrect_answers: [
      "Refinancing to a new mortgage",
      "Converting from ARM to fixed rate",
      "Negotiating a lower interest rate"
    ],
    explanation: "Recasting involves paying a large lump sum toward principal. The lender recalculates (recasts) your payment based on the new lower balance, keeping the same interest rate and term. Fees are typically $150-500.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is an interest-only mortgage?",
    correct_answer: "You pay only interest for a period, then principal and interest; risky but lower initial payments",
    incorrect_answers: [
      "You never pay principal, only interest",
      "Interest is waived on these loans",
      "The safest type of mortgage"
    ],
    explanation: "Interest-only mortgages let you pay just interest (no principal) for 5-10 years, then payments jump when you start paying principal too. Risky because you build no equity initially and payments increase significantly.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is a bridge loan in real estate?",
    correct_answer: "A short-term loan to buy a new home before selling your current one",
    incorrect_answers: [
      "A loan to build a bridge on your property",
      "A permanent mortgage solution",
      "A loan for first-time buyers only"
    ],
    explanation: "Bridge loans provide temporary financing (usually 6-12 months) using your current home as collateral. They're expensive (high rates and fees) but solve the timing problem when buying before selling.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is assumable mortgage and what are the pros and cons?",
    correct_answer: "A buyer takes over the seller's existing mortgage; good if rate is low, but may need large down payment",
    incorrect_answers: [
      "All mortgages are assumable by law",
      "The seller continues to be responsible for the loan",
      "Only available for refinances"
    ],
    explanation: "Assumable mortgages (mainly FHA/VA) let buyers take over the seller's loan at the existing rate. Great in rising rate environments, but buyer must cover the equity gap in cash and qualify with the lender.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is a bi-weekly mortgage payment strategy?",
    correct_answer: "Paying half your monthly payment every two weeks, making 13 full payments per year",
    incorrect_answers: [
      "Paying your mortgage twice per month on any schedule",
      "A required payment schedule for all mortgages",
      "Always a bad financial decision"
    ],
    explanation: "26 bi-weekly half-payments = 13 full monthly payments vs. 12. The extra payment goes to principal, potentially saving thousands in interest and paying off the loan years early. Ensure payments are applied correctly.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is mortgage underwriting?",
    correct_answer: "The process where lenders verify your finances and assess risk before final approval",
    incorrect_answers: [
      "Writing the initial mortgage application",
      "The same as pre-approval",
      "Only checking your credit score"
    ],
    explanation: "Underwriting involves detailed verification of income, assets, debts, and property value. Underwriters ensure you meet lending criteria and the loan meets investor requirements. It's the final step before closing.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What are discount points vs origination points?",
    correct_answer: "Discount points lower your rate; origination points are lender fees for processing",
    incorrect_answers: [
      "They are exactly the same thing",
      "Origination points lower your rate; discount points are fees",
      "Both are always tax-deductible"
    ],
    explanation: "Discount points (prepaid interest) buy down your rate and may be tax-deductible. Origination points are lender fees for processing the loan and generally aren't deductible. Both equal 1% of the loan amount per point.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is a rate lock and when should you use it?",
    correct_answer: "Guaranteeing your interest rate for a period; use when rates are rising or you've found a good rate",
    incorrect_answers: [
      "Your rate can never change once locked",
      "Always lock immediately when applying",
      "Rate locks are free and last forever"
    ],
    explanation: "A rate lock guarantees your interest rate for 30-60 days (longer costs more). Lock when you're happy with the rate or expect rates to rise. If rates drop significantly, you may be stuck unless you have a float-down option.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is the PITI in a mortgage payment?",
    correct_answer: "Principal, Interest, Taxes, and Insurance - the total monthly housing cost",
    incorrect_answers: [
      "Just principal and interest",
      "A type of adjustable-rate mortgage",
      "Property inspection timing information"
    ],
    explanation: "PITI includes: Principal (loan paydown), Interest (lender fee), property Taxes (held in escrow), and Insurance (homeowners and PMI if applicable). Lenders use PITI when calculating DTI ratios.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is a short sale in real estate?",
    correct_answer: "Selling a home for less than the mortgage balance with lender approval",
    incorrect_answers: [
      "A home that sells quickly",
      "A foreclosure auction",
      "Selling your home in less than 30 days"
    ],
    explanation: "Short sales occur when homeowners owe more than the home is worth and can't afford payments. The lender must approve selling for less than the debt, often to avoid foreclosure. It damages credit but less than foreclosure.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is a deed in lieu of foreclosure?",
    correct_answer: "Voluntarily transferring property to the lender to avoid foreclosure",
    incorrect_answers: [
      "A legal action to fight foreclosure",
      "A type of title insurance",
      "Renting your home from the bank"
    ],
    explanation: "Instead of foreclosure, you give the property deed to the lender and they forgive the debt. It's faster and less costly than foreclosure but still damages credit. May have tax implications if debt is forgiven.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is the mortgage interest deduction limit after the Tax Cuts and Jobs Act?",
    correct_answer: "You can deduct interest on up to $750,000 of mortgage debt ($375,000 if married filing separately)",
    incorrect_answers: [
      "No limit - all mortgage interest is deductible",
      "Limited to $1 million like before 2018",
      "Mortgage interest is no longer deductible"
    ],
    explanation: "Post-2017, you can deduct interest on up to $750,000 of acquisition debt on your primary and secondary homes combined (down from $1M). Mortgages originated before 12/15/2017 are grandfathered at $1M.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is a comparative market analysis (CMA)?",
    correct_answer: "A report comparing your home to recently sold similar properties to estimate value",
    incorrect_answers: [
      "The same as a professional appraisal",
      "A government-required valuation",
      "Only used for commercial properties"
    ],
    explanation: "Real estate agents prepare CMAs using recently sold comparable homes (comps) to help price your home for sale or make an offer. Unlike appraisals, they're free but not official valuations for lending purposes.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is the difference between pre-foreclosure and foreclosure?",
    correct_answer: "Pre-foreclosure is the period after default but before the foreclosure sale; still time to resolve",
    incorrect_answers: [
      "They are the same thing",
      "Pre-foreclosure is worse than foreclosure",
      "Pre-foreclosure only lasts one day"
    ],
    explanation: "Pre-foreclosure begins when you default and receive a notice. You can still sell, do a short sale, negotiate with the lender, or catch up on payments. Foreclosure is when the lender takes the property.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is an escalation clause in a real estate offer?",
    correct_answer: "Your offer automatically increases to beat competing offers up to a maximum price",
    incorrect_answers: [
      "A clause allowing you to back out anytime",
      "Automatic price increases based on inflation",
      "A penalty for backing out of the deal"
    ],
    explanation: "In competitive markets, escalation clauses state you'll beat other offers by a set amount (e.g., $1,000) up to your max price. Example: offer $400K with escalation to $425K means you'll pay $1K over the highest offer up to $425K.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is a balloon mortgage?",
    correct_answer: "A mortgage with low payments and a large final payment of the remaining balance",
    incorrect_answers: [
      "A mortgage that inflates over time",
      "A mortgage for hot air balloon enthusiasts",
      "The same as an interest-only mortgage"
    ],
    explanation: "Balloon mortgages have low monthly payments for a period (5-7 years), then the entire remaining balance is due in one lump sum. Risky unless you plan to refinance or sell before the balloon payment.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is mortgage forbearance?",
    correct_answer: "Temporary suspension or reduction of mortgage payments during financial hardship",
    incorrect_answers: [
      "Permanently forgiving your mortgage debt",
      "A type of refinancing option",
      "Selling your home to the lender"
    ],
    explanation: "Forbearance allows you to pause or reduce payments temporarily (3-12 months) during hardship. Missed payments must eventually be repaid through a lump sum, repayment plan, or loan modification. Doesn't forgive debt.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is a due-on-sale clause?",
    correct_answer: "A mortgage provision requiring full repayment when the property is sold",
    incorrect_answers: [
      "Extra fees charged when selling",
      "A penalty for selling too quickly",
      "Only applies to investment properties"
    ],
    explanation: "Most mortgages have due-on-sale (alienation) clauses requiring you to pay off the loan when transferring ownership. This prevents buyers from assuming your low-rate loan, though FHA/VA loans are often assumable.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is mortgage seasoning?",
    correct_answer: "The time period a mortgage must be active before certain actions like refinancing or selling",
    incorrect_answers: [
      "Adding spices to your loan documents",
      "The aging of a property",
      "A type of adjustable rate period"
    ],
    explanation: "Seasoning requirements vary by lender and loan type. For example, you might need to wait 6-12 months after purchase before refinancing (rate-and-term), or FHA requires 6 months of payments before cash-out refinancing.",
    difficulty_level: "intermediate",
    category_id: 9
  },
  {
    question_text: "What is the Home Affordable Refinance Program (HARP) successor?",
    correct_answer: "The High LTV Refinance Option allows underwater borrowers with Fannie/Freddie loans to refinance",
    incorrect_answers: [
      "HARP still exists unchanged",
      "There is no replacement program",
      "Only available for FHA loans"
    ],
    explanation: "HARP ended in 2018 but was replaced by the High LTV Refinance Option (and later Freddie Mac's Enhanced Relief Refinance). These help borrowers with little or no equity refinance if their loan is owned by Fannie Mae or Freddie Mac.",
    difficulty_level: "intermediate",
    category_id: 9
  },

  // ADVANCED LEVEL (20 questions)
  {
    question_text: "What is the 1031 exchange and what are the strict timing rules?",
    correct_answer: "Tax-deferred exchange of investment property; must identify replacement in 45 days, close in 180 days",
    incorrect_answers: [
      "Any property swap with no time limits",
      "Only available for primary residences",
      "Must close within 30 days total"
    ],
    explanation: "Section 1031 allows deferring capital gains when exchanging 'like-kind' investment real estate. You must identify replacement property within 45 days and close within 180 days of selling the original property. Must use a qualified intermediary.",
    difficulty_level: "advanced",
    category_id: 9
  },
  {
    question_text: "What is cost segregation in real estate investing?",
    correct_answer: "Accelerating depreciation by identifying components with shorter useful lives than the building",
    incorrect_answers: [
      "Separating personal and business expenses",
      "A penalty for mixing property types",
      "Only available for residential properties"
    ],
    explanation: "Cost segregation studies identify property components (carpeting, fixtures, landscaping) that can be depreciated over 5-15 years instead of 27.5/39 years for the building, creating larger early deductions and improving cash flow.",
    difficulty_level: "advanced",
    category_id: 9
  },
  {
    question_text: "What is the qualified business income (QBI) deduction for rental real estate?",
    correct_answer: "20% deduction if rental activity qualifies as a trade or business with 250+ hours of services",
    incorrect_answers: [
      "All rental income automatically qualifies for 20% deduction",
      "QBI doesn't apply to real estate",
      "Only available for commercial real estate"
    ],
    explanation: "Rental real estate can qualify for the Section 199A deduction if it meets the safe harbor: 250+ hours of rental services, separate books, and contemporaneous records. Short-term rentals (avg <7 days) may qualify more easily.",
    difficulty_level: "advanced",
    category_id: 9
  },
  {
    question_text: "What is a DSCR loan and who uses it?",
    correct_answer: "Debt Service Coverage Ratio loan based on property cash flow, not personal income; for investors",
    incorrect_answers: [
      "A government-backed loan program",
      "Only available for primary residences",
      "Based solely on credit score"
    ],
    explanation: "DSCR loans qualify investors based on the property's rental income vs. the mortgage payment (DSCR = NOI / Debt Service). Typically need DSCR above 1.0-1.25. No income verification needed, but higher rates and down payments.",
    difficulty_level: "advanced",
    category_id: 9
  },
  {
    question_text: "What is the depreciation recapture tax when selling rental property?",
    correct_answer: "Previously claimed depreciation is taxed at 25% (plus state tax) on sale",
    incorrect_answers: [
      "All capital gains are taxed at regular income rates",
      "Depreciation is never taxed on sale",
      "Only applies if you sell at a loss"
    ],
    explanation: "Section 1250 recapture taxes depreciation claimed at a maximum 25% federal rate (unrecaptured Section 1250 gain). Remaining gain over original cost is taxed at long-term capital gains rates (0-20%). 1031 exchanges can defer this.",
    difficulty_level: "advanced",
    category_id: 9
  },
  {
    question_text: "What is the real estate professional status for tax purposes?",
    correct_answer: "Spending 750+ hours and >50% of working time in real property trades allows deducting rental losses against ordinary income",
    incorrect_answers: [
      "Anyone with a real estate license",
      "Owning more than 5 rental properties",
      "Making over $100,000 in rental income"
    ],
    explanation: "IRS real estate professional status requires: (1) 750+ hours in real property trades/businesses and (2) more than 50% of personal services in such activities. This exempts you from passive activity loss limitations.",
    difficulty_level: "advanced",
    category_id: 9
  },
  {
    question_text: "What is a Delaware Statutory Trust (DST) in 1031 exchanges?",
    correct_answer: "A fractional ownership structure allowing passive investment in large commercial properties for 1031 exchanges",
    incorrect_answers: [
      "A trust only available in Delaware",
      "A type of REIT investment",
      "Not eligible for 1031 exchange treatment"
    ],
    explanation: "DSTs allow investors to buy fractional interests in institutional-quality properties (apartments, retail, etc.) for 1031 exchanges. Beneficial for those who want passive income without active management, though less control and higher fees.",
    difficulty_level: "advanced",
    category_id: 9
  },
  {
    question_text: "What is the opportunity zone capital gains strategy?",
    correct_answer: "Deferring capital gains by investing in designated economically distressed areas with potential tax elimination after 10 years",
    incorrect_answers: [
      "Avoiding all capital gains taxes immediately",
      "Only available for real estate in opportunity zones",
      "Requires living in an opportunity zone"
    ],
    explanation: "Invest capital gains in Qualified Opportunity Funds within 180 days to defer tax until 2026. Hold 10+ years and gains from the QOZ investment are completely tax-free. Original gain is eventually taxed but appreciation escapes taxation.",
    difficulty_level: "advanced",
    category_id: 9
  },
  {
    question_text: "What is the installment sale method for real estate?",
    correct_answer: "Spreading capital gains tax over multiple years by receiving payments over time via seller financing",
    incorrect_answers: [
      "Paying for your home purchase in installments",
      "A penalty for selling in multiple transactions",
      "Only available for primary residences"
    ],
    explanation: "Seller financing where you receive payments over time allows reporting gain proportionately as received. If you finance 80% and receive 20% down, you only report 20% of the gain in year 1. Careful: depreciation recapture is still taxed in year 1.",
    difficulty_level: "advanced",
    category_id: 9
  },
  {
    question_text: "What is the Net Investment Income Tax (NIIT) impact on rental real estate?",
    correct_answer: "3.8% surtax on rental income for high earners unless you qualify as a real estate professional",
    incorrect_answers: [
      "All rental income is subject to 3.8% NIIT",
      "NIIT never applies to real estate",
      "Only applies to commercial real estate"
    ],
    explanation: "NIIT applies to rental income if MAGI exceeds $200K (single) or $250K (married) unless material participation or real estate professional status applies. Active vs. passive classification matters for both NIIT and loss deductibility.",
    difficulty_level: "advanced",
    category_id: 9
  },
  {
    question_text: "What is a reverse 1031 exchange?",
    correct_answer: "Buying replacement property before selling the relinquished property, requiring an Exchange Accommodation Titleholder",
    incorrect_answers: [
      "Exchanging back to your original property",
      "Not allowed under IRS rules",
      "Only available for commercial properties"
    ],
    explanation: "Reverse exchanges let you buy first, sell later - useful in competitive markets. An EAT holds title to either property for up to 180 days. More complex and expensive than forward exchanges but follows same tax treatment.",
    difficulty_level: "advanced",
    category_id: 9
  },
  {
    question_text: "What is the passive activity loss limitation for rental real estate?",
    correct_answer: "Rental losses can only offset passive income unless you meet $25K exception (AGI <$100K) or real estate professional status",
    incorrect_answers: [
      "All rental losses can offset W-2 income",
      "Passive loss rules don't apply to real estate",
      "Only applies to commercial properties"
    ],
    explanation: "Rental activities are passive by default. Losses can offset passive income or be suspended. Exception: up to $25K of losses can offset ordinary income if you actively participate and AGI < $150K (phases out $100K-$150K).",
    difficulty_level: "advanced",
    category_id: 9
  },
  {
    question_text: "What is a tenancy in common (TIC) vs. joint tenancy in real estate?",
    correct_answer: "TIC allows unequal shares and heirs inherit; joint tenancy has equal shares and right of survivorship",
    incorrect_answers: [
      "They are legally identical",
      "TIC has right of survivorship; joint tenancy doesn't",
      "Only married couples can use joint tenancy"
    ],
    explanation: "TIC owners can have different ownership percentages and their share passes to heirs. Joint tenancy requires equal shares and includes right of survivorship (automatically passes to co-owner). Impacts estate planning and 1031 exchanges.",
    difficulty_level: "advanced",
    category_id: 9
  },
  {
    question_text: "What is the Augusta Rule (Section 280A) for rental property?",
    correct_answer: "Rent your personal residence up to 14 days tax-free without reporting the income",
    incorrect_answers: [
      "All short-term rental income is tax-free",
      "Only applies in Augusta, Georgia",
      "Requires reporting income but allows deductions"
    ],
    explanation: "The Augusta Rule lets you rent your home up to 14 days/year without reporting income or paying taxes. If you rent 15+ days, all income is taxable and you can deduct expenses. Named for homeowners renting during the Masters golf tournament.",
    difficulty_level: "advanced",
    category_id: 9
  },
  {
    question_text: "What is a ground lease and how does it affect property value?",
    correct_answer: "You own the building but lease the land long-term, typically reducing property value and financing options",
    incorrect_answers: [
      "You lease the building but own the land",
      "A short-term rental agreement",
      "Always increases property value"
    ],
    explanation: "Ground leases (often 99 years) separate land and building ownership. The lessee owns improvements but pays rent for land. Reduces property value, limits financing, and creates complexity at lease expiration. Common in Hawaii and commercial real estate.",
    difficulty_level: "advanced",
    category_id: 9
  },
  {
    question_text: "What is the material participation test for rental activities?",
    correct_answer: "Seven tests determining if you actively participate, affecting whether losses are passive",
    incorrect_answers: [
      "Only one test: spending 500 hours",
      "Doesn't apply to rental real estate",
      "Only matters for tax credits, not losses"
    ],
    explanation: "Material participation tests include: (1) 500+ hours, (2) substantially all participation, (3) 100+ hours and not less than anyone else, (4) significant participation activities totaling 500+ hours, and three others. Rental activities have additional criteria.",
    difficulty_level: "advanced",
    category_id: 9
  },
  {
    question_text: "What is a Qualified Personal Residence Trust (QPRT)?",
    correct_answer: "An estate planning tool to transfer your home to heirs at a reduced gift tax value while retaining use",
    incorrect_answers: [
      "A trust to avoid property taxes",
      "Required for all home ownership",
      "Only available for rental properties"
    ],
    explanation: "A QPRT lets you gift your home to a trust at a discounted value while living there rent-free for a term. After the term, the home belongs to beneficiaries, removing it from your estate. Risk: you must survive the term.",
    difficulty_level: "advanced",
    category_id: 9
  },
  {
    question_text: "What is bonus depreciation for real estate?",
    correct_answer: "100% first-year deduction for qualified improvements (pre-2023) via cost segregation or separate acquisition",
    incorrect_answers: [
      "Extra depreciation for all real estate automatically",
      "Still available at 100% for all property types",
      "Only applies to new construction"
    ],
    explanation: "The Tax Cuts and Jobs Act allowed 100% bonus depreciation for qualified property (2017-2022), including components identified via cost segregation. Now phasing down: 80% (2023), 60% (2024), etc. Powerful for accelerating deductions on investment property.",
    difficulty_level: "advanced",
    category_id: 9
  },
  {
    question_text: "What is the depreciation adjustment for AMT purposes?",
    correct_answer: "Real property depreciation must use slower methods (40-year ADS vs. 27.5/39-year GDS) for AMT calculations",
    incorrect_answers: [
      "AMT doesn't affect real estate depreciation",
      "All depreciation is added back for AMT",
      "Only residential property is affected"
    ],
    explanation: "For AMT, residential rental property placed in service before 2018 must be depreciated over 40 years (ADS) vs. 27.5 years (GDS) for regular tax. This creates timing differences and can trigger AMT. Post-2017 property uses the same method for both.",
    difficulty_level: "advanced",
    category_id: 9
  },
  {
    question_text: "What is the step-up in basis for inherited real estate and its tax implications?",
    correct_answer: "Heirs receive the property with basis equal to fair market value at death, eliminating capital gains on appreciation",
    incorrect_answers: [
      "Heirs keep the deceased's original purchase price as basis",
      "All inherited property is taxed immediately",
      "Step-up only applies to primary residences"
    ],
    explanation: "Inherited property receives a step-up to FMV at death (or 6 months after if alternate valuation elected). This eliminates capital gains tax on lifetime appreciation. Recaptured depreciation from the deceased is also eliminated. Powerful estate planning tool.",
    difficulty_level: "advanced",
    category_id: 9
  }
]

async function uploadQuestions() {
  console.log('Starting upload of Category 9: Real Estate questions...')
  
  for (let i = 0; i < CATEGORY_9_REAL_ESTATE.length; i++) {
    const q = CATEGORY_9_REAL_ESTATE[i]
    
    // Transform to match database schema
    const options = [...(q.incorrect_answers || []), q.correct_answer].sort(() => Math.random() - 0.5)
    const questionForDB = {
      category_id: q.category_id,
      question_text: q.question_text,
      question_type: 'multiple_choice',
      difficulty_level: q.difficulty_level,
      options: options,
      correct_answer: q.correct_answer,
      explanation: q.explanation,
      topics: []
    }
    
    const { data, error } = await supabase
      .from('quiz_questions')
      .insert([questionForDB])
    
    if (error) {
      console.error(`Error uploading question ${i + 1}:`, error)
    } else {
      console.log(`✓ Uploaded question ${i + 1}/${CATEGORY_9_REAL_ESTATE.length}`)
    }
  }
  
  console.log('\n✅ Upload complete!')
  console.log(`Total questions uploaded: ${CATEGORY_9_REAL_ESTATE.length}`)
  console.log('Breakdown:')
  console.log(`- Beginner: ${CATEGORY_9_REAL_ESTATE.filter(q => q.difficulty_level === 'beginner').length}`)
  console.log(`- Intermediate: ${CATEGORY_9_REAL_ESTATE.filter(q => q.difficulty_level === 'intermediate').length}`)
  console.log(`- Advanced: ${CATEGORY_9_REAL_ESTATE.filter(q => q.difficulty_level === 'advanced').length}`)
}

// Auto-run on execute
uploadQuestions()

export { CATEGORY_9_REAL_ESTATE }
