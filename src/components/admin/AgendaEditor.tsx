'use client'

import { useState, useEffect } from 'react'
import { FormField } from './FormField'

type TipoCita = { nombre: string; duracion: string; tipo: string }

type Agenda = {
  titulo?: string
  descripcion?: string
  linkCalendly?: string
  tiposCita?: TipoCita[]
}

export function AgendaEditor({
  initialValue,
  onSave,
}: {
  initialValue: unknown
  onSave: (v: Agenda) => Promise<void>
}) {
  const [data, setData] = useState<Agenda>({
    titulo: '',
    descripcion: '',
    linkCalendly: '',
    tiposCita: [],
  })

  useEffect(() => {
    if (initialValue && typeof initialValue === 'object') {
      setData((prev) => ({ ...prev, ...(initialValue as Agenda) }))
    }
  }, [initialValue])

  const updateTipo = (i: number, field: keyof TipoCita, val: string) => {
    const t = [...(data.tiposCita || [])]
    if (!t[i]) t[i] = { nombre: '', duracion: '', tipo: '' }
    t[i] = { ...t[i], [field]: val }
    setData({ ...data, tiposCita: t })
  }

  const addTipo = () => {
    setData({
      ...data,
      tiposCita: [...(data.tiposCita || []), { nombre: '', duracion: '', tipo: '' }],
    })
  }

  const removeTipo = (i: number) => {
    const t = [...(data.tiposCita || [])]
    t.splice(i, 1)
    setData({ ...data, tiposCita: t })
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSave(data)
      }}
      className="bg-white rounded-2xl border border-berry/10 p-8 shadow-soft space-y-8"
    >
      <FormField
        label="Título"
        name="titulo"
        value={data.titulo || ''}
        onChange={(v) => setData({ ...data, titulo: v })}
      />
      <FormField
        label="Descripción"
        name="descripcion"
        value={data.descripcion || ''}
        onChange={(v) => setData({ ...data, descripcion: v })}
        rows={4}
      />
      <FormField
        label="Link Calendly"
        name="linkCalendly"
        value={data.linkCalendly || ''}
        onChange={(v) => setData({ ...data, linkCalendly: v })}
        placeholder="https://calendly.com/..."
      />

      <div>
        <h3 className="font-serif text-lg font-bold text-charcoal mb-4">
          Tipos de cita
        </h3>
        {(data.tiposCita || []).map((ti, i) => (
          <div key={i} className="p-4 rounded-xl bg-cream-light mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-charcoal-light">Tipo {i + 1}</span>
              <button
                type="button"
                onClick={() => removeTipo(i)}
                className="text-red-600 text-sm"
              >
                Eliminar
              </button>
            </div>
            <FormField
              label="Nombre"
              name={`tipo-${i}-nombre`}
              value={ti.nombre}
              onChange={(v) => updateTipo(i, 'nombre', v)}
            />
            <FormField
              label="Duración"
              name={`tipo-${i}-duracion`}
              value={ti.duracion}
              onChange={(v) => updateTipo(i, 'duracion', v)}
            />
            <FormField
              label="Tipo"
              name={`tipo-${i}-tipo`}
              value={ti.tipo}
              onChange={(v) => updateTipo(i, 'tipo', v)}
            />
          </div>
        ))}
        <button type="button" onClick={addTipo} className="text-berry text-sm font-medium">
          + Añadir tipo de cita
        </button>
      </div>

      <button
        type="submit"
        className="px-8 py-3 rounded-xl bg-berry text-white font-semibold hover:bg-berry-dark"
      >
        Guardar cambios
      </button>
    </form>
  )
}
