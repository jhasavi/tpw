// Type definitions for the curriculum structure

export interface Curriculum {
  id: string
  slug: string
  title: string
  description: string
  targetAudience: string
  estimatedHours: number
  isProfessionalTrack: boolean
  displayOrder: number
  courses: Course[]
}

export interface Course {
  id: string
  curriculumId: string
  slug: string
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'women-specific'
  estimatedHours: number
  displayOrder: number
  icon: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  courseId: string
  slug: string
  title: string
  description: string
  content: LessonContent
  objectives: string[]
  keyConcepts: string[]
  durationMinutes: number
  displayOrder: number
}

export interface LessonContent {
  introduction: string
  sections: ContentSection[]
  keyTakeaways: string[]
  actionItems?: string[]
  resources?: Resource[]
}

export interface ContentSection {
  title: string
  content: string
  examples?: string[]
  tips?: string[]
}

export interface Resource {
  title: string
  type: 'article' | 'tool' | 'worksheet' | 'calculator' | 'video'
  description: string
  url?: string
}

export interface QuizQuestion {
  id: string
  questionText: string
  questionType: 'multiple_choice' | 'true_false' | 'multi_select'
  options: QuizOption[]
  correctAnswer: string | string[]
  explanation: string
  difficultyLevel: 'easy' | 'medium' | 'hard'
  topics: string[]
}

export interface QuizOption {
  id: string
  text: string
  value: string
}

export interface SelfAssessment {
  id: string
  title: string
  description: string
  assessmentType: 'initial' | 'midpoint' | 'final' | 'confidence'
  questions: AssessmentQuestion[]
  scoringRubric: ScoringRubric
}

export interface AssessmentQuestion {
  id: string
  question: string
  type: 'rating' | 'multiple_choice' | 'text'
  options?: string[]
  category: string
}

export interface ScoringRubric {
  categories: string[]
  interpretation: {
    low: string
    medium: string
    high: string
  }
}
