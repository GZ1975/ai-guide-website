export type Subject = 'math' | 'english'
export type UnitLevel = 3 | 4 | 5

export interface Topic {
  id: string
  title: string
  description: string
  unit: UnitLevel
  subject: Subject
  duration: number // minutes
  videoPrompt: string
  objectives: string[]
  prerequisites: string[]
}

export interface Curriculum {
  subject: Subject
  units: {
    level: UnitLevel
    title: string
    description: string
    topics: Topic[]
  }[]
}

export interface QuizQuestion {
  id: string
  subject: Subject
  unit: UnitLevel
  topicId: string
  type: 'multiple-choice' | 'short-answer' | 'fill-blank'
  question: string
  options?: string[]
  answer: string | number
  explanation: string
  difficulty: 1 | 2 | 3
  points: number
}

export interface QuizAttempt {
  questionId: string
  userAnswer: string | number
  correct: boolean
  timeSpent: number
}

export interface QuizResult {
  subject: Subject
  unit: UnitLevel
  topicId: string
  score: number
  maxScore: number
  percentage: number
  attempts: QuizAttempt[]
  completedAt: string
  xpEarned: number
}

export interface TopicProgress {
  topicId: string
  completed: boolean
  videoWatched: boolean
  quizCompleted: boolean
  bestScore: number
  attempts: number
  lastAttempt: string | null
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  xpRequired: number
  condition: string
  unlockedAt: string | null
}

export interface UserProgress {
  totalXP: number
  level: number
  streak: number
  lastStudyDate: string | null
  topicsProgress: Record<string, TopicProgress>
  quizResults: QuizResult[]
  achievements: string[]
  mathUnitsUnlocked: UnitLevel[]
  englishUnitsUnlocked: UnitLevel[]
}

export interface VideoGenerationRequest {
  topic: string
  subject: Subject
  unit: UnitLevel
  language: 'he' | 'en'
  durationSeconds: number
}

export interface VideoGenerationResponse {
  videoUrl: string | null
  taskId: string | null
  status: 'pending' | 'processing' | 'completed' | 'failed'
  fallbackUrl: string
}
