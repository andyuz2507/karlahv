'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type RecursoItem = string | { titulo: string; url?: string }
type Recursos = {
  categorias: Array<{
    titulo: string
    descripcion: string
    icono: string
    items: RecursoItem[]
  }>
}

type Curso = {
  id: string
  titulo: string
  descripcion: string
  fecha: string
  modalidad: string
  duracion: string
  ubicacion: string
  linkLuma: string
}

function isRecursoObj(item: RecursoItem): item is { titulo: string; url?: string } {
  return typeof item === 'object' && item !== null && 'titulo' in item
}

const COLLAGE_COLORS = [
  'from-berry/40 to-dusty-rose/30',
  'from-peach/50 to-cream',
  'from-dusty-rose/50 to-berry/20',
  'from-berry/30 to-peach/30',
  'from-cream to-dusty-rose/40',
  'from-dusty-rose/40 to-cream',
]

export function RecursosYCursosClient({
  recursos,
  cursos,
}: {
  recursos: Recursos
  cursos: Curso[]
}) {
  const [modal, setModal] = useState<'recursos' | 'cursos' | null>(null)

  useEffect(() => {
    if (modal) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [modal])

  const allRecursos = [
    ...(recursos?.categorias?.[0]?.items ?? []),
    ...(recursos?.categorias?.[1]?.items ?? []),
  ]

  return (
    <>
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 gap-2 p-4 opacity-85">
          {[...COLLAGE_COLORS, ...COLLAGE_COLORS].map((c, i) => (
            <div key={i} className={`bg-gradient-to-br ${c} rounded-lg min-h-[80px]`} />
          ))}
        </div>
        <div className="absolute inset-0 bg-charcoal/30" />
        <div className="relative z-10 text-center px-6 py-16">
          <p className="text-dusty-rose font-medium mb-4 tracking-[0.2em] uppercase text-xs">
            Para llevar a casa
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Recursos y cursos
          </h1>
          <p className="text-cream-light/90 max-w-xl mx-auto">
            Haz clic en cada columna para explorar
          </p>
        </div>
      </section>

      <section className="min-h-[60vh] flex flex-col md:flex-row">
        <button
          onClick={() => setModal('recursos')}
          className="flex-1 min-h-[50vh] md:min-h-[70vh] flex flex-col items-center justify-center p-12 bg-gradient-to-br from-berry to-berry-dark text-white hover:from-berry-dark hover:to-berry transition-all duration-300 group"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 group-hover:scale-105 transition-transform">
            Recursos
          </h2>
          <p className="text-cream-light/90 text-center max-w-md mb-6">
            Guías descargables, lecturas y recomendaciones
          </p>
          <span className="px-6 py-3 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
            Ver y descargar →
          </span>
        </button>

        <button
          onClick={() => setModal('cursos')}
          className="flex-1 min-h-[50vh] md:min-h-[70vh] flex flex-col items-center justify-center p-12 bg-gradient-to-br from-dusty-rose to-peach/80 text-charcoal hover:from-dusty-rose-light hover:to-peach transition-all duration-300 group"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 group-hover:scale-105 transition-transform text-berry">
            Cursos
          </h2>
          <p className="text-charcoal-light text-center max-w-md mb-6">
            Talleres y formaciones. Inscripciones en Luma
          </p>
          <span className="px-6 py-3 rounded-full bg-berry/20 text-berry font-semibold group-hover:bg-berry/30 transition-colors">
            Ver cursos →
          </span>
        </button>
      </section>

      {modal === 'recursos' && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/80 backdrop-blur-sm p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-cream rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModal(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-berry text-white flex items-center justify-center hover:bg-berry-dark"
            >
              ×
            </button>
            <div className="p-8 border-b border-berry/10">
              <h3 className="font-serif text-2xl font-bold text-charcoal">Recursos</h3>
              <p className="text-charcoal-light mt-1">Guías y lecturas para descargar</p>
            </div>
            <div className="p-8 overflow-y-auto max-h-[60vh]">
              <div className="space-y-4">
                {allRecursos.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-xl bg-white border border-berry/5 hover:border-dusty-rose/30 transition-colors"
                  >
                    <span className="font-medium text-charcoal">
                      {isRecursoObj(item) ? item.titulo : item}
                    </span>
                    {isRecursoObj(item) && item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-berry text-white text-sm font-medium hover:bg-berry-dark"
                      >
                        Descargar
                      </a>
                    ) : (
                      <button className="px-4 py-2 rounded-full bg-berry text-white text-sm font-medium hover:bg-berry-dark">
                        Descargar
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-berry/10 bg-cream-light/50">
              <p className="text-sm text-charcoal-light">
                Disponible para pacientes actuales. ¿Eres paciente?{' '}
                <Link href="/contacto" className="text-berry hover:underline">
                  Contáctanos
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}

      {modal === 'cursos' && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/80 backdrop-blur-sm p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-cream rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModal(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-berry text-white flex items-center justify-center hover:bg-berry-dark"
            >
              ×
            </button>
            <div className="p-8 border-b border-berry/10">
              <h3 className="font-serif text-2xl font-bold text-charcoal">Cursos y talleres</h3>
              <p className="text-charcoal-light mt-1">Inscripciones a través de Luma</p>
            </div>
            <div className="p-8 overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                {(cursos || []).map((course) => (
                  <a
                    key={course.id}
                    href={course.linkLuma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 rounded-xl bg-white border border-berry/5 hover:border-dusty-rose/40 hover:shadow-soft-lg transition-all"
                  >
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 rounded-full bg-berry/10 text-berry text-xs">
                        {course.modalidad}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-cream text-charcoal-light text-xs">
                        {course.fecha}
                      </span>
                    </div>
                    <h4 className="font-serif text-xl font-bold text-charcoal mb-2">
                      {course.titulo}
                    </h4>
                    <p className="text-charcoal-light text-sm mb-4">{course.descripcion}</p>
                    <span className="inline-flex items-center gap-2 text-berry font-semibold">
                      Comprar en Luma →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="py-20 px-6 bg-cream">
        <div className="max-w-3xl mx-auto text-center">
          <Link href="/comunidad" className="text-berry font-semibold hover:underline">
            ¿Buscas conectar con otros papás? Visita la Comunidad →
          </Link>
        </div>
      </section>
    </>
  )
}
