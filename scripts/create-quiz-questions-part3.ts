/**
 * Create Credit Management Quiz Questions - Part 3
 * Final batch: 6 Credit Management lessons
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const quizQuestions = {
  'what-is-credit': [
    {
      question_text: 'What is credit?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Free money from banks', value: 'a' },
        { id: 'b', text: 'Borrowed money you promise to pay back', value: 'b' },
        { id: 'c', text: 'Your savings account balance', value: 'c' },
        { id: 'd', text: 'A type of investment', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Credit is borrowed money with a promise to repay it, usually with interest. It\'s a tool that can help or hurt you depending on how you use it.',
      difficulty_level: 'easy',
      topics: ['credit basics', 'borrowing']
    },
    {
      question_text: 'What is interest?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'A penalty for late payments', value: 'a' },
        { id: 'b', text: 'The cost of borrowing money', value: 'b' },
        { id: 'c', text: 'Your credit score', value: 'c' },
        { id: 'd', text: 'Money you earn on savings', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Interest is the cost you pay to borrow money, expressed as a percentage (APR). If you borrow $1,000 at 20% APR for a year and don\'t pay it back, you\'ll owe $1,200.',
      difficulty_level: 'easy',
      topics: ['interest', 'APR']
    },
    {
      question_text: 'True or False: All debt is bad and should be avoided completely.',
      question_type: 'true_false',
      options: [
        { id: 'true', text: 'True', value: 'true' },
        { id: 'false', text: 'False', value: 'false' }
      ],
      correct_answer: 'false',
      explanation: 'False! Some debt can be strategic (low-interest mortgages, student loans for high-earning careers). The key is using credit responsibly—never borrowing more than you can afford to repay.',
      difficulty_level: 'medium',
      topics: ['debt', 'credit philosophy']
    },
    {
      question_text: 'What does APR stand for?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Annual Payment Rate', value: 'a' },
        { id: 'b', text: 'Annual Percentage Rate', value: 'b' },
        { id: 'c', text: 'Automatic Payment Reminder', value: 'c' },
        { id: 'd', text: 'Average Price Ratio', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'APR = Annual Percentage Rate. It\'s the yearly cost of borrowing money, including interest and fees. A 20% APR credit card costs you 20% annually on unpaid balances.',
      difficulty_level: 'easy',
      topics: ['APR', 'interest']
    },
    {
      question_text: 'Why do lenders check your credit before approving loans?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'To see if you\'re trustworthy and likely to repay', value: 'a' },
        { id: 'b', text: 'To steal your identity', value: 'b' },
        { id: 'c', text: 'Because it\'s legally required', value: 'c' },
        { id: 'd', text: 'To determine your salary', value: 'd' }
      ],
      correct_answer: 'a',
      explanation: 'Lenders check credit to assess risk—will you repay the loan? Good credit history shows you\'re responsible with borrowed money. Bad credit suggests higher risk of non-payment.',
      difficulty_level: 'easy',
      topics: ['creditworthiness', 'lending']
    },
    {
      question_text: 'Which is an example of responsible credit use?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Charging everyday expenses and paying in full monthly', value: 'a' },
        { id: 'b', text: 'Maxing out cards and paying minimums', value: 'b' },
        { id: 'c', text: 'Opening 10 cards at once', value: 'c' },
        { id: 'd', text: 'Never checking your balance', value: 'd' }
      ],
      correct_answer: 'a',
      explanation: 'Responsible credit use means charging only what you can afford and paying in full each month. This builds credit without costing you interest.',
      difficulty_level: 'medium',
      topics: ['responsible use', 'credit management']
    }
  ],

  'credit-reports-scores': [
    {
      question_text: 'What is a credit score?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'A detailed history of your credit accounts', value: 'a' },
        { id: 'b', text: 'A three-digit number representing your creditworthiness', value: 'b' },
        { id: 'c', text: 'Your bank account balance', value: 'c' },
        { id: 'd', text: 'How much debt you have', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'A credit score is a three-digit number (300-850) that summarizes your creditworthiness. It\'s calculated from the data in your credit report.',
      difficulty_level: 'easy',
      topics: ['credit score', 'FICO']
    },
    {
      question_text: 'What credit score range is considered "good"?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: '300-579', value: 'a' },
        { id: 'b', text: '580-669', value: 'b' },
        { id: 'c', text: '670-739', value: 'c' },
        { id: 'd', text: '800+', value: 'd' }
      ],
      correct_answer: 'c',
      explanation: 'FICO score ranges: 670-739 is "Good," 740-799 is "Very Good," and 800+ is "Exceptional." Below 670 is considered fair or poor.',
      difficulty_level: 'medium',
      topics: ['credit score', 'ranges']
    },
    {
      question_text: 'What is the biggest factor affecting your credit score?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Your income', value: 'a' },
        { id: 'b', text: 'Payment history (35%)', value: 'b' },
        { id: 'c', text: 'Your age', value: 'c' },
        { id: 'd', text: 'Where you live', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Payment history is 35% of your FICO score—the biggest factor. Paying bills on time is the #1 way to build good credit. One late payment can drop your score 100+ points.',
      difficulty_level: 'medium',
      topics: ['credit score', 'payment history']
    },
    {
      question_text: 'What is credit utilization?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'How often you use your credit cards', value: 'a' },
        { id: 'b', text: 'The percentage of available credit you\'re using', value: 'b' },
        { id: 'c', text: 'Your total debt amount', value: 'c' },
        { id: 'd', text: 'How many cards you have', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Credit utilization = (Total balances ÷ Total credit limits) × 100. If you have $1,000 in balances and $10,000 in total limits, utilization is 10%. Keep it under 30%, ideally under 10%.',
      difficulty_level: 'medium',
      topics: ['credit utilization', 'credit score']
    },
    {
      question_text: 'True or False: Checking your own credit score hurts your credit.',
      question_type: 'true_false',
      options: [
        { id: 'true', text: 'True', value: 'true' },
        { id: 'false', text: 'False', value: 'false' }
      ],
      correct_answer: 'false',
      explanation: 'False! Checking your own credit is a "soft inquiry" and doesn\'t affect your score. Only "hard inquiries" (when you apply for credit) can impact your score slightly.',
      difficulty_level: 'easy',
      topics: ['credit inquiries', 'soft vs hard']
    },
    {
      question_text: 'How long do most negative items stay on your credit report?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: '1 year', value: 'a' },
        { id: 'b', text: '7 years', value: 'b' },
        { id: 'c', text: 'Forever', value: 'c' },
        { id: 'd', text: '30 days', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Most negative items (late payments, collections, charge-offs) remain for 7 years. Bankruptcies stay for 7-10 years. The good news: their impact fades over time, especially if you rebuild.',
      difficulty_level: 'medium',
      topics: ['credit reports', 'negative items']
    }
  ],

  'how-to-build-or-rebuild-credit': [
    {
      question_text: 'What is a secured credit card?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'A card that\'s locked in a safe', value: 'a' },
        { id: 'b', text: 'A card backed by a cash deposit you make', value: 'b' },
        { id: 'c', text: 'A card with extra security features', value: 'c' },
        { id: 'd', text: 'A card only for people with good credit', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'A secured card requires a cash deposit ($200-$500 typically) that becomes your credit limit. It works like a regular card, reports to credit bureaus, and builds credit. Great for beginners!',
      difficulty_level: 'easy',
      topics: ['secured cards', 'credit building']
    },
    {
      question_text: 'How can you build credit if you have no credit history?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Become an authorized user on someone\'s card', value: 'a' },
        { id: 'b', text: 'Get a secured credit card', value: 'b' },
        { id: 'c', text: 'Use a credit-builder loan', value: 'c' },
        { id: 'd', text: 'All of the above', value: 'd' }
      ],
      correct_answer: 'd',
      explanation: 'All three methods work! Authorized user status, secured cards, and credit-builder loans all help establish credit history when you\'re starting from zero.',
      difficulty_level: 'easy',
      topics: ['credit building', 'no credit']
    },
    {
      question_text: 'What is the fastest way to improve a damaged credit score?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Pay down credit card balances to lower utilization', value: 'a' },
        { id: 'b', text: 'Pay cash for everything forever', value: 'b' },
        { id: 'c', text: 'Open 10 new accounts', value: 'c' },
        { id: 'd', text: 'Wait for it to fix itself', value: 'd' }
      ],
      correct_answer: 'a',
      explanation: 'Paying down balances (lowering utilization) can increase your score within weeks. It\'s 30% of your score. Going from 80% utilization to 10% can add 50-100 points quickly!',
      difficulty_level: 'medium',
      topics: ['credit repair', 'utilization']
    },
    {
      question_text: 'True or False: You should close old credit cards to improve your credit score.',
      question_type: 'true_false',
      options: [
        { id: 'true', text: 'True', value: 'true' },
        { id: 'false', text: 'False', value: 'false' }
      ],
      correct_answer: 'false',
      explanation: 'False! Keep old cards open (even if not using them) because they help your credit age and total available credit. Closing them can hurt your score by reducing credit history length and increasing utilization.',
      difficulty_level: 'medium',
      topics: ['credit management', 'credit age']
    },
    {
      question_text: 'How long does it typically take to build good credit from scratch?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: '1 week', value: 'a' },
        { id: 'b', text: '6-12 months of on-time payments', value: 'b' },
        { id: 'c', text: '10 years', value: 'c' },
        { id: 'd', text: 'It\'s impossible', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'With a secured card or authorized user status and perfect on-time payments, you can reach a "good" score (670+) in 6-12 months. Rebuilding damaged credit takes longer—12-24 months typically.',
      difficulty_level: 'medium',
      topics: ['credit building', 'timeline']
    },
    {
      question_text: 'What should you do if you become an authorized user on someone\'s card?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Use the card to buy whatever you want', value: 'a' },
        { id: 'b', text: 'Ensure the primary cardholder has good payment history', value: 'b' },
        { id: 'c', text: 'Max it out to build credit faster', value: 'c' },
        { id: 'd', text: 'Never use it or even request a physical card', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'The primary cardholder\'s history reports to you. If they pay late or max out the card, it hurts YOUR credit too. Only become authorized user on accounts with excellent payment history and low utilization.',
      difficulty_level: 'hard',
      topics: ['authorized user', 'credit building']
    }
  ],

  'choosing-the-right-credit-card': [
    {
      question_text: 'What type of card is best for building credit from zero?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Rewards card with 5% cash back', value: 'a' },
        { id: 'b', text: 'Secured credit card', value: 'b' },
        { id: 'c', text: 'Store credit card', value: 'c' },
        { id: 'd', text: 'Premium travel card with $500 annual fee', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Secured cards are designed for credit building. They\'re easier to get approved for and report to all three credit bureaus. Start here, build history, then graduate to better cards.',
      difficulty_level: 'easy',
      topics: ['secured cards', 'card types']
    },
    {
      question_text: 'What is a balance transfer card?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'A card that lets you move debt from another card, often at 0% APR', value: 'a' },
        { id: 'b', text: 'A card that transfers rewards points', value: 'b' },
        { id: 'c', text: 'A card with no balance', value: 'c' },
        { id: 'd', text: 'A card for business expenses', value: 'd' }
      ],
      correct_answer: 'a',
      explanation: 'Balance transfer cards offer 0% APR for 12-18 months on transferred balances. Great for paying down debt interest-free, BUT requires discipline—pay it off before promo ends or interest returns.',
      difficulty_level: 'medium',
      topics: ['balance transfer', 'card types']
    },
    {
      question_text: 'What is the Schumer Box?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'A box for storing credit cards', value: 'a' },
        { id: 'b', text: 'A standardized table showing card terms and fees', value: 'b' },
        { id: 'c', text: 'A type of credit card reward', value: 'c' },
        { id: 'd', text: 'A credit score calculation method', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'The Schumer Box is a required disclosure showing APR, annual fee, late fees, grace period, and other important terms. Always read it before applying—it reveals the true cost of the card.',
      difficulty_level: 'medium',
      topics: ['Schumer Box', 'card disclosure']
    },
    {
      question_text: 'True or False: Annual fees are always a bad deal.',
      question_type: 'true_false',
      options: [
        { id: 'true', text: 'True', value: 'true' },
        { id: 'false', text: 'False', value: 'false' }
      ],
      correct_answer: 'false',
      explanation: 'False! Annual fees can be worth it IF rewards/benefits exceed the fee. A $95 fee card that gives you $300 in travel credits nets $205 benefit. Do the math before dismissing fee cards.',
      difficulty_level: 'medium',
      topics: ['annual fees', 'card value']
    },
    {
      question_text: 'What is a red flag when choosing a credit card?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: '"Guaranteed approval regardless of credit"', value: 'a' },
        { id: 'b', text: 'High fees before you even use the card', value: 'b' },
        { id: 'c', text: 'Issuers you\'ve never heard of', value: 'c' },
        { id: 'd', text: 'All of the above', value: 'd' }
      ],
      correct_answer: 'd',
      explanation: 'All are red flags! Predatory cards target people with poor credit, charging massive fees for tiny credit limits. Stick to major banks and credit unions for secured cards instead.',
      difficulty_level: 'easy',
      topics: ['predatory cards', 'red flags']
    },
    {
      question_text: 'Which card feature matters most if you carry balances month-to-month?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Rewards rate', value: 'a' },
        { id: 'b', text: 'Low APR', value: 'b' },
        { id: 'c', text: 'Welcome bonus', value: 'c' },
        { id: 'd', text: 'Card design', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'If you carry balances, low APR is critical—it saves you money on interest. Rewards don\'t matter if you\'re paying 24% APR. Ideally, pay in full monthly, but if you can\'t, prioritize low APR.',
      difficulty_level: 'medium',
      topics: ['APR', 'card selection']
    }
  ],

  'avoiding-common-credit-traps': [
    {
      question_text: 'What is the minimum payment trap?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'You save money by paying the minimum', value: 'a' },
        { id: 'b', text: 'Paying only minimums keeps you in debt for years with massive interest', value: 'b' },
        { id: 'c', text: 'Minimums aren\'t required', value: 'c' },
        { id: 'd', text: 'Minimums help your credit score', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Minimum payments are designed to maximize bank profits. Paying $50/month on $2,000 at 20% APR takes 7 YEARS and costs $2,000 in interest. Always pay more than the minimum!',
      difficulty_level: 'easy',
      topics: ['minimum payments', 'debt traps']
    },
    {
      question_text: 'Why should you avoid cash advances?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'They charge 3-5% fees upfront', value: 'a' },
        { id: 'b', text: 'Interest (often 25-30%) starts immediately', value: 'b' },
        { id: 'c', text: 'No grace period like purchases have', value: 'c' },
        { id: 'd', text: 'All of the above', value: 'd' }
      ],
      correct_answer: 'd',
      explanation: 'Cash advances are expensive! $1,000 advance costs $50 fee + 25% APR starting immediately = $71 for one month. That\'s 85% annualized! Almost any alternative is cheaper.',
      difficulty_level: 'medium',
      topics: ['cash advances', 'fees']
    },
    {
      question_text: 'What is lifestyle inflation in the context of credit?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Prices going up due to inflation', value: 'a' },
        { id: 'b', text: 'Spending more on credit as income rises', value: 'b' },
        { id: 'c', text: 'Credit limits increasing', value: 'c' },
        { id: 'd', text: 'Interest rates going up', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Lifestyle inflation means increasing spending as income rises. With credit, this happens BEFORE the raise hits your account—charging more because you "can afford it." Leads to debt despite higher income.',
      difficulty_level: 'medium',
      topics: ['lifestyle inflation', 'spending']
    },
    {
      question_text: 'True or False: Deferred interest and 0% APR are the same thing.',
      question_type: 'true_false',
      options: [
        { id: 'true', text: 'True', value: 'true' },
        { id: 'false', text: 'False', value: 'false' }
      ],
      correct_answer: 'false',
      explanation: 'False! They\'re very different. 0% APR means no interest during promo, then regular APR on remaining balance. Deferred interest charges ALL accumulated interest retroactively if not paid in full. Deferred is much riskier!',
      difficulty_level: 'hard',
      topics: ['deferred interest', '0% APR']
    },
    {
      question_text: 'What happens when you spend extra to "maximize rewards"?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'You make money from the rewards', value: 'a' },
        { id: 'b', text: 'You spend more than the rewards are worth', value: 'b' },
        { id: 'c', text: 'Your credit score improves', value: 'c' },
        { id: 'd', text: 'Banks give you bonus points', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Spending $100 extra to earn $5 back means you\'re $95 poorer, not richer. Only earn rewards on purchases you were making anyway. Don\'t let rewards drive spending.',
      difficulty_level: 'medium',
      topics: ['rewards', 'spending psychology']
    },
    {
      question_text: 'What should you do when offered a credit limit increase?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Accept and immediately spend more', value: 'a' },
        { id: 'b', text: 'Consider accepting but don\'t change spending', value: 'b' },
        { id: 'c', text: 'Decline if you struggle with overspending', value: 'c' },
        { id: 'd', text: 'B or C depending on your self-control', value: 'd' }
      ],
      correct_answer: 'd',
      explanation: 'If you have discipline, accepting increases your available credit and lowers utilization (good for score). If you tend to spend to your limit, decline to protect yourself. Know thyself!',
      difficulty_level: 'hard',
      topics: ['credit limits', 'self-control']
    }
  ],

  'monitoring-your-credit': [
    {
      question_text: 'How often can you get a free credit report from each bureau?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Once per week', value: 'a' },
        { id: 'b', text: 'Once per year', value: 'b' },
        { id: 'c', text: 'Once per month', value: 'c' },
        { id: 'd', text: 'Never for free', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'You\'re entitled to one free report per bureau per year through AnnualCreditReport.com. Smart strategy: request one bureau every 4 months for year-round monitoring.',
      difficulty_level: 'easy',
      topics: ['credit reports', 'free reports']
    },
    {
      question_text: 'What is the ONLY official free credit report website?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'FreeCreditReport.com', value: 'a' },
        { id: 'b', text: 'AnnualCreditReport.com', value: 'b' },
        { id: 'c', text: 'CreditScore.com', value: 'c' },
        { id: 'd', text: 'MyFreeCredit.com', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'AnnualCreditReport.com is the ONLY official site for free reports. Other sites advertising "free" reports often require credit card signup for paid monitoring.',
      difficulty_level: 'easy',
      topics: ['credit reports', 'official site']
    },
    {
      question_text: 'What should you check for when reviewing your credit report?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Accounts you don\'t recognize (possible fraud)', value: 'a' },
        { id: 'b', text: 'Incorrect payment history', value: 'b' },
        { id: 'c', text: 'Wrong personal information', value: 'c' },
        { id: 'd', text: 'All of the above', value: 'd' }
      ],
      correct_answer: 'd',
      explanation: 'Check everything! Unknown accounts signal identity theft. Payment errors hurt your score unfairly. Wrong addresses could indicate mixed files. About 20% of reports contain errors—check thoroughly.',
      difficulty_level: 'easy',
      topics: ['credit reports', 'errors']
    },
    {
      question_text: 'True or False: You have to pay to dispute errors on your credit report.',
      question_type: 'true_false',
      options: [
        { id: 'true', text: 'True', value: 'true' },
        { id: 'false', text: 'False', value: 'false' }
      ],
      correct_answer: 'false',
      explanation: 'False! Disputing errors is free. File online with the credit bureau, provide evidence, and they must investigate within 30 days. Never pay "credit repair" companies to do what you can do free.',
      difficulty_level: 'easy',
      topics: ['disputes', 'errors']
    },
    {
      question_text: 'What is a credit freeze?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'When your card stops working', value: 'a' },
        { id: 'b', text: 'Blocking access to your credit report to prevent fraud', value: 'b' },
        { id: 'c', text: 'Stopping all payments', value: 'c' },
        { id: 'd', text: 'Lowering your credit score', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'A credit freeze blocks anyone (including you) from accessing your credit report. Prevents identity thieves from opening accounts in your name. It\'s free and you can temporarily unfreeze when needed.',
      difficulty_level: 'medium',
      topics: ['credit freeze', 'fraud protection']
    },
    {
      question_text: 'What happens after you dispute an error on your credit report?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Bureau investigates within 30 days', value: 'a' },
        { id: 'b', text: 'Item is automatically removed', value: 'b' },
        { id: 'c', text: 'You have to pay a fee', value: 'c' },
        { id: 'd', text: 'Nothing happens', value: 'd' }
      ],
      correct_answer: 'a',
      explanation: 'The bureau must investigate within 30 days. They contact the creditor to verify. If the creditor can\'t verify or doesn\'t respond, the error must be removed. You get written results.',
      difficulty_level: 'medium',
      topics: ['disputes', 'process']
    }
  ]
}

async function createQuizQuestions() {
  console.log('🎯 Creating Credit Management quiz questions...\\n')

  let totalCreated = 0
  let totalErrors = 0

  for (const [lessonSlug, questions] of Object.entries(quizQuestions)) {
    console.log(`\\n📚 Processing ${lessonSlug}...`)

    const { data: lesson } = await supabase
      .from('lessons')
      .select('id, title')
      .eq('slug', lessonSlug)
      .single()

    if (!lesson) {
      console.log(`  ⚠️  Lesson ${lessonSlug} not found, skipping`)
      continue
    }

    for (const q of questions) {
      const { data: question, error: qError } = await supabase
        .from('quiz_questions')
        .insert({
          question_text: q.question_text,
          question_type: q.question_type,
          options: q.options,
          correct_answer: q.correct_answer,
          explanation: q.explanation,
          difficulty_level: q.difficulty_level,
          topics: q.topics
        })
        .select()
        .single()

      if (qError) {
        console.error(`  ❌ Error: ${qError.message}`)
        totalErrors++
        continue
      }

      const { error: linkError } = await supabase
        .from('lesson_quizzes')
        .insert({
          lesson_id: lesson.id,
          question_id: question.id,
          display_order: totalCreated + 1
        })

      if (linkError) {
        console.error(`  ❌ Link error: ${linkError.message}`)
        totalErrors++
      } else {
        totalCreated++
        console.log(`  ✅ "${q.question_text.substring(0, 50)}..."`)
      }
    }
  }

  console.log(`\\n\\n✨ Credit Management Summary:`)
  console.log(`  📝 Questions created: ${totalCreated}`)
  console.log(`  ❌ Errors: ${totalErrors}`)
  console.log(`  📚 Lessons processed: ${Object.keys(quizQuestions).length}`)
}

createQuizQuestions()
