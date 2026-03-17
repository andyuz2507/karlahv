import { redirect } from 'next/navigation'
import { getAuthFromCookie } from '@/lib/auth'
import { getAllContent } from '@/lib/db'
import { AdminEditor } from '@/components/AdminEditor'

const VALID_KEYS = ['site', 'about', 'servicios', 'recursos', 'cursos', 'agenda', 'contacto']

export default async function AdminEditPage({
  params,
}: {
  params: Promise<{ key: string }>
}) {
  const auth = await getAuthFromCookie()
  if (!auth) redirect('/admin/login')

  const { key } = await params

  if (!VALID_KEYS.includes(key)) {
    redirect('/admin')
  }

  const content = await getAllContent()
  const value = content[key]

  return (
    <div className="max-w-4xl mx-auto">
      <AdminEditor keyName={key} initialValue={value} />
    </div>
  )
}
