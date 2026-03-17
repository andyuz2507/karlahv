'use client'

import { useState, useEffect } from 'react'
import { FormField } from './FormField'
import { FileUploader } from './FileUploader'

type RecursoItem = string | { titulo: string; url?: string }
type Categoria = {
  titulo: string
  descripcion: string
  icono: string
  items: RecursoItem[]
}

type Recursos = {
  categorias: Categoria[]
}

function isRecursoObj(item: RecursoItem): item is { titulo: string; url?: string } {
  return typeof item === 'object' && item !== null && 'titulo' in item
}

export function RecursosEditor({
  initialValue,
  onSave,
}: {
  initialValue: unknown
  onSave: (v: Recursos) => Promise<void>
}) {
  const [data, setData] = useState<Recursos>({ categorias: [] })

  useEffect(() => {
    if (initialValue && typeof initialValue === 'object' && 'categorias' in (initialValue as Recursos)) {
      setData(initialValue as Recursos)
    }
  }, [initialValue])

  const updateCategoria = (i: number, field: keyof Categoria, val: string | RecursoItem[]) => {
    const c = [...data.categorias]
    if (!c[i]) c[i] = { titulo: '', descripcion: '', icono: '📄', items: [] }
    c[i] = { ...c[i], [field]: val }
    setData({ ...data, categorias: c })
  }

  const updateItem = (ci: number, ii: number, val: RecursoItem) => {
    const c = [...data.categorias]
    if (!c[ci]) return
    const items = [...(c[ci].items || [])]
    items[ii] = val
    c[ci] = { ...c[ci], items }
    setData({ ...data, categorias: c })
  }

  const addItem = (ci: number, withUrl = false) => {
    const c = [...data.categorias]
    if (!c[ci]) return
    const items = [...(c[ci].items || [])]
    items.push(withUrl ? { titulo: '', url: '' } : '')
    c[ci] = { ...c[ci], items }
    setData({ ...data, categorias: c })
  }

  const removeItem = (ci: number, ii: number) => {
    const c = [...data.categorias]
    if (!c[ci]) return
    const items = [...(c[ci].items || [])]
    items.splice(ii, 1)
    c[ci] = { ...c[ci], items }
    setData({ ...data, categorias: c })
  }

  const addCategoria = () => {
    setData({
      ...data,
      categorias: [
        ...data.categorias,
        { titulo: '', descripcion: '', icono: '📄', items: [] },
      ],
    })
  }

  const removeCategoria = (i: number) => {
    const c = [...data.categorias]
    c.splice(i, 1)
    setData({ ...data, categorias: c })
  }

  const onFileUploaded = (ci: number, ii: number, url: string) => {
    const c = [...data.categorias]
    if (!c[ci]) return
    const items = [...(c[ci].items || [])]
    const current = items[ii]
    if (typeof current === 'object' && current !== null) {
      items[ii] = { ...current, url }
    } else {
      items[ii] = { titulo: String(current || ''), url }
    }
    c[ci] = { ...c[ci], items }
    setData({ ...data, categorias: c })
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSave(data)
      }}
      className="bg-white rounded-2xl border border-berry/10 p-8 shadow-soft space-y-8"
    >
      {data.categorias.map((cat, ci) => (
        <div key={ci} className="p-6 rounded-xl bg-cream-light border border-berry/5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-serif text-lg font-bold text-charcoal">
              Categoría {ci + 1}
            </h3>
            <button
              type="button"
              onClick={() => removeCategoria(ci)}
              className="text-red-600 text-sm"
            >
              Eliminar
            </button>
          </div>
          <FormField
            label="Título"
            name={`cat-${ci}-titulo`}
            value={cat.titulo}
            onChange={(v) => updateCategoria(ci, 'titulo', v)}
          />
          <FormField
            label="Descripción"
            name={`cat-${ci}-descripcion`}
            value={cat.descripcion}
            onChange={(v) => updateCategoria(ci, 'descripcion', v)}
            rows={2}
          />
          <FormField
            label="Icono (emoji)"
            name={`cat-${ci}-icono`}
            value={cat.icono}
            onChange={(v) => updateCategoria(ci, 'icono', v)}
          />
          <div className="mt-4">
            <label className="block text-sm font-medium text-charcoal mb-2">
              Items (recursos)
            </label>
            {(cat.items || []).map((item, ii) => (
              <div key={ii} className="flex flex-wrap gap-2 mb-3">
                <input
                  value={isRecursoObj(item) ? item.titulo : item}
                  onChange={(e) =>
                    updateItem(
                      ci,
                      ii,
                      isRecursoObj(item) ? { ...item, titulo: e.target.value } : e.target.value
                    )
                  }
                  placeholder="Título del recurso"
                  className="flex-1 min-w-[200px] px-4 py-2 rounded-lg border border-berry/20"
                />
                {isRecursoObj(item) ? (
                  <>
                    <input
                      value={item.url || ''}
                      onChange={(e) =>
                        updateItem(ci, ii, { ...item, url: e.target.value })
                      }
                      placeholder="URL o subir PDF"
                      className="flex-1 min-w-[200px] px-4 py-2 rounded-lg border border-berry/20"
                    />
                    <FileUploader
                      onUploaded={(url) => onFileUploaded(ci, ii, url)}
                      accept=".pdf"
                    />
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      updateItem(ci, ii, { titulo: String(item), url: '' })
                    }
                    className="text-berry text-sm"
                  >
                    + PDF
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeItem(ci, ii)}
                  className="text-red-600 text-sm"
                >
                  ×
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => addItem(ci, false)}
                className="text-berry text-sm font-medium"
              >
                + Añadir texto
              </button>
              <button
                type="button"
                onClick={() => addItem(ci, true)}
                className="text-berry text-sm font-medium"
              >
                + Añadir con PDF
              </button>
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={addCategoria} className="text-berry font-medium">
        + Añadir categoría
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
