import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

function generateObjectives(title: string, description: string): string[] {
  // Generate 3-4 specific, actionable learning objectives based on the lesson title
  const objectives = []
  
  // Extract key topics from title
  const titleLower = title.toLowerCase()
  
  if (titleLower.includes('budget')) {
    objectives.push(
      'Learn how to create a realistic monthly budget that works for your income and expenses',
      'Understand the difference between needs and wants in your spending',
      'Discover practical tools and techniques to track your money'
    )
  } else if (titleLower.includes('savings') || titleLower.includes('saving')) {
    objectives.push(
      'Understand why building savings is essential for financial security',
      'Learn different saving strategies that fit your lifestyle',
      'Set realistic savings goals and create a plan to achieve them'
    )
  } else if (titleLower.includes('credit') || titleLower.includes('debt')) {
    objectives.push(
      'Understand how credit works and why it matters',
      'Learn strategies to build and improve your credit score',
      'Discover methods to manage and reduce debt effectively'
    )
  } else if (titleLower.includes('invest')) {
    objectives.push(
      'Understand the basics of investing and why it is important for building wealth',
      'Learn about different investment options available to you',
      'Discover how to start investing even with a small amount of money'
    )
  } else if (titleLower.includes('insurance')) {
    objectives.push(
      'Understand the different types of insurance and what they protect',
      'Learn how to choose the right insurance coverage for your needs',
      'Discover ways to save money on insurance without sacrificing protection'
    )
  } else if (titleLower.includes('retirement')) {
    objectives.push(
      'Understand why planning for retirement is crucial even when you are young',
      'Learn about different retirement account options like 401(k) and IRA',
      'Discover strategies to maximize your retirement savings'
    )
  } else if (titleLower.includes('tax')) {
    objectives.push(
      'Understand the basics of how taxes work',
      'Learn about common deductions and credits that can reduce your tax bill',
      'Discover strategies for tax-efficient financial planning'
    )
  } else if (titleLower.includes('money') || titleLower.includes('financial')) {
    objectives.push(
      'Understand fundamental financial concepts that impact your daily life',
      'Learn practical skills to improve your money management',
      'Discover resources and tools to support your financial journey'
    )
  } else if (titleLower.includes('career') || titleLower.includes('income')) {
    objectives.push(
      'Learn strategies to increase your earning potential',
      'Understand how to negotiate salary and benefits effectively',
      'Discover ways to create additional income streams'
    )
  } else if (titleLower.includes('home') || titleLower.includes('housing')) {
    objectives.push(
      'Understand the financial implications of renting vs. buying',
      'Learn how to prepare financially for home ownership',
      'Discover strategies to save for a down payment'
    )
  } else {
    // Generic objectives based on description or title
    objectives.push(
      `Master the key concepts of ${title.toLowerCase()}`,
      'Apply practical strategies to your own financial situation',
      'Build confidence in managing this aspect of your finances'
    )
  }
  
  return objectives.slice(0, 4) // Return up to 4 objectives
}

async function addObjectivesToAllLessons() {
  console.log('🎯 Adding learning objectives to all lessons...\n')
  
  // Get all lessons
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, title, description, objectives')
    .order('id')
  
  if (error) {
    console.error('❌ Error fetching lessons:', error)
    return
  }
  
  console.log(`Found ${lessons.length} lessons\n`)
  
  let updated = 0
  let skipped = 0
  let failed = 0
  
  for (const lesson of lessons) {
    // Check if objectives already exist and are non-null
    if (lesson.objectives && Array.isArray(lesson.objectives) && lesson.objectives.length > 0) {
      console.log(`⏭️  ${lesson.title} - already has objectives, skipping`)
      skipped++
      continue
    }
    
    // Generate objectives
    const objectives = generateObjectives(lesson.title, lesson.description || '')
    
    // Update the lesson
    const { error: updateError } = await supabase
      .from('lessons')
      .update({ objectives })
      .eq('id', lesson.id)
    
    if (updateError) {
      console.error(`❌ ${lesson.title} - FAILED:`, updateError.message)
      failed++
    } else {
      console.log(`✅ ${lesson.title} - added ${objectives.length} objectives`)
      updated++
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 50))
  }
  
  console.log('\n' + '='.repeat(60))
  console.log('📊 Summary:')
  console.log(`   ✅ Updated: ${updated}`)
  console.log(`   ⏭️  Skipped: ${skipped}`)
  console.log(`   ❌ Failed: ${failed}`)
  console.log('='.repeat(60))
}

addObjectivesToAllLessons()
