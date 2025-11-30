import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

interface QuizQuestion {
  category_id: number
  question_text: string
  question_type: 'multiple_choice' | 'true_false'
  difficulty_level: 'beginner' | 'intermediate' | 'advanced'
  options: string[]
  correct_answer: string
  explanation: string
}

const CATEGORY_10_CAREER: QuizQuestion[] = [
  // BEGINNER - 25 questions
  {
    category_id: 10,
    question_text: "What is the gender pay gap?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "The difference in earnings between men and women",
      "The gap between minimum wage and living wage",
      "The difference between salary and hourly pay",
      "The time between paychecks"
    ],
    correct_answer: "The difference in earnings between men and women",
    explanation: "The gender pay gap refers to the difference in average earnings between men and women, often expressed as a percentage. In the US, women earn approximately 82 cents for every dollar earned by men."
  },
  {
    category_id: 10,
    question_text: "What should you research before a salary negotiation?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Market rates for your position",
      "Your boss's salary",
      "Company's stock price",
      "Your coworkers' vacation days"
    ],
    correct_answer: "Market rates for your position",
    explanation: "Research market rates using sites like Glassdoor, Payscale, and LinkedIn Salary to understand the typical salary range for your role, experience level, and location."
  },
  {
    category_id: 10,
    question_text: "A 401(k) match is considered part of your total compensation.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "Yes! Employer 401(k) matching is part of your total compensation package. If your employer matches 5%, that's essentially a 5% raise on top of your base salary."
  },
  {
    category_id: 10,
    question_text: "What is the best time to negotiate salary?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "After receiving a job offer",
      "During the first interview",
      "After accepting the offer",
      "After your first day of work"
    ],
    correct_answer: "After receiving a job offer",
    explanation: "The best time to negotiate is after you receive a formal job offer but before you accept it. This is when you have the most leverage."
  },
  {
    category_id: 10,
    question_text: "What does PTO stand for?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Paid Time Off",
      "Personal Time Option",
      "Professional Training Opportunity",
      "Partial Tax Obligation"
    ],
    correct_answer: "Paid Time Off",
    explanation: "PTO stands for Paid Time Off - vacation days, sick days, and personal days where you're paid even though you're not working."
  },
  {
    category_id: 10,
    question_text: "You should always accept the first salary offer.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "False",
    explanation: "False! Most employers expect negotiation and often make initial offers below what they're willing to pay. Research shows that negotiating can increase your starting salary by 5-10% or more."
  },
  {
    category_id: 10,
    question_text: "What is a side hustle?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "A part-time job or business outside your main job",
      "A dance move",
      "A type of investment",
      "A workplace conflict"
    ],
    correct_answer: "A part-time job or business outside your main job",
    explanation: "A side hustle is any type of employment undertaken in addition to your full-time job. It can be freelancing, consulting, selling products online, or any income-generating activity."
  },
  {
    category_id: 10,
    question_text: "What is networking in a career context?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Building professional relationships",
      "Installing computer cables",
      "Social media posting",
      "Working from home"
    ],
    correct_answer: "Building professional relationships",
    explanation: "Career networking is the process of making connections and building relationships with people in your field or related fields. It's one of the most effective ways to find job opportunities."
  },
  {
    category_id: 10,
    question_text: "Health insurance is usually the most valuable employee benefit.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! For most people, employer-sponsored health insurance is worth $10,000-$20,000 per year. It's typically the most valuable benefit after salary."
  },
  {
    category_id: 10,
    question_text: "What is the purpose of a professional resume?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "To showcase your skills and experience to potential employers",
      "To list every job you've ever had",
      "To share your life story",
      "To display your social media followers"
    ],
    correct_answer: "To showcase your skills and experience to potential employers",
    explanation: "A resume is a concise document (typically 1-2 pages) that highlights your relevant skills, experience, and accomplishments to help you get job interviews."
  },
  {
    category_id: 10,
    question_text: "What does 'remote work' mean?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Working from a location other than a traditional office",
      "Working in a distant country",
      "Working without supervision",
      "Working part-time"
    ],
    correct_answer: "Working from a location other than a traditional office",
    explanation: "Remote work means performing your job from home, a coworking space, or anywhere outside a traditional office. It's become increasingly common and valued since 2020."
  },
  {
    category_id: 10,
    question_text: "LinkedIn is primarily used for professional networking.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! LinkedIn is the world's largest professional networking platform, designed specifically for career connections, job searching, and business relationships."
  },
  {
    category_id: 10,
    question_text: "What is a 'cost of living adjustment' (COLA)?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "A salary increase to match inflation",
      "A relocation bonus",
      "A one-time bonus",
      "A retirement contribution"
    ],
    correct_answer: "A salary increase to match inflation",
    explanation: "A COLA is an adjustment to your salary or benefits to maintain your purchasing power as the cost of goods and services increases due to inflation."
  },
  {
    category_id: 10,
    question_text: "What should you bring to a job interview?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Extra copies of your resume",
      "Your entire work portfolio in boxes",
      "Your friends for moral support",
      "A list of salary demands"
    ],
    correct_answer: "Extra copies of your resume",
    explanation: "Always bring 3-5 printed copies of your resume to an interview, even if you've submitted it online. Also bring a notepad, pen, and a list of questions to ask the interviewer."
  },
  {
    category_id: 10,
    question_text: "Soft skills are technical abilities like coding or accounting.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "False",
    explanation: "False! Soft skills are interpersonal abilities like communication, teamwork, problem-solving, and leadership. Technical skills (hard skills) are specific, teachable abilities like coding or accounting."
  },
  {
    category_id: 10,
    question_text: "What is a cover letter?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "A personalized letter explaining why you're a good fit for a job",
      "A letter covering your resume",
      "A formal complaint letter",
      "A thank you note after an interview"
    ],
    correct_answer: "A personalized letter explaining why you're a good fit for a job",
    explanation: "A cover letter accompanies your resume and provides context about your interest in the position, highlights relevant achievements, and explains why you're a strong candidate."
  },
  {
    category_id: 10,
    question_text: "What does W-2 form show?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Your annual wages and taxes withheld",
      "Your weekly work schedule",
      "Your 401(k) contribution limit",
      "Your health insurance plan"
    ],
    correct_answer: "Your annual wages and taxes withheld",
    explanation: "Form W-2 is an annual tax document from your employer showing your total wages, tips, and taxes withheld (federal, state, Social Security, Medicare). You need it to file your tax return."
  },
  {
    category_id: 10,
    question_text: "Professional development includes skills training and continuing education.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! Professional development encompasses all learning activities that enhance your skills, knowledge, and expertise - including courses, certifications, workshops, conferences, and on-the-job training."
  },
  {
    category_id: 10,
    question_text: "What is the primary purpose of a performance review?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "To evaluate your work and discuss career growth",
      "To criticize your mistakes",
      "To announce layoffs",
      "To reduce your salary"
    ],
    correct_answer: "To evaluate your work and discuss career growth",
    explanation: "Performance reviews assess your accomplishments, identify areas for improvement, set goals, and discuss compensation and career development opportunities."
  },
  {
    category_id: 10,
    question_text: "What does 'work-life balance' mean?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Managing time between career and personal life",
      "Working exactly 8 hours per day",
      "Never taking work home",
      "Working from home exclusively"
    ],
    correct_answer: "Managing time between career and personal life",
    explanation: "Work-life balance refers to the equilibrium between time spent on work responsibilities and time for personal life, family, hobbies, and self-care."
  },
  {
    category_id: 10,
    question_text: "Asking for a raise requires documenting your achievements and value.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! When requesting a raise, prepare specific examples of your accomplishments, quantify your impact (revenue generated, costs saved, projects completed), and research market rates."
  },
  {
    category_id: 10,
    question_text: "What is an entry-level position?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "A job requiring little to no experience",
      "A job at the entrance of a building",
      "A temporary position",
      "A management role"
    ],
    correct_answer: "A job requiring little to no experience",
    explanation: "Entry-level positions are jobs designed for people starting their careers or entering a new field. They typically require minimal professional experience and provide on-the-job training."
  },
  {
    category_id: 10,
    question_text: "What is a mentor?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "An experienced person who guides your career development",
      "Your direct supervisor",
      "A paid career coach",
      "A college professor"
    ],
    correct_answer: "An experienced person who guides your career development",
    explanation: "A mentor is someone with more experience in your field who voluntarily provides guidance, advice, and support for your professional growth. Mentorship relationships are typically informal and unpaid."
  },
  {
    category_id: 10,
    question_text: "Overtime pay is typically 1.5 times your regular hourly rate.",
    question_type: "true_false",
    difficulty_level: "beginner",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! Under federal law (FLSA), non-exempt employees must be paid 1.5 times their regular rate for hours worked over 40 in a workweek. This is called 'time and a half.'"
  },
  {
    category_id: 10,
    question_text: "What should you do after a job interview?",
    question_type: "multiple_choice",
    difficulty_level: "beginner",
    options: [
      "Send a thank-you email within 24 hours",
      "Call every day asking for a decision",
      "Wait silently without any follow-up",
      "Send gifts to the interviewer"
    ],
    correct_answer: "Send a thank-you email within 24 hours",
    explanation: "Always send a thank-you email within 24 hours of your interview. It shows professionalism, reinforces your interest, and provides an opportunity to address any points you may have missed."
  },

  // INTERMEDIATE - 25 questions
  {
    category_id: 10,
    question_text: "What is the difference between exempt and non-exempt employees?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Exempt employees are not eligible for overtime pay",
      "Exempt employees work from home",
      "Non-exempt employees don't pay taxes",
      "Non-exempt employees get higher salaries"
    ],
    correct_answer: "Exempt employees are not eligible for overtime pay",
    explanation: "Exempt employees (typically salaried managers, professionals) are exempt from overtime pay requirements under the Fair Labor Standards Act. Non-exempt employees must be paid overtime for hours over 40/week."
  },
  {
    category_id: 10,
    question_text: "What is equity compensation?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Stock options or shares given as part of compensation",
      "Equal pay for equal work",
      "Fair treatment in the workplace",
      "Bonus payments based on performance"
    ],
    correct_answer: "Stock options or shares given as part of compensation",
    explanation: "Equity compensation gives employees ownership stake in the company through stock options, restricted stock units (RSUs), or employee stock purchase plans (ESPP). Common in tech and startups."
  },
  {
    category_id: 10,
    question_text: "Negotiating benefits can be just as valuable as negotiating salary.",
    question_type: "true_false",
    difficulty_level: "intermediate",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! Benefits like extra vacation days, flexible work arrangements, professional development budgets, signing bonuses, and remote work options can significantly impact your quality of life and total compensation."
  },
  {
    category_id: 10,
    question_text: "What is a stretch assignment?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "A challenging project that develops new skills",
      "Working longer hours",
      "A yoga break during work",
      "Delegating work to others"
    ],
    correct_answer: "A challenging project that develops new skills",
    explanation: "A stretch assignment is a project or responsibility that pushes you beyond your current role, helping you develop new skills and demonstrate readiness for advancement."
  },
  {
    category_id: 10,
    question_text: "What is a non-compete agreement?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "A contract restricting work for competitors after leaving",
      "An agreement not to compete for promotions",
      "A policy against workplace competition",
      "A salary negotiation tactic"
    ],
    correct_answer: "A contract restricting work for competitors after leaving",
    explanation: "A non-compete agreement prevents you from working for competitors or starting a competing business for a specified period after leaving your employer. Review carefully before signing - some are unenforceable."
  },
  {
    category_id: 10,
    question_text: "You should negotiate salary only after demonstrating your value, not during the interview.",
    question_type: "true_false",
    difficulty_level: "intermediate",
    options: ["True", "False"],
    correct_answer: "False",
    explanation: "False! The best time to negotiate is after receiving an offer but before accepting it. This is when you have maximum leverage. Don't wait until after you've started working."
  },
  {
    category_id: 10,
    question_text: "What is a Roth 401(k) contribution?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "After-tax contributions with tax-free withdrawals in retirement",
      "Before-tax contributions",
      "Employer matching only",
      "A type of pension plan"
    ],
    correct_answer: "After-tax contributions with tax-free withdrawals in retirement",
    explanation: "Roth 401(k) contributions are made with after-tax dollars (you pay tax now), but qualified withdrawals in retirement are tax-free. This contrasts with traditional 401(k) where contributions are pre-tax but withdrawals are taxed."
  },
  {
    category_id: 10,
    question_text: "What is the cliff in vesting schedules?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "A waiting period before any stock or benefits vest",
      "The top of the corporate ladder",
      "A sudden salary drop",
      "An impossible career goal"
    ],
    correct_answer: "A waiting period before any stock or benefits vest",
    explanation: "Cliff vesting means you must work for a specific period (often 1 year) before any equity or retirement benefits vest. After the cliff, a percentage vests. Leave before the cliff, lose everything."
  },
  {
    category_id: 10,
    question_text: "A professional portfolio should showcase quantifiable achievements, not just responsibilities.",
    question_type: "true_false",
    difficulty_level: "intermediate",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! Use numbers to show impact: 'Increased sales by 30%' or 'Managed $2M budget' is far more impressive than 'Responsible for sales' or 'Handled budget.' Quantify whenever possible."
  },
  {
    category_id: 10,
    question_text: "What is a BATNA in salary negotiation?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Best Alternative To a Negotiated Agreement",
      "Basic Annual Target for Net Assets",
      "Bargaining Against Total Negotiation Adversity",
      "Baseline Approval for Trade and Negotiation"
    ],
    correct_answer: "Best Alternative To a Negotiated Agreement",
    explanation: "BATNA is your best option if negotiations fail - like another job offer, staying in your current role, or freelancing. Knowing your BATNA gives you confidence and leverage in negotiations."
  },
  {
    category_id: 10,
    question_text: "What is the 'motherhood penalty'?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Lower earnings and advancement for women with children",
      "The cost of childcare",
      "Maternity leave duration",
      "Tax penalties for parents"
    ],
    correct_answer: "Lower earnings and advancement for women with children",
    explanation: "The motherhood penalty refers to the wage gap and reduced career opportunities mothers face compared to childless women and fathers. Mothers earn approximately 70 cents for every dollar earned by fathers."
  },
  {
    category_id: 10,
    question_text: "Severance pay is legally required when you're laid off.",
    question_type: "true_false",
    difficulty_level: "intermediate",
    options: ["True", "False"],
    correct_answer: "False",
    explanation: "False! In most states, severance pay is not legally required unless specified in an employment contract. It's typically offered as goodwill, especially in mass layoffs. Always negotiate severance if offered."
  },
  {
    category_id: 10,
    question_text: "What is a 'sponsor' in career development?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "A senior leader who actively advocates for your advancement",
      "A company that pays for your education",
      "Someone who funds your startup",
      "A client who provides business"
    ],
    correct_answer: "A senior leader who actively advocates for your advancement",
    explanation: "A sponsor is different from a mentor - they actively use their influence to create opportunities for you, recommend you for promotions, and speak up for you in decision-making rooms you're not in."
  },
  {
    category_id: 10,
    question_text: "What should you include when documenting your achievements?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Specific metrics, challenges overcome, and business impact",
      "Your daily tasks",
      "Your opinions about management",
      "Your years of experience only"
    ],
    correct_answer: "Specific metrics, challenges overcome, and business impact",
    explanation: "Document achievements using the STAR method: Situation, Task, Action, Result. Include numbers: revenue generated, costs saved, efficiency gains, projects delivered, team size managed, etc."
  },
  {
    category_id: 10,
    question_text: "Women should avoid negotiating to prevent being seen as aggressive.",
    question_type: "true_false",
    difficulty_level: "intermediate",
    options: ["True", "False"],
    correct_answer: "False",
    explanation: "False! This harmful stereotype hurts women's earnings. Research shows women can negotiate effectively by framing requests around 'we' (team impact) and being collaborative. Not negotiating costs hundreds of thousands over a career."
  },
  {
    category_id: 10,
    question_text: "What is a golden handcuff?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Benefits that make it financially difficult to leave a job",
      "Expensive jewelry from an employer",
      "A signing bonus",
      "Mandatory retirement savings"
    ],
    correct_answer: "Benefits that make it financially difficult to leave a job",
    explanation: "Golden handcuffs are compensation incentives (unvested stock, large bonuses, pension benefits) that make leaving a job costly. They can trap you in a role you've outgrown financially."
  },
  {
    category_id: 10,
    question_text: "What is backdoor equity?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Negotiating equity after accepting a lower salary",
      "Illegal stock trading",
      "Selling company stock secretly",
      "Buying discounted employee stock"
    ],
    correct_answer: "Negotiating equity after accepting a lower salary",
    explanation: "If a company can't meet your salary requirements, you can negotiate for equity (stock options or RSUs) as compensation. Particularly common in startups and tech companies."
  },
  {
    category_id: 10,
    question_text: "HSA (Health Savings Account) contributions reduce your taxable income.",
    question_type: "true_false",
    difficulty_level: "intermediate",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! HSA contributions are tax-deductible (or pre-tax if through payroll), grow tax-free, and withdrawals for qualified medical expenses are tax-free. It's a triple tax advantage if you have a high-deductible health plan."
  },
  {
    category_id: 10,
    question_text: "What is a 'boomerang employee'?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Someone who leaves a company and later returns",
      "An employee who frequently changes departments",
      "A remote worker who travels constantly",
      "Someone fired and rehired immediately"
    ],
    correct_answer: "Someone who leaves a company and later returns",
    explanation: "Boomerang employees leave for other opportunities but return to their former employer, often at a higher level or salary. Many companies now have 'alumni programs' to encourage this."
  },
  {
    category_id: 10,
    question_text: "What is the '70% rule' for job requirements?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Apply if you meet 70% of the qualifications",
      "Only accept offers 70% above your current salary",
      "Work 70% as hard as you can",
      "Negotiate for 70% of the posted salary"
    ],
    correct_answer: "Apply if you meet 70% of the qualifications",
    explanation: "Research shows women typically apply only if they meet 100% of job requirements, while men apply at 60%. If you meet 70%+ of qualifications, apply! Companies often hire candidates who meet fewer requirements."
  },
  {
    category_id: 10,
    question_text: "Salary bands within a role can vary by 20-30% or more.",
    question_type: "true_false",
    difficulty_level: "intermediate",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! Most positions have salary ranges with significant spread. Someone in the same role can earn 30%+ more based on negotiation, experience, and perceived value. This is why negotiating matters."
  },
  {
    category_id: 10,
    question_text: "What is 'quiet quitting'?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Doing only what your job requires, without going above and beyond",
      "Leaving a job without notice",
      "Being fired unexpectedly",
      "Working remotely permanently"
    ],
    correct_answer: "Doing only what your job requires, without going above and beyond",
    explanation: "Quiet quitting means setting boundaries and doing your job without the extra unpaid work or emotional investment beyond your role. It's about work-life balance, not actual quitting."
  },
  {
    category_id: 10,
    question_text: "What is a retention bonus?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Money offered to prevent you from leaving",
      "A signing bonus for new employees",
      "Performance-based annual bonus",
      "Retirement account contribution"
    ],
    correct_answer: "Money offered to prevent you from leaving",
    explanation: "A retention bonus is a lump sum payment offered to keep you during critical periods (mergers, transitions, talent shortage). Often requires you to stay for a specific period or repay the bonus."
  },
  {
    category_id: 10,
    question_text: "Professional certifications can increase earning potential by 10-20%.",
    question_type: "true_false",
    difficulty_level: "intermediate",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! Industry-specific certifications (PMP, CPA, CFA, HR certifications) can significantly boost earnings. They demonstrate expertise and commitment to your field. Many employers pay for certifications."
  },
  {
    category_id: 10,
    question_text: "What is a sabbatical?",
    question_type: "multiple_choice",
    difficulty_level: "intermediate",
    options: [
      "Extended leave (often unpaid) for personal/professional development",
      "Permanent retirement from work",
      "A required vacation period",
      "Time off due to illness"
    ],
    correct_answer: "Extended leave (often unpaid) for personal/professional development",
    explanation: "A sabbatical is an extended break (typically 1-12 months) from work for travel, study, volunteering, or personal projects. Some companies offer paid sabbaticals after a certain tenure."
  },

  // ADVANCED - 20 questions
  {
    category_id: 10,
    question_text: "What is the total compensation package analysis?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Calculating the full value of salary, benefits, equity, and perks",
      "Your gross annual salary",
      "The cost of health insurance",
      "Your tax obligations"
    ],
    correct_answer: "Calculating the full value of salary, benefits, equity, and perks",
    explanation: "Total comp includes: base salary + bonus potential + equity value + 401(k) match + health insurance value + PTO value + other benefits. Two jobs with same base salary can differ by $30K+ in total comp."
  },
  {
    category_id: 10,
    question_text: "What is the '4-year vest with 1-year cliff' stock option structure?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "25% vests after year 1, remaining vests monthly over 3 years",
      "All stock vests after 4 years",
      "Stock vests equally each year",
      "Stock never fully vests"
    ],
    correct_answer: "25% vests after year 1, remaining vests monthly over 3 years",
    explanation: "Standard startup vesting: nothing vests year 1 (cliff). On your 1-year anniversary, 25% vests. Then 1/48th of remaining 75% vests monthly for 36 months. Leave before 1 year, you get nothing."
  },
  {
    category_id: 10,
    question_text: "Deferred compensation plans can reduce current taxes but have significant risks.",
    question_type: "true_false",
    difficulty_level: "advanced",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! Deferred comp (non-qualified plans) delays income and taxes to future years, but money is at risk if company goes bankrupt. You're an unsecured creditor. Weigh tax benefits against risk."
  },
  {
    category_id: 10,
    question_text: "What is a Section 409A valuation?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "IRS-compliant valuation determining stock option strike price",
      "Company's public stock price",
      "Employee performance rating",
      "Healthcare plan value"
    ],
    correct_answer: "IRS-compliant valuation determining stock option strike price",
    explanation: "409A valuations determine the fair market value of private company stock for option grants. Startups must get independent 409A valuations to avoid tax penalties. Updated every 12 months or after funding."
  },
  {
    category_id: 10,
    question_text: "What is a clawback provision?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Requirement to return bonuses if performance metrics are later revised downward",
      "Ability to reclaim unused vacation days",
      "Employer matching contributions",
      "Stock buyback program"
    ],
    correct_answer: "Requirement to return bonuses if performance metrics are later revised downward",
    explanation: "Clawback provisions (required for executives under Dodd-Frank) allow companies to reclaim bonuses, equity, or other comp if financial results are restated or fraud is discovered. Read your contract carefully."
  },
  {
    category_id: 10,
    question_text: "ISOs (Incentive Stock Options) have more favorable tax treatment than NSOs but come with AMT risk.",
    question_type: "true_false",
    difficulty_level: "advanced",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! ISOs can qualify for long-term capital gains tax (lower rate) vs ordinary income for NSOs. However, exercising ISOs can trigger Alternative Minimum Tax (AMT). Consult a tax advisor before exercising."
  },
  {
    category_id: 10,
    question_text: "What is the difference between an RSU and a stock option?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "RSUs have value at vest; options are worthless if stock price drops below strike price",
      "RSUs and stock options are the same",
      "RSUs are only for executives",
      "Options are always better than RSUs"
    ],
    correct_answer: "RSUs have value at vest; options are worthless if stock price drops below strike price",
    explanation: "Restricted Stock Units (RSUs) are actual shares given to you that vest over time. Stock options give you the RIGHT to buy shares at a set price (strike). RSUs always have value; options can expire worthless."
  },
  {
    category_id: 10,
    question_text: "What is a change of control (CIC) clause?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Contract terms that trigger if company is acquired or goes public",
      "Changing your job responsibilities",
      "Transferring to a new department",
      "Getting a new manager"
    ],
    correct_answer: "Contract terms that trigger if company is acquired or goes public",
    explanation: "CIC clauses in employment contracts detail what happens if the company is sold. May include accelerated vesting (your unvested stock vests immediately), severance packages, or retention bonuses."
  },
  {
    category_id: 10,
    question_text: "Double-trigger acceleration requires both a company acquisition AND termination to vest equity.",
    question_type: "true_false",
    difficulty_level: "advanced",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! Single-trigger = equity vests immediately upon acquisition. Double-trigger = equity vests only if you're terminated or laid off within 12-18 months post-acquisition. Double-trigger protects the acquiring company."
  },
  {
    category_id: 10,
    question_text: "What is the 83(b) election for stock options?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Pay taxes on stock value now rather than at vesting",
      "Defer all stock taxes to retirement",
      "Avoid paying taxes on stock entirely",
      "Donate stock to charity"
    ],
    correct_answer: "Pay taxes on stock value now rather than at vesting",
    explanation: "83(b) election lets you pay tax on stock's current (low) value within 30 days of grant, rather than at vesting when value may be higher. If stock appreciates significantly, this saves substantial taxes."
  },
  {
    category_id: 10,
    question_text: "What is a Mega Backdoor Roth?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Converting after-tax 401(k) contributions to Roth",
      "A large signing bonus",
      "Illegal tax avoidance",
      "High-interest savings account"
    ],
    correct_answer: "Converting after-tax 401(k) contributions to Roth",
    explanation: "If your 401(k) allows after-tax contributions beyond the $23K limit (up to $69K total including employer match), you can convert those to Roth. This creates tax-free growth. Not all plans allow this."
  },
  {
    category_id: 10,
    question_text: "Garden leave means being paid to not work while serving a notice period.",
    question_type: "true_false",
    difficulty_level: "advanced",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! Garden leave (common in UK, rare in US) means you're still employed and paid during your notice period but not required to work or come to the office. Prevents you from taking company knowledge to competitors."
  },
  {
    category_id: 10,
    question_text: "What is phantom stock?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Cash bonus mimicking stock value without actual ownership",
      "Imaginary compensation",
      "Stock from a defunct company",
      "Hidden stock options"
    ],
    correct_answer: "Cash bonus mimicking stock value without actual ownership",
    explanation: "Phantom stock is a cash bonus plan that tracks company stock value but doesn't involve actual shares. When phantom shares 'vest,' you receive cash equal to stock value. No ownership or voting rights."
  },
  {
    category_id: 10,
    question_text: "What is a SERP (Supplemental Executive Retirement Plan)?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Deferred compensation plan for executives beyond 401(k) limits",
      "Standard 401(k) plan",
      "Social Security supplement",
      "Severance package"
    ],
    correct_answer: "Deferred compensation plan for executives beyond 401(k) limits",
    explanation: "SERPs are non-qualified retirement plans for highly compensated executives. They bypass 401(k) contribution limits but are unfunded promises (not protected like 401(k)s). Company bankruptcy risk is real."
  },
  {
    category_id: 10,
    question_text: "Constructive discharge means being forced to resign due to intolerable working conditions.",
    question_type: "true_false",
    difficulty_level: "advanced",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True! If an employer makes working conditions so intolerable that a reasonable person would feel forced to quit, it's constructive discharge. May qualify you for unemployment benefits and legal remedies like wrongful termination."
  },
  {
    category_id: 10,
    question_text: "What is a 'gross-up' in compensation?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Employer pays extra to cover taxes on a benefit",
      "Salary before deductions",
      "Overtime calculation",
      "Total annual compensation"
    ],
    correct_answer: "Employer pays extra to cover taxes on a benefit",
    explanation: "A gross-up is additional money the employer pays to cover the tax liability on a benefit (like relocation expenses or bonuses), ensuring you receive the full intended value after taxes."
  },
  {
    category_id: 10,
    question_text: "What is a rabbi trust in deferred compensation?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Trust protecting deferred comp from company's general creditors (but not bankruptcy)",
      "Religious retirement account",
      "Charitable giving trust",
      "Fully protected retirement fund"
    ],
    correct_answer: "Trust protecting deferred comp from company's general creditors (but not bankruptcy)",
    explanation: "Rabbi trusts hold deferred compensation assets in trust, protecting them from company creditors in most situations. However, in bankruptcy, employees become unsecured creditors. Named after first IRS ruling for a synagogue."
  },
  {
    category_id: 10,
    question_text: "Stock option spreads are taxed as ordinary income upon exercise, not capital gains.",
    question_type: "true_false",
    difficulty_level: "advanced",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "True for NSOs! The spread (difference between strike price and FMV at exercise) is taxed as ordinary income. Only gains AFTER exercise qualify for capital gains treatment. ISOs differ - consult tax advisor."
  },
  {
    category_id: 10,
    question_text: "What is the Black-Scholes model used for?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Valuing stock options",
      "Calculating salary ranges",
      "Determining health insurance costs",
      "Projecting retirement savings"
    ],
    correct_answer: "Valuing stock options",
    explanation: "Black-Scholes is a mathematical model for pricing stock options. It considers strike price, current stock price, time to expiration, volatility, and interest rates. Used in 409A valuations and option pricing."
  },
  {
    category_id: 10,
    question_text: "What is the wash sale rule?",
    question_type: "multiple_choice",
    difficulty_level: "advanced",
    options: [
      "Can't claim tax loss if you buy same stock within 30 days",
      "Must sell all shares at once",
      "Can't buy stock in same sector",
      "Limits on stock trading frequency"
    ],
    correct_answer: "Can't claim tax loss if you buy same stock within 30 days",
    explanation: "IRS wash sale rule: if you sell stock at a loss and buy substantially identical stock within 30 days before or after, you can't claim the tax loss. Loss is deferred and added to the cost basis of new shares."
  }
];

async function uploadQuestions() {
  console.log('Starting upload of Category 10: Career & Income Growth questions...');
  console.log(`Total questions to upload: ${CATEGORY_10_CAREER.length}`);
  
  try {
    const questionsForDB = CATEGORY_10_CAREER.map(q => ({
      category_id: q.category_id,
      question_text: q.question_text,
      question_type: q.question_type,
      difficulty_level: q.difficulty_level,
      options: q.options,
      correct_answer: q.correct_answer,
      explanation: q.explanation
    }));

    const { data, error } = await supabase
      .from('quiz_questions')
      .insert(questionsForDB);

    if (error) {
      console.error('Error uploading questions:', error);
      throw error;
    }

    console.log('✅ Successfully uploaded all questions!');
    console.log(`📊 Breakdown by difficulty:`);
    console.log(`   Beginner: ${CATEGORY_10_CAREER.filter(q => q.difficulty_level === 'beginner').length}`);
    console.log(`   Intermediate: ${CATEGORY_10_CAREER.filter(q => q.difficulty_level === 'intermediate').length}`);
    console.log(`   Advanced: ${CATEGORY_10_CAREER.filter(q => q.difficulty_level === 'advanced').length}`);
    
    return true;
  } catch (err) {
    console.error('Failed to upload questions:', err);
    return false;
  }
}

uploadQuestions();
