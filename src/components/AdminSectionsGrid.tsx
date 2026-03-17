'use client'

import { useState } from 'react'
import { AdminSectionCard } from './AdminSectionCard'
import type { PageVisibility } from '@/lib/get-site-data'

const SECTIONS = [
  { key: 'site', label: 'Sitio general', desc: 'Nombre, email, teléfono, dominio', visibilityKey: 'home' as const },
  { key: 'about', label: 'Sobre mí', desc: 'Biografía, formación, enfoques', visibilityKey: 'sobreMi' as const },
  { key: 'servicios', label: 'Servicios', desc: 'Terapia niños, adolescentes, adultos', visibilityKey: 'servicios' as const },
  { key: 'recursos', label: 'Recursos', desc: 'Guías, lecturas, comunidad', visibilityKey: 'recursosCursos' as const },
  { key: 'cursos', label: 'Cursos y talleres', desc: 'Enlaces Luma, cursos', visibilityKey: 'cursos' as const },
  { key: 'agenda', label: 'Agenda', desc: 'Calendly, tipos de cita', visibilityKey: 'agenda' as const },
  { key: 'contacto', label: 'Contacto', desc: 'Mensaje, horario', visibilityKey: 'contacto' as const },
]

export function AdminSectionsGrid({ initialVisibility }: { initialVisibility: PageVisibility }) {
  const [visibility, setVisibility] = useState(initialVisibility)

  const handleToggle = async (key: keyof PageVisibility, value: boolean) => {
    const updated = { ...visibility, [key]: value }
    setVisibility(updated)
    try {
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'pageVisibility', value: updated }),
      })
    } catch {
      setVisibility(visibility)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {SECTIONS.map((s) => (
        <AdminSectionCard
          key={s.key}
          sectionKey={s.key}
          label={s.label}
          desc={s.desc}
          visibilityKey={s.visibilityKey}
          isVisible={visibility[s.visibilityKey]}
          onToggle={handleToggle}
        />
      ))}
    </div>
  )
}
