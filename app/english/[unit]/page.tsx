import { redirect } from 'next/navigation'

export default function EnglishUnitPage({ params }: { params: { unit: string } }) {
  redirect(`/english`)
}
