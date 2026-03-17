'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Recursos = {
  categorias: Array<{
    titulo: string
    descripcion: string
    icono: string
    items: Array<string | { titulo: string; url?: string }>
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

type CarouselType = 'guias' | 'lecturas' | 'comunidad' | 'cursos'

const COLLAGE_ITEMS = [
  { id: 'g1', type: 'guia', color: 'from-berry/40 to-dusty-rose/30', title: 'Emociones' },
  { id: 'g2', type: 'guia', color: 'from-peach/50 to-cream', title: 'Rutinas' },
  { id: 'e1', type: 'evento', color: 'from-dusty-rose/50 to-berry/20', title: 'Taller' },
  { id: 'g3', type: 'guia', color: 'from-berry/30 to-peach/30', title: 'Límites' },
  { id: 'e2', type: 'evento', color: 'from-cream to-dusty-rose/40', title: 'Curso' },
  { id: 'g4', type: 'guia', color: 'from-dusty-rose/40 to-cream', title: 'Comunicación' },
  { id: 'e3', type: 'evento', color: 'from-peach/40 to-berry/20', title: 'Adolescentes' },
]

export function RecursosCarousel({ recursos, cursos }: { recursos: Recursos; cursos: Curso[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCarousel, setActiveCarousel] = useState<CarouselType | null>(null)

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const openCarousel = (type: CarouselType) => {
    setActiveCarousel(type)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setActiveCarousel(null)
  }

  const getCarouselItems = (): Array<string | { titulo: string; descripcion?: string; linkLuma?: string }> => {
    if (activeCarousel === 'guias') return recursos?.categorias?.[0]?.items ?? []
    if (activeCarousel === 'lecturas') return recursos?.categorias?.[1]?.items ?? []
    if (activeCarousel === 'comunidad') return recursos?.categorias?.[2]?.items ?? []
    if (activeCarousel === 'cursos') return cursos ?? []
    return []
  }

  const getCarouselTitle = () => {
    if (activeCarousel === 'guias') return 'Guías DIY'
    if (activeCarousel === 'lecturas') return 'Lecturas y recomendaciones'
    if (activeCarousel === 'comunidad') return 'Comunidad de papás'
    if (activeCarousel === 'cursos') return 'Cursos y talleres'
    return ''
  }


  return (
    <>
      {/* Collage clickable - abre modal */}
      <section 
        className="relative min-h-[60vh] sm:min-h-[70vh] py-16 sm:py-20 md:py-24 px-4 sm:px-6 cursor-pointer overflow-hidden"
        onClick={() => openCarousel('guias')}
      >
        {/* Collage background - grid de imágenes/eventos */}
        <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-2 p-2 md:p-4 opacity-90">
          {COLLAGE_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`bg-gradient-to-br ${item.color} rounded-lg md:rounded-xl transition-transform hover:scale-105 hover:z-10 min-h-[80px]`}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] text-white text-center">
          <p className="text-dusty-rose font-medium mb-4 tracking-[0.2em] uppercase text-xs">
            Para llevar a casa
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
            Recursos y cursos
          </h2>
          <p className="text-cream-light/90 max-w-xl mb-8">
            Guías, talleres y formación. Haz clic para explorar.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={(e) => { e.stopPropagation(); openCarousel('guias') }}
              className="px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors text-sm"
            >
              Guías
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); openCarousel('lecturas') }}
              className="px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors text-sm"
            >
              Lecturas
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); openCarousel('cursos') }}
              className="px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors text-sm"
            >
              Cursos
            </button>
            <Link
              href="/comunidad"
              onClick={(e) => e.stopPropagation()}
              className="px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors text-sm"
            >
              Comunidad
            </Link>
          </div>
        </div>
      </section>

      {/* Modal Netflix-style */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] mx-2 sm:mx-4 bg-cream rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-berry text-white flex items-center justify-center hover:bg-berry-dark transition-colors"
            >
              ×
            </button>
            <div className="p-4 sm:p-6 md:p-8 pb-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                {getCarouselTitle()}
              </h3>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-8 px-4 sm:px-6 md:px-8 scroll-smooth [&::-webkit-scrollbar]:hidden">
              {getCarouselItems().map((item, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-56 md:w-64 h-72 md:h-80 rounded-xl overflow-hidden bg-white border border-berry/10 shadow-soft hover:shadow-soft-lg transition-all hover:scale-105 hover:-translate-y-1"
                >
                  <div className={`w-full h-32 md:h-40 bg-gradient-to-br ${
                    ['from-berry/30 to-dusty-rose/20', 'from-peach/40 to-cream', 'from-dusty-rose/30 to-berry/10'][i % 3]
                  }`} />
                  <div className="p-4">
                    <h4 className="font-serif font-semibold text-charcoal mb-2 line-clamp-2">
                      {typeof item === 'string' ? item : item.titulo}
                    </h4>
                    {typeof item === 'object' && 'descripcion' in item && item.descripcion && (
                      <p className="text-sm text-charcoal-light line-clamp-2">{item.descripcion}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 sm:px-6 md:px-8 pb-8">
              <Link
                href="/recursos-y-cursos"
                onClick={closeModal}
                className="text-berry font-semibold hover:underline"
              >
                Ver página completa →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
