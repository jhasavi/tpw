import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const CATEGORY_5_INVESTING = [
  // BEGINNER LEVEL (25 questions)
  {
    category_id: 5,
    question_text: "What is a stock?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "A loan to a company",
      "Ownership share in a company",
      "A type of savings account",
      "A government bond"
    ],
    correct_answer: "Ownership share in a company",
    explanation: "When you buy stock, you purchase a share of ownership in a company. This makes you a shareholder with potential voting rights and profit sharing.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["stocks", "basics", "ownership"]
  },
  {
    category_id: 5,
    question_text: "What does diversification mean in investing?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Putting all money in one stock",
      "Spreading investments across different assets",
      "Only investing in bonds",
      "Avoiding the stock market"
    ],
    correct_answer: "Spreading investments across different assets",
    explanation: "Diversification is the practice of spreading investments across various assets to reduce risk. The saying 'don't put all your eggs in one basket' perfectly describes this strategy.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["diversification", "risk-management", "strategy"]
  },
  {
    category_id: 5,
    question_text: "What is a bond?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Ownership in a company",
      "A loan you give to a company or government",
      "A type of mutual fund",
      "Cash in a savings account"
    ],
    correct_answer: "A loan you give to a company or government",
    explanation: "A bond is a debt instrument where you lend money to an entity (government or corporation) in exchange for periodic interest payments and the return of principal at maturity.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["bonds", "fixed-income", "basics"]
  },
  {
    category_id: 5,
    question_text: "What is an ETF (Exchange-Traded Fund)?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "A single company stock",
      "A basket of securities that trades like a stock",
      "A type of savings account",
      "A government bond"
    ],
    correct_answer: "A basket of securities that trades like a stock",
    explanation: "An ETF holds multiple stocks, bonds, or other assets and trades on an exchange like a regular stock. This provides instant diversification at a low cost.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["ETF", "diversification", "basics"]
  },
  {
    category_id: 5,
    question_text: "What is a mutual fund?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "A fund managed by professionals pooling investor money",
      "A personal savings account",
      "A type of government bond",
      "A single company stock"
    ],
    correct_answer: "A fund managed by professionals pooling investor money",
    explanation: "A mutual fund pools money from many investors and invests in a diversified portfolio of stocks, bonds, or other securities, managed by professional fund managers.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["mutual-funds", "professional-management", "basics"]
  },
  {
    category_id: 5,
    question_text: "What does 'bull market' mean?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Market is going down",
      "Market is going up",
      "Market is flat",
      "Market is closed"
    ],
    correct_answer: "Market is going up",
    explanation: "A bull market refers to a period when stock prices are rising or expected to rise. The term comes from the way a bull attacks—thrusting its horns upward.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["market-conditions", "terminology", "basics"]
  },
  {
    category_id: 5,
    question_text: "What is compound interest in investing?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Interest only on the original amount",
      "Interest on both principal and accumulated interest",
      "A penalty fee",
      "A one-time payment"
    ],
    correct_answer: "Interest on both principal and accumulated interest",
    explanation: "Compound interest means earning returns not just on your initial investment, but also on the returns that investment generates. This is the key to long-term wealth building.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["compound-interest", "growth", "basics"]
  },
  {
    category_id: 5,
    question_text: "What is a dividend?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "A stock price increase",
      "A payment made by a company to shareholders",
      "A type of bond",
      "A market index"
    ],
    correct_answer: "A payment made by a company to shareholders",
    explanation: "Dividends are portions of a company's earnings paid to shareholders, typically quarterly. They provide regular income in addition to potential stock price appreciation.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["dividends", "income", "stocks"]
  },
  {
    category_id: 5,
    question_text: "What is the S&P 500?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "A single stock",
      "An index of 500 large U.S. companies",
      "A bond fund",
      "A cryptocurrency"
    ],
    correct_answer: "An index of 500 large U.S. companies",
    explanation: "The S&P 500 is a stock market index tracking 500 of the largest publicly traded U.S. companies. It's widely used as a benchmark for the overall U.S. stock market.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["index", "S&P-500", "market-benchmark"]
  },
  {
    category_id: 5,
    question_text: "What is dollar-cost averaging?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Investing all money at once",
      "Investing fixed amounts at regular intervals",
      "Only buying low-priced stocks",
      "Avoiding market volatility"
    ],
    correct_answer: "Investing fixed amounts at regular intervals",
    explanation: "Dollar-cost averaging means investing a fixed amount regularly (e.g., $100/month) regardless of market conditions. This reduces the impact of market volatility and removes emotion from investing.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["DCA", "strategy", "risk-reduction"]
  },
  {
    category_id: 5,
    question_text: "Stocks are generally riskier than bonds but offer higher potential returns.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "Stocks carry more risk because their value fluctuates more, but historically they've provided higher returns than bonds over the long term. This is the risk-return tradeoff.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["risk", "return", "asset-classes"]
  },
  {
    category_id: 5,
    question_text: "What is market volatility?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "How quickly prices change",
      "The number of trades per day",
      "A type of investment",
      "A market closure"
    ],
    correct_answer: "How quickly prices change",
    explanation: "Volatility measures how much and how quickly investment prices move up and down. High volatility means larger price swings and potentially more risk.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["volatility", "risk", "market-behavior"]
  },
  {
    category_id: 5,
    question_text: "What is a brokerage account?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "A savings account at a bank",
      "An account used to buy and sell investments",
      "A type of credit card",
      "A retirement account only"
    ],
    correct_answer: "An account used to buy and sell investments",
    explanation: "A brokerage account is an investment account that allows you to buy and sell stocks, bonds, ETFs, mutual funds, and other securities.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["brokerage", "account-types", "basics"]
  },
  {
    category_id: 5,
    question_text: "What does 'asset allocation' mean?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "How you divide investments among different asset types",
      "Buying only stocks",
      "Selling investments",
      "Paying taxes on gains"
    ],
    correct_answer: "How you divide investments among different asset types",
    explanation: "Asset allocation is how you distribute your portfolio across different asset classes (stocks, bonds, cash, real estate). It's a key factor in managing risk and returns.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["asset-allocation", "portfolio", "strategy"]
  },
  {
    category_id: 5,
    question_text: "What is a capital gain?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "A dividend payment",
      "Profit from selling an investment for more than you paid",
      "Interest from a bond",
      "A management fee"
    ],
    correct_answer: "Profit from selling an investment for more than you paid",
    explanation: "A capital gain occurs when you sell an investment for more than its purchase price. The profit (gain) may be subject to capital gains tax.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["capital-gains", "profit", "taxes"]
  },
  {
    category_id: 5,
    question_text: "Index funds typically have lower fees than actively managed funds.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "Index funds passively track a market index and require less management, so they charge lower fees (expense ratios) than actively managed funds that try to beat the market.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["index-funds", "fees", "passive-investing"]
  },
  {
    category_id: 5,
    question_text: "What is a bear market?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Market prices rising",
      "Market prices falling 20% or more",
      "Market is closed",
      "High trading volume"
    ],
    correct_answer: "Market prices falling 20% or more",
    explanation: "A bear market is typically defined as a decline of 20% or more from recent highs. The term comes from the way a bear attacks—swiping downward.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["bear-market", "market-conditions", "downturn"]
  },
  {
    category_id: 5,
    question_text: "What does 'market cap' stand for?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Market capacity",
      "Market capitalization (company's total value)",
      "Maximum market price",
      "Market capital gains"
    ],
    correct_answer: "Market capitalization (company's total value)",
    explanation: "Market cap is the total value of a company's outstanding shares (share price × number of shares). It's used to categorize companies as small-cap, mid-cap, or large-cap.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["market-cap", "valuation", "company-size"]
  },
  {
    category_id: 5,
    question_text: "What is a stock split?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Company goes bankrupt",
      "Company divides existing shares into multiple shares",
      "Stock price doubles",
      "Company merges with another"
    ],
    correct_answer: "Company divides existing shares into multiple shares",
    explanation: "A stock split increases the number of shares while proportionally decreasing the price per share. For example, a 2-for-1 split gives you 2 shares at half the price of your original 1 share.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["stock-split", "corporate-actions", "shares"]
  },
  {
    category_id: 5,
    question_text: "What is a portfolio?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "A single stock purchase",
      "The complete collection of your investments",
      "A type of bond",
      "A savings account"
    ],
    correct_answer: "The complete collection of your investments",
    explanation: "Your portfolio is the entire collection of all your investments—stocks, bonds, ETFs, mutual funds, real estate, and other assets you own.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["portfolio", "basics", "investments"]
  },
  {
    category_id: 5,
    question_text: "You should only invest money you can afford to lose or won't need for several years.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "Because investments can fluctuate in value, you should only invest money you don't need immediately and can withstand potential short-term losses. Keep emergency funds in savings.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["risk-management", "emergency-fund", "time-horizon"]
  },
  {
    category_id: 5,
    question_text: "What is an expense ratio?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Your personal spending rate",
      "Annual fee charged by a fund as a percentage",
      "Tax on investments",
      "Broker commission"
    ],
    correct_answer: "Annual fee charged by a fund as a percentage",
    explanation: "An expense ratio is the annual fee a mutual fund or ETF charges, expressed as a percentage of your investment. For example, a 0.5% expense ratio costs $5 per year for every $1,000 invested.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["fees", "expense-ratio", "costs"]
  },
  {
    category_id: 5,
    question_text: "What does 'buy and hold' mean?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Buying stocks and selling immediately",
      "Purchasing investments and keeping them long-term",
      "Only holding cash",
      "Trading frequently"
    ],
    correct_answer: "Purchasing investments and keeping them long-term",
    explanation: "Buy and hold is a long-term investment strategy where you purchase quality investments and hold them for years, riding out market volatility and benefiting from compound growth.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["buy-and-hold", "long-term", "strategy"]
  },
  {
    category_id: 5,
    question_text: "What is rebalancing a portfolio?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Selling all investments",
      "Adjusting investments back to target allocation",
      "Only buying new stocks",
      "Closing your account"
    ],
    correct_answer: "Adjusting investments back to target allocation",
    explanation: "Rebalancing means selling some investments and buying others to return your portfolio to your desired asset allocation. This maintains your intended risk level as markets fluctuate.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["rebalancing", "portfolio-management", "strategy"]
  },
  {
    category_id: 5,
    question_text: "Past performance guarantees future investment returns.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "False",
    explanation: "Past performance does NOT guarantee future results. This is why all investment disclosures include this warning. Markets change, and what worked before may not work going forward.",
    points: 10,
    time_limit_seconds: 30,
    tags: ["risk", "performance", "expectations"]
  },

  // INTERMEDIATE LEVEL (25 questions)
  {
    category_id: 5,
    question_text: "What is the difference between growth stocks and value stocks?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Growth stocks are expected to grow faster; value stocks are undervalued",
      "Growth stocks pay higher dividends",
      "Value stocks are always more expensive",
      "There is no difference"
    ],
    correct_answer: "Growth stocks are expected to grow faster; value stocks are undervalued",
    explanation: "Growth stocks are companies expected to grow earnings faster than average, often reinvesting profits. Value stocks trade below their intrinsic value and may pay dividends.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["growth-stocks", "value-stocks", "investing-styles"]
  },
  {
    category_id: 5,
    question_text: "What is the P/E ratio and what does it measure?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Price-to-Earnings ratio; stock price relative to earnings",
      "Portfolio-to-Equity ratio; total portfolio value",
      "Profit-to-Expense ratio; company profitability",
      "Personal-to-Employment ratio; individual metrics"
    ],
    correct_answer: "Price-to-Earnings ratio; stock price relative to earnings",
    explanation: "The P/E ratio divides stock price by earnings per share. A P/E of 20 means investors pay $20 for every $1 of earnings. It helps assess if a stock is over or undervalued.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["PE-ratio", "valuation", "metrics"]
  },
  {
    category_id: 5,
    question_text: "What are blue-chip stocks?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Penny stocks from small companies",
      "Large, established, financially sound companies",
      "Technology startups",
      "Foreign stocks only"
    ],
    correct_answer: "Large, established, financially sound companies",
    explanation: "Blue-chip stocks are shares of large, well-established companies with a history of reliable performance and dividends (e.g., Apple, Microsoft, Johnson & Johnson).",
    points: 15,
    time_limit_seconds: 45,
    tags: ["blue-chip", "large-cap", "quality"]
  },
  {
    category_id: 5,
    question_text: "What is sector rotation?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Moving investments between market sectors based on economic cycles",
      "Rotating CEOs in companies",
      "Changing jobs frequently",
      "Selling all stocks annually"
    ],
    correct_answer: "Moving investments between market sectors based on economic cycles",
    explanation: "Sector rotation involves shifting investments from one industry sector to another based on economic conditions. For example, moving from defensive stocks to cyclical stocks during expansion.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["sector-rotation", "strategy", "economic-cycles"]
  },
  {
    category_id: 5,
    question_text: "What is a REIT (Real Estate Investment Trust)?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "A company that owns/operates income-producing real estate",
      "A government bond",
      "A type of savings account",
      "A cryptocurrency"
    ],
    correct_answer: "A company that owns/operates income-producing real estate",
    explanation: "REITs own and typically operate income-producing real estate. They must distribute 90% of taxable income as dividends, providing regular income to investors without directly owning property.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["REIT", "real-estate", "income"]
  },
  {
    category_id: 5,
    question_text: "What is the difference between active and passive investing?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Active tries to beat market; passive tracks market index",
      "Active is automated; passive requires work",
      "Active is safer; passive is riskier",
      "No difference"
    ],
    correct_answer: "Active tries to beat market; passive tracks market index",
    explanation: "Active investing involves picking stocks to outperform the market (higher fees). Passive investing tracks an index like the S&P 500 (lower fees). Studies show passive often wins long-term.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["active-investing", "passive-investing", "strategy"]
  },
  {
    category_id: 5,
    question_text: "What is a bond's yield to maturity (YTM)?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Total return if held until maturity",
      "Only the coupon payment",
      "The bond's face value",
      "Current market price"
    ],
    correct_answer: "Total return if held until maturity",
    explanation: "YTM is the total return anticipated on a bond if held until maturity, accounting for coupon payments, purchase price, face value, and time to maturity.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["bonds", "yield", "YTM"]
  },
  {
    category_id: 5,
    question_text: "What is correlation in portfolio construction?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "How assets move in relation to each other",
      "The total value of assets",
      "Number of holdings",
      "Annual returns"
    ],
    correct_answer: "How assets move in relation to each other",
    explanation: "Correlation measures how investments move together. Low or negative correlation helps diversification—when one asset falls, another may rise, reducing overall portfolio volatility.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["correlation", "diversification", "risk"]
  },
  {
    category_id: 5,
    question_text: "What is a limit order?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Buy/sell at current market price",
      "Buy/sell only at specified price or better",
      "Cancel all orders",
      "Maximum number of shares"
    ],
    correct_answer: "Buy/sell only at specified price or better",
    explanation: "A limit order sets the maximum price you'll pay (buy) or minimum you'll accept (sell). It guarantees price but not execution—the order may not fill if the price isn't reached.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["orders", "trading", "limit-order"]
  },
  {
    category_id: 5,
    question_text: "What does 'tax-loss harvesting' mean?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Selling losing investments to offset capital gains taxes",
      "Avoiding all taxes",
      "Harvesting crops for profit",
      "Delaying tax payments"
    ],
    correct_answer: "Selling losing investments to offset capital gains taxes",
    explanation: "Tax-loss harvesting involves selling investments at a loss to offset capital gains, reducing your tax bill. You can then reinvest in similar (but not identical) assets to maintain exposure.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["tax-loss-harvesting", "taxes", "strategy"]
  },
  {
    category_id: 5,
    question_text: "What is beta in investing?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Measure of volatility relative to market",
      "Expected return percentage",
      "Company earnings growth",
      "Dividend yield"
    ],
    correct_answer: "Measure of volatility relative to market",
    explanation: "Beta measures an investment's volatility versus the overall market. Beta of 1 = market volatility, >1 = more volatile, <1 = less volatile. High beta = higher potential returns and risks.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["beta", "volatility", "risk"]
  },
  {
    category_id: 5,
    question_text: "What are dividend aristocrats?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Companies that increased dividends for 25+ consecutive years",
      "The highest-paying dividend stocks",
      "Foreign dividend stocks",
      "New companies paying dividends"
    ],
    correct_answer: "Companies that increased dividends for 25+ consecutive years",
    explanation: "Dividend aristocrats are S&P 500 companies that have increased dividends annually for at least 25 consecutive years, demonstrating financial strength and commitment to shareholders.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["dividends", "aristocrats", "quality"]
  },
  {
    category_id: 5,
    question_text: "What is the difference between a Roth IRA and Traditional IRA for investing?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Roth: after-tax contributions, tax-free growth; Traditional: pre-tax contributions, taxed withdrawals",
      "Roth is only for bonds; Traditional for stocks",
      "No difference",
      "Roth has higher fees"
    ],
    correct_answer: "Roth: after-tax contributions, tax-free growth; Traditional: pre-tax contributions, taxed withdrawals",
    explanation: "Traditional IRAs offer upfront tax deductions but tax withdrawals. Roth IRAs use after-tax money but grow tax-free with tax-free qualified withdrawals—powerful for long-term investing.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["IRA", "Roth", "tax-advantaged"]
  },
  {
    category_id: 5,
    question_text: "What is a target-date fund?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Fund that automatically adjusts risk as you near retirement",
      "Fund that expires on a specific date",
      "Fund only for day trading",
      "Fund that targets specific companies"
    ],
    correct_answer: "Fund that automatically adjusts risk as you near retirement",
    explanation: "Target-date funds automatically shift from aggressive (stocks) to conservative (bonds) as you approach a target retirement year, providing a 'set it and forget it' investment strategy.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["target-date", "retirement", "automatic"]
  },
  {
    category_id: 5,
    question_text: "What is a market order?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Buy/sell immediately at current market price",
      "Buy/sell at a specific price only",
      "Cancel all orders",
      "Wait for best price"
    ],
    correct_answer: "Buy/sell immediately at current market price",
    explanation: "A market order executes immediately at the best available current price. It guarantees execution but not price—useful when you need certainty of trade completion.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["orders", "trading", "market-order"]
  },
  {
    category_id: 5,
    question_text: "What is dollar-weighted vs time-weighted return?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Dollar-weighted accounts for timing of cash flows; time-weighted doesn't",
      "Dollar-weighted is always higher",
      "Time-weighted includes fees; dollar-weighted doesn't",
      "They're the same thing"
    ],
    correct_answer: "Dollar-weighted accounts for timing of cash flows; time-weighted doesn't",
    explanation: "Time-weighted return measures investment performance regardless of when you add/remove money. Dollar-weighted return accounts for when you invested—poor timing hurts this return.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["returns", "performance", "measurement"]
  },
  {
    category_id: 5,
    question_text: "What are preferred stocks?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Stocks with priority for dividends and liquidation, but limited voting",
      "The best-performing stocks",
      "Stocks you personally prefer",
      "Only stocks in your favorite companies"
    ],
    correct_answer: "Stocks with priority for dividends and liquidation, but limited voting",
    explanation: "Preferred stocks have characteristics of both stocks and bonds: they pay fixed dividends, have priority over common stock in bankruptcy, but typically lack voting rights.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["preferred-stock", "hybrid", "dividends"]
  },
  {
    category_id: 5,
    question_text: "What is the Sharpe ratio?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Risk-adjusted return measure",
      "Stock price prediction",
      "Company debt ratio",
      "Tax rate"
    ],
    correct_answer: "Risk-adjusted return measure",
    explanation: "The Sharpe ratio measures return per unit of risk (volatility). Higher Sharpe ratios indicate better risk-adjusted performance—you're getting more return for the risk you're taking.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["Sharpe-ratio", "risk-adjusted", "performance"]
  },
  {
    category_id: 5,
    question_text: "What is a wash sale?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Selling at a loss and buying back same/similar security within 30 days",
      "Cleaning your investment portfolio",
      "A profitable trade",
      "Selling all positions"
    ],
    correct_answer: "Selling at a loss and buying back same/similar security within 30 days",
    explanation: "The wash sale rule disallows claiming a tax loss if you repurchase the same or substantially identical security within 30 days before or after the sale. This prevents tax manipulation.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["wash-sale", "taxes", "IRS-rules"]
  },
  {
    category_id: 5,
    question_text: "What is a covered call strategy?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Owning stock and selling call options on it for income",
      "Buying stock with borrowed money",
      "Hiding your investments",
      "Diversifying across sectors"
    ],
    correct_answer: "Owning stock and selling call options on it for income",
    explanation: "A covered call involves owning shares and selling call options against them to generate income. You keep the premium but limit upside if the stock rises above the strike price.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["options", "covered-call", "income-strategy"]
  },
  {
    category_id: 5,
    question_text: "What is market capitalization weighting in index funds?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Largest companies get highest weight in the index",
      "All companies weighted equally",
      "Smallest companies weighted most",
      "Random weighting"
    ],
    correct_answer: "Largest companies get highest weight in the index",
    explanation: "Market-cap weighted indexes (like S&P 500) give larger companies more weight. If Apple is 7% of total market cap, it's 7% of the index. This reflects actual market representation.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["index", "weighting", "market-cap"]
  },
  {
    category_id: 5,
    question_text: "What is a bond ladder?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Buying bonds with staggered maturity dates",
      "Ranking bonds by quality",
      "A tool for climbing financial success",
      "Selling bonds in sequence"
    ],
    correct_answer: "Buying bonds with staggered maturity dates",
    explanation: "A bond ladder involves buying bonds that mature at different times (e.g., 1, 2, 3, 4, 5 years). This provides regular cash flow, reduces interest rate risk, and offers reinvestment opportunities.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["bonds", "ladder", "strategy"]
  },
  {
    category_id: 5,
    question_text: "What is the ex-dividend date?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Date you must own stock by to receive next dividend",
      "Date dividend is paid",
      "Date company announces dividend",
      "Date stock splits"
    ],
    correct_answer: "Date you must own stock by to receive next dividend",
    explanation: "The ex-dividend date is the cutoff date for dividend eligibility. You must own the stock before this date to receive the upcoming dividend. The stock price typically drops by the dividend amount on this date.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["dividends", "ex-dividend", "dates"]
  },
  {
    category_id: 5,
    question_text: "What is home country bias?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Tendency to overweight domestic investments vs. international",
      "Preferring to invest in real estate",
      "Only buying local company stocks",
      "Avoiding all foreign products"
    ],
    correct_answer: "Tendency to overweight domestic investments vs. international",
    explanation: "Home country bias is when investors disproportionately invest in domestic markets despite global opportunities. This can reduce diversification benefits and miss growth in international markets.",
    points: 15,
    time_limit_seconds: 45,
    tags: ["bias", "international", "diversification"]
  },
  {
    category_id: 5,
    question_text: "What is a custodial investment account?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Account held by adult for minor's benefit",
      "Account for professional investors only",
      "Account managed by a bank custodian",
      "Retirement account type"
    ],
    correct_answer: "Account held by adult for minor's benefit",
    explanation: "Custodial accounts (UGMA/UTMA) allow adults to invest on behalf of minors. The child legally owns the assets but can't control them until reaching adulthood (18-21, depending on state).",
    points: 15,
    time_limit_seconds: 45,
    tags: ["custodial", "children", "UGMA-UTMA"]
  },

  // ADVANCED LEVEL (20 questions)
  {
    category_id: 5,
    question_text: "You're 35 with a $100k portfolio. Using Modern Portfolio Theory, which allocation provides optimal risk-adjusted returns for moderate risk tolerance?",
    question_type: "scenario",
    difficulty_level: "advanced",
    options: [
      "100% stocks",
      "70% stocks, 25% bonds, 5% alternatives",
      "50% stocks, 50% bonds",
      "100% bonds"
    ],
    correct_answer: "70% stocks, 25% bonds, 5% alternatives",
    explanation: "At 35, you have a 30+ year horizon. MPT suggests diversifying across asset classes with different correlations. 70/25/5 provides growth potential while managing volatility through diversification.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["MPT", "asset-allocation", "portfolio-construction"]
  },
  {
    category_id: 5,
    question_text: "A stock has a beta of 1.5. If the market returns 10%, what's the expected return using CAPM (assuming risk-free rate of 2%)?",
    question_type: "scenario",
    difficulty_level: "advanced",
    options: [
      "10%",
      "12%",
      "14%",
      "15%"
    ],
    correct_answer: "14%",
    explanation: "CAPM formula: Expected Return = Risk-free rate + Beta × (Market return - Risk-free rate) = 2% + 1.5 × (10% - 2%) = 2% + 1.5 × 8% = 2% + 12% = 14%",
    points: 20,
    time_limit_seconds: 60,
    tags: ["CAPM", "beta", "expected-return"]
  },
  {
    category_id: 5,
    question_text: "What is the efficient frontier in Modern Portfolio Theory?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Set of optimal portfolios offering highest return for each risk level",
      "The best-performing stock",
      "Maximum return possible",
      "Minimum risk investment"
    ],
    correct_answer: "Set of optimal portfolios offering highest return for each risk level",
    explanation: "The efficient frontier represents portfolios with maximum expected return for a given level of risk. Portfolios below the frontier are suboptimal; those above are unattainable.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["efficient-frontier", "MPT", "optimization"]
  },
  {
    category_id: 5,
    question_text: "You bought a bond at $950 with 5% coupon, $1,000 face value, maturing in 2 years. What's your approximate YTM?",
    question_type: "scenario",
    difficulty_level: "advanced",
    options: [
      "5.0%",
      "7.7%",
      "6.5%",
      "8.2%"
    ],
    correct_answer: "7.7%",
    explanation: "Approximate YTM = [Annual coupon + (Face value - Price)/Years] / [(Face value + Price)/2] = [$50 + ($1,000-$950)/2] / [($1,000+$950)/2] = $75 / $975 ≈ 7.7%",
    points: 20,
    time_limit_seconds: 60,
    tags: ["bonds", "YTM", "calculation"]
  },
  {
    category_id: 5,
    question_text: "What is duration in bond investing and why does it matter?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Measure of bond price sensitivity to interest rate changes",
      "Time until bond matures",
      "Length of ownership",
      "Payment frequency"
    ],
    correct_answer: "Measure of bond price sensitivity to interest rate changes",
    explanation: "Duration measures how much a bond's price changes with interest rate movements. A duration of 5 means a 1% rate increase causes ~5% price decrease. It's crucial for managing interest rate risk.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["duration", "bonds", "interest-rate-risk"]
  },
  {
    category_id: 5,
    question_text: "What is the Monte Carlo simulation used for in retirement planning?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Running thousands of scenarios to estimate probability of success",
      "Predicting exact returns",
      "Choosing individual stocks",
      "Calculating taxes"
    ],
    correct_answer: "Running thousands of scenarios to estimate probability of success",
    explanation: "Monte Carlo simulations run thousands of possible market scenarios to estimate the probability your portfolio will last through retirement. It accounts for variability rather than assuming average returns.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["Monte-Carlo", "retirement", "probability"]
  },
  {
    category_id: 5,
    question_text: "You have $500k portfolio. Using 4% safe withdrawal rate, what's your sustainable annual withdrawal?",
    question_type: "scenario",
    difficulty_level: "advanced",
    options: [
      "$15,000",
      "$20,000",
      "$25,000",
      "$30,000"
    ],
    correct_answer: "$20,000",
    explanation: "4% rule: Multiply portfolio value by 4% = $500,000 × 0.04 = $20,000. This is the inflation-adjusted amount you can withdraw annually with ~95% confidence of not outliving your money over 30 years.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["4-percent-rule", "withdrawal", "retirement"]
  },
  {
    category_id: 5,
    question_text: "What is factor investing?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Targeting characteristics like value, momentum, quality for excess returns",
      "Investing in factories",
      "Multiplying your investments",
      "Diversifying by number of holdings"
    ],
    correct_answer: "Targeting characteristics like value, momentum, quality for excess returns",
    explanation: "Factor investing targets specific characteristics (factors) proven to drive returns: value, size, momentum, quality, low volatility. It's a systematic approach to potentially outperform market-cap indexes.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["factor-investing", "smart-beta", "factors"]
  },
  {
    category_id: 5,
    question_text: "What is convexity in bond pricing?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Measure of how duration changes as rates change",
      "Bond's coupon rate",
      "Credit quality measure",
      "Tax treatment"
    ],
    correct_answer: "Measure of how duration changes as rates change",
    explanation: "Convexity measures the curvature in the relationship between bond prices and interest rates. High convexity means bond prices rise more when rates fall than they fall when rates rise—beneficial to investors.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["convexity", "bonds", "advanced-concepts"]
  },
  {
    category_id: 5,
    question_text: "A portfolio has Sharpe ratio of 0.8 and beta of 1.2. What does this indicate?",
    question_type: "scenario",
    difficulty_level: "advanced",
    options: [
      "Good risk-adjusted returns but higher volatility than market",
      "Poor returns and low risk",
      "Guaranteed profits",
      "Below-market performance"
    ],
    correct_answer: "Good risk-adjusted returns but higher volatility than market",
    explanation: "Sharpe ratio of 0.8 is decent risk-adjusted performance. Beta of 1.2 means 20% more volatile than market. The portfolio compensates for extra risk with solid returns relative to volatility.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["Sharpe-ratio", "beta", "analysis"]
  },
  {
    category_id: 5,
    question_text: "What is the difference between systematic and unsystematic risk?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Systematic affects whole market (can't diversify); unsystematic is company-specific (can diversify)",
      "Systematic is company-specific; unsystematic is market-wide",
      "Both are the same",
      "Neither can be managed"
    ],
    correct_answer: "Systematic affects whole market (can't diversify); unsystematic is company-specific (can diversify)",
    explanation: "Systematic risk (market risk) affects all investments and can't be diversified away. Unsystematic risk (company-specific) can be reduced through diversification. Beta measures systematic risk.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["systematic-risk", "unsystematic-risk", "diversification"]
  },
  {
    category_id: 5,
    question_text: "What is alpha in investment performance?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Excess return above what beta predicts",
      "Total portfolio return",
      "Market return",
      "Risk-free rate"
    ],
    correct_answer: "Excess return above what beta predicts",
    explanation: "Alpha measures performance beyond what's explained by market exposure (beta). Positive alpha means outperformance; negative means underperformance. It's the 'skill' component of returns.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["alpha", "performance", "skill"]
  },
  {
    category_id: 5,
    question_text: "You're implementing a tax-loss harvesting strategy. Which replacement avoids a wash sale for an S&P 500 ETF?",
    question_type: "scenario",
    difficulty_level: "advanced",
    options: [
      "Buy the same S&P 500 ETF immediately",
      "Wait 30 days, then buy same ETF back",
      "Buy total stock market ETF immediately",
      "Buy individual S&P 500 stocks"
    ],
    correct_answer: "Buy total stock market ETF immediately",
    explanation: "To avoid wash sale while maintaining market exposure, swap to a similar but not substantially identical security. Total market ETF is similar exposure but different index, avoiding wash sale rules.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["tax-loss-harvesting", "wash-sale", "strategy"]
  },
  {
    category_id: 5,
    question_text: "What is the Black-Scholes model used for?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Pricing options contracts",
      "Predicting stock prices",
      "Calculating bond yields",
      "Determining market cap"
    ],
    correct_answer: "Pricing options contracts",
    explanation: "Black-Scholes is a mathematical model for pricing European-style options. It considers stock price, strike price, time to expiration, volatility, and risk-free rate to determine fair option value.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["Black-Scholes", "options", "pricing"]
  },
  {
    category_id: 5,
    question_text: "What is sequence of returns risk in retirement?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Risk that poor returns early in retirement deplete portfolio",
      "Risk of returns being too low overall",
      "Risk of stocks volatility",
      "Risk of outliving money"
    ],
    correct_answer: "Risk that poor returns early in retirement deplete portfolio",
    explanation: "Sequence risk means that experiencing negative returns early in retirement (while making withdrawals) can permanently damage portfolio sustainability, even if long-term average returns are good.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["sequence-risk", "retirement", "withdrawals"]
  },
  {
    category_id: 5,
    question_text: "A callable bond is trading at a premium. What risk are you taking?",
    question_type: "scenario",
    difficulty_level: "advanced",
    options: [
      "Issuer may call bond when rates fall, capping your gains",
      "Bond will definitely default",
      "No risk at all",
      "You can't sell the bond"
    ],
    correct_answer: "Issuer may call bond when rates fall, capping your gains",
    explanation: "Callable bonds can be redeemed early by the issuer, typically when rates fall. If you bought at a premium and it's called, you receive par value, losing the premium paid and future higher coupon payments.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["callable-bonds", "call-risk", "bonds"]
  },
  {
    category_id: 5,
    question_text: "What is the information ratio?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Risk-adjusted measure of active management skill vs. benchmark",
      "Amount of information about a stock",
      "Ratio of stocks to bonds",
      "PE ratio variant"
    ],
    correct_answer: "Risk-adjusted measure of active management skill vs. benchmark",
    explanation: "Information ratio = (Portfolio return - Benchmark return) / Tracking error. It measures how much excess return a manager generates per unit of active risk taken versus the benchmark.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["information-ratio", "active-management", "performance"]
  },
  {
    category_id: 5,
    question_text: "You own $200k portfolio with 0.75 correlation to S&P 500 and standard deviation of 18%. S&P has SD of 15%. What's your beta?",
    question_type: "scenario",
    difficulty_level: "advanced",
    options: [
      "0.90",
      "1.20",
      "0.75",
      "1.00"
    ],
    correct_answer: "0.90",
    explanation: "Beta = Correlation × (Portfolio SD / Market SD) = 0.75 × (18% / 15%) = 0.75 × 1.2 = 0.90. Your portfolio is 90% as volatile as the market with 75% correlation.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["beta", "correlation", "calculation"]
  },
  {
    category_id: 5,
    question_text: "What is dollar duration and why is it important for large bond portfolios?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Absolute dollar change in value for 1% rate change",
      "Time to maturity in dollars",
      "Total dividend payments",
      "Original purchase price"
    ],
    correct_answer: "Absolute dollar change in value for 1% rate change",
    explanation: "Dollar duration shows the actual dollar change in portfolio value for a 1% rate change. For a $1M portfolio with duration of 5, a 1% rate rise = $50k loss. Critical for risk management.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["dollar-duration", "bonds", "risk-management"]
  },
  {
    category_id: 5,
    question_text: "What is survivorship bias in backtesting investment strategies?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Only including companies that survived, inflating historical returns",
      "Testing on survivors of market crashes",
      "Bias toward long-term holdings",
      "Excluding recent data"
    ],
    correct_answer: "Only including companies that survived, inflating historical returns",
    explanation: "Survivorship bias occurs when backtests only include companies that still exist, excluding bankruptcies. This inflates past returns and creates unrealistic expectations for future performance.",
    points: 20,
    time_limit_seconds: 60,
    tags: ["survivorship-bias", "backtesting", "data-quality"]
  }
];

async function uploadQuestions() {
  console.log('Starting upload of Category 5: Investing Basics questions...');
  
  try {
    // Transform questions to match database schema
    const questionsForDB = CATEGORY_5_INVESTING.map(q => ({
      category_id: q.category_id,
      question_text: q.question_text,
      question_type: q.question_type,
      difficulty_level: q.difficulty_level,
      options: q.options,
      correct_answer: q.correct_answer,
      explanation: q.explanation,
      topics: q.tags || []
    }));

    const { data, error } = await supabase
      .from('quiz_questions')
      .insert(questionsForDB);

    if (error) {
      console.error('Error uploading questions:', error);
      return;
    }

    console.log(`✅ Successfully uploaded ${CATEGORY_5_INVESTING.length} questions for Category 5: Investing Basics`);
    console.log(`   - Beginner: 25 questions`);
    console.log(`   - Intermediate: 25 questions`);
    console.log(`   - Advanced: 20 questions`);
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

uploadQuestions();
