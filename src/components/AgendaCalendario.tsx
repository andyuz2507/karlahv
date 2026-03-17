'use client'

import { useState, useEffect } from 'react'

type AvailableSlot = { date: string; time: string; label: string }

export function AgendaCalendario() {
  const [slots, setSlots] = useState<AvailableSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [weekStart, setWeekStart] = useState(() => {
    const d = new Date()
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1)
    d.setDate(diff)
    return d.toISOString().slice(0, 10)
  })
  const [selected, setSelected] = useState<AvailableSlot | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/availability?week=${weekStart}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          console.error('Availability error:', data.error)
          setSlots([])
          return
        }
        if (Array.isArray(data.available)) {
          setSlots(data.available)
        } else if (Array.isArray(data)) {
          setSlots([])
        } else {
          setSlots(data.available || [])
        }
      })
      .catch(() => setSlots([]))
      .finally(() => setLoading(false))
  }, [weekStart])

  const prevWeek = () => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() - 7)
    setWeekStart(d.toISOString().slice(0, 10))
  }

  const nextWeek = () => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + 7)
    setWeekStart(d.toISOString().slice(0, 10))
  }

  const weekLabel = () => {
    const start = new Date(weekStart)
    const end = new Date(start)
    end.setDate(end.getDate() + 6)
    const m = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    return `${start.getDate()} - ${end.getDate()} ${m[end.getMonth()]} ${end.getFullYear()}`
  }

  return (
    <>
      <div className="p-6 border-b border-berry/10 bg-cream/30">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl font-semibold text-charcoal">
            Selecciona un espacio disponible
          </h2>
          <div className="flex gap-2">
            <button
              onClick={prevWeek}
              className="p-2 rounded-lg border border-berry/20 hover:bg-berry/10 text-charcoal"
            >
              ←
            </button>
            <span className="px-4 py-2 text-sm font-medium text-charcoal min-w-[200px] text-center">
              {weekLabel()}
            </span>
            <button
              onClick={nextWeek}
              className="p-2 rounded-lg border border-berry/20 hover:bg-berry/10 text-charcoal"
            >
              →
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-charcoal-light">Cargando espacios...</p>
        ) : slots.length === 0 ? (
          <div className="space-y-2">
            <p className="text-charcoal-light">
              No hay espacios disponibles esta semana.
            </p>
            <p className="text-sm text-charcoal-light">
              Si eres la administradora, ve a <strong>Panel → Agenda y espacios</strong> para marcar los horarios libres (semanal o quincenal).
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-charcoal-light">
              Espacios en verde disponibles. Haz clic para solicitar reserva:
            </p>
            <div className="flex flex-wrap gap-2">
              {slots.map((s) => (
                <button
                  key={`${s.date}-${s.time}`}
                  onClick={() => setSelected(s)}
                  className="px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors shadow-sm"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {selected && (
        <ReservaFormulario
          slot={selected}
          onClose={() => setSelected(null)}
          onSuccess={() => setSelected(null)}
        />
      )}
    </>
  )
}

function ReservaFormulario({
  slot,
  onClose,
  onSuccess,
}: {
  slot: AvailableSlot
  onClose: () => void
  onSuccess: () => void
}) {
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    nombre: '',
    celular: '',
    email: '',
    paraQuien: '',
    descripcion: '',
    modalidad: 'fisico' as 'fisico' | 'remoto',
    temporalidad: 'semanal' as 'semanal' | 'quincenal',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSending(true)
    try {
      const res = await fetch('/api/booking-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          slotDate: slot.date,
          slotTime: slot.time,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        onSuccess()
      } else {
        setError(data.error || 'Error al enviar')
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50">
      <div className="bg-white rounded-2xl shadow-soft-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-berry/10 flex justify-between items-center">
          <h3 className="font-serif text-xl font-bold text-charcoal">
            Solicitar reserva: {slot.label}
          </h3>
          <button onClick={onClose} className="text-charcoal-light hover:text-charcoal text-2xl">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Nombre *</label>
            <input
              type="text"
              required
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-berry/20 focus:ring-2 focus:ring-berry/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Celular *</label>
            <input
              type="tel"
              required
              value={form.celular}
              onChange={(e) => setForm({ ...form, celular: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-berry/20 focus:ring-2 focus:ring-berry/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Correo *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-berry/20 focus:ring-2 focus:ring-berry/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">¿Para quién es la terapia? *</label>
            <input
              type="text"
              required
              placeholder="Ej: mi hijo, yo mismo, mi pareja"
              value={form.paraQuien}
              onChange={(e) => setForm({ ...form, paraQuien: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-berry/20 focus:ring-2 focus:ring-berry/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Breve descripción *</label>
            <textarea
              required
              rows={3}
              placeholder="Cuéntanos brevemente qué te motiva a buscar terapia"
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-berry/20 focus:ring-2 focus:ring-berry/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Modalidad de interés *</label>
            <select
              value={form.modalidad}
              onChange={(e) => setForm({ ...form, modalidad: e.target.value as 'fisico' | 'remoto' })}
              className="w-full px-4 py-3 rounded-xl border border-berry/20"
            >
              <option value="fisico">Presencial</option>
              <option value="remoto">Remoto (videollamada)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Temporalidad *</label>
            <select
              value={form.temporalidad}
              onChange={(e) => setForm({ ...form, temporalidad: e.target.value as 'semanal' | 'quincenal' })}
              className="w-full px-4 py-3 rounded-xl border border-berry/20"
            >
              <option value="semanal">Sesiones semanales</option>
              <option value="quincenal">Sesiones quincenales</option>
            </select>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={sending}
            className="w-full py-3 rounded-xl bg-berry text-white font-semibold hover:bg-berry-dark disabled:opacity-50"
          >
            {sending ? 'Enviando...' : 'Enviar solicitud de reserva'}
          </button>
        </form>
      </div>
    </div>
  )
}
