import { redirect } from 'next/navigation'
import { requirePageActive } from '@/lib/page-visibility'

export default async function CursosPage() {
  await requirePageActive('cursos')
  redirect('/recursos-y-cursos')
}
