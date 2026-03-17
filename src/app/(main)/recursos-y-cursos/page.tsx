import { getSiteData } from '@/lib/get-site-data'
import { RecursosYCursosClient } from '@/components/RecursosYCursosClient'

export default async function RecursosYCursosPage() {
  const { recursos, cursos } = await getSiteData()
  return <RecursosYCursosClient recursos={recursos} cursos={cursos} />
}
