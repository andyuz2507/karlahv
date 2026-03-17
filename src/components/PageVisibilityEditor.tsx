'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { PageVisibility } from '@/lib/get-site-data'

const PAGE_LABELS: Record<keyof PageVisibility, string> = {
  home: 'Inicio',
  sobreMi: 'Sobre mí',
  servicios: 'Servicios',
  recursosCursos: 'Recursos y cursos',
  comunidad: 'Comunidad',
  contacto: 'Contacto',
  agenda: 'Agenda',
  politicaPrivacidad: 'Política de privacidad',
  cursos: 'Cursos',
  recursos: 'Recursos',
}

export function PageVisibilityEditor({ initialVisibility }: { initialVisibility: PageVisibility }) {
  const [visibility, setVisibility] = useState(initialVisibility)
  const [saving, setSaving] = useState<string | null>(null)

  const toggle = async (key: keyof PageVisibility) => {
    const newValue = !visibility[key]
    setSaving(key)
    try {
      const updated = { ...visibility, [key]: newValue }
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'pageVisibility', value: updated }),
      })
      if (res.ok) {
        setVisibility(updated)
      }
    } finally {
      setSaving(null)
    }
  }

  return (
    <div className="space-y-3">
      {(Object.keys(PAGE_LABELS) as Array<keyof PageVisibility>).map((key) => (
        <div
          key={key}
          className="flex items-center justify-between p-4 rounded-xl bg-white border border-berry/10"
        >
          <span className="font-medium text-charcoal">{PAGE_LABELS[key]}</span>
          <button
            type="button"
            onClick={() => toggle(key)}
            disabled={!!saving}
            className={`
              relative w-12 h-7 rounded-full transition-colors
              ${visibility[key] ? 'bg-berry' : 'bg-charcoal/20'}
              ${saving === key ? 'opacity-70' : ''}
            `}
          >
            <span
              className={`
                absolute top-1 w-5 h-5 rounded-full bg-white shadow
                transition-transform
                ${visibility[key] ? 'left-6' : 'left-1'}
              `}
            />
          </button>
        </div>
      ))}

      <p className="mt-6 text-sm text-charcoal-light">
        <Link href="/admin" className="text-berry hover:underline">
          ← Volver al panel
        </Link>
      </p>
    </div>
  )
}
