'use client'

import { useState, useEffect } from 'react'

type BookingRequest = {
  id: string
  nombre: string
  celular: string
  email: string
  paraQuien: string
  descripcion: string
  modalidad: string
  temporalidad: string
  slotDate: string
  slotTime: string
  referencia?: string | null
  status: string
  notas: string | null
  createdAt: string
}

export function PotencialesClientesList() {
  const [requests, setRequests] = useState<BookingRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | null>(null)
  const [notas, setNotas] = useState('')

  useEffect(() => {
    fetch('/api/booking-requests')
      .then((r) => r.json())
      .then(setRequests)
      .finally(() => setLoading(false))
  }, [])

  const updateStatus = async (id: string, status: string, notasVal?: string) => {
    try {
      const res = await fetch('/api/booking-requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, notas: notasVal ?? notas }),
      })
      if (res.ok) {
        setRequests((r) =>
          r.map((x) => (x.id === id ? { ...x, status, notas: notasVal ?? notas } : x))
        )
        setEditing(null)
      }
    } catch {}
  }

  const formatDate = (d: string) => {
    const [y, m, day] = d.split('-')
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    return `${day} ${months[Number(m) - 1]} ${y}`
  }

  if (loading) return <p className="text-charcoal-light">Cargando...</p>

  if (requests.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-white border border-berry/10 text-center text-charcoal-light">
        No hay solicitudes aún.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {requests.map((r) => (
        <div
          key={r.id}
          className="p-6 rounded-2xl bg-white border border-berry/10 shadow-soft"
        >
          <div className="flex flex-wrap justify-between gap-4 mb-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-charcoal">{r.nombre}</h3>
              <p className="text-sm text-charcoal-light">
                {formatDate(r.slotDate)} · {r.slotTime}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={r.status}
                onChange={(e) => updateStatus(r.id, e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-berry/20 text-sm"
              >
                <option value="pendiente">Pendiente</option>
                <option value="contactado">Contactado</option>
                <option value="agendada">Agendada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <p><span className="text-charcoal-light">Celular:</span> {r.celular}</p>
            <p><span className="text-charcoal-light">Email:</span> {r.email}</p>
            <p><span className="text-charcoal-light">Para quién:</span> {r.paraQuien}</p>
            <p><span className="text-charcoal-light">Modalidad:</span> {r.modalidad === 'remoto' ? 'Remoto' : 'Presencial'}</p>
            <p><span className="text-charcoal-light">Temporalidad:</span> {r.temporalidad === 'quincenal' ? 'Quincenal' : 'Semanal'}</p>
          </div>

          <p className="mt-4 text-sm">
            <span className="text-charcoal-light">Descripción:</span>{' '}
            {r.descripcion}
          </p>

          {r.referencia ? (
            <p className="mt-2 text-sm">
              <span className="text-charcoal-light">Recomendación de:</span> {r.referencia}
            </p>
          ) : null}

          {editing === r.id ? (
            <div className="mt-4">
              <textarea
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder="Notas de follow-up..."
                className="w-full px-4 py-2 rounded-lg border border-berry/20 text-sm"
                rows={2}
              />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => updateStatus(r.id, r.status)}
                  className="px-4 py-2 rounded-lg bg-berry text-white text-sm"
                >
                  Guardar notas
                </button>
                <button
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 rounded-lg border border-berry/20 text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              {r.notas ? (
                <p className="text-sm text-charcoal-light">Notas: {r.notas}</p>
              ) : null}
              <button
                onClick={() => {
                  setNotas(r.notas || '')
                  setEditing(r.id)
                }}
                className="text-berry text-sm hover:underline mt-1"
              >
                {r.notas ? 'Editar notas' : '+ Añadir notas'}
              </button>
            </div>
          )}

          <p className="mt-4 text-xs text-charcoal-light">
            Recibido: {new Date(r.createdAt).toLocaleString('es-MX')}
          </p>
        </div>
      ))}
    </div>
  )
}
