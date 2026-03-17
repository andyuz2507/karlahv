'use client'

import { useState, useEffect } from 'react'
import { FormField } from './FormField'

type Contacto = {
  mensaje?: string
  horarioAtencion?: string
}

export function ContactoEditor({
  initialValue,
  onSave,
}: {
  initialValue: unknown
  onSave: (v: Contacto) => Promise<void>
}) {
  const [data, setData] = useState<Contacto>({
    mensaje: '',
    horarioAtencion: '',
  })

  useEffect(() => {
    if (initialValue && typeof initialValue === 'object') {
      setData((prev) => ({ ...prev, ...(initialValue as Contacto) }))
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
      <FormField
        label="Mensaje"
        name="mensaje"
        value={data.mensaje || ''}
        onChange={(v) => setData({ ...data, mensaje: v })}
        rows={5}
      />
      <FormField
        label="Horario de atención"
        name="horarioAtencion"
        value={data.horarioAtencion || ''}
        onChange={(v) => setData({ ...data, horarioAtencion: v })}
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
