import { redirect } from 'next/navigation'
import { getAuthFromCookie } from '@/lib/auth'
import Link from 'next/link'
import { AgendaDisponibilidadEditor } from '@/components/AgendaDisponibilidadEditor'

export default async function AdminAgendaDisponibilidadPage() {
  const auth = await getAuthFromCookie()
  if (!auth) redirect('/admin/login')

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-serif text-2xl font-bold text-berry mb-2">
        Agenda y espacios disponibles
      </h1>
      <p className="text-charcoal-light mb-8">
        Marca en verde los espacios que tienes disponibles. Los pacientes podrán seleccionar y solicitar reserva.
      </p>

      <AgendaDisponibilidadEditor />

      <p className="mt-8">
        <Link href="/admin" className="text-berry hover:underline">
          ← Volver al panel
        </Link>
      </p>
    </div>
  )
}
