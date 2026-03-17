'use client'

import Link from 'next/link'

type PageKey = 'home' | 'sobreMi' | 'servicios' | 'recursosCursos' | 'cursos' | 'agenda' | 'contacto'

type Props = {
  sectionKey: string
  label: string
  desc: string
  visibilityKey: PageKey
  isVisible: boolean
  onToggle: (key: PageKey, value: boolean) => void
}

export function AdminSectionCard({ sectionKey, label, desc, visibilityKey, isVisible, onToggle }: Props) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-berry/10 shadow-soft hover:shadow-soft-lg hover:border-dusty-rose/40 transition-all overflow-hidden">
      <div className="flex items-center gap-3 mb-1">
        <h2 className="font-serif text-lg font-bold text-charcoal">{label}</h2>
        <button
          type="button"
          onClick={() => onToggle(visibilityKey, !isVisible)}
          className={`
            relative w-11 h-6 rounded-full transition-colors flex-shrink-0
            ${isVisible ? 'bg-berry' : 'bg-charcoal/20'}
          `}
          title={isVisible ? 'Visible - clic para ocultar' : 'Oculta - clic para mostrar'}
        >
          <span
            className={`
              absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform
              ${isVisible ? 'left-5' : 'left-0.5'}
            `}
          />
        </button>
      </div>
      <Link href={`/admin/${sectionKey}`} className="block group">
        <p className="text-charcoal-light text-sm group-hover:text-berry transition-colors">{desc}</p>
      </Link>
    </div>
  )
}
