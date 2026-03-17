import { redirect } from 'next/navigation'
import { requirePageActive } from '@/lib/page-visibility'

export default async function RecursosPage() {
  await requirePageActive('recursos')
  redirect('/recursos-y-cursos')
}
