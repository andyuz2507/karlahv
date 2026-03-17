import { redirect } from 'next/navigation'
import { getAuthFromCookie } from '@/lib/auth'
import { getSiteData } from '@/lib/get-site-data'
import { PageVisibilityEditor } from '@/components/PageVisibilityEditor'

export default async function AdminPagesPage() {
  const auth = await getAuthFromCookie()
  if (!auth) redirect('/admin/login')

  const { pageVisibility } = await getSiteData()

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-serif text-2xl font-bold text-berry mb-2">
        Visibilidad de páginas
      </h1>
      <p className="text-charcoal-light mb-8">
        Activa o desactiva cada página. Las inactivas no se muestran en el menú ni son accesibles públicamente.
      </p>

      <PageVisibilityEditor initialVisibility={pageVisibility} />
    </div>
  )
}
