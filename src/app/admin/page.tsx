import { redirect } from 'next/navigation'
import { getAuthFromCookie } from '@/lib/auth'
import Link from 'next/link'
import { getSiteData } from '@/lib/get-site-data'
import { AdminSectionsGrid } from '@/components/AdminSectionsGrid'

export default async function AdminPage() {
  const auth = await getAuthFromCookie()
  if (!auth) redirect('/admin/login')

  const { pageVisibility } = await getSiteData()

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-serif text-2xl font-bold text-berry mb-2">
        Panel de administración
      </h1>
      <p className="text-charcoal-light mb-8">
        Selecciona una sección para editar. El switch activa o oculta la página públicamente.
      </p>

      <AdminSectionsGrid initialVisibility={pageVisibility} />

      <p className="mt-6 text-sm text-charcoal-light">
        <Link href="/admin/pages" className="text-berry hover:underline">
          Comunidad, Política de privacidad y más →
        </Link>
      </p>

      <div className="mt-12 grid md:grid-cols-2 gap-4">
        <Link
          href="/admin/agenda-disponibilidad"
          className="block p-6 rounded-2xl bg-white border border-berry/10 shadow-soft hover:shadow-soft-lg hover:border-dusty-rose/40 transition-all"
        >
          <h3 className="font-serif text-lg font-bold text-charcoal mb-2">
            Agenda y espacios
          </h3>
          <p className="text-charcoal-light text-sm mb-2">
            Marca los espacios disponibles (semanal o quincenal).
          </p>
          <span className="text-berry font-medium text-sm">Gestionar agenda →</span>
        </Link>
        <Link
          href="/admin/potenciales"
          className="block p-6 rounded-2xl bg-white border border-berry/10 shadow-soft hover:shadow-soft-lg hover:border-dusty-rose/40 transition-all"
        >
          <h3 className="font-serif text-lg font-bold text-charcoal mb-2">
            Potenciales clientes
          </h3>
          <p className="text-charcoal-light text-sm mb-2">
            Solicitudes de reserva y follow-up.
          </p>
          <span className="text-berry font-medium text-sm">Ver solicitudes →</span>
        </Link>
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-white border border-berry/10">
        <h3 className="font-serif text-lg font-bold text-charcoal mb-2">
          Subir archivos
        </h3>
        <p className="text-charcoal-light text-sm mb-4">
          Imágenes y PDFs se pueden subir desde cada sección de edición.
        </p>
        <Link
          href="/admin/uploads"
          className="text-berry font-medium hover:underline"
        >
          Ver archivos subidos →
        </Link>
      </div>
    </div>
  )
}
