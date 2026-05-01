import { NextRequest, NextResponse } from 'next/server'
import { generateLessonVideo } from '@/lib/kling-api'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { topic, subject, unit, language = 'he', durationSeconds = 180 } = body

    if (!topic || !subject || !unit) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const result = await generateLessonVideo({
      topic,
      subject,
      unit: Number(unit) as 3 | 4 | 5,
      language,
      durationSeconds,
    })

    return NextResponse.json(result)
  } catch (err) {
    console.error('Video generation error:', err)
    return NextResponse.json(
      { error: 'Internal server error', fallbackUrl: 'https://www.youtube.com/embed/NybHckSEQBI' },
      { status: 500 }
    )
  }
}
