/**
 * Create Remaining Quiz Questions - Part 2
 * Questions for Budgeting Basics, Emergency Planning, and Credit Management
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const quizQuestions = {
  // BUDGETING BASICS
  'creating-your-first-budget': [
    {
      question_text: 'What is the 50/30/20 budget rule?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: '50% savings, 30% needs, 20% wants', value: 'a' },
        { id: 'b', text: '50% needs, 30% wants, 20% savings', value: 'b' },
        { id: 'c', text: '50% rent, 30% food, 20% everything else', value: 'c' },
        { id: 'd', text: '50% checking, 30% savings, 20% investments', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'The 50/30/20 rule suggests spending 50% of after-tax income on needs (rent, utilities, groceries), 30% on wants (dining out, entertainment), and 20% on savings and debt payments.',
      difficulty_level: 'easy',
      topics: ['budgeting', '50/30/20 rule']
    },
    {
      question_text: 'What is zero-based budgeting?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Starting with zero savings', value: 'a' },
        { id: 'b', text: 'Allocating every dollar until income minus expenses equals zero', value: 'b' },
        { id: 'c', text: 'Spending everything down to zero each month', value: 'c' },
        { id: 'd', text: 'Having zero debt', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Zero-based budgeting means assigning every dollar a job—income minus all allocated expenses (including savings) equals zero. Every dollar has a purpose before the month begins.',
      difficulty_level: 'medium',
      topics: ['budgeting', 'zero-based budget']
    },
    {
      question_text: 'When is the best time to create your monthly budget?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'At the end of the month', value: 'a' },
        { id: 'b', text: 'Before the month begins', value: 'b' },
        { id: 'c', text: 'Whenever you feel like it', value: 'c' },
        { id: 'd', text: 'Only when money is tight', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Create your budget BEFORE the month begins so you have a plan in place. This prevents reactive spending and helps you make intentional decisions with your money.',
      difficulty_level: 'easy',
      topics: ['budgeting', 'planning']
    },
    {
      question_text: 'True or False: Your budget should be exactly the same every month.',
      question_type: 'true_false',
      options: [
        { id: 'true', text: 'True', value: 'true' },
        { id: 'false', text: 'False', value: 'false' }
      ],
      correct_answer: 'false',
      explanation: 'False! Your budget should flex with life. Some months have car insurance due, others have birthdays. Review and adjust each month based on what\'s coming up.',
      difficulty_level: 'easy',
      topics: ['budgeting', 'flexibility']
    },
    {
      question_text: 'What should you do if your expenses exceed your income?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Ignore it and hope it works out', value: 'a' },
        { id: 'b', text: 'Cut expenses, increase income, or both', value: 'b' },
        { id: 'c', text: 'Put everything on credit cards', value: 'c' },
        { id: 'd', text: 'Give up on budgeting', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'If expenses exceed income, you must cut spending, find ways to earn more, or both. Living beyond your means leads to debt. Face the numbers honestly and make a plan.',
      difficulty_level: 'medium',
      topics: ['budgeting', 'problem solving']
    }
  ],

  'tracking-income-expenses': [
    {
      question_text: 'How often should you track your spending?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Once a year', value: 'a' },
        { id: 'b', text: 'Monthly', value: 'b' },
        { id: 'c', text: 'Weekly or daily', value: 'c' },
        { id: 'd', text: 'Never', value: 'd' }
      ],
      correct_answer: 'c',
      explanation: 'Track spending weekly or daily for best results. Monthly reviews are too infrequent to catch overspending early. Daily or weekly check-ins keep you aware and on track.',
      difficulty_level: 'easy',
      topics: ['tracking', 'spending']
    },
    {
      question_text: 'What is "budget drift"?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'When your budget floats away', value: 'a' },
        { id: 'b', text: 'Gradually spending more than planned without noticing', value: 'b' },
        { id: 'c', text: 'Moving money between categories', value: 'c' },
        { id: 'd', text: 'Saving less over time', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Budget drift is when spending gradually creeps up beyond your plan. You budgeted $300 for groceries, but over weeks it drifts to $400 without you noticing. Tracking prevents this.',
      difficulty_level: 'medium',
      topics: ['tracking', 'budget drift']
    },
    {
      question_text: 'What is the envelope budgeting method?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Hiding money in envelopes around your house', value: 'a' },
        { id: 'b', text: 'Putting cash for each budget category in separate envelopes', value: 'b' },
        { id: 'c', text: 'Mailing your budget to yourself', value: 'c' },
        { id: 'd', text: 'Keeping all receipts in an envelope', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Envelope budgeting means putting cash for each spending category in labeled envelopes. When the envelope is empty, you stop spending in that category. Simple and effective!',
      difficulty_level: 'easy',
      topics: ['budgeting', 'cash system']
    },
    {
      question_text: 'True or False: You should categorize every single purchase.',
      question_type: 'true_false',
      options: [
        { id: 'true', text: 'True', value: 'true' },
        { id: 'false', text: 'False', value: 'false' }
      ],
      correct_answer: 'true',
      explanation: 'True! Every purchase should fit into a budget category. This reveals spending patterns and prevents money from "disappearing." Uncategorized spending is untracked spending.',
      difficulty_level: 'medium',
      topics: ['tracking', 'categorization']
    },
    {
      question_text: 'What should you do when you overspend in one budget category?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Ignore it and start fresh next month', value: 'a' },
        { id: 'b', text: 'Move money from another category to cover it', value: 'b' },
        { id: 'c', text: 'Put it on a credit card', value: 'c' },
        { id: 'd', text: 'Delete that category from your budget', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'If you overspend in one category, move money from another flexible category (like entertainment) to cover it. This keeps you balanced and prevents credit card debt.',
      difficulty_level: 'medium',
      topics: ['budgeting', 'adjustments']
    }
  ],

  'budget-categories-priorities': [
    {
      question_text: 'Which of these is a NEED, not a WANT?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Netflix subscription', value: 'a' },
        { id: 'b', text: 'Basic health insurance', value: 'b' },
        { id: 'c', text: 'Designer handbag', value: 'c' },
        { id: 'd', text: 'Gym membership', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Basic health insurance is a need—it protects you from financial catastrophe. Streaming services, designer items, and gym memberships are wants (you can live without them, even if they add value).',
      difficulty_level: 'easy',
      topics: ['needs vs wants', 'priorities']
    },
    {
      question_text: 'What is the "sandwich generation"?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'People who eat a lot of sandwiches', value: 'a' },
        { id: 'b', text: 'People supporting both children and aging parents financially', value: 'b' },
        { id: 'c', text: 'Middle-aged workers', value: 'c' },
        { id: 'd', text: 'People born between 1960-1980', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'The sandwich generation refers to people "sandwiched" between supporting their children AND aging parents. This creates unique budgeting challenges requiring careful prioritization.',
      difficulty_level: 'medium',
      topics: ['family', 'sandwich generation']
    },
    {
      question_text: 'When budgeting for children, which expense category often surprises parents?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Food costs', value: 'a' },
        { id: 'b', text: 'Clothing (kids outgrow things constantly)', value: 'b' },
        { id: 'c', text: 'Both A and B', value: 'c' },
        { id: 'd', text: 'Neither—all costs are predictable', value: 'd' }
      ],
      correct_answer: 'c',
      explanation: 'Both food and clothing costs surprise parents! Kids eat more as they grow, and they outgrow clothes/shoes every few months. Budget extra for these growing expenses.',
      difficulty_level: 'easy',
      topics: ['family budgeting', 'children']
    },
    {
      question_text: 'True or False: You should prioritize helping parents financially even if it means not saving for your own retirement.',
      question_type: 'true_false',
      options: [
        { id: 'true', text: 'True', value: 'true' },
        { id: 'false', text: 'False', value: 'false' }
      ],
      correct_answer: 'false',
      explanation: 'False! "Put on your own oxygen mask first." You can\'t help anyone if you\'re financially unstable. Secure your retirement first, then help parents within your means. They can borrow for care; you can\'t borrow for retirement.',
      difficulty_level: 'medium',
      topics: ['priorities', 'retirement', 'family']
    },
    {
      question_text: 'What is value-based spending?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Only buying things on sale', value: 'a' },
        { id: 'b', text: 'Spending money on what truly matters to you', value: 'b' },
        { id: 'c', text: 'Buying the cheapest option always', value: 'c' },
        { id: 'd', text: 'Spending as little as possible', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Value-based spending means aligning your money with your values. Spend freely on what matters most to you (family, health, education) and cut ruthlessly on what doesn\'t.',
      difficulty_level: 'medium',
      topics: ['values', 'priorities']
    }
  ],

  'budgeting-tools-apps': [
    {
      question_text: 'What is the main advantage of using budgeting apps over pen and paper?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Apps are free', value: 'a' },
        { id: 'b', text: 'Automatic transaction syncing and categorization', value: 'b' },
        { id: 'c', text: 'Apps make you rich faster', value: 'c' },
        { id: 'd', text: 'No advantages—paper is better', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Budgeting apps automatically sync with your bank accounts and categorize transactions, saving hours of manual work. They also provide instant spending insights and alerts.',
      difficulty_level: 'easy',
      topics: ['budgeting apps', 'tools']
    },
    {
      question_text: 'Which budgeting app uses the zero-based budgeting method?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Mint', value: 'a' },
        { id: 'b', text: 'YNAB (You Need A Budget)', value: 'b' },
        { id: 'c', text: 'Personal Capital', value: 'c' },
        { id: 'd', text: 'Credit Karma', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'YNAB (You Need A Budget) is built on zero-based budgeting principles—you give every dollar a job. It\'s powerful but has a learning curve and monthly fee.',
      difficulty_level: 'medium',
      topics: ['budgeting apps', 'YNAB']
    },
    {
      question_text: 'What is a potential security concern with budgeting apps?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'They require your bank login credentials', value: 'a' },
        { id: 'b', text: 'There are no security concerns', value: 'b' },
        { id: 'c', text: 'They make you spend more', value: 'c' },
        { id: 'd', text: 'They delete your accounts', value: 'd' }
      ],
      correct_answer: 'a',
      explanation: 'Most budgeting apps require bank login credentials to sync transactions. While they use encryption and read-only access, some people are uncomfortable sharing bank passwords. Weigh convenience vs. comfort level.',
      difficulty_level: 'medium',
      topics: ['security', 'budgeting apps']
    },
    {
      question_text: 'True or False: Spreadsheets can be just as effective as budgeting apps.',
      question_type: 'true_false',
      options: [
        { id: 'true', text: 'True', value: 'true' },
        { id: 'false', text: 'False', value: 'false' }
      ],
      correct_answer: 'true',
      explanation: 'True! Spreadsheets work great if you\'re willing to manually enter transactions. They\'re free, customizable, and don\'t require sharing bank credentials. The best budget system is the one you\'ll actually use.',
      difficulty_level: 'easy',
      topics: ['spreadsheets', 'budgeting']
    },
    {
      question_text: 'What feature should you look for in a budgeting app?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Automatic transaction import', value: 'a' },
        { id: 'b', text: 'Spending alerts and reports', value: 'b' },
        { id: 'c', text: 'Mobile accessibility', value: 'c' },
        { id: 'd', text: 'All of the above', value: 'd' }
      ],
      correct_answer: 'd',
      explanation: 'Look for all these features! Auto-import saves time, alerts prevent overspending, reports show patterns, and mobile access lets you check your budget anywhere.',
      difficulty_level: 'easy',
      topics: ['budgeting apps', 'features']
    }
  ],

  'handling-irregular-income': [
    {
      question_text: 'What is irregular income?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Income that varies from month to month', value: 'a' },
        { id: 'b', text: 'Illegal income', value: 'b' },
        { id: 'c', text: 'Income from a regular job', value: 'c' },
        { id: 'd', text: 'Investment returns', value: 'd' }
      ],
      correct_answer: 'a',
      explanation: 'Irregular income varies month to month—common for freelancers, commission-based workers, seasonal workers, and small business owners. You might earn $2,000 one month and $5,000 the next.',
      difficulty_level: 'easy',
      topics: ['irregular income', 'budgeting']
    },
    {
      question_text: 'What is the "income floor" budgeting strategy?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Only spending money you find on the floor', value: 'a' },
        { id: 'b', text: 'Budgeting based on your lowest expected monthly income', value: 'b' },
        { id: 'c', text: 'Setting a minimum income goal', value: 'c' },
        { id: 'd', text: 'Spending your entire income each month', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Budget on your income floor—the minimum you expect to earn in a low month. This ensures you can always cover essentials. Extra earnings above the floor go to savings or variable expenses.',
      difficulty_level: 'medium',
      topics: ['irregular income', 'income floor']
    },
    {
      question_text: 'How much should you save in months with higher income?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Nothing—spend it all', value: 'a' },
        { id: 'b', text: 'Save the surplus to cover lower-income months', value: 'b' },
        { id: 'c', text: 'Only 10%', value: 'c' },
        { id: 'd', text: 'It doesn\'t matter', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'In high-income months, save the surplus! This creates a buffer for low-income months. Think of it as "smoothing" your income—high months subsidize low months.',
      difficulty_level: 'easy',
      topics: ['irregular income', 'saving']
    },
    {
      question_text: 'True or False: People with irregular income can\'t budget effectively.',
      question_type: 'true_false',
      options: [
        { id: 'true', text: 'True', value: 'true' },
        { id: 'false', text: 'False', value: 'false' }
      ],
      correct_answer: 'false',
      explanation: 'False! Irregular income requires different budgeting strategies (income floor, priority-based spending, income smoothing), but it\'s absolutely possible. In fact, it\'s MORE important when income varies.',
      difficulty_level: 'easy',
      topics: ['irregular income', 'budgeting']
    },
    {
      question_text: 'What is priority-based budgeting for irregular income?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Randomly spending whatever comes in', value: 'a' },
        { id: 'b', text: 'Funding expenses in order of importance as money arrives', value: 'b' },
        { id: 'c', text: 'Only paying bills you feel like paying', value: 'c' },
        { id: 'd', text: 'Ignoring less important expenses', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Priority-based budgeting means listing expenses by importance (rent, utilities, groceries first; entertainment last) and funding them in order as income arrives. Critical bills get paid first!',
      difficulty_level: 'medium',
      topics: ['irregular income', 'priorities']
    }
  ],

  // EMERGENCY PLANNING (5 lessons)
  'why-emergency-funds-matter': [
    {
      question_text: 'What is an emergency fund?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Money for impulse purchases', value: 'a' },
        { id: 'b', text: 'Savings set aside specifically for unexpected expenses', value: 'b' },
        { id: 'c', text: 'Your checking account balance', value: 'c' },
        { id: 'd', text: 'Money for vacations', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'An emergency fund is money saved specifically for genuine emergencies—job loss, medical bills, car repairs. It\'s your financial safety net, separate from other savings goals.',
      difficulty_level: 'easy',
      topics: ['emergency fund', 'savings']
    },
    {
      question_text: 'Why is an emergency fund your #1 financial priority?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'It prevents going into debt when emergencies happen', value: 'a' },
        { id: 'b', text: 'It provides peace of mind', value: 'b' },
        { id: 'c', text: 'It protects your other financial goals', value: 'c' },
        { id: 'd', text: 'All of the above', value: 'd' }
      ],
      correct_answer: 'd',
      explanation: 'All of these! An emergency fund prevents debt spirals, reduces financial stress, and protects your other goals. Without it, one emergency can destroy months or years of financial progress.',
      difficulty_level: 'easy',
      topics: ['emergency fund', 'financial security']
    },
    {
      question_text: 'Which of these is a TRUE emergency for using your emergency fund?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Amazing Black Friday sale', value: 'a' },
        { id: 'b', text: 'Unexpected $800 car repair', value: 'b' },
        { id: 'c', text: 'Concert tickets went on sale', value: 'c' },
        { id: 'd', text: 'New phone release', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Unexpected necessary car repairs are a real emergency. Sales, concerts, and new gadgets are wants, not emergencies. Emergency funds are for survival needs only.',
      difficulty_level: 'easy',
      topics: ['emergency fund', 'emergencies']
    },
    {
      question_text: 'True or False: You should invest your emergency fund in stocks for higher returns.',
      question_type: 'true_false',
      options: [
        { id: 'true', text: 'True', value: 'true' },
        { id: 'false', text: 'False', value: 'false' }
      ],
      correct_answer: 'false',
      explanation: 'False! Emergency funds belong in safe, easily accessible accounts like high-yield savings. Stocks can drop 30% right when you need the money. Prioritize accessibility and safety over returns.',
      difficulty_level: 'medium',
      topics: ['emergency fund', 'investing']
    },
    {
      question_text: 'What happens if you don\'t have an emergency fund?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Emergencies force you into credit card debt', value: 'a' },
        { id: 'b', text: 'You might have to raid retirement accounts', value: 'b' },
        { id: 'c', text: 'Financial stress increases dramatically', value: 'c' },
        { id: 'd', text: 'All of the above', value: 'd' }
      ],
      correct_answer: 'd',
      explanation: 'All of these consequences happen without an emergency fund. You\'re forced to use credit cards, tap retirement (with penalties), or make desperate decisions. An emergency fund prevents this cascade.',
      difficulty_level: 'medium',
      topics: ['emergency fund', 'consequences']
    }
  ],

  'how-much-to-save': [
    {
      question_text: 'What is the typical recommended emergency fund size?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: '$100', value: 'a' },
        { id: 'b', text: '3-6 months of essential expenses', value: 'b' },
        { id: 'c', text: '$1 million', value: 'c' },
        { id: 'd', text: 'One month of income', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: '3-6 months of essential expenses is the standard goal. This covers rent, utilities, food, insurance, and minimum debt payments for 3-6 months if you lose income.',
      difficulty_level: 'easy',
      topics: ['emergency fund', 'target amount']
    },
    {
      question_text: 'What is a good starter emergency fund goal?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: '$1,000', value: 'a' },
        { id: 'b', text: '$100,000', value: 'b' },
        { id: 'c', text: '$10', value: 'c' },
        { id: 'd', text: '$50,000', value: 'd' }
      ],
      correct_answer: 'a',
      explanation: '$1,000 is a great starter goal! It covers most common emergencies (minor car repairs, medical copays, appliance replacement). Once you hit $1,000, work toward 3-6 months of expenses.',
      difficulty_level: 'easy',
      topics: ['emergency fund', 'starter fund']
    },
    {
      question_text: 'Who needs a LARGER emergency fund (closer to 6-12 months)?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Self-employed or irregular income earners', value: 'a' },
        { id: 'b', text: 'Single income households', value: 'b' },
        { id: 'c', text: 'People with chronic health conditions', value: 'c' },
        { id: 'd', text: 'All of the above', value: 'd' }
      ],
      correct_answer: 'd',
      explanation: 'All need larger funds! Self-employed income is less stable, single-income households have no backup earner, and chronic conditions mean higher medical costs. More risk = bigger cushion needed.',
      difficulty_level: 'medium',
      topics: ['emergency fund', 'customization']
    },
    {
      question_text: 'True or False: Your emergency fund should cover TOTAL expenses including wants.',
      question_type: 'true_false',
      options: [
        { id: 'true', text: 'True', value: 'true' },
        { id: 'false', text: 'False', value: 'false' }
      ],
      correct_answer: 'false',
      explanation: 'False! Calculate based on ESSENTIAL expenses only—rent, utilities, food, insurance, debt minimums. In a true emergency, you cut wants like subscriptions and entertainment. This makes the goal more achievable.',
      difficulty_level: 'medium',
      topics: ['emergency fund', 'expenses']
    },
    {
      question_text: 'How do you calculate your emergency fund target?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Monthly essential expenses × number of months coverage', value: 'a' },
        { id: 'b', text: 'Annual salary ÷ 12', value: 'b' },
        { id: 'c', text: 'Whatever feels right', value: 'c' },
        { id: 'd', text: 'Total of all your bills', value: 'd' }
      ],
      correct_answer: 'a',
      explanation: 'Formula: Monthly essential expenses × desired months of coverage. If essentials are $2,500/month and you want 6 months, target is $15,000. Use essentials only, not total spending.',
      difficulty_level: 'medium',
      topics: ['emergency fund', 'calculation']
    }
  ],

  'where-to-keep-your-emergency-fund': [
    {
      question_text: 'Where is the BEST place to keep an emergency fund?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'In your checking account', value: 'a' },
        { id: 'b', text: 'In a high-yield savings account', value: 'b' },
        { id: 'c', text: 'Invested in stocks', value: 'c' },
        { id: 'd', text: 'Under your mattress in cash', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'High-yield savings accounts are ideal—they\'re FDIC insured (safe), easily accessible within 1-2 days, and earn interest (currently 4-5%). Better than checking (too tempting to spend) and safer than stocks (volatile).',
      difficulty_level: 'easy',
      topics: ['emergency fund', 'savings accounts']
    },
    {
      question_text: 'Why should you keep emergency funds SEPARATE from checking?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Out of sight, out of mind—less temptation to spend', value: 'a' },
        { id: 'b', text: 'Helps you track the fund separately', value: 'b' },
        { id: 'c', text: 'Earns higher interest in savings', value: 'c' },
        { id: 'd', text: 'All of the above', value: 'd' }
      ],
      correct_answer: 'd',
      explanation: 'All reasons are valid! Separation reduces temptation, makes tracking easier, and savings accounts pay more interest than checking. Keep them separate for psychological and practical benefits.',
      difficulty_level: 'easy',
      topics: ['emergency fund', 'account separation']
    },
    {
      question_text: 'What does "FDIC insured" mean?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'The government guarantees your deposits up to $250,000', value: 'a' },
        { id: 'b', text: 'Your money is locked and can\'t be withdrawn', value: 'b' },
        { id: 'c', text: 'You earn guaranteed 10% interest', value: 'c' },
        { id: 'd', text: 'You can\'t lose money in the stock market', value: 'd' }
      ],
      correct_answer: 'a',
      explanation: 'FDIC (Federal Deposit Insurance Corporation) insurance means if your bank fails, the government reimburses you up to $250,000 per account. Your emergency fund is protected.',
      difficulty_level: 'medium',
      topics: ['FDIC', 'banking safety']
    },
    {
      question_text: 'True or False: Online high-yield savings accounts are less safe than traditional banks.',
      question_type: 'true_false',
      options: [
        { id: 'true', text: 'True', value: 'true' },
        { id: 'false', text: 'False', value: 'false' }
      ],
      correct_answer: 'false',
      explanation: 'False! Online banks with FDIC insurance are equally safe. They often pay higher interest because they have lower overhead (no physical branches). Just verify FDIC insurance before opening.',
      difficulty_level: 'medium',
      topics: ['online banking', 'safety']
    },
    {
      question_text: 'Why should you avoid keeping emergency funds in a CD (Certificate of Deposit)?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'CDs aren\'t safe', value: 'a' },
        { id: 'b', text: 'You pay penalties for early withdrawal', value: 'b' },
        { id: 'c', text: 'CDs don\'t earn interest', value: 'c' },
        { id: 'd', text: 'CDs are only for rich people', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'CDs lock your money for a term (6 months, 1 year, etc.). Early withdrawal means penalties that eat your interest. Emergency funds need to be accessible without penalties. Use regular savings instead.',
      difficulty_level: 'medium',
      topics: ['emergency fund', 'CDs']
    }
  ],

  'building-it-slowly': [
    {
      question_text: 'What is a realistic starting amount to save monthly for emergencies?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: '$5-25 to start, then increase over time', value: 'a' },
        { id: 'b', text: '$5,000 minimum', value: 'b' },
        { id: 'c', text: '$1,000 immediately', value: 'c' },
        { id: 'd', text: 'Nothing—just save when you can', value: 'd' }
      ],
      correct_answer: 'a',
      explanation: 'Start where you can! Even $5-25/month builds the habit. Once you adjust your budget, increase gradually. Consistency matters more than the amount when starting.',
      difficulty_level: 'easy',
      topics: ['emergency fund', 'saving']
    },
    {
      question_text: 'What is the "savings windfall" strategy?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Hoping to win the lottery', value: 'a' },
        { id: 'b', text: 'Putting unexpected money like tax refunds into emergency savings', value: 'b' },
        { id: 'c', text: 'Investing in risky stocks', value: 'c' },
        { id: 'd', text: 'Spending bonuses on wants', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'When you get unexpected money (tax refund, bonus, gift, side gig payment), put most or all into emergency savings. This accelerates your goal without impacting your regular budget.',
      difficulty_level: 'easy',
      topics: ['emergency fund', 'windfalls']
    },
    {
      question_text: 'How can you make saving automatic?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Set up automatic transfers on payday', value: 'a' },
        { id: 'b', text: 'Use direct deposit to split paychecks', value: 'b' },
        { id: 'c', text: 'Use apps that round up purchases and save the difference', value: 'c' },
        { id: 'd', text: 'All of the above', value: 'd' }
      ],
      correct_answer: 'd',
      explanation: 'All methods work! Automation removes willpower from the equation. Set it once and forget it—savings happen without you thinking about it.',
      difficulty_level: 'easy',
      topics: ['automation', 'saving']
    },
    {
      question_text: 'True or False: You should pause emergency fund contributions to pay off all debt first.',
      question_type: 'true_false',
      options: [
        { id: 'true', text: 'True', value: 'true' },
        { id: 'false', text: 'False', value: 'false' }
      ],
      correct_answer: 'false',
      explanation: 'False! Build at least a starter emergency fund ($500-$1,000) BEFORE aggressively paying debt. Without it, new emergencies create more debt. Get the starter fund, then tackle debt.',
      difficulty_level: 'medium',
      topics: ['emergency fund', 'debt']
    },
    {
      question_text: 'What should you do once you reach your emergency fund goal?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Stop saving completely', value: 'a' },
        { id: 'b', text: 'Redirect that money to other goals', value: 'b' },
        { id: 'c', text: 'Spend it all to celebrate', value: 'c' },
        { id: 'd', text: 'Close the account', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Once your emergency fund is fully funded, redirect those monthly contributions to your next priority—debt payoff, retirement, house down payment, etc. Don\'t stop the saving habit!',
      difficulty_level: 'easy',
      topics: ['emergency fund', 'goal progression']
    }
  ],

  'when-to-use-it-when-not-to': [
    {
      question_text: 'Which situation justifies using your emergency fund?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'You lost your job unexpectedly', value: 'a' },
        { id: 'b', text: 'Amazing vacation deal', value: 'b' },
        { id: 'c', text: 'Your favorite store is having a sale', value: 'c' },
        { id: 'd', text: 'New iPhone release', value: 'd' }
      ],
      correct_answer: 'a',
      explanation: 'Job loss is a true emergency—exactly what emergency funds are for. Sales, vacations, and gadgets are wants, not emergencies. Keep the fund sacred for real emergencies only.',
      difficulty_level: 'easy',
      topics: ['emergency fund', 'appropriate use']
    },
    {
      question_text: 'What is "emergency fund creep"?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Your emergency fund growing over time', value: 'a' },
        { id: 'b', text: 'Gradually lowering your standards for what counts as an emergency', value: 'b' },
        { id: 'c', text: 'Moving money to emergency savings', value: 'c' },
        { id: 'd', text: 'Scary thoughts about emergencies', value: 'd' }
      ],
      correct_answer: 'b',
      explanation: 'Emergency fund creep happens when you start using it for non-emergencies. "Well, this FEELS like an emergency..." Soon you\'re dipping in for wants. Stay strict on what qualifies.',
      difficulty_level: 'medium',
      topics: ['emergency fund', 'discipline']
    },
    {
      question_text: 'What should you do after using your emergency fund?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Immediately start rebuilding it', value: 'a' },
        { id: 'b', text: 'Wait a few years before saving again', value: 'b' },
        { id: 'c', text: 'Never rebuild—you used it already', value: 'c' },
        { id: 'd', text: 'Feel guilty about using it', value: 'd' }
      ],
      correct_answer: 'a',
      explanation: 'Rebuild immediately! Emergency funds are meant to be used for emergencies—that\'s their purpose. Don\'t feel guilty, just prioritize rebuilding it as fast as possible.',
      difficulty_level: 'easy',
      topics: ['emergency fund', 'rebuilding']
    },
    {
      question_text: 'True or False: Medical bills from an unexpected illness are an appropriate use of emergency funds.',
      question_type: 'true_false',
      options: [
        { id: 'true', text: 'True', value: 'true' },
        { id: 'false', text: 'False', value: 'false' }
      ],
      correct_answer: 'true',
      explanation: 'True! Unexpected medical bills are a classic emergency. That\'s exactly what emergency funds protect against. Use it, then rebuild.',
      difficulty_level: 'easy',
      topics: ['emergency fund', 'medical emergencies']
    },
    {
      question_text: 'What is NOT an emergency?',
      question_type: 'multiple_choice',
      options: [
        { id: 'a', text: 'Predictable annual expenses like car insurance', value: 'a' },
        { id: 'b', text: 'Unexpected roof leak', value: 'b' },
        { id: 'c', text: 'Job loss', value: 'c' },
        { id: 'd', text: 'Emergency room visit', value: 'd' }
      ],
      correct_answer: 'a',
      explanation: 'Predictable expenses aren\'t emergencies even if they\'re large. Budget for annual bills separately. Emergency funds are for truly unexpected events like job loss, medical emergencies, or home repairs.',
      difficulty_level: 'medium',
      topics: ['emergency fund', 'planned expenses']
    }
  ]
}

async function createQuizQuestions() {
  console.log('🎯 Creating remaining beginner quiz questions...\\n')

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

  console.log(`\\n\\n✨ Summary:`)
  console.log(`  📝 Questions created: ${totalCreated}`)
  console.log(`  ❌ Errors: ${totalErrors}`)
  console.log(`  📚 Lessons processed: ${Object.keys(quizQuestions).length}`)
}

createQuizQuestions()
