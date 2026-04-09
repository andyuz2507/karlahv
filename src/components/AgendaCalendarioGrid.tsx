'use client'

import { useState, useEffect, useLayoutEffect } from 'react'

const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
const DAY_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie']

type AvailableSlot = { date: string; time: string; label: string }

type Props = {
  variant?: 'light' | 'dark'
  compact?: boolean
}

export function AgendaCalendarioGrid({ variant = 'light', compact = false }: Props) {
  const [available, setAvailable] = useState<AvailableSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [weekStart, setWeekStart] = useState(() => toLocalDateString(getMonday(new Date())))
  const [selected, setSelected] = useState<AvailableSlot | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/availability?week=${weekStart}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setAvailable([])
        else setAvailable(Array.isArray(data.available) ? data.available : [])
      })
      .catch(() => setAvailable([]))
      .finally(() => setLoading(false))
  }, [weekStart])

  const availableSet = new Set(available.map((s) => `${s.date}-${s.time}`))

  // Parse weekStart como fecha local (evita desfase por timezone)
  const [y, m, day] = weekStart.split('-').map(Number)
  const start = new Date(y, m - 1, day)

  const weekDates: { date: string; day: number; label: string }[] = []
  for (let i = 0; i < 5; i++) {
    const d = new Date(y, m - 1, day + i)
    weekDates.push({
      date: d.toISOString().slice(0, 10),
      day: d.getDate(),
      label: DAY_LABELS[i],
    })
  }

  const weekLabel = () => {
    const end = new Date(y, m - 1, day + 4)
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    return `${start.getDate()} - ${end.getDate()} ${months[end.getMonth()]} ${end.getFullYear()}`
  }

  const prevWeek = () => {
    const d = new Date(y, m - 1, day - 7)
    setWeekStart(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`)
  }

  const nextWeek = () => {
    const d = new Date(y, m - 1, day + 7)
    setWeekStart(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`)
  }

  const handleCellClick = (date: string, time: string) => {
    const slot = available.find((s) => s.date === date && s.time === time)
    if (slot) setSelected(slot)
  }

  const isLight = variant === 'light'

  return (
    <div className={isLight ? 'bg-white' : 'bg-white/5 rounded-2xl p-4 md:p-5'}>
      {/* Header: title + week navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className={`font-serif text-base font-semibold ${isLight ? 'text-charcoal' : 'text-white'}`}>
          Selecciona un espacio disponible
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={prevWeek}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isLight ? 'border border-berry/20 hover:bg-berry/10 text-charcoal' : 'bg-white/15 hover:bg-white/25 text-white'}`}
          >
            ←
          </button>
          <span className={`text-xs font-medium min-w-[120px] text-center ${isLight ? 'text-charcoal' : 'text-white'}`}>
            {weekLabel()}
          </span>
          <button
            onClick={nextWeek}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isLight ? 'border border-berry/20 hover:bg-berry/10 text-charcoal' : 'bg-white/15 hover:bg-white/25 text-white'}`}
          >
            →
          </button>
        </div>
      </div>

      {loading ? (
        <p className={`text-sm py-8 text-center ${isLight ? 'text-charcoal-light' : 'text-white/60'}`}>Cargando...</p>
      ) : (
        <div className="overflow-x-auto touch-pan-x">
          {/* Fluid grid: time column fixed, 5 day columns share remaining space */}
          <div className="grid grid-cols-[3rem_repeat(5,1fr)] gap-1 mb-1">
            <div className={`text-[11px] font-medium py-1 ${isLight ? 'text-charcoal-light' : 'text-white/50'}`}>
              Hora
            </div>
            {weekDates.map((wd) => (
              <div key={wd.date} className={`text-center py-1 ${isLight ? 'text-charcoal' : 'text-white'}`}>
                <div className="text-[11px] font-semibold">{wd.label}</div>
                <div className={`text-xs font-bold ${isLight ? 'text-berry' : 'text-dusty-rose'}`}>{wd.day}</div>
              </div>
            ))}
          </div>

          {TIME_SLOTS.map((time) => (
            <div key={time} className="grid grid-cols-[3rem_repeat(5,1fr)] gap-1 mb-1">
              <div className={`text-[11px] flex items-center h-8 ${isLight ? 'text-charcoal-light' : 'text-white/60'}`}>
                {time}
              </div>
              {weekDates.map((wd) => {
                const isAvailable = availableSet.has(`${wd.date}-${time}`)
                const slot = available.find((s) => s.date === wd.date && s.time === time)
                return (
                  <button
                    key={`${wd.date}-${time}`}
                    type="button"
                    onClick={() => handleCellClick(wd.date, time)}
                    disabled={!isAvailable}
                    className={`
                      h-8 w-full rounded-md text-[10px] font-semibold transition-all
                      ${isAvailable
                        ? 'bg-green-600 hover:bg-green-500 text-white cursor-pointer active:scale-95 shadow-sm'
                        : isLight
                          ? 'bg-charcoal/8 cursor-not-allowed'
                          : 'bg-white/8 cursor-not-allowed'
                      }
                    `}
                    title={isAvailable ? slot?.label : 'No disponible'}
                  />
                )
              })}
            </div>
          ))}
        </div>
      )}

      <div className={`mt-3 flex items-center gap-3 text-[11px] ${isLight ? 'text-charcoal-light' : 'text-white/50'}`}>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-green-600" /> Disponible
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`inline-block w-3 h-3 rounded-sm ${isLight ? 'bg-charcoal/15' : 'bg-white/15'}`} /> No disponible
        </span>
      </div>

      {selected && (
        <ReservaFormulario
          slot={selected}
          onClose={() => setSelected(null)}
          onSuccess={() => setSelected(null)}
        />
      )}
    </div>
  )
}

function toLocalDateString(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function getMonday(d: Date) {
  const date = new Date(d)
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)
  date.setDate(diff)
  return date
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
    referencia: '',
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
      if (res.ok) onSuccess()
      else setError(data.error || 'Error al enviar')
    } catch {
      setError('Error de conexión')
    } finally {
      setSending(false)
    }
  }

  const inputClass = 'w-full px-3 py-2 text-base rounded-lg border border-berry/20 focus:ring-2 focus:ring-berry/30 text-charcoal bg-white placeholder:text-charcoal-light'

  useLayoutEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 overflow-y-auto overflow-x-hidden">
      <div className="bg-white rounded-xl shadow-soft-lg w-full max-w-[min(24rem,calc(100vw-2rem))] my-auto shrink-0 touch-manipulation text-charcoal">
        <div className="p-3 border-b border-berry/10 flex justify-between items-center gap-2">
          <h3 className="font-serif text-sm font-bold text-charcoal truncate">Solicitar reserva: {slot.label}</h3>
          <button onClick={onClose} className="text-charcoal-light hover:text-charcoal text-lg shrink-0">×</button>
        </div>
        <form onSubmit={handleSubmit} className="p-3 space-y-2">
          <div>
            <label className="block text-xs font-medium text-charcoal mb-0.5">Nombre *</label>
            <input type="text" required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-charcoal mb-0.5">Celular *</label>
            <input type="tel" required value={form.celular} onChange={(e) => setForm({ ...form, celular: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-charcoal mb-0.5">Correo *</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-charcoal mb-0.5">¿Para quién es la terapia? *</label>
            <input type="text" required placeholder="Ej: mi hijo, yo mismo" value={form.paraQuien} onChange={(e) => setForm({ ...form, paraQuien: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-charcoal mb-0.5">Breve descripción *</label>
            <textarea required rows={2} placeholder="Cuéntanos brevemente qué te motiva" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-charcoal mb-0.5">Modalidad *</label>
            <select value={form.modalidad} onChange={(e) => setForm({ ...form, modalidad: e.target.value as 'fisico' | 'remoto' })} className={inputClass}>
              <option value="fisico">Presencial</option>
              <option value="remoto">Remoto</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-charcoal mb-0.5">Temporalidad *</label>
            <select value={form.temporalidad} onChange={(e) => setForm({ ...form, temporalidad: e.target.value as 'semanal' | 'quincenal' })} className={inputClass}>
              <option value="semanal">Semanal</option>
              <option value="quincenal">Quincenal</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-charcoal mb-0.5">Compárteme a quién le agradezco la recomendación (opcional)</label>
            <input type="text" placeholder="En caso de aplicar" value={form.referencia} onChange={(e) => setForm({ ...form, referencia: e.target.value })} className={inputClass} />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" disabled={sending} className="w-full py-2 rounded-lg bg-berry text-white font-semibold hover:bg-berry-dark disabled:opacity-50 text-sm">
            {sending ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </form>
      </div>
    </div>
  )
}
