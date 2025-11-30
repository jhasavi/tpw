import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const CATEGORY_11_BUSINESS = [
  // BEGINNER - 25 questions
  {
    category_id: 11,
    question_text: "What is a sole proprietorship?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "A business owned and operated by one person",
      "A business with multiple shareholders",
      "A non-profit organization",
      "A government-owned business"
    ],
    correct_answer: "A business owned and operated by one person",
    explanation: "A sole proprietorship is the simplest business structure where one person owns and operates the business. The owner and business are legally the same entity for tax and liability purposes."
  },
  {
    category_id: 11,
    question_text: "What does LLC stand for?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Limited Liability Company",
      "Legal License Corporation",
      "Limited License Contract",
      "Local Liability Certificate"
    ],
    correct_answer: "Limited Liability Company",
    explanation: "LLC stands for Limited Liability Company - a business structure that provides personal liability protection while offering tax flexibility. It's popular among small business owners."
  },
  {
    category_id: 11,
    question_text: "An EIN is a tax identification number for businesses.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! EIN (Employer Identification Number) is like a Social Security number for your business. It's issued by the IRS and required for hiring employees, opening business bank accounts, and filing taxes."
  },
  {
    category_id: 11,
    question_text: "What is a business plan?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "A document outlining business goals and strategies",
      "A daily schedule for business activities",
      "A list of employees",
      "A marketing brochure"
    ],
    correct_answer: "A document outlining business goals and strategies",
    explanation: "A business plan is a formal document that describes your business concept, market analysis, financial projections, and operational strategies. It's essential for securing funding and guiding business growth."
  },
  {
    category_id: 11,
    question_text: "What is cash flow in a business?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Money moving in and out of the business",
      "Only the money coming into the business",
      "Total business assets",
      "Annual profit"
    ],
    correct_answer: "Money moving in and out of the business",
    explanation: "Cash flow is the movement of money in and out of your business. Positive cash flow means more money coming in than going out. Managing cash flow is critical for business survival."
  },
  {
    category_id: 11,
    question_text: "You need a business license to legally operate in most locations.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! Most cities and counties require a business license or permit to operate legally. Requirements vary by location and business type. Check with your local government."
  },
  {
    category_id: 11,
    question_text: "What is the difference between revenue and profit?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Revenue is total income; profit is what's left after expenses",
      "They mean the same thing",
      "Profit is total income; revenue is after expenses",
      "Revenue is monthly; profit is yearly"
    ],
    correct_answer: "Revenue is total income; profit is what's left after expenses",
    explanation: "Revenue (or sales) is all the money your business brings in. Profit is revenue minus all expenses. A business can have high revenue but low profit if expenses are high."
  },
  {
    category_id: 11,
    question_text: "What is a business bank account used for?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Separating business finances from personal finances",
      "Getting lower interest rates",
      "Avoiding taxes",
      "Storing inventory"
    ],
    correct_answer: "Separating business finances from personal finances",
    explanation: "A separate business bank account keeps business and personal finances separate, making accounting easier, protecting personal assets (for LLCs), and presenting a professional image to clients."
  },
  {
    category_id: 11,
    question_text: "Networking is important for small business growth.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! Networking helps you find customers, partners, mentors, and resources. Join local business groups, chambers of commerce, and industry associations to build valuable connections."
  },
  {
    category_id: 11,
    question_text: "What is a target market?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "The specific group of customers you aim to serve",
      "A retail store location",
      "Your sales goal",
      "A competitor's customers"
    ],
    correct_answer: "The specific group of customers you aim to serve",
    explanation: "Your target market is the specific group of people most likely to buy your product or service. Defining your target market helps focus marketing efforts and resources effectively."
  },
  {
    category_id: 11,
    question_text: "What does B2B mean?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Business to Business",
      "Back to Basics",
      "Best to Better",
      "Buy to Build"
    ],
    correct_answer: "Business to Business",
    explanation: "B2B (Business to Business) refers to companies that sell products or services to other businesses rather than individual consumers. B2C (Business to Consumer) sells directly to end users."
  },
  {
    category_id: 11,
    question_text: "Freelancers and independent contractors must pay self-employment tax.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! Self-employment tax covers Social Security and Medicare (15.3% total). As a freelancer, you pay both the employee and employer portions. Set aside 25-30% of income for taxes."
  },
  {
    category_id: 11,
    question_text: "What is a unique selling proposition (USP)?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "What makes your business different from competitors",
      "Your lowest price guarantee",
      "A special discount offer",
      "Your business location"
    ],
    correct_answer: "What makes your business different from competitors",
    explanation: "Your USP is what sets you apart from competitors - the unique benefit or feature that makes customers choose you. It answers 'Why should I buy from you instead of someone else?'"
  },
  {
    category_id: 11,
    question_text: "What is inventory?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Products a business has available to sell",
      "A list of business expenses",
      "Employee schedules",
      "Customer contact information"
    ],
    correct_answer: "Products a business has available to sell",
    explanation: "Inventory is the stock of goods a business has on hand to sell. Proper inventory management ensures you have enough product to meet demand without tying up too much cash."
  },
  {
    category_id: 11,
    question_text: "A business credit card helps build business credit.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! Using a business credit card responsibly helps establish business credit separate from personal credit. This can lead to better financing options and terms as your business grows."
  },
  {
    category_id: 11,
    question_text: "What is accounts receivable?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Money owed to your business by customers",
      "Money your business owes to suppliers",
      "Your business bank balance",
      "Expected future sales"
    ],
    correct_answer: "Money owed to your business by customers",
    explanation: "Accounts receivable is money customers owe you for goods or services already delivered. Managing receivables - getting paid on time - is crucial for healthy cash flow."
  },
  {
    category_id: 11,
    question_text: "What is a business expense?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Money spent to operate and grow the business",
      "Personal shopping",
      "Employee salaries only",
      "Business revenue"
    ],
    correct_answer: "Money spent to operate and grow the business",
    explanation: "Business expenses are costs incurred in running your business - rent, supplies, marketing, salaries, utilities, etc. Most business expenses are tax-deductible."
  },
  {
    category_id: 11,
    question_text: "You should track all business expenses for tax purposes.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! Keep receipts and records of all business expenses. They reduce taxable income and you'll need documentation if audited. Use accounting software or apps to track expenses easily."
  },
  {
    category_id: 11,
    question_text: "What is a break-even point?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "When revenue equals total costs",
      "When you make your first sale",
      "When you hire your first employee",
      "When you open a second location"
    ],
    correct_answer: "When revenue equals total costs",
    explanation: "Break-even is when your total revenue equals total costs - you're not making profit but not losing money either. Knowing your break-even point helps set sales goals."
  },
  {
    category_id: 11,
    question_text: "What is a freelance business?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Offering services independently to multiple clients",
      "Working for one employer remotely",
      "A retail store",
      "A manufacturing company"
    ],
    correct_answer: "Offering services independently to multiple clients",
    explanation: "Freelancing means working for yourself and offering services (writing, design, consulting, etc.) to multiple clients. You control your schedule, rates, and workload."
  },
  {
    category_id: 11,
    question_text: "Business insurance protects against financial losses from various risks.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! Business insurance protects against lawsuits, property damage, business interruption, and other risks. Common types include general liability, professional liability, and property insurance."
  },
  {
    category_id: 11,
    question_text: "What is a business website used for?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Establishing online presence and attracting customers",
      "Only selling products online",
      "Replacing all other marketing",
      "Filing taxes"
    ],
    correct_answer: "Establishing online presence and attracting customers",
    explanation: "A website establishes credibility, showcases products/services, provides information 24/7, and helps customers find you. It's essential for most businesses today, even if you don't sell online."
  },
  {
    category_id: 11,
    question_text: "What is a business mentor?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "An experienced businessperson who provides guidance",
      "A paid consultant",
      "A business partner",
      "A government inspector"
    ],
    correct_answer: "An experienced businessperson who provides guidance",
    explanation: "A business mentor is someone with experience who voluntarily advises and guides you. Organizations like SCORE offer free mentoring for small business owners."
  },
  {
    category_id: 11,
    question_text: "Most small businesses don't make a profit in the first year.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! It's normal for new businesses to operate at a loss initially while building customer base and covering startup costs. Plan for 6-12 months of expenses before expecting profit."
  },
  {
    category_id: 11,
    question_text: "What is a business loan?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Money borrowed to start or grow a business",
      "A government grant",
      "Free money from investors",
      "Employee wages"
    ],
    correct_answer: "Money borrowed to start or grow a business",
    explanation: "A business loan is money borrowed from a bank, credit union, or online lender to fund business operations or growth. It must be repaid with interest according to agreed terms."
  },

  // INTERMEDIATE - 25 questions
  {
    category_id: 11,
    question_text: "What is the difference between an LLC and S-Corp for tax purposes?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "S-Corp allows pass-through taxation while potentially reducing self-employment tax",
      "LLCs pay more taxes than S-Corps",
      "S-Corps can't deduct business expenses",
      "There is no tax difference"
    ],
    correct_answer: "S-Corp allows pass-through taxation while potentially reducing self-employment tax",
    explanation: "Both offer pass-through taxation, but S-Corp owners can pay themselves a reasonable salary (subject to payroll tax) and take remaining profits as distributions (not subject to self-employment tax)."
  },
  {
    category_id: 11,
    question_text: "What is a profit and loss statement (P&L)?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "A financial report showing revenue, expenses, and profit over time",
      "A list of business assets",
      "A customer payment record",
      "An employee payroll report"
    ],
    correct_answer: "A financial report showing revenue, expenses, and profit over time",
    explanation: "A P&L (income statement) summarizes revenues, costs, and expenses over a period. It shows whether your business is profitable and helps identify trends and areas to improve."
  },
  {
    category_id: 11,
    question_text: "Customer acquisition cost (CAC) should be lower than customer lifetime value (LTV).",
    question_type: "true_false",
    difficulty_level: "intermediate",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! If it costs more to acquire a customer than they'll spend over their lifetime, your business model isn't sustainable. Aim for LTV:CAC ratio of at least 3:1."
  },
  {
    category_id: 11,
    question_text: "What is working capital?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Current assets minus current liabilities",
      "Total business revenue",
      "Money in the bank",
      "Employee salaries"
    ],
    correct_answer: "Current assets minus current liabilities",
    explanation: "Working capital is the money available for day-to-day operations. Positive working capital means you can pay short-term obligations. It's calculated as current assets minus current liabilities."
  },
  {
    category_id: 11,
    question_text: "What is a business valuation?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Determining what your business is worth",
      "Assessing employee performance",
      "Calculating monthly expenses",
      "Measuring customer satisfaction"
    ],
    correct_answer: "Determining what your business is worth",
    explanation: "Business valuation determines your company's economic value using methods like earnings multiples, asset values, or discounted cash flow. Important for selling, seeking investment, or estate planning."
  },
  {
    category_id: 11,
    question_text: "A business can be profitable but still fail due to poor cash flow.",
    question_type: "true_false",
    difficulty_level: "intermediate",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! Profitability and cash flow are different. You might have large sales (profit on paper) but if customers haven't paid yet, you can't pay bills. Cash flow problems kill profitable businesses."
  },
  {
    category_id: 11,
    question_text: "What is a merchant account?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "A bank account that allows you to accept credit card payments",
      "A wholesale purchasing account",
      "A business checking account",
      "An online marketplace account"
    ],
    correct_answer: "A bank account that allows you to accept credit card payments",
    explanation: "A merchant account is a type of business bank account that lets you accept credit and debit card payments. Processors like Square, Stripe, or PayPal provide merchant services."
  },
  {
    category_id: 11,
    question_text: "What is accounts payable?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Money your business owes to suppliers and vendors",
      "Money customers owe you",
      "Employee salaries",
      "Business assets"
    ],
    correct_answer: "Money your business owes to suppliers and vendors",
    explanation: "Accounts payable are bills and invoices your business owes but hasn't paid yet. Managing payables carefully helps maintain good vendor relationships and optimize cash flow."
  },
  {
    category_id: 11,
    question_text: "The SBA (Small Business Administration) offers loans and resources.",
    question_type: "true_false",
    difficulty_level: "intermediate",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! The SBA provides loan guarantees (making it easier to get bank loans), free counseling, training programs, and resources for small businesses. They don't lend directly but guarantee loans."
  },
  {
    category_id: 11,
    question_text: "What is a business credit score?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "A rating of your business's creditworthiness",
      "Your personal credit score",
      "Customer satisfaction rating",
      "Employee performance metric"
    ],
    correct_answer: "A rating of your business's creditworthiness",
    explanation: "Business credit scores (from Dun & Bradstreet, Experian, Equifax) rate your company's creditworthiness based on payment history, credit utilization, and public records. Affects loan terms and vendor credit."
  },
  {
    category_id: 11,
    question_text: "What is bootstrapping a business?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Starting and growing using personal funds and revenue",
      "Taking out large loans",
      "Seeking venture capital",
      "Copying another business model"
    ],
    correct_answer: "Starting and growing using personal funds and revenue",
    explanation: "Bootstrapping means self-funding your business using personal savings, revenue, and minimal outside investment. It maintains full ownership but may limit growth speed."
  },
  {
    category_id: 11,
    question_text: "Quarterly estimated taxes must be paid by self-employed business owners.",
    question_type: "true_false",
    difficulty_level: "intermediate",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! If you expect to owe $1,000+ in taxes, you must make quarterly estimated tax payments (April 15, June 15, Sept 15, Jan 15). Failure to pay can result in penalties."
  },
  {
    category_id: 11,
    question_text: "What is a business incubator?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "A program providing resources and mentorship to startups",
      "A type of business loan",
      "A retail space rental",
      "A government tax program"
    ],
    correct_answer: "A program providing resources and mentorship to startups",
    explanation: "Business incubators provide early-stage companies with office space, mentorship, networking, and resources to help them grow. Often focus on specific industries or communities."
  },
  {
    category_id: 11,
    question_text: "What is gross margin?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Revenue minus cost of goods sold, expressed as percentage",
      "Total revenue",
      "Net profit",
      "Operating expenses"
    ],
    correct_answer: "Revenue minus cost of goods sold, expressed as percentage",
    explanation: "Gross margin = (Revenue - COGS) / Revenue. A 60% gross margin means for every $1 of sales, you keep $0.60 after paying for the product. Critical metric for pricing and profitability."
  },
  {
    category_id: 11,
    question_text: "A home office deduction can reduce your tax bill.",
    question_type: "true_false",
    difficulty_level: "intermediate",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! If you use part of your home exclusively and regularly for business, you can deduct a portion of rent, utilities, insurance, and repairs. Use simplified method ($5/sq ft) or actual expenses."
  },
  {
    category_id: 11,
    question_text: "What is a franchise?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Buying rights to operate under an established brand",
      "Starting a completely original business",
      "A type of loan",
      "A business partnership"
    ],
    correct_answer: "Buying rights to operate under an established brand",
    explanation: "A franchise lets you operate a business using another company's brand, systems, and support in exchange for fees and royalties. Lower risk than starting from scratch but less independence."
  },
  {
    category_id: 11,
    question_text: "What is burn rate?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "How quickly a business spends cash reserves",
      "Employee turnover rate",
      "Production speed",
      "Marketing conversion rate"
    ],
    correct_answer: "How quickly a business spends cash reserves",
    explanation: "Burn rate is how fast you're spending money (usually monthly). If you have $60K in the bank and burn rate is $10K/month, you have 6 months runway before needing revenue or funding."
  },
  {
    category_id: 11,
    question_text: "Separating business and personal finances is crucial for liability protection.",
    question_type: "true_false",
    difficulty_level: "intermediate",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! Mixing finances can 'pierce the corporate veil,' eliminating LLC/Corp liability protection. Use separate bank accounts, credit cards, and keep meticulous records to protect personal assets."
  },
  {
    category_id: 11,
    question_text: "What is a purchase order?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Official document authorizing a supplier to deliver goods",
      "A customer receipt",
      "An invoice from vendor",
      "A shipping label"
    ],
    correct_answer: "Official document authorizing a supplier to deliver goods",
    explanation: "A purchase order (PO) is your official request to buy specific goods at agreed prices. It becomes a binding contract when accepted, protecting both buyer and seller."
  },
  {
    category_id: 11,
    question_text: "What is angel investing?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Wealthy individuals investing in startups for equity",
      "Charitable donations",
      "Bank loans",
      "Government grants"
    ],
    correct_answer: "Wealthy individuals investing in startups for equity",
    explanation: "Angel investors are high-net-worth individuals who invest personal money in early-stage companies in exchange for equity. They often provide mentorship alongside capital."
  },
  {
    category_id: 11,
    question_text: "Retainer agreements provide predictable recurring revenue.",
    question_type: "true_false",
    difficulty_level: "intermediate",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! Retainer agreements where clients pay a monthly fee for ongoing services create predictable cash flow, making business planning easier. Common for consultants, agencies, and service providers."
  },
  {
    category_id: 11,
    question_text: "What is a SWOT analysis?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Analyzing Strengths, Weaknesses, Opportunities, Threats",
      "Sales, Wages, Operations, Taxes report",
      "A type of financial statement",
      "Employee performance review"
    ],
    correct_answer: "Analyzing Strengths, Weaknesses, Opportunities, Threats",
    explanation: "SWOT analysis evaluates internal Strengths/Weaknesses and external Opportunities/Threats. It's a strategic planning tool to identify competitive advantages and areas for improvement."
  },
  {
    category_id: 11,
    question_text: "What is crowdfunding?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Raising money from many people online",
      "Traditional bank loan",
      "Venture capital funding",
      "Personal savings"
    ],
    correct_answer: "Raising money from many people online",
    explanation: "Crowdfunding raises capital by collecting small amounts from many people via platforms like Kickstarter, Indiegogo, or GoFundMe. Can be donation-based, rewards-based, or equity-based."
  },
  {
    category_id: 11,
    question_text: "Business expenses must be ordinary and necessary to be tax-deductible.",
    question_type: "true_false",
    difficulty_level: "intermediate",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! IRS requires deductions to be both ordinary (common in your industry) and necessary (helpful and appropriate). Lavish or personal expenses don't qualify even if business-related."
  },
  {
    category_id: 11,
    question_text: "What is a business exit strategy?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Plan for selling or transferring business ownership",
      "Emergency evacuation plan",
      "Customer cancellation policy",
      "Employee termination procedure"
    ],
    correct_answer: "Plan for selling or transferring business ownership",
    explanation: "An exit strategy outlines how you'll eventually leave your business - selling to competitor, passing to family, going public, or liquidating assets. Planning early maximizes value."
  },

  // ADVANCED - 20 questions
  {
    category_id: 11,
    question_text: "What is the difference between strategic and tactical planning?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Strategic is long-term vision; tactical is short-term execution",
      "Strategic is for large companies only",
      "Tactical planning is more important",
      "They are the same thing"
    ],
    correct_answer: "Strategic is long-term vision; tactical is short-term execution",
    explanation: "Strategic planning defines long-term goals and direction (3-5 years). Tactical planning details specific actions and timelines to achieve strategic objectives (quarterly/annual)."
  },
  {
    category_id: 11,
    question_text: "What is equity dilution?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Reduction in ownership percentage when new shares are issued",
      "Watering down product quality",
      "Reducing business expenses",
      "Lowering prices"
    ],
    correct_answer: "Reduction in ownership percentage when new shares are issued",
    explanation: "When a company issues new shares (for investors or employees), existing owners' percentage decreases. If you own 100% and issue 25% to investors, you now own 75% - you've been diluted."
  },
  {
    category_id: 11,
    question_text: "Venture capital typically requires giving up significant equity and control.",
    question_type: "true_false",
    difficulty_level: "advanced",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! VCs typically take 20-30%+ equity and often require board seats and approval rights over major decisions. They expect high growth and eventual exit (acquisition or IPO)."
  },
  {
    category_id: 11,
    question_text: "What is EBITDA?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Earnings Before Interest, Taxes, Depreciation, and Amortization",
      "Estimated Business Income Through Direct Assets",
      "Employee Benefits and Income Distribution Agreement",
      "Expected Budget for Initial Development Activities"
    ],
    correct_answer: "Earnings Before Interest, Taxes, Depreciation, and Amortization",
    explanation: "EBITDA measures operational profitability by excluding financing and accounting decisions. It's used to compare profitability between companies and in business valuations."
  },
  {
    category_id: 11,
    question_text: "What is a drag-along right in shareholder agreements?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Majority shareholders can force minority to sell in acquisition",
      "All shareholders must attend meetings",
      "Employees must follow company policies",
      "Customers must sign contracts"
    ],
    correct_answer: "Majority shareholders can force minority to sell in acquisition",
    explanation: "Drag-along rights let majority shareholders force minority shareholders to join in selling the company. Protects buyers from small shareholders blocking beneficial acquisitions."
  },
  {
    category_id: 11,
    question_text: "A tag-along right protects minority shareholders.",
    question_type: "true_false",
    difficulty_level: "advanced",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! Tag-along rights let minority shareholders join when majority sells their stake, ensuring they get same terms and price. Prevents being left with new, potentially problematic, majority owners."
  },
  {
    category_id: 11,
    question_text: "What is a convertible note in startup financing?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Debt that converts to equity at future funding round",
      "A type of business loan",
      "Promissory note for equipment",
      "Government grant"
    ],
    correct_answer: "Debt that converts to equity at future funding round",
    explanation: "Convertible notes are short-term debt that converts to equity (usually at discount) during the next funding round. Common in seed stage when valuation is uncertain."
  },
  {
    category_id: 11,
    question_text: "What is a cap table?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Capitalization table showing ownership percentages",
      "Maximum spending limits",
      "Capital expenditure budget",
      "Sales capacity planning"
    ],
    correct_answer: "Capitalization table showing ownership percentages",
    explanation: "A cap table (capitalization table) details who owns what in your company - founders, investors, employees with options. Critical for understanding dilution and control."
  },
  {
    category_id: 11,
    question_text: "Preferred stock typically has liquidation preferences over common stock.",
    question_type: "true_false",
    difficulty_level: "advanced",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! In acquisition or liquidation, preferred shareholders (investors) get paid before common shareholders (founders/employees). Often get 1x-3x their investment back first."
  },
  {
    category_id: 11,
    question_text: "What is a down round?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Raising funds at lower valuation than previous round",
      "Laying off employees",
      "Reducing prices",
      "Closing unprofitable locations"
    ],
    correct_answer: "Raising funds at lower valuation than previous round",
    explanation: "A down round means your company's valuation decreased since last funding. It's dilutive and demoralizing but sometimes necessary. Can trigger anti-dilution protections for earlier investors."
  },
  {
    category_id: 11,
    question_text: "What is revenue-based financing?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Repaying investment as percentage of monthly revenue",
      "Traditional bank loan",
      "Equity investment",
      "Government grant"
    ],
    correct_answer: "Repaying investment as percentage of monthly revenue",
    explanation: "Revenue-based financing provides capital in exchange for a percentage of monthly revenue until a cap is reached (often 1.3-3x). No equity given up, flexible payments based on performance."
  },
  {
    category_id: 11,
    question_text: "Anti-dilution provisions protect early investors from down rounds.",
    question_type: "true_false",
    difficulty_level: "advanced",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! Anti-dilution clauses (full ratchet or weighted average) give early investors more shares if company raises money at lower valuation, protecting their percentage ownership."
  },
  {
    category_id: 11,
    question_text: "What is a earnout in business acquisition?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Additional payment based on future performance",
      "Employee retention bonus",
      "Customer loyalty program",
      "Initial down payment"
    ],
    correct_answer: "Additional payment based on future performance",
    explanation: "An earnout pays sellers additional money if the business hits specific targets post-acquisition. Bridges valuation gap and ensures seller stays motivated during transition."
  },
  {
    category_id: 11,
    question_text: "What is factoring?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Selling accounts receivable at discount for immediate cash",
      "Manufacturing process improvement",
      "Break-even analysis",
      "Cost reduction strategy"
    ],
    correct_answer: "Selling accounts receivable at discount for immediate cash",
    explanation: "Factoring (or invoice financing) means selling unpaid invoices to a third party at discount (typically 70-90% of value) for immediate cash. Improves cash flow but reduces profit."
  },
  {
    category_id: 11,
    question_text: "A business continuity plan addresses operations during disruptions.",
    question_type: "true_false",
    difficulty_level: "advanced",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! A business continuity plan (BCP) outlines how to maintain operations during disasters, cyberattacks, or other disruptions. Includes backup systems, communication plans, and recovery procedures."
  },
  {
    category_id: 11,
    question_text: "What is vertical integration?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Controlling multiple stages of production/distribution",
      "Expanding to new markets",
      "Hiring more employees",
      "Increasing prices"
    ],
    correct_answer: "Controlling multiple stages of production/distribution",
    explanation: "Vertical integration means owning your supply chain - manufacturer buying supplier (backward integration) or distributor (forward integration). Increases control but requires more capital."
  },
  {
    category_id: 11,
    question_text: "What is a leveraged buyout (LBO)?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Acquiring company using significant borrowed money",
      "Buying inventory in bulk",
      "Employee stock purchase",
      "Franchise purchase"
    ],
    correct_answer: "Acquiring company using significant borrowed money",
    explanation: "An LBO uses mostly debt (often 70-90%) to acquire a company, with company's assets and cash flow as collateral. Common in private equity. High risk but can generate high returns."
  },
  {
    category_id: 11,
    question_text: "Accounts receivable financing provides working capital without dilution.",
    question_type: "true_false",
    difficulty_level: "advanced",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! AR financing (factoring or AR loans) converts unpaid invoices to cash without giving up equity. More expensive than traditional loans but faster and based on receivables quality, not credit."
  },
  {
    category_id: 11,
    question_text: "What is a subscription business model?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Customers pay recurring fees for ongoing access",
      "One-time product purchases",
      "Commission-based sales",
      "Advertising revenue"
    ],
    correct_answer: "Customers pay recurring fees for ongoing access",
    explanation: "Subscription models charge recurring fees (monthly/annually) for continued product/service access. Provides predictable revenue (MRR/ARR) and higher customer lifetime value. Examples: Netflix, SaaS."
  },
  {
    category_id: 11,
    question_text: "What is churn rate?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Percentage of customers who cancel subscriptions",
      "Product defect rate",
      "Employee turnover",
      "Inventory spoilage"
    ],
    correct_answer: "Percentage of customers who cancel subscriptions",
    explanation: "Churn rate measures customer attrition - how many cancel/don't renew. 5% monthly churn means you lose 5% of customers each month. High churn kills subscription businesses. Aim for <5% monthly."
  }
];

async function uploadQuestions() {
  console.log('Starting upload of Category 11: Small Business Finance questions...');
  console.log(`Total questions: ${CATEGORY_11_BUSINESS.length}`);
  
  const { data, error } = await supabase
    .from('quiz_questions')
    .insert(CATEGORY_11_BUSINESS);

  if (error) throw error;

  console.log('✅ Successfully uploaded all questions!');
  console.log(`📊 Beginner: ${CATEGORY_11_BUSINESS.filter(q => q.difficulty_level === 'beginner').length}`);
  console.log(`   Intermediate: ${CATEGORY_11_BUSINESS.filter(q => q.difficulty_level === 'intermediate').length}`);
  console.log(`   Advanced: ${CATEGORY_11_BUSINESS.filter(q => q.difficulty_level === 'advanced').length}`);
}

uploadQuestions();
