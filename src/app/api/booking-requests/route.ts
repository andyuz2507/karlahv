import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { getAuthFromCookie } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const auth = await getAuthFromCookie()
  if (!auth) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  if (!supabase) return NextResponse.json({ error: 'Configuración incompleta' }, { status: 500 })

  try {
    const { data, error } = await supabase
      .from('booking_request')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('BookingRequests GET error:', error)
      return NextResponse.json({ error: 'Error al cargar' }, { status: 500 })
    }

    const requests = (data || []).map((r: Record<string, unknown>) => ({
      id: r.id,
      nombre: r.nombre,
      celular: r.celular,
      email: r.email,
      paraQuien: r.para_quien,
      descripcion: r.descripcion,
      modalidad: r.modalidad,
      temporalidad: r.temporalidad,
      slotDate: r.slot_date,
      slotTime: r.slot_time,
      status: r.status,
      notas: r.notas,
      createdAt: r.created_at,
    }))

    return NextResponse.json(requests)
  } catch (e) {
    console.error('BookingRequests GET error:', e)
    return NextResponse.json({ error: 'Error al cargar' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!supabase) return NextResponse.json({ error: 'Configuración incompleta' }, { status: 500 })

  try {
    const body = await request.json()
    const {
      nombre,
      celular,
      email,
      paraQuien,
      descripcion,
      modalidad,
      temporalidad,
      slotDate,
      slotTime,
    } = body

    if (!nombre || !celular || !email || !paraQuien || !descripcion || !modalidad || !temporalidad || !slotDate || !slotTime) {
      return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('booking_request')
      .insert({
        id: randomUUID(),
        nombre: String(nombre).trim(),
        celular: String(celular).trim(),
        email: String(email).trim().toLowerCase(),
        para_quien: String(paraQuien).trim(),
        descripcion: String(descripcion).trim(),
        modalidad: modalidad === 'remoto' ? 'remoto' : 'fisico',
        temporalidad: temporalidad === 'quincenal' ? 'quincenal' : 'semanal',
        slot_date: String(slotDate),
        slot_time: String(slotTime),
      })
      .select('id')
      .single()

    if (error) {
      console.error('BookingRequest POST error:', error)
      const msg = error?.message || error?.code || 'Error desconocido'
      return NextResponse.json({ error: `Error al enviar solicitud: ${msg}` }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (e) {
    console.error('BookingRequest POST error:', e)
    const msg = e instanceof Error ? e.message : 'Error desconocido'
    return NextResponse.json({ error: `Error al enviar solicitud: ${msg}` }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const auth = await getAuthFromCookie()
  if (!auth) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  if (!supabase) return NextResponse.json({ error: 'Configuración incompleta' }, { status: 500 })

  try {
    const body = await request.json()
    const { id, status, notas } = body
    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

    const updates: Record<string, unknown> = {}
    if (status) updates.status = String(status)
    if (notas !== undefined) updates.notas = String(notas)

    const { error } = await supabase
      .from('booking_request')
      .update(updates)
      .eq('id', id)

    if (error) {
      console.error('BookingRequest PATCH error:', error)
      return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('BookingRequest PATCH error:', e)
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}
