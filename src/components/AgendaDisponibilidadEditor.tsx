'use client'

import { useState, useEffect } from 'react'

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

export function AgendaDisponibilidadEditor() {
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [newSlot, setNewSlot] = useState({
    dayOfWeek: 1,
    startTime: '09:00',
    endTime: '10:00',
    frequency: 'weekly' as 'weekly' | 'biweekly',
    biweekGroup: 0,
  })

  useEffect(() => {
    fetch('/api/availability')
      .then((r) => r.json())
      .then((data) => setSlots(Array.isArray(data) ? data : data.slots || []))
      .finally(() => setLoading(false))
  }, [])

  const addSlot = async () => {
    setAdding(true)
    try {
      const res = await fetch('/api/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newSlot,
          biweekGroup: newSlot.frequency === 'biweekly' ? newSlot.biweekGroup : undefined,
        }),
      })
      if (res.ok) {
        const created = await res.json()
        setSlots((s) => [...s, created])
      }
    } finally {
      setAdding(false)
    }
  }

  const removeSlot = async (id: string) => {
    try {
      const res = await fetch(`/api/availability?id=${id}`, { method: 'DELETE' })
      if (res.ok) setSlots((s) => s.filter((x) => x.id !== id))
    } catch {}
  }

  if (loading) return <p className="text-charcoal-light">Cargando...</p>

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-white border border-berry/10">
        <h3 className="font-serif text-lg font-bold text-charcoal mb-4">Añadir espacio disponible</h3>
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
        <h3 className="font-serif text-lg font-bold text-charcoal mb-4">Espacios configurados</h3>
        {slots.length === 0 ? (
          <p className="text-charcoal-light">No hay espacios configurados. Añade uno arriba.</p>
        ) : (
          <ul className="space-y-2">
            {slots.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between py-2 px-4 rounded-lg bg-cream/50"
              >
                <span>
                  {DAYS.find((d) => d.value === s.dayOfWeek)?.label} {s.startTime}-{s.endTime}{' '}
                  <span className="text-charcoal-light text-sm">
                    ({s.frequency === 'biweekly' ? 'quincenal' : 'semanal'})
                  </span>
                </span>
                <button
                  onClick={() => removeSlot(s.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
