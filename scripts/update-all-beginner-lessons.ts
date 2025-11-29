/**
 * Update All Beginner Lessons Script
 * This will be updated with imports as lessons are created
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Financial Literacy Basics lessons
import { basicFinancialConcepts } from '../src/data/lessons/basic-financial-concepts'
import { financialGoalSetting } from '../src/data/lessons/financial-goal-setting'
import { buildingGoodFinancialHabits } from '../src/data/lessons/building-good-financial-habits'
import { understandingPaychecks } from '../src/data/lessons/understanding-paychecks'

// Budgeting Basics lessons
import { creatingYourFirstBudget, trackingIncomeExpenses } from '../src/data/lessons/budgeting-basics-1-2'
import { budgetCategoriesPriorities } from '../src/data/lessons/budgeting-basics-3'
import { budgetingToolsApps } from '../src/data/lessons/budgeting-basics-4'
import { handlingIrregularIncome } from '../src/data/lessons/budgeting-basics-5'

// Emergency Planning lessons
import { whyEmergencyFundsMatter } from '../src/data/lessons/emergency-planning-1'
import { howMuchToSave } from '../src/data/lessons/emergency-planning-2'
import { whereToKeepEmergencyFund } from '../src/data/lessons/emergency-planning-3'
import { buildingItSlowly } from '../src/data/lessons/emergency-planning-4'
import { whenToUseEmergencyFund } from '../src/data/lessons/emergency-planning-5'

// Credit Management lessons
import { whatIsCredit } from '../src/data/lessons/credit-management-1'
import { creditReportsScores } from '../src/data/lessons/credit-management-2'
import { howToBuildOrRebuildCredit, choosingTheRightCreditCard } from '../src/data/lessons/credit-management-3-4'
import { avoidingCommonCreditTraps, monitoringYourCredit } from '../src/data/lessons/credit-management-5-6'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const lessons = [
  // Financial Literacy Basics (4 lessons - sample lesson not included here)
  basicFinancialConcepts,
  financialGoalSetting,
  buildingGoodFinancialHabits,
  understandingPaychecks,
  // Budgeting Basics (5 lessons)
  creatingYourFirstBudget,
  trackingIncomeExpenses,
  budgetCategoriesPriorities,
  budgetingToolsApps,
  handlingIrregularIncome,
  // Emergency Planning (5 lessons)
  whyEmergencyFundsMatter,
  howMuchToSave,
  whereToKeepEmergencyFund,
  buildingItSlowly,
  whenToUseEmergencyFund,
  // Credit Management (6 lessons)
  whatIsCredit,
  creditReportsScores,
  howToBuildOrRebuildCredit,
  choosingTheRightCreditCard,
  avoidingCommonCreditTraps,
  monitoringYourCredit
]

async function updateAllLessons() {
  console.log(`📝 Updating ${lessons.length} beginner lessons...\n`)

  let successCount = 0
  let errorCount = 0

  for (const lesson of lessons) {
    const { data: curriculum } = await supabase
      .from('curricula')
      .select('id')
      .eq('slug', 'womens-financial-literacy')
      .single()

    if (!curriculum) continue

    const { data: course } = await supabase
      .from('courses')
      .select('id, title')
      .eq('curriculum_id', curriculum.id)
      .eq('slug', lesson.courseId)
      .single()

    if (!course) {
      console.log(`⚠️  Course ${lesson.courseId} not found for ${lesson.title}`)
      errorCount++
      continue
    }

    const { error } = await supabase
      .from('lessons')
      .update({
        content: lesson.content,
        objectives: lesson.objectives,
        description: lesson.description,
      })
      .eq('course_id', course.id)
      .eq('slug', lesson.slug)

    if (error) {
      console.error(`❌ ${lesson.title}: ${error.message}`)
      errorCount++
    } else {
      console.log(`✅ ${lesson.title}`)
      successCount++
    }
  }

  console.log(`\n📊 Results: ${successCount} updated, ${errorCount} errors\n`)
}

updateAllLessons()
