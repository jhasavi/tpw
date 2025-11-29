# Quiz Question Bank - Complete Documentation

## Overview
This system supports **1000+ quiz questions** across **15 financial literacy categories** with **3 difficulty levels** each.

## Database Structure

### Tables Created:
1. **quiz_categories** - 15 financial topic categories
2. **quiz_questions_bank** - 1000+ questions with answers and explanations
3. **quiz_attempts_detailed** - User quiz history and scores
4. **quiz_responses** - Individual question answers
5. **quiz_achievements** - Badges and milestones

## Question Distribution (Target: 1050 questions)

### 1. Budgeting & Money Management (100 questions)
- **Beginner (40)**: Budget basics, needs vs wants, tracking expenses
- **Intermediate (35)**: Zero-based budgeting, envelope method, budget apps
- **Advanced (25)**: Variable income budgeting, lifestyle inflation, optimization

### 2. Banking & Checking Accounts (70 questions)
- **Beginner (30)**: Account types, basic features, ATM usage
- **Intermediate (25)**: Overdraft protection, online banking, mobile deposit
- **Advanced (15)**: Account optimization, fee negotiation, banking security

### 3. Credit & Debt Management (100 questions)
- **Beginner (40)**: Credit scores, credit reports, credit vs debit
- **Intermediate (35)**: Building credit, credit utilization, debt payoff strategies
- **Advanced (25)**: Credit repair, balance transfers, debt consolidation

### 4. Saving & Emergency Funds (70 questions)
- **Beginner (30)**: Importance of saving, emergency fund basics
- **Intermediate (25)**: High-yield savings, automatic transfers, savings goals
- **Advanced (15)**: Opportunity cost, savings optimization, inflation protection

### 5. Investing Basics (80 questions)
- **Beginner (35)**: Stock market basics, risk vs return, diversification
- **Intermediate (30)**: Mutual funds, ETFs, index funds, dollar-cost averaging
- **Advanced (15)**: Asset allocation, rebalancing, tax-efficient investing

### 6. Retirement Planning (75 questions)
- **Beginner (30)**: 401(k) basics, employer match, retirement accounts
- **Intermediate (28)**: Roth vs Traditional IRA, catch-up contributions
- **Advanced (17)**: Retirement calculators, withdrawal strategies, Required Minimum Distributions

### 7. Taxes & Tax Planning (65 questions)
- **Beginner (28)**: Tax brackets, W-2 vs W-4, deductions vs credits
- **Intermediate (22)**: Standard vs itemized deductions, tax-advantaged accounts
- **Advanced (15)**: Tax loss harvesting, estimated taxes, tax-efficient withdrawal

### 8. Insurance Fundamentals (70 questions)
- **Beginner (30)**: Types of insurance, premiums, deductibles
- **Intermediate (25)**: Health insurance (PPO, HMO, HSA), life insurance types
- **Advanced (15)**: Insurance needs analysis, policy optimization, disability insurance

### 9. Home Buying & Real Estate (70 questions)
- **Beginner (30)**: Rent vs buy, down payments, mortgages basics
- **Intermediate (25)**: Pre-approval, closing costs, mortgage types (FHA, conventional)
- **Advanced (15)**: Investment properties, refinancing, home equity

### 10. Financial Planning for Women (75 questions)
- **Beginner (32)**: Gender pay gap, career breaks, financial independence
- **Intermediate (25)**: Salary negotiation, divorce planning, widowhood
- **Advanced (18)**: Longevity planning, caregiving costs, Social Security strategies

### 11. Career & Income (65 questions)
- **Beginner (28)**: Resume building, salary research, benefits evaluation
- **Intermediate (22)**: Negotiation tactics, side hustles, passive income
- **Advanced (15)**: Career pivots, entrepreneurship, income diversification

### 12. Financial Goals & Planning (60 questions)
- **Beginner (26)**: SMART goals, short vs long-term, goal prioritization
- **Intermediate (20)**: Net worth calculation, financial milestones
- **Advanced (14)**: Financial independence, FIRE movement, legacy planning

### 13. Consumer Protection (55 questions)
- **Beginner (24)**: Common scams, identity theft basics, red flags
- **Intermediate (18)**: Credit monitoring, fraud prevention, dispute resolution
- **Advanced (13)**: Data privacy, legal protections, recovery strategies

### 14. Estate Planning & Wills (50 questions)
- **Beginner (22)**: Importance of wills, beneficiaries, basic terms
- **Intermediate (17)**: Trusts, power of attorney, health directives
- **Advanced (11)**: Estate taxes, probate avoidance, legacy planning

### 15. Financial Literacy Foundations (75 questions)
- **Beginner (32)**: Compound interest, inflation, time value of money
- **Intermediate (25)**: Risk management, economic indicators, financial ratios
- **Advanced (18)**: Behavioral finance, market cycles, financial psychology

## Features

### Question Types:
1. **Multiple Choice** (80% of questions)
   - 4 answer options
   - One correct answer
   - Explanations for each option

2. **True/False** (15% of questions)
   - Binary choice
   - Detailed explanation

3. **Scenario-Based** (5% of questions)
   - Real-world situations
   - Applied knowledge testing

### Difficulty Levels:
- **Beginner**: Foundational concepts, definitions
- **Intermediate**: Application, comparisons, strategies
- **Advanced**: Complex scenarios, optimization, edge cases

### Gamification Elements:
- **Points System**: 1 (beginner), 2 (intermediate), 3 (advanced)
- **Achievements**: First quiz, streaks, perfect scores, category mastery
- **Leaderboards**: Top scorers, most improved
- **Badges**: Category completion, difficulty levels, special challenges

### Analytics Tracked:
- Questions answered
- Accuracy by category
- Difficulty progress
- Time per question
- Common mistakes
- Learning patterns

## API Endpoints

### Get Random Questions
```typescript
// Get 15 random questions from a category
const { data } = await supabase
  .from('quiz_questions_bank')
  .select('*')
  .eq('category_id', categoryId)
  .eq('difficulty', 'beginner')
  .limit(15)
  .order('random()')
```

### Submit Quiz Attempt
```typescript
const { data } = await supabase
  .from('quiz_attempts_detailed')
  .insert({
    user_id: userId,
    category_id: categoryId,
    score: correctAnswers,
    total_questions: 15,
    percentage: (correctAnswers / 15) * 100,
    time_taken_seconds: timeInSeconds,
    difficulty: 'beginner'
  })
```

### Get User Stats
```typescript
const { data: stats } = await supabase
  .from('quiz_attempts_detailed')
  .select('score, total_questions, percentage, completed_at')
  .eq('user_id', userId)
  .order('completed_at', { ascending: false })
```

## Usage Instructions

### 1. Run Database Migration
```bash
# In Supabase SQL Editor, run:
database/migrations/create_quiz_system.sql
```

### 2. Generate & Upload Questions
```bash
# This will create 1000+ questions
npx ts-node scripts/generate-1000-quiz-questions.ts
```

### 3. Test Quiz System
```bash
# Access quiz pages:
http://localhost:3000/quiz/category/budgeting
http://localhost:3000/quiz/results
http://localhost:3000/dashboard (see quiz history)
```

## Expansion Strategy

To reach 1000+ questions efficiently:

1. **Core Questions** (300): Manually crafted, high-quality
2. **Variant Questions** (400): Similar questions with different numbers/scenarios
3. **AI-Assisted** (300): Generated with careful review
4. **Community-Sourced** (50+): User-submitted questions (future)

## Quality Assurance

Each question includes:
- ✅ Clear, unambiguous wording
- ✅ Factually accurate information
- ✅ Detailed explanation
- ✅ Learning objective
- ✅ Appropriate difficulty
- ✅ Relevant tags for search
- ✅ Points based on difficulty

## Future Enhancements

1. **Adaptive Learning**: Questions adjust based on user performance
2. **Timed Challenges**: Speed rounds for engaged learners
3. **Practice Mode**: Untimed review of missed questions
4. **Certification**: Complete category mastery certificates
5. **Social Features**: Challenge friends, team quizzes
6. **Mobile App**: Native quiz experience
7. **Offline Mode**: Downloaded question banks

## Migration from Old System

The existing `quiz_questions` and `quiz_attempts` tables will remain active. The new system (`quiz_questions_bank`, `quiz_attempts_detailed`) provides:

- Better categorization
- Enhanced tracking
- Achievement system
- Scalability to 1000+ questions
- Advanced analytics

Both systems can run in parallel during transition.
