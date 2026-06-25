/**
 * Sync all beginner-course lesson content from src/data/lessons to Supabase.
 * Run: npx tsx scripts/sync-all-beginner-lessons.ts
 */
import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { basicFinancialConcepts } from '../src/data/lessons/basic-financial-concepts'
import { financialGoalSetting } from '../src/data/lessons/financial-goal-setting'
import { buildingGoodFinancialHabits } from '../src/data/lessons/building-good-financial-habits'
import { understandingPaychecks } from '../src/data/lessons/understanding-paychecks'
import { creatingYourFirstBudget, trackingIncomeExpenses } from '../src/data/lessons/budgeting-basics-1-2'
import { budgetCategoriesPriorities } from '../src/data/lessons/budgeting-basics-3'
import { budgetingToolsApps } from '../src/data/lessons/budgeting-basics-4'
import { handlingIrregularIncome } from '../src/data/lessons/budgeting-basics-5'
import { whyEmergencyFundsMatter } from '../src/data/lessons/emergency-planning-1'
import { howMuchToSave } from '../src/data/lessons/emergency-planning-2'
import { whereToKeepEmergencyFund } from '../src/data/lessons/emergency-planning-3'
import { buildingItSlowly } from '../src/data/lessons/emergency-planning-4'
import { whenToUseEmergencyFund } from '../src/data/lessons/emergency-planning-5'
import { whatIsCredit } from '../src/data/lessons/credit-management-1'
import { creditReportsScores } from '../src/data/lessons/credit-management-2'
import { howToBuildOrRebuildCredit, choosingTheRightCreditCard } from '../src/data/lessons/credit-management-3-4'
import { avoidingCommonCreditTraps, monitoringYourCredit } from '../src/data/lessons/credit-management-5-6'
import type { Lesson } from '../src/types/curriculum'

config({ path: '.env.local' })

const allLessons: Lesson[] = [
  basicFinancialConcepts,
  financialGoalSetting,
  buildingGoodFinancialHabits,
  understandingPaychecks,
  creatingYourFirstBudget,
  trackingIncomeExpenses,
  budgetCategoriesPriorities,
  budgetingToolsApps,
  handlingIrregularIncome,
  whyEmergencyFundsMatter,
  howMuchToSave,
  whereToKeepEmergencyFund,
  buildingItSlowly,
  whenToUseEmergencyFund,
  whatIsCredit,
  creditReportsScores,
  howToBuildOrRebuildCredit,
  choosingTheRightCreditCard,
  avoidingCommonCreditTraps,
  monitoringYourCredit,
]

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, key)
  const { data: curriculum } = await supabase
    .from('curricula')
    .select('id')
    .eq('slug', 'womens-financial-literacy')
    .single()

  if (!curriculum) {
    console.error('Curriculum womens-financial-literacy not found')
    process.exit(1)
  }

  let ok = 0
  let fail = 0

  for (const lesson of allLessons) {
    const { data: course } = await supabase
      .from('courses')
      .select('id')
      .eq('curriculum_id', curriculum.id)
      .eq('slug', lesson.courseId)
      .single()

    if (!course) {
      console.warn(`Skip ${lesson.slug}: course ${lesson.courseId} not in DB`)
      fail++
      continue
    }

    const { error } = await supabase
      .from('lessons')
      .update({
        title: lesson.title,
        description: lesson.description,
        content: lesson.content,
        objectives: lesson.objectives,
        duration_minutes: lesson.durationMinutes,
        display_order: lesson.displayOrder,
      })
      .eq('course_id', course.id)
      .eq('slug', lesson.slug)

    if (error) {
      console.error(`✗ ${lesson.slug}:`, error.message)
      fail++
    } else {
      console.log(`✓ ${lesson.slug}`)
      ok++
    }
  }

  console.log(`\nDone: ${ok} updated, ${fail} skipped/failed`)
}

main()
