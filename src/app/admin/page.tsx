import { redirect } from 'next/navigation'
import { getAuthFromCookie } from '@/lib/auth'
import Link from 'next/link'

const SECTIONS = [
  { key: 'site', label: 'Sitio general', desc: 'Nombre, email, teléfono, dominio' },
  { key: 'about', label: 'Sobre mí', desc: 'Biografía, formación, enfoques' },
  { key: 'servicios', label: 'Servicios', desc: 'Terapia niños, adolescentes, adultos' },
  { key: 'recursos', label: 'Recursos', desc: 'Guías, lecturas, comunidad' },
  { key: 'cursos', label: 'Cursos y talleres', desc: 'Enlaces Luma, cursos' },
  { key: 'agenda', label: 'Agenda', desc: 'Calendly, tipos de cita' },
  { key: 'contacto', label: 'Contacto', desc: 'Mensaje, horario' },
]

export default async function AdminPage() {
  const auth = await getAuthFromCookie()
  if (!auth) redirect('/admin/login')

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-serif text-2xl font-bold text-berry mb-2">
        Panel de administración
      </h1>
      <p className="text-charcoal-light mb-8">
        Selecciona una sección para editar el contenido del sitio
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {SECTIONS.map((s) => (
          <Link
            key={s.key}
            href={`/admin/${s.key}`}
            className="block p-6 rounded-2xl bg-white border border-berry/10 shadow-soft hover:shadow-soft-lg hover:border-dusty-rose/40 transition-all"
          >
            <h2 className="font-serif text-lg font-bold text-charcoal mb-1">
              {s.label}
            </h2>
            <p className="text-charcoal-light text-sm">{s.desc}</p>
          </Link>
        ))}
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
