import { getSiteData } from '@/lib/get-site-data'
import { RecursosYCursosClient } from '@/components/RecursosYCursosClient'
import { requirePageActive } from '@/lib/page-visibility'

export default async function RecursosYCursosPage() {
  await requirePageActive('recursosCursos')
  const { recursos, cursos } = await getSiteData()
  return <RecursosYCursosClient recursos={recursos} cursos={cursos} />
}
