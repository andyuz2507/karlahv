'use client'

import { useState, useEffect } from 'react'
import { FormField } from './FormField'

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

export function CursosEditor({
  initialValue,
  onSave,
}: {
  initialValue: unknown
  onSave: (v: Curso[]) => Promise<void>
}) {
  const [data, setData] = useState<Curso[]>([])

  useEffect(() => {
    if (Array.isArray(initialValue)) {
      setData(initialValue as Curso[])
    }
  }, [initialValue])

  const update = (i: number, field: keyof Curso, val: string) => {
    const d = [...data]
    if (!d[i]) return
    d[i] = { ...d[i], [field]: val }
    setData(d)
  }

  const addCurso = () => {
    setData([
      ...data,
      {
        id: `curso-${Date.now()}`,
        titulo: '',
        descripcion: '',
        fecha: 'Próximamente',
        modalidad: '',
        duracion: '',
        ubicacion: '',
        linkLuma: '',
      },
    ])
  }

  const removeCurso = (i: number) => {
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
      {data.map((c, i) => (
        <div key={c.id} className="p-6 rounded-xl bg-cream-light border border-berry/5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-serif text-lg font-bold text-charcoal">
              Curso {i + 1}
            </h3>
            <button
              type="button"
              onClick={() => removeCurso(i)}
              className="text-red-600 text-sm"
            >
              Eliminar
            </button>
          </div>
          <FormField
            label="ID"
            name={`curso-${i}-id`}
            value={c.id}
            onChange={(v) => update(i, 'id', v)}
          />
          <FormField
            label="Título"
            name={`curso-${i}-titulo`}
            value={c.titulo}
            onChange={(v) => update(i, 'titulo', v)}
          />
          <FormField
            label="Descripción"
            name={`curso-${i}-descripcion`}
            value={c.descripcion}
            onChange={(v) => update(i, 'descripcion', v)}
            rows={3}
          />
          <FormField
            label="Fecha"
            name={`curso-${i}-fecha`}
            value={c.fecha}
            onChange={(v) => update(i, 'fecha', v)}
          />
          <FormField
            label="Modalidad"
            name={`curso-${i}-modalidad`}
            value={c.modalidad}
            onChange={(v) => update(i, 'modalidad', v)}
          />
          <FormField
            label="Duración"
            name={`curso-${i}-duracion`}
            value={c.duracion}
            onChange={(v) => update(i, 'duracion', v)}
          />
          <FormField
            label="Ubicación"
            name={`curso-${i}-ubicacion`}
            value={c.ubicacion}
            onChange={(v) => update(i, 'ubicacion', v)}
          />
          <FormField
            label="Link Luma"
            name={`curso-${i}-linkLuma`}
            value={c.linkLuma}
            onChange={(v) => update(i, 'linkLuma', v)}
            placeholder="https://lu.ma/..."
          />
        </div>
      ))}
      <button type="button" onClick={addCurso} className="text-berry font-medium">
        + Añadir curso
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
