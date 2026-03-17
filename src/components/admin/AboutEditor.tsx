'use client'

import { useState, useEffect } from 'react'
import { FormField } from './FormField'
import { FileUploader } from './FileUploader'

type FormacionItem = { titulo: string; institucion: string; detalle: string }
type EnfoqueItem = { titulo: string; descripcion: string }

type About = {
  imagenPrincipal?: string
  nombreCompleto?: string
  titulo?: string
  experiencia?: string
  bioCorta?: string
  bioLarga?: string
  formacion?: FormacionItem[]
  enfoques?: EnfoqueItem[]
}

export function AboutEditor({
  initialValue,
  onSave,
}: {
  initialValue: unknown
  onSave: (v: About) => Promise<void>
}) {
  const [data, setData] = useState<About>({
    imagenPrincipal: '',
    nombreCompleto: '',
    titulo: '',
    experiencia: '',
    bioCorta: '',
    bioLarga: '',
    formacion: [],
    enfoques: [],
  })

  useEffect(() => {
    if (initialValue && typeof initialValue === 'object') {
      setData((prev) => ({ ...prev, ...(initialValue as About) }))
    }
  }, [initialValue])

  const updateFormacion = (i: number, field: keyof FormacionItem, val: string) => {
    const f = [...(data.formacion || [])]
    if (!f[i]) f[i] = { titulo: '', institucion: '', detalle: '' }
    f[i] = { ...f[i], [field]: val }
    setData({ ...data, formacion: f })
  }

  const addFormacion = () => {
    setData({
      ...data,
      formacion: [...(data.formacion || []), { titulo: '', institucion: '', detalle: '' }],
    })
  }

  const removeFormacion = (i: number) => {
    const f = [...(data.formacion || [])]
    f.splice(i, 1)
    setData({ ...data, formacion: f })
  }

  const updateEnfoque = (i: number, field: keyof EnfoqueItem, val: string) => {
    const e = [...(data.enfoques || [])]
    if (!e[i]) e[i] = { titulo: '', descripcion: '' }
    e[i] = { ...e[i], [field]: val }
    setData({ ...data, enfoques: e })
  }

  const addEnfoque = () => {
    setData({
      ...data,
      enfoques: [...(data.enfoques || []), { titulo: '', descripcion: '' }],
    })
  }

  const removeEnfoque = (i: number) => {
    const e = [...(data.enfoques || [])]
    e.splice(i, 1)
    setData({ ...data, enfoques: e })
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSave(data)
      }}
      className="bg-white rounded-2xl border border-berry/10 p-8 shadow-soft space-y-8"
    >
      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">
          Imagen (página Sobre mí)
        </label>
        <div className="flex gap-2 items-center flex-wrap">
          <input
            value={data.imagenPrincipal || ''}
            onChange={(e) => setData({ ...data, imagenPrincipal: e.target.value })}
            placeholder="URL o subir imagen"
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
        name="nombreCompleto"
        value={data.nombreCompleto || ''}
        onChange={(v) => setData({ ...data, nombreCompleto: v })}
      />
      <FormField
        label="Título"
        name="titulo"
        value={data.titulo || ''}
        onChange={(v) => setData({ ...data, titulo: v })}
      />
      <FormField
        label="Experiencia"
        name="experiencia"
        value={data.experiencia || ''}
        onChange={(v) => setData({ ...data, experiencia: v })}
      />
      <FormField
        label="Bio corta"
        name="bioCorta"
        value={data.bioCorta || ''}
        onChange={(v) => setData({ ...data, bioCorta: v })}
        rows={3}
      />
      <FormField
        label="Bio larga"
        name="bioLarga"
        value={data.bioLarga || ''}
        onChange={(v) => setData({ ...data, bioLarga: v })}
        rows={6}
      />

      <div>
        <h3 className="font-serif text-lg font-bold text-charcoal mb-4">Formación</h3>
        {(data.formacion || []).map((item, i) => (
          <div key={i} className="p-4 rounded-xl bg-cream-light mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-charcoal-light">Formación {i + 1}</span>
              <button
                type="button"
                onClick={() => removeFormacion(i)}
                className="text-red-600 text-sm"
              >
                Eliminar
              </button>
            </div>
            <FormField
              label="Título"
              name={`formacion-${i}-titulo`}
              value={item.titulo}
              onChange={(v) => updateFormacion(i, 'titulo', v)}
            />
            <FormField
              label="Institución"
              name={`formacion-${i}-institucion`}
              value={item.institucion}
              onChange={(v) => updateFormacion(i, 'institucion', v)}
            />
            <FormField
              label="Detalle"
              name={`formacion-${i}-detalle`}
              value={item.detalle}
              onChange={(v) => updateFormacion(i, 'detalle', v)}
              rows={2}
            />
          </div>
        ))}
        <button type="button" onClick={addFormacion} className="text-berry text-sm font-medium">
          + Añadir formación
        </button>
      </div>

      <div>
        <h3 className="font-serif text-lg font-bold text-charcoal mb-4">Enfoques</h3>
        {(data.enfoques || []).map((item, i) => (
          <div key={i} className="p-4 rounded-xl bg-cream-light mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-charcoal-light">Enfoque {i + 1}</span>
              <button
                type="button"
                onClick={() => removeEnfoque(i)}
                className="text-red-600 text-sm"
              >
                Eliminar
              </button>
            </div>
            <FormField
              label="Título"
              name={`enfoque-${i}-titulo`}
              value={item.titulo}
              onChange={(v) => updateEnfoque(i, 'titulo', v)}
            />
            <FormField
              label="Descripción"
              name={`enfoque-${i}-descripcion`}
              value={item.descripcion}
              onChange={(v) => updateEnfoque(i, 'descripcion', v)}
              rows={3}
            />
          </div>
        ))}
        <button type="button" onClick={addEnfoque} className="text-berry text-sm font-medium">
          + Añadir enfoque
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
