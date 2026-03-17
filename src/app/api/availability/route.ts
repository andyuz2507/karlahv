import { NextRequest, NextResponse } from 'next/server'
import { getAuthFromCookie } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { getAvailableSlotsForWeek, getWeekStart } from '@/lib/availability'

type SlotRow = {
  id: string
  day_of_week: number
  start_time: string
  end_time: string
  frequency: string
  biweek_group: number | null
}

function toSlot(row: SlotRow) {
  return {
    id: row.id,
    dayOfWeek: row.day_of_week,
    startTime: row.start_time,
    endTime: row.end_time,
    frequency: row.frequency,
    biweekGroup: row.biweek_group,
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const weekParam = searchParams.get('week')

    if (!supabase) {
      return NextResponse.json({
        slots: [],
        available: [],
        error: 'Configuración incompleta. Añade NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en Vercel.',
      })
    }

    const { data: rows, error } = await supabase
      .from('availability_slot')
      .select('id, day_of_week, start_time, end_time, frequency, biweek_group')
      .order('day_of_week')
      .order('start_time')

    if (error) {
      console.error('Availability Supabase error:', error)
      return NextResponse.json({ slots: [], available: [] })
    }

    const slots = (rows || []).map(toSlot)

    if (weekParam) {
      const parts = weekParam.split('-').map(Number)
      const y = parts[0] || new Date().getFullYear()
      const m = (parts[1] || new Date().getMonth() + 1) - 1
      const day = parts[2] || 1
      const weekStart = getWeekStart(new Date(y, m, day))
      let available = getAvailableSlotsForWeek(slots, weekStart)

      // Excluir slots ya reservados (booking_request)
      const { data: bookings } = await supabase
        .from('booking_request')
        .select('slot_date, slot_time')
        .in('status', ['pendiente', 'confirmada'])
      const bookedSet = new Set(
        (bookings || []).map((b: { slot_date: string; slot_time: string }) => `${b.slot_date}-${b.slot_time}`)
      )
      available = available.filter((a) => !bookedSet.has(`${a.date}-${a.time}`))

      return NextResponse.json({ slots, available })
    }

    return NextResponse.json(slots)
  } catch (e) {
    console.error('Availability GET error:', e)
    return NextResponse.json({ error: 'Error al cargar', available: [] }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const auth = await getAuthFromCookie()
  if (!auth) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  if (!supabase) return NextResponse.json({ error: 'Configuración incompleta' }, { status: 500 })

  try {
    const body = await request.json()
    const { dayOfWeek, startTime, endTime, frequency, biweekGroup } = body

    if (dayOfWeek === undefined || !startTime || !endTime || !frequency) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('availability_slot')
      .insert({
        day_of_week: Number(dayOfWeek),
        start_time: String(startTime),
        end_time: String(endTime),
        frequency: frequency === 'biweekly' ? 'biweekly' : 'weekly',
        biweek_group: frequency === 'biweekly' && biweekGroup !== undefined ? Number(biweekGroup) : null,
      })
      .select()
      .single()

    if (error) {
      console.error('Availability POST error:', error)
      const msg = error?.message || error?.code || 'Error desconocido'
      return NextResponse.json({ error: `Error al crear espacio: ${msg}` }, { status: 500 })
    }

    return NextResponse.json(toSlot(data as SlotRow))
  } catch (e) {
    console.error('Availability POST error:', e)
    const msg = e instanceof Error ? e.message : 'Error desconocido'
    return NextResponse.json({ error: `Error al crear espacio: ${msg}` }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const auth = await getAuthFromCookie()
  if (!auth) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  if (!supabase) return NextResponse.json({ error: 'Configuración incompleta' }, { status: 500 })

  try {
    const body = await request.json()
    const { id, dayOfWeek, startTime, endTime, frequency, biweekGroup } = body

    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
    if (dayOfWeek === undefined || !startTime || !endTime || !frequency) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('availability_slot')
      .update({
        day_of_week: Number(dayOfWeek),
        start_time: String(startTime),
        end_time: String(endTime),
        frequency: frequency === 'biweekly' ? 'biweekly' : 'weekly',
        biweek_group: frequency === 'biweekly' && biweekGroup !== undefined ? Number(biweekGroup) : null,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Availability PUT error:', error)
      return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
    }

    return NextResponse.json(toSlot(data as SlotRow))
  } catch (e) {
    console.error('Availability PUT error:', e)
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await getAuthFromCookie()
  if (!auth) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  if (!supabase) return NextResponse.json({ error: 'Configuración incompleta' }, { status: 500 })

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

    const { error } = await supabase.from('availability_slot').delete().eq('id', id)

    if (error) {
      console.error('Availability DELETE error:', error)
      return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Availability DELETE error:', e)
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}
