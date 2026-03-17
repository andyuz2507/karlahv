'use client'

import { useState, useEffect } from 'react'
import { FormField } from './FormField'
import { FileUploader } from './FileUploader'

type Servicio = {
  id: string
  imagen?: string
  titulo: string
  subtitulo: string
  descripcion: string
  puntos: string[]
}

export function ServiciosEditor({
  initialValue,
  onSave,
}: {
  initialValue: unknown
  onSave: (v: Servicio[]) => Promise<void>
}) {
  const [data, setData] = useState<Servicio[]>([])

  useEffect(() => {
    if (Array.isArray(initialValue)) {
      setData(initialValue as Servicio[])
    }
  }, [initialValue])

  const update = (i: number, field: keyof Servicio, val: string | string[]) => {
    const d = [...data]
    if (!d[i]) return
    d[i] = { ...d[i], [field]: val }
    setData(d)
  }

  const updatePunto = (si: number, pi: number, val: string) => {
    const d = [...data]
    if (!d[si]) return
    const p = [...(d[si].puntos || [])]
    p[pi] = val
    d[si] = { ...d[si], puntos: p }
    setData(d)
  }

  const addPunto = (si: number) => {
    const d = [...data]
    if (!d[si]) return
    d[si] = { ...d[si], puntos: [...(d[si].puntos || []), ''] }
    setData(d)
  }

  const removePunto = (si: number, pi: number) => {
    const d = [...data]
    if (!d[si]) return
    const p = [...(d[si].puntos || [])]
    p.splice(pi, 1)
    d[si] = { ...d[si], puntos: p }
    setData(d)
  }

  const addServicio = () => {
    setData([
      ...data,
      {
        id: `servicio-${Date.now()}`,
        imagen: '',
        titulo: '',
        subtitulo: '',
        descripcion: '',
        puntos: [],
      },
    ])
  }

  const removeServicio = (i: number) => {
    setData(data.filter((_, j) => j !== i))
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSave(data)
      }}
      className="bg-white rounded-2xl border border-berry/10 p-8 shadow-soft space-y-8"
    >
      {data.map((s, i) => (
        <div key={s.id} className="p-6 rounded-xl bg-cream-light border border-berry/5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-serif text-lg font-bold text-charcoal">
              Servicio {i + 1}
            </h3>
            <button
              type="button"
              onClick={() => removeServicio(i)}
              className="text-red-600 text-sm"
            >
              Eliminar
            </button>
          </div>
          <FormField
            label="ID (ej: ninos, adolescentes)"
            name={`servicio-${i}-id`}
            value={s.id}
            onChange={(v) => update(i, 'id', v)}
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-charcoal mb-2">
              Imagen del servicio
            </label>
            <div className="flex gap-2 items-center flex-wrap">
              <input
                value={s.imagen || ''}
                onChange={(e) => update(i, 'imagen', e.target.value)}
                placeholder="URL o subir imagen"
                className="flex-1 min-w-[200px] px-4 py-2 rounded-lg border border-berry/20"
              />
              <FileUploader
                accept="image/*"
                onUploaded={(url) => update(i, 'imagen', url)}
              />
            </div>
            {s.imagen && (
              <img src={s.imagen} alt="Vista previa" className="mt-2 w-24 h-24 object-cover rounded-lg" />
            )}
          </div>
          <FormField
            label="Título"
            name={`servicio-${i}-titulo`}
            value={s.titulo}
            onChange={(v) => update(i, 'titulo', v)}
          />
          <FormField
            label="Subtítulo"
            name={`servicio-${i}-subtitulo`}
            value={s.subtitulo}
            onChange={(v) => update(i, 'subtitulo', v)}
          />
          <FormField
            label="Descripción"
            name={`servicio-${i}-descripcion`}
            value={s.descripcion}
            onChange={(v) => update(i, 'descripcion', v)}
            rows={4}
          />
          <div className="mt-4">
            <label className="block text-sm font-medium text-charcoal mb-2">
              Puntos (uno por línea o separados)
            </label>
            {(s.puntos || []).map((p, pi) => (
              <div key={pi} className="flex gap-2 mb-2">
                <input
                  value={p}
                  onChange={(e) => updatePunto(i, pi, e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-berry/20"
                />
                <button
                  type="button"
                  onClick={() => removePunto(i, pi)}
                  className="text-red-600 text-sm"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addPunto(i)}
              className="text-berry text-sm font-medium"
            >
              + Añadir punto
            </button>
          </div>
        </div>
      ))}
      <button type="button" onClick={addServicio} className="text-berry font-medium">
        + Añadir servicio
      </button>

      <button
        type="submit"
        className="block mt-8 px-8 py-3 rounded-xl bg-berry text-white font-semibold hover:bg-berry-dark"
      >
        Guardar cambios
      </button>
    </form>
  )
}
