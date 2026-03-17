'use client'

import { useState, useEffect, useCallback } from 'react'

const DAYS = [
  { value: 0, label: 'Domingo' },
  { value: 1, label: 'Lunes' },
  { value: 2, label: 'Martes' },
  { value: 3, label: 'Miércoles' },
  { value: 4, label: 'Jueves' },
  { value: 5, label: 'Viernes' },
  { value: 6, label: 'Sábado' },
]

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
]

type Slot = {
  id: string
  dayOfWeek: number
  startTime: string
  endTime: string
  frequency: string
  biweekGroup: number | null
}

const emptySlot = () => ({
  dayOfWeek: 1,
  startTime: '09:00',
  endTime: '10:00',
  frequency: 'weekly' as 'weekly' | 'biweekly',
  biweekGroup: 0,
})

export function AgendaDisponibilidadEditor() {
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [configError, setConfigError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editSlot, setEditSlot] = useState(emptySlot())
  const [newSlot, setNewSlot] = useState(emptySlot())

  const loadSlots = useCallback(() => {
    setLoading(true)
    setConfigError(null)
    return fetch('/api/availability', { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => {
        if (data?.error) {
          setConfigError(data.error)
          setSlots([])
          return
        }
        const list = Array.isArray(data) ? data : data.slots || []
        setSlots(list.map((s: Slot) => ({ ...s, biweekGroup: s.biweekGroup ?? 0 })))
      })
      .catch(() => {
        setConfigError('Error de conexión. Revisa que las variables de entorno estén configuradas en Vercel.')
        setSlots([])
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    loadSlots()
  }, [loadSlots])

  const addSlot = async () => {
    setAdding(true)
    setSuccessMsg(null)
    setConfigError(null)
    try {
      const res = await fetch('/api/availability', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newSlot,
          biweekGroup: newSlot.frequency === 'biweekly' ? newSlot.biweekGroup : undefined,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        const created = data
        if (created?.id) {
          setSlots((s) => [...s, { ...created, biweekGroup: created.biweekGroup ?? 0 }])
          setNewSlot(emptySlot())
          setSuccessMsg('Espacio añadido correctamente. Se verá en verde en el calendario público.')
          setTimeout(() => setSuccessMsg(null), 4000)
        } else {
          setConfigError('Respuesta inesperada del servidor.')
        }
      } else {
        const msg = res.status === 401
          ? 'Sesión expirada. Cierra sesión y vuelve a iniciar sesión.'
          : (data?.error || 'Error al guardar')
        setConfigError(msg)
        setTimeout(() => setConfigError(null), 15000)
      }
    } catch {
      setConfigError('Error de conexión al guardar.')
    } finally {
      setAdding(false)
    }
  }

  const updateSlot = async (id: string, payload: Omit<Slot, 'id'>) => {
    try {
      const res = await fetch('/api/availability', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          ...payload,
          biweekGroup: payload.frequency === 'biweekly' ? payload.biweekGroup : undefined,
        }),
      })
      if (res.ok) {
        const updated = await res.json()
        setSlots((s) => s.map((x) => (x.id === id ? { ...updated, biweekGroup: updated.biweekGroup ?? 0 } : x)))
        setEditingId(null)
      } else {
        const err = await res.json()
        alert(err.error || 'Error al actualizar')
      }
    } catch {
      alert('Error de conexión')
    }
  }

  const removeSlot = async (id: string) => {
    if (!confirm('¿Eliminar este espacio?')) return
    try {
      const res = await fetch(`/api/availability?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (res.ok) {
        setSlots((s) => s.filter((x) => x.id !== id))
        if (editingId === id) setEditingId(null)
      } else {
        const err = await res.json()
        alert(err.error || 'Error al eliminar')
      }
    } catch {
      alert('Error de conexión')
    }
  }

  const startEdit = (s: Slot) => {
    setEditingId(s.id)
    setEditSlot({
      dayOfWeek: s.dayOfWeek,
      startTime: s.startTime,
      endTime: s.endTime,
      frequency: s.frequency as 'weekly' | 'biweekly',
      biweekGroup: s.biweekGroup ?? 0,
    })
  }

  if (loading && slots.length === 0) return <p className="text-charcoal-light">Cargando...</p>

  return (
    <div className="space-y-8">
      {configError && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
          {configError}
          {configError.includes('Sesión') && (
            <span className="block mt-2">
              <a href="/admin/login" className="text-berry font-medium underline">Ir a iniciar sesión</a>
            </span>
          )}
        </div>
      )}
      {successMsg && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm">
          {successMsg}
        </div>
      )}
      <div className="p-6 rounded-2xl bg-white border border-berry/10">
        <h3 className="font-serif text-lg font-bold text-charcoal mb-4">Añadir espacio disponible</h3>
        <p className="text-sm text-charcoal-light mb-4">
          Los espacios que añadas aquí se guardan y aparecen en verde en el calendario público (horario 9:00–18:00).
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Día</label>
            <select
              value={newSlot.dayOfWeek}
              onChange={(e) => setNewSlot({ ...newSlot, dayOfWeek: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-lg border border-berry/20"
            >
              {DAYS.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Hora inicio</label>
            <select
              value={newSlot.startTime}
              onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-berry/20"
            >
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Hora fin</label>
            <select
              value={newSlot.endTime}
              onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-berry/20"
            >
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Frecuencia</label>
            <select
              value={newSlot.frequency}
              onChange={(e) => setNewSlot({ ...newSlot, frequency: e.target.value as 'weekly' | 'biweekly' })}
              className="w-full px-3 py-2 rounded-lg border border-berry/20"
            >
              <option value="weekly">Semanal</option>
              <option value="biweekly">Quincenal</option>
            </select>
          </div>
          {newSlot.frequency === 'biweekly' && (
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Semanas</label>
              <select
                value={newSlot.biweekGroup}
                onChange={(e) => setNewSlot({ ...newSlot, biweekGroup: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-berry/20"
              >
                <option value={0}>Semanas pares (2, 4, 6...)</option>
                <option value={1}>Semanas impares (1, 3, 5...)</option>
              </select>
            </div>
          )}
        </div>
        <button
          onClick={addSlot}
          disabled={adding}
          className="mt-4 px-6 py-2 rounded-xl bg-berry text-white font-medium hover:bg-berry-dark disabled:opacity-50"
        >
          {adding ? 'Añadiendo...' : '+ Añadir espacio'}
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-berry/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-bold text-charcoal">Espacios configurados</h3>
          <button
            type="button"
            onClick={() => loadSlots()}
            className="text-sm text-berry font-medium hover:underline"
          >
            Refrescar
          </button>
        </div>
        <p className="text-sm text-charcoal-light mb-4">
          Estos espacios aparecen en verde en el calendario de la página de agenda y en la home.
        </p>
        {slots.length === 0 ? (
          <p className="text-charcoal-light">No hay espacios configurados. Añade uno arriba.</p>
        ) : (
          <ul className="space-y-2">
            {slots.map((s) => (
              <li
                key={s.id}
                className="flex flex-wrap items-center justify-between gap-2 py-2 px-4 rounded-lg bg-cream/50"
              >
                {editingId === s.id ? (
                  <div className="flex flex-wrap items-center gap-2 w-full">
                    <select
                      value={editSlot.dayOfWeek}
                      onChange={(e) => setEditSlot({ ...editSlot, dayOfWeek: Number(e.target.value) })}
                      className="px-2 py-1.5 rounded border border-berry/20 text-sm"
                    >
                      {DAYS.map((d) => (
                        <option key={d.value} value={d.value}>{d.label}</option>
                      ))}
                    </select>
                    <select
                      value={editSlot.startTime}
                      onChange={(e) => setEditSlot({ ...editSlot, startTime: e.target.value })}
                      className="px-2 py-1.5 rounded border border-berry/20 text-sm"
                    >
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <span className="text-charcoal-light">-</span>
                    <select
                      value={editSlot.endTime}
                      onChange={(e) => setEditSlot({ ...editSlot, endTime: e.target.value })}
                      className="px-2 py-1.5 rounded border border-berry/20 text-sm"
                    >
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <select
                      value={editSlot.frequency}
                      onChange={(e) => setEditSlot({ ...editSlot, frequency: e.target.value as 'weekly' | 'biweekly' })}
                      className="px-2 py-1.5 rounded border border-berry/20 text-sm"
                    >
                      <option value="weekly">Semanal</option>
                      <option value="biweekly">Quincenal</option>
                    </select>
                    <button
                      onClick={() => updateSlot(s.id, editSlot)}
                      className="px-3 py-1.5 rounded-lg bg-berry text-white text-sm font-medium"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1.5 rounded-lg border border-berry/20 text-charcoal text-sm"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <>
                    <span>
                      {DAYS.find((d) => d.value === s.dayOfWeek)?.label} {s.startTime}-{s.endTime}{' '}
                      <span className="text-charcoal-light text-sm">
                        ({s.frequency === 'biweekly' ? 'quincenal' : 'semanal'})
                      </span>
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(s)}
                        className="text-berry hover:underline text-sm font-medium"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => removeSlot(s.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
