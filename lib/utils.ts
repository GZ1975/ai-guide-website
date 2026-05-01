import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { UnitLevel, UserProgress } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLevelTitle(xp: number): string {
  if (xp < 100) return 'מתחיל'
  if (xp < 300) return 'לומד'
  if (xp < 600) return 'מתקדם'
  if (xp < 1000) return 'מצטיין'
  if (xp < 1500) return 'מומחה'
  return 'אלוף'
}

export function getLevelNumber(xp: number): number {
  return Math.floor(xp / 100) + 1
}

export function getXPForNextLevel(xp: number): number {
  const currentLevel = getLevelNumber(xp)
  return currentLevel * 100
}

export function getProgressToNextLevel(xp: number): number {
  const levelBase = (getLevelNumber(xp) - 1) * 100
  const levelXp = xp - levelBase
  return Math.min((levelXp / 100) * 100, 100)
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} דקות`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h} שעות ו-${m} דקות` : `${h} שעות`
}

export function getUnitLabel(unit: UnitLevel): string {
  return `${unit} יחידות`
}

export function getDifficultyLabel(d: 1 | 2 | 3): string {
  return d === 1 ? 'קל' : d === 2 ? 'בינוני' : 'קשה'
}

export function getDifficultyColor(d: 1 | 2 | 3): string {
  return d === 1 ? 'text-emerald-500' : d === 2 ? 'text-gold-500' : 'text-red-500'
}

export function calculateStreak(lastStudyDate: string | null): boolean {
  if (!lastStudyDate) return false
  const last = new Date(lastStudyDate)
  const today = new Date()
  const diff = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24))
  return diff <= 1
}

export function getTopicProgress(
  progress: UserProgress,
  topicId: string
): number {
  const tp = progress.topicsProgress[topicId]
  if (!tp) return 0
  let score = 0
  if (tp.videoWatched) score += 33
  if (tp.quizCompleted) score += 34
  if (tp.completed) score += 33
  return Math.min(score, 100)
}
