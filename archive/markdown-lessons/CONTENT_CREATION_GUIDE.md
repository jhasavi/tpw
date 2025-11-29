# Content Creation Guide - The Purple Wing

This guide shows you exactly how to create lesson content for The Purple Wing platform.

## 📝 Lesson Content Template

Every lesson should follow this structure (see `src/data/sample-lesson.ts` for a complete example):

### 1. Lesson Metadata

```typescript
{
  id: 'lesson-slug',           // URL-friendly identifier
  courseId: 'course-id',        // Which course this belongs to
  slug: 'lesson-slug',          // Same as id
  title: 'Lesson Title',        // Clear, descriptive title
  description: '...',           // 1-2 sentence overview
  durationMinutes: 30,          // Realistic reading time
  displayOrder: 1,              // Order within course
  objectives: [...],            // 3-5 learning objectives
  keyConcepts: [...],          // Key terms/concepts
  content: { ... }             // Main content (see below)
}
```

### 2. Content Structure

```typescript
content: {
  introduction: `
    Engaging 2-3 paragraph introduction.
    Set context, explain why this matters.
    Preview what they'll learn.
  `,
  
  sections: [
    {
      title: 'Section Title',
      content: `Main explanation...`,
      examples: ['Example 1', 'Example 2'],
      tips: ['Tip 1', 'Tip 2']
    },
    // 3-6 sections per lesson
  ],
  
  keyTakeaways: [
    '5-7 main points to remember'
  ],
  
  actionItems: [
    'Specific things to do this week'
  ],
  
  resources: [
    {
      title: 'Resource Name',
      type: 'tool' | 'worksheet' | 'calculator' | 'article',
      description: 'What this resource provides',
      url: 'https://...' // optional
    }
  ]
}
```

## ✍️ Writing Guidelines

### Tone & Voice

**DO:**
- ✅ Write like you're talking to a friend over coffee
- ✅ Use "you" and "your" (second person)
- ✅ Be warm, encouraging, judgment-free
- ✅ Acknowledge challenges women face
- ✅ Give real, practical examples
- ✅ Use inclusive language

**DON'T:**
- ❌ Use jargon without explanation
- ❌ Be condescending or preachy
- ❌ Make assumptions about knowledge level
- ❌ Ignore women-specific situations
- ❌ Be overly academic or theoretical
- ❌ Gender roles or stereotypes

### Example Tone Comparison

**Bad (too academic):**
> "The compound annual growth rate (CAGR) represents the mean annual growth rate of an investment over a specified time period longer than one year."

**Good (warm and clear):**
> "Let's talk about compound interest—it's basically money making money. When your savings earn interest, that interest gets added to your balance. Next month, you earn interest on the bigger balance. Over time, this snowball effect can really add up."

### Women-Centered Examples

Always include examples that reflect women's real situations:

**Generic Example:**
> "If you invest $100/month..."

**Women-Centered Example:**
> "Maria, a single mom working two jobs, started investing just $50/month—the cost of a few lattes. Ten years later, that small commitment had grown to $8,000, giving her a safety net she never thought possible."

### Real-World Scenarios

Ground abstract concepts in real life:

**Abstract:**
> "Emergency funds should cover 3-6 months of expenses."

**Real-World:**
> "Sarah's car broke down the same week her daughter needed urgent dental work. Because she had $5,000 in her emergency fund, she could handle both without going into credit card debt or asking family for help. That's the peace of mind an emergency fund provides."

## 📚 Content Sections to Include

### 1. Introduction (2-3 paragraphs)
- Hook the reader
- Explain why this topic matters
- Preview what they'll learn
- Connect to their life/goals

### 2. Main Content (3-6 sections)

Each section should have:
- **Clear subtitle**
- **Explanation** (2-4 paragraphs)
- **Examples** (2-3 real scenarios)
- **Tips** (2-3 practical pointers)

### 3. Examples

Make them specific and relatable:
- Use common women's names (diverse)
- Realistic dollar amounts
- Common situations (single, married, divorced, caregiving)
- Different life stages (20s, 40s, 60s)
- Various income levels

### 4. Tips

Actionable, specific advice:
- ✅ "Check your credit report at annualcreditreport.com every 4 months"
- ❌ "Monitor your credit regularly"

### 5. Key Takeaways (5-7 points)

Summary bullets that could stand alone:
- Main concepts
- Important numbers/rules
- Action steps
- Critical warnings

### 6. Action Items (3-5 tasks)

Things they can do THIS WEEK:
- Specific, achievable tasks
- 15-30 minutes each
- Build on lesson content
- Create momentum

### 7. Resources

Link to helpful tools:
- Worksheets/templates
- Online calculators
- Government resources
- Vetted articles
- Community resources (especially MA)

## 🎯 Course-Specific Guidelines

### Beginner Courses
- Define every term
- Shorter lessons (20-30 min)
- More examples, less theory
- Focus on immediate actions
- Build confidence

### Intermediate Courses
- Build on basics
- Introduce complexity gradually
- Real-world trade-offs
- Decision-making frameworks
- Longer lessons okay (30-45 min)

### Advanced Courses
- Assume foundation knowledge
- Deeper analysis
- Multiple scenarios
- Professional-level detail
- Strategic thinking

### Women-Specific Courses
- Address unique challenges directly
- Provide emotional support
- Include legal/safety information
- Resource lists (hotlines, services)
- Empowerment focus

## 🔄 Content Creation Workflow

### Step 1: Research (30-60 min)
- Review curriculum markdown files
- Find authoritative sources
- Collect examples and statistics
- Note common questions/concerns

### Step 2: Outline (15-30 min)
- List 3-6 main sections
- Note key concepts per section
- Gather examples
- Plan action items

### Step 3: Write (2-3 hours)
- Introduction first
- One section at a time
- Add examples as you go
- Include tips inline
- Write takeaways last

### Step 4: Review (30 min)
- Check tone (warm? accessible?)
- Verify examples (realistic?)
- Test actions (achievable?)
- Add resources
- Proofread

### Step 5: Format (15 min)
- Convert to TypeScript object
- Check all required fields
- Verify structure matches template
- Add to appropriate course

## 📊 Quality Checklist

Before submitting a lesson, check:

**Content:**
- [ ] 3-5 clear learning objectives
- [ ] Engaging introduction
- [ ] 3-6 well-structured sections
- [ ] 2-3 examples per section
- [ ] Practical tips throughout
- [ ] 5-7 key takeaways
- [ ] 3-5 actionable items
- [ ] Relevant resources

**Tone:**
- [ ] Warm and welcoming
- [ ] Women-centered
- [ ] Judgment-free
- [ ] Encouraging
- [ ] Practical, not theoretical

**Quality:**
- [ ] No jargon without explanation
- [ ] Real women's names in examples
- [ ] Diverse scenarios (age, income, status)
- [ ] Specific numbers and details
- [ ] 20-45 minute reading time
- [ ] Actionable takeaways

## 💡 Tips for Faster Content Creation

### Batch Similar Content
- Write all beginner budgeting lessons together
- Research once, write multiple lessons
- Reuse example structures

### Use Templates
- Keep a list of common examples
- Bank of useful statistics
- Collection of relatable scenarios

### Start with Outlines
- Outline 5 lessons at once
- Fill in one per day
- Maintains flow and consistency

### Collaborate
- Have someone review for tone
- Get feedback on examples
- Test action items with real users

## 🎓 Lesson Types by Course

### Financial Literacy Basics
- What it is and why it matters
- How to do it (step by step)
- Common mistakes
- Getting started actions

### Intermediate Topics
- Deeper "how" and "why"
- Trade-offs and decisions
- When to use each approach
- Comparison frameworks

### Advanced Topics
- Strategic planning
- Long-term implications
- Professional-level detail
- Complex scenarios

### Women-Specific
- Unique challenges
- Safety and protection
- Empowerment focus
- Resource connections

## 📝 Example: Creating a New Lesson

Let's create "Creating Your First Budget":

**1. Research:**
- Common budgeting methods
- Typical household expenses
- Women's specific budgeting challenges
- Free budgeting tools

**2. Outline:**
- Section 1: Why budgets help (not restrict)
- Section 2: The 50/30/20 rule
- Section 3: Tracking expenses
- Section 4: Adjusting your budget
- Section 5: Common challenges

**3. Examples to include:**
- Single mom on tight budget
- Two-income household
- Recent divorcee rebuilding
- Young professional starting out

**4. Action items:**
- Track expenses for one week
- Calculate net income
- List all fixed expenses
- Try 50/30/20 split
- Set up budget check-in calendar

**5. Resources:**
- Mint.com budgeting tool
- YNAB (You Need A Budget)
- Budget worksheet template
- Expense tracking apps

**6. Write it!**
- 30-40 minutes estimated reading time
- Warm, encouraging tone
- Real numbers and scenarios
- Clear next steps

## 🚀 Priority Content Order

### Phase 1: Core Beginners (Start here)
1. Understanding Money & Banking ✅ (Done - use as template)
2. Creating Your First Budget
3. Tracking Income & Expenses
4. Building Emergency Funds
5. Understanding Credit Scores

### Phase 2: Essential Intermediate
1. Debt Payoff Strategies
2. Investing Basics
3. Retirement Account Types
4. Insurance Fundamentals
5. Tax Planning Basics

### Phase 3: Women-Specific Priorities
1. Financial Abuse Recognition
2. Divorce Financial Preparation
3. Single Women's Financial Planning
4. Career Salary Negotiation
5. Money and Mental Health

### Phase 4: Advanced & Specialized
- Continue with remaining courses
- Focus on demand/user feedback
- Build out FINRA 40-hour modules

## 📞 Questions?

If you're unsure about:
- Tone → Read the sample lesson aloud
- Structure → Copy the template exactly
- Examples → Think "Would this help my friend?"
- Length → Aim for 20-40 minutes reading

**Remember:** Done is better than perfect. You can always update and improve lessons based on user feedback.

---

**Your goal:** Create content that empowers women to take control of their financial lives, one lesson at a time.
