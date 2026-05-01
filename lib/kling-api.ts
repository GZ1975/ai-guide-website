import type { VideoGenerationRequest, VideoGenerationResponse } from '@/types'

const KLING_API_BASE = 'https://api.klingai.com/v1'

const FALLBACK_VIDEOS: Record<string, string> = {
  'math-3': 'https://www.youtube.com/embed/NybHckSEQBI',
  'math-4': 'https://www.youtube.com/embed/WUvTyaaNkzM',
  'math-5': 'https://www.youtube.com/embed/HfACrKJ_Y2w',
  'english-3': 'https://www.youtube.com/embed/OPIwCXs3BE4',
  'english-4': 'https://www.youtube.com/embed/Dd5dFoJSodg',
  'english-5': 'https://www.youtube.com/embed/OPIwCXs3BE4',
  default: 'https://www.youtube.com/embed/NybHckSEQBI',
}

function getFallbackVideo(subject: string, unit: number): string {
  const key = `${subject}-${unit}`
  return FALLBACK_VIDEOS[key] ?? FALLBACK_VIDEOS.default
}

export async function generateLessonVideo(
  req: VideoGenerationRequest
): Promise<VideoGenerationResponse> {
  const apiKey = process.env.KLING_API_KEY

  if (!apiKey) {
    return {
      videoUrl: null,
      taskId: null,
      status: 'failed',
      fallbackUrl: getFallbackVideo(req.subject, req.unit),
    }
  }

  const prompt = buildVideoPrompt(req)

  try {
    const response = await fetch(`${KLING_API_BASE}/videos/text2video`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'kling-v1',
        prompt,
        duration: req.durationSeconds,
        aspect_ratio: '16:9',
        mode: 'std',
      }),
    })

    if (!response.ok) {
      throw new Error(`Kling API error: ${response.status}`)
    }

    const data = await response.json()
    return {
      videoUrl: data.data?.video_url ?? null,
      taskId: data.data?.task_id ?? null,
      status: data.data?.task_status === 'succeed' ? 'completed' : 'processing',
      fallbackUrl: getFallbackVideo(req.subject, req.unit),
    }
  } catch {
    return {
      videoUrl: null,
      taskId: null,
      status: 'failed',
      fallbackUrl: getFallbackVideo(req.subject, req.unit),
    }
  }
}

export async function checkVideoStatus(taskId: string): Promise<VideoGenerationResponse> {
  const apiKey = process.env.KLING_API_KEY
  if (!apiKey) return { videoUrl: null, taskId, status: 'failed', fallbackUrl: FALLBACK_VIDEOS.default }

  try {
    const response = await fetch(`${KLING_API_BASE}/videos/text2video/${taskId}`, {
      headers: { 'Authorization': `Bearer ${apiKey}` },
    })
    const data = await response.json()
    const status = data.data?.task_status
    return {
      videoUrl: status === 'succeed' ? data.data.video_url : null,
      taskId,
      status: status === 'succeed' ? 'completed' : status === 'failed' ? 'failed' : 'processing',
      fallbackUrl: FALLBACK_VIDEOS.default,
    }
  } catch {
    return { videoUrl: null, taskId, status: 'failed', fallbackUrl: FALLBACK_VIDEOS.default }
  }
}

function buildVideoPrompt(req: VideoGenerationRequest): string {
  const lang = req.language === 'he' ? 'Hebrew' : 'English'
  return `Create a professional educational animation video for Israeli high school students.
Topic: ${req.topic}
Subject: ${req.subject === 'math' ? 'Mathematics' : 'English Language'}
Level: ${req.unit} units (Bagrut exam preparation)
Language: ${lang}
Style: Clear, engaging, academic. Use colorful diagrams, step-by-step explanations, and professional typography.
Duration: ${req.durationSeconds} seconds.
Include: animated diagrams, highlighted key concepts, examples with worked solutions.
Target audience: Israeli high school students preparing for the Bagrut matriculation exam.`
}
