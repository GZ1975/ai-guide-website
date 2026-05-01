import { redirect } from 'next/navigation'

export default function MathUnitPage({ params }: { params: { unit: string } }) {
  redirect(`/math`)
}
