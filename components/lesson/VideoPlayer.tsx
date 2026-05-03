'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { Topic } from '@/types'
import { useProgressStore } from '@/lib/store'
import { Play, Loader2, Video, ExternalLink } from 'lucide-react'

interface VideoPlayerProps {
  topic: Topic
}

const FALLBACK_VIDEOS: Record<string, string> = {
  'math-3': 'https://www.youtube.com/embed/NybHckSEQBI',
  'math-4': 'https://www.youtube.com/embed/WUvTyaaNkzM',
  'math-5': 'https://www.youtube.com/embed/HfACrKJ_Y2w',
  'english-3': 'https://www.youtube.com/embed/OPIwCXs3BE4',
  'english-4': 'https://www.youtube.com/embed/Dd5dFoJSodg',
  'english-5': 'https://www.youtube.com/embed/OPIwCXs3BE4',
}

export default function VideoPlayer({ topic }: VideoPlayerProps) {
  const { markVideoWatched, progress } = useProgressStore()
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [watched, setWatched] = useState(false)

  const fallbackKey = `${topic.subject}-${topic.unit}`
  const fallbackUrl = FALLBACK_VIDEOS[fallbackKey] ?? FALLBACK_VIDEOS['math-3']
  const alreadyWatched = progress.topicsProgress[topic.id]?.videoWatched

  useEffect(() => {
    setWatched(alreadyWatched ?? false)
  }, [alreadyWatched])

  async function handleGenerateVideo() {
    setLoading(true)
    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.title,
          subject: topic.subject,
          unit: topic.unit,
          language: 'he',
          durationSeconds: Math.min(topic.duration * 10, 300),
          videoPrompt: topic.videoPrompt,
        }),
      })
      const data = await res.json()
      setVideoUrl(data.videoUrl ?? data.fallbackUrl ?? fallbackUrl)
    } catch {
      setVideoUrl(fallbackUrl)
    } finally {
      setLoading(false)
      setPlaying(true)
    }
  }

  function handleWatchFallback() {
    setVideoUrl(fallbackUrl)
    setPlaying(true)
  }

  function handleVideoEnded() {
    if (!watched) {
      markVideoWatched(topic.id)
      setWatched(true)
    }
  }

  if (playing && videoUrl) {
    return (
      <div className="rounded-2xl overflow-hidden shadow-xl bg-black">
        <div className="relative" style={{ paddingTop: '56.25%' }}>
          <iframe
            src={videoUrl + '?autoplay=1'}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            onLoad={handleVideoEnded}
            title={topic.title}
          />
        </div>
        {!watched && (
          <div className="bg-navy-800 px-4 py-3 flex items-center justify-between">
            <span className="text-slate-300 text-sm">צפה בסרטון עד הסוף לקבלת XP</span>
            <button
              onClick={handleVideoEnded}
              className="text-gold-400 text-sm font-medium hover:text-gold-300 flex items-center gap-1"
            >
              סמן כנצפה ✓
            </button>
          </div>
        )}
        {watched && (
          <div className="bg-emerald-900/50 px-4 py-2 text-center">
            <span className="text-emerald-400 text-sm font-medium">✓ הסרטון נצפה – קיבלת 10 XP!</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-navy-800 to-navy-900
                 border border-navy-700 aspect-video flex flex-col items-center justify-center gap-6 p-8"
    >
      <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center">
        <Video className="w-8 h-8 text-gold-400" />
      </div>
      <div className="text-center">
        <h3 className="text-white font-bold text-xl mb-2">{topic.title}</h3>
        <p className="text-slate-400 text-sm max-w-sm">{topic.videoPrompt.split('.')[0]}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleGenerateVideo}
          disabled={loading}
          className="btn-primary flex items-center gap-2 text-navy-900"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> מפיק סרטון AI...</>
          ) : (
            <><Play className="w-4 h-4" /> הפק סרטון עם Kling AI</>
          )}
        </button>
        <button
          onClick={handleWatchFallback}
          className="btn-outline !border-slate-500 !text-slate-300 hover:!bg-slate-700 flex items-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          צפה בסרטון הסבר
        </button>
      </div>

      {watched && (
        <div className="text-emerald-400 text-sm font-medium flex items-center gap-1">
          ✓ הסרטון נצפה בעבר
        </div>
      )}
    </motion.div>
  )
}
