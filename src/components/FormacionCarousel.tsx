'use client'

import { useState } from 'react'

type FormacionItem = {
  titulo: string
  institucion: string
  detalle: string
}

export function FormacionCarousel({ items }: { items: FormacionItem[] }) {
  const [index, setIndex] = useState(0)
  const current = items[index]

  return (
    <div className="relative">
      {/* Contenido de la "página" actual */}
      <div className="min-h-[180px] p-8 rounded-2xl bg-white border border-berry/10 shadow-soft">
        <h4 className="font-serif text-xl font-bold text-berry mb-2">{current.titulo}</h4>
        <p className="text-charcoal font-medium mb-2">{current.institucion}</p>
        <p className="text-charcoal-light leading-relaxed">{current.detalle}</p>
      </div>

      {/* Navegación: flechas y puntos */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setIndex((i) => (i === 0 ? items.length - 1 : i - 1))}
          className="w-12 h-12 rounded-full bg-berry/10 text-berry flex items-center justify-center hover:bg-berry/20 transition-colors"
          aria-label="Anterior"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === index ? 'bg-berry' : 'bg-berry/30 hover:bg-berry/50'
              }`}
              aria-label={`Ir a formación ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setIndex((i) => (i === items.length - 1 ? 0 : i + 1))}
          className="w-12 h-12 rounded-full bg-berry/10 text-berry flex items-center justify-center hover:bg-berry/20 transition-colors"
          aria-label="Siguiente"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <p className="text-center text-sm text-charcoal-light mt-4">
        {index + 1} de {items.length}
      </p>
    </div>
  )
}
