'use client'

import { useState, useEffect } from 'react'
import { FormField } from './FormField'
import { FileUploader } from './FileUploader'

type Site = {
  imagenPrincipal?: string
  name?: string
  title?: string
  tagline?: string
  domain?: string
  email?: string
  phone?: string
  address?: string
  consultaDuracion?: string
  consultaModalidad?: string
}

export function SiteEditor({
  initialValue,
  onSave,
}: {
  initialValue: unknown
  onSave: (v: Site) => Promise<void>
}) {
  const [data, setData] = useState<Site>({
    imagenPrincipal: '',
    name: '',
    title: '',
    tagline: '',
    domain: '',
    email: '',
    phone: '',
    address: '',
    consultaDuracion: '',
    consultaModalidad: '',
  })

  useEffect(() => {
    if (initialValue && typeof initialValue === 'object') {
      setData((prev) => ({ ...prev, ...(initialValue as Site) }))
    }
  }, [initialValue])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSave(data)
      }}
      className="bg-white rounded-2xl border border-berry/10 p-8 shadow-soft"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-charcoal mb-2">
          Imagen principal (página inicial)
        </label>
        <div className="flex gap-2 items-center flex-wrap">
          <input
            value={data.imagenPrincipal || ''}
            onChange={(e) => setData({ ...data, imagenPrincipal: e.target.value })}
            placeholder="/images/karla.png"
            className="flex-1 min-w-[200px] px-4 py-3 rounded-xl border border-berry/20"
          />
          <FileUploader
            accept="image/*"
            onUploaded={(url) => setData({ ...data, imagenPrincipal: url })}
          />
        </div>
        {data.imagenPrincipal && (
          <img src={data.imagenPrincipal} alt="Vista previa" className="mt-2 w-24 h-24 object-cover rounded-lg" />
        )}
      </div>
      <FormField
        label="Nombre completo"
        name="name"
        value={data.name || ''}
        onChange={(v) => setData({ ...data, name: v })}
      />
      <FormField
        label="Título profesional"
        name="title"
        value={data.title || ''}
        onChange={(v) => setData({ ...data, title: v })}
      />
      <FormField
        label="Tagline"
        name="tagline"
        value={data.tagline || ''}
        onChange={(v) => setData({ ...data, tagline: v })}
      />
      <FormField
        label="Dominio"
        name="domain"
        value={data.domain || ''}
        onChange={(v) => setData({ ...data, domain: v })}
      />
      <FormField
        label="Email de contacto"
        name="email"
        type="email"
        value={data.email || ''}
        onChange={(v) => setData({ ...data, email: v })}
      />
      <FormField
        label="Teléfono"
        name="phone"
        value={data.phone || ''}
        onChange={(v) => setData({ ...data, phone: v })}
      />
      <FormField
        label="Dirección"
        name="address"
        value={data.address || ''}
        onChange={(v) => setData({ ...data, address: v })}
      />
      <FormField
        label="Duración consulta"
        name="consultaDuracion"
        value={data.consultaDuracion || ''}
        onChange={(v) => setData({ ...data, consultaDuracion: v })}
      />
      <FormField
        label="Modalidad consulta"
        name="consultaModalidad"
        value={data.consultaModalidad || ''}
        onChange={(v) => setData({ ...data, consultaModalidad: v })}
      />
      <button
        type="submit"
        className="mt-6 px-8 py-3 rounded-xl bg-berry text-white font-semibold hover:bg-berry-dark"
      >
        Guardar cambios
      </button>
    </form>
  )
}
