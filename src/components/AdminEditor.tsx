'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SiteEditor } from './admin/SiteEditor'
import { AboutEditor } from './admin/AboutEditor'
import { ServiciosEditor } from './admin/ServiciosEditor'
import { RecursosEditor } from './admin/RecursosEditor'
import { CursosEditor } from './admin/CursosEditor'
import { AgendaEditor } from './admin/AgendaEditor'
import { ContactoEditor } from './admin/ContactoEditor'

const LABELS: Record<string, string> = {
  site: 'Sitio general',
  about: 'Sobre mí',
  servicios: 'Servicios',
  recursos: 'Recursos',
  cursos: 'Cursos y talleres',
  agenda: 'Agenda',
  contacto: 'Contacto',
}

export function AdminEditor({
  keyName,
  initialValue,
}: {
  keyName: string
  initialValue: unknown
}) {
  const [saved, setSaved] = useState(false)

  const handleSave = async (value: unknown) => {
    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: keyName, value }),
    })
    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } else {
      const data = await res.json()
      alert(data.error || 'Error al guardar')
    }
  }

  const editors: Record<string, React.ReactNode> = {
    site: <SiteEditor initialValue={initialValue} onSave={handleSave} />,
    about: <AboutEditor initialValue={initialValue} onSave={handleSave} />,
    servicios: <ServiciosEditor initialValue={initialValue} onSave={handleSave} />,
    recursos: <RecursosEditor initialValue={initialValue} onSave={handleSave} />,
    cursos: <CursosEditor initialValue={initialValue} onSave={handleSave} />,
    agenda: <AgendaEditor initialValue={initialValue} onSave={handleSave} />,
    contacto: <ContactoEditor initialValue={initialValue} onSave={handleSave} />,
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="text-berry hover:underline">
          ← Volver
        </Link>
        <h1 className="font-serif text-2xl font-bold text-charcoal">
          {LABELS[keyName] || keyName}
        </h1>
        {saved && (
          <span className="text-green-600 text-sm font-medium">Guardado</span>
        )}
      </div>

      {editors[keyName] || (
        <p className="text-charcoal-light">Editor no disponible</p>
      )}
    </div>
  )
}
