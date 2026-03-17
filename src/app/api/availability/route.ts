import { NextRequest, NextResponse } from 'next/server'
import { getAuthFromCookie } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { getAvailableSlotsForWeek, getWeekStart } from '@/lib/availability'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const weekParam = searchParams.get('week')

    const slots = await prisma.availabilitySlot.findMany({
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    })

    if (weekParam) {
      const weekStart = getWeekStart(new Date(weekParam))
      const available = getAvailableSlotsForWeek(slots, weekStart)
      return NextResponse.json({ slots, available })
    }

    return NextResponse.json(slots)
  } catch (e) {
    console.error('Availability GET error:', e)
    return NextResponse.json({ error: 'Error al cargar disponibilidad' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const auth = await getAuthFromCookie()
  if (!auth) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const body = await request.json()
    const { dayOfWeek, startTime, endTime, frequency, biweekGroup } = body

    if (dayOfWeek === undefined || !startTime || !endTime || !frequency) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const slot = await prisma.availabilitySlot.create({
      data: {
        dayOfWeek: Number(dayOfWeek),
        startTime: String(startTime),
        endTime: String(endTime),
        frequency: frequency === 'biweekly' ? 'biweekly' : 'weekly',
        biweekGroup: frequency === 'biweekly' && biweekGroup !== undefined ? Number(biweekGroup) : null,
      },
    })
    return NextResponse.json(slot)
  } catch (e) {
    console.error('Availability POST error:', e)
    return NextResponse.json({ error: 'Error al crear espacio' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await getAuthFromCookie()
  if (!auth) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

    await prisma.availabilitySlot.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Availability DELETE error:', e)
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}
