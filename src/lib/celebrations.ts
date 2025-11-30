/**
 * Celebration Trigger Utilities
 * Queue celebrations for various achievements and milestones
 */

import { createClient } from '@/lib/supabase/client'

export type CelebrationType = 'achievement' | 'milestone' | 'streak' | 'completion'

interface CelebrationData {
  type: CelebrationType
  title: string
  message: string
  icon?: string
  reward?: string
}

/**
 * Queue a celebration event for the user
 */
export async function queueCelebration(userId: string, data: CelebrationData) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('celebration_events')
    .insert({
      user_id: userId,
      event_type: data.type,
      title: data.title,
      message: data.message,
      icon: data.icon,
      reward: data.reward,
      shown: false
    })
  
  if (error) {
    console.error('Failed to queue celebration:', error)
  }
}

/**
 * Trigger celebration when lesson is completed
 */
export async function celebrateLessonComplete(userId: string, lessonTitle: string, lessonNumber: number) {
  await queueCelebration(userId, {
    type: 'completion',
    title: 'Lesson Complete! 🎉',
    message: `You just finished "${lessonTitle}"! Keep up the great work!`,
    icon: '📚',
    reward: lessonNumber % 5 === 0 ? '+50 XP Bonus' : '+10 XP'
  })
}

/**
 * Trigger celebration when course is completed
 */
export async function celebrateCourseComplete(userId: string, courseTitle: string, totalLessons: number) {
  await queueCelebration(userId, {
    type: 'completion',
    title: 'Course Complete! 🏆',
    message: `Congratulations! You completed "${courseTitle}" (${totalLessons} lessons)`,
    icon: '🎓',
    reward: '+100 XP'
  })
}

/**
 * Trigger celebration when achievement is unlocked
 */
export async function celebrateAchievement(
  userId: string, 
  achievementTitle: string, 
  achievementIcon: string,
  points: number
) {
  await queueCelebration(userId, {
    type: 'achievement',
    title: 'Achievement Unlocked! 🏆',
    message: `You earned: ${achievementTitle}`,
    icon: achievementIcon,
    reward: `+${points} points`
  })
}

/**
 * Trigger celebration for learning streak milestone
 */
export async function celebrateStreak(userId: string, streakDays: number) {
  const milestones = [7, 14, 30, 60, 100, 365]
  
  if (milestones.includes(streakDays)) {
    await queueCelebration(userId, {
      type: 'streak',
      title: `${streakDays}-Day Streak! 🔥`,
      message: `You've learned for ${streakDays} consecutive days! Amazing dedication!`,
      icon: '🔥',
      reward: `+${streakDays} bonus XP`
    })
  }
}

/**
 * Trigger celebration for quiz high score
 */
export async function celebrateQuizScore(userId: string, score: number, quizTitle: string) {
  if (score === 100) {
    await queueCelebration(userId, {
      type: 'achievement',
      title: 'Perfect Score! 💯',
      message: `You aced the "${quizTitle}" quiz with 100%!`,
      icon: '💯',
      reward: '+25 bonus XP'
    })
  } else if (score >= 90) {
    await queueCelebration(userId, {
      type: 'milestone',
      title: 'Excellent Work! ⭐',
      message: `You scored ${score}% on "${quizTitle}"!`,
      icon: '⭐',
      reward: '+10 bonus XP'
    })
  }
}

/**
 * Trigger celebration for milestone achievements
 */
export async function celebrateMilestone(
  userId: string,
  milestoneType: string,
  count: number
) {
  const milestones = {
    lessons_10: { count: 10, title: '10 Lessons Complete!', icon: '📖' },
    lessons_25: { count: 25, title: '25 Lessons Complete!', icon: '📚' },
    lessons_50: { count: 50, title: '50 Lessons Complete!', icon: '🎓' },
    lessons_100: { count: 100, title: 'Century Club!', icon: '💯' },
    quizzes_10: { count: 10, title: 'Quiz Master!', icon: '🧠' },
    quizzes_25: { count: 25, title: 'Quiz Champion!', icon: '👑' },
    time_10h: { count: 10, title: '10 Hours of Learning!', icon: '⏰' },
    time_50h: { count: 50, title: '50 Hours of Learning!', icon: '🌟' }
  }
  
  const key = `${milestoneType}_${count}` as keyof typeof milestones
  const milestone = milestones[key]
  
  if (milestone) {
    await queueCelebration(userId, {
      type: 'milestone',
      title: milestone.title,
      message: `You've reached an impressive milestone!`,
      icon: milestone.icon,
      reward: `+${count * 5} XP`
    })
  }
}

/**
 * Check and trigger milestone celebrations based on progress
 */
export async function checkMilestones(userId: string) {
  const supabase = createClient()
  
  // Get user progress stats
  const { data: progress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
  
  if (!progress || progress.length === 0) return
  
  const completedCount = progress.filter(p => p.is_completed).length
  
  // Check lesson milestones
  if ([10, 25, 50, 100].includes(completedCount)) {
    await celebrateMilestone(userId, 'lessons', completedCount)
  }
}
