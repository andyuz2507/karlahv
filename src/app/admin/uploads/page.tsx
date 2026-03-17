import { redirect } from 'next/navigation'
import { getAuthFromCookie } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function AdminUploadsPage() {
  const auth = await getAuthFromCookie()
  if (!auth) redirect('/admin/login')

  const files = await prisma.file.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="text-berry hover:underline">
          ← Volver
        </Link>
        <h1 className="font-serif text-2xl font-bold text-charcoal">
          Archivos subidos
        </h1>
      </div>

      <div className="bg-white rounded-2xl border border-berry/10 p-8 shadow-soft">
        <p className="text-charcoal-light mb-6">
          Los archivos se suben desde los editores de cada sección (por ejemplo, Recursos).
          Aquí puedes ver el historial de archivos subidos.
        </p>
        {files.length === 0 ? (
          <p className="text-charcoal-light">No hay archivos subidos aún.</p>
        ) : (
          <ul className="space-y-3">
            {files.map((f) => (
              <li
                key={f.id}
                className="flex items-center justify-between p-4 rounded-xl bg-cream-light"
              >
                <div>
                  <p className="font-medium text-charcoal">{f.filename}</p>
                  <p className="text-sm text-charcoal-light">{f.url}</p>
                </div>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-berry font-medium hover:underline"
                >
                  Ver
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
