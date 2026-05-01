'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProgress, QuizResult, TopicProgress } from '@/types'
import { getLevelNumber, calculateStreak } from '@/lib/utils'

interface ProgressStore {
  progress: UserProgress
  markVideoWatched: (topicId: string) => void
  recordQuizResult: (result: QuizResult) => void
  markTopicComplete: (topicId: string) => void
  addXP: (amount: number) => void
  updateStreak: () => void
  unlockAchievement: (id: string) => void
  resetProgress: () => void
}

const defaultProgress: UserProgress = {
  totalXP: 0,
  level: 1,
  streak: 0,
  lastStudyDate: null,
  topicsProgress: {},
  quizResults: [],
  achievements: [],
  mathUnitsUnlocked: [3],
  englishUnitsUnlocked: [3],
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: defaultProgress,

      markVideoWatched: (topicId) => {
        set((state) => {
          const existing = state.progress.topicsProgress[topicId] ?? {
            topicId,
            completed: false,
            videoWatched: false,
            quizCompleted: false,
            bestScore: 0,
            attempts: 0,
            lastAttempt: null,
          }
          const updated: TopicProgress = { ...existing, videoWatched: true }
          return {
            progress: {
              ...state.progress,
              topicsProgress: { ...state.progress.topicsProgress, [topicId]: updated },
            },
          }
        })
        get().addXP(10)
        get().updateStreak()
      },

      recordQuizResult: (result) => {
        set((state) => {
          const existing = state.progress.topicsProgress[result.topicId] ?? {
            topicId: result.topicId,
            completed: false,
            videoWatched: false,
            quizCompleted: false,
            bestScore: 0,
            attempts: 0,
            lastAttempt: null,
          }
          const newBest = Math.max(existing.bestScore, result.percentage)
          const updated: TopicProgress = {
            ...existing,
            quizCompleted: true,
            bestScore: newBest,
            attempts: existing.attempts + 1,
            lastAttempt: result.completedAt,
            completed: existing.videoWatched && result.percentage >= 60,
          }
          return {
            progress: {
              ...state.progress,
              topicsProgress: { ...state.progress.topicsProgress, [result.topicId]: updated },
              quizResults: [...state.progress.quizResults, result],
            },
          }
        })
        get().addXP(result.xpEarned)
        get().updateStreak()
      },

      markTopicComplete: (topicId) => {
        set((state) => {
          const existing = state.progress.topicsProgress[topicId] ?? {
            topicId,
            completed: false,
            videoWatched: false,
            quizCompleted: false,
            bestScore: 0,
            attempts: 0,
            lastAttempt: null,
          }
          return {
            progress: {
              ...state.progress,
              topicsProgress: {
                ...state.progress.topicsProgress,
                [topicId]: { ...existing, completed: true },
              },
            },
          }
        })
      },

      addXP: (amount) => {
        set((state) => {
          const newXP = state.progress.totalXP + amount
          return {
            progress: {
              ...state.progress,
              totalXP: newXP,
              level: getLevelNumber(newXP),
            },
          }
        })
      },

      updateStreak: () => {
        set((state) => {
          const today = new Date().toISOString().split('T')[0]
          const last = state.progress.lastStudyDate
          let streak = state.progress.streak

          if (!last) {
            streak = 1
          } else if (last === today) {
            // already updated today
          } else {
            const daysDiff = Math.floor(
              (new Date(today).getTime() - new Date(last).getTime()) / (1000 * 60 * 60 * 24)
            )
            streak = daysDiff === 1 ? streak + 1 : 1
          }

          return {
            progress: {
              ...state.progress,
              streak,
              lastStudyDate: today,
            },
          }
        })
      },

      unlockAchievement: (id) => {
        set((state) => {
          if (state.progress.achievements.includes(id)) return state
          return {
            progress: {
              ...state.progress,
              achievements: [
                ...state.progress.achievements,
                id,
              ],
            },
          }
        })
      },

      resetProgress: () => {
        set({ progress: defaultProgress })
      },
    }),
    {
      name: 'bagrut-prep-progress',
    }
  )
)
