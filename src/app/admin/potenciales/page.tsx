import { redirect } from 'next/navigation'
import { getAuthFromCookie } from '@/lib/auth'
import Link from 'next/link'
import { PotencialesClientesList } from '@/components/PotencialesClientesList'

export default async function AdminPotencialesPage() {
  const auth = await getAuthFromCookie()
  if (!auth) redirect('/admin/login')

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="font-serif text-2xl font-bold text-berry mb-2">
        Potenciales clientes
      </h1>
      <p className="text-charcoal-light mb-8">
        Solicitudes de reserva recibidas. Da follow-up desde aquí.
      </p>

      <PotencialesClientesList />

      <p className="mt-8">
        <Link href="/admin" className="text-berry hover:underline">
          ← Volver al panel
        </Link>
      </p>
    </div>
  )
}
