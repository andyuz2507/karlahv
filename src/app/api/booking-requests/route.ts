import { NextRequest, NextResponse } from 'next/server'
import { getAuthFromCookie } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  const auth = await getAuthFromCookie()
  if (!auth) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const requests = await prisma.bookingRequest.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(requests)
  } catch (e) {
    console.error('BookingRequests GET error:', e)
    return NextResponse.json({ error: 'Error al cargar solicitudes' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    const booking = await prisma.bookingRequest.create({
      data: {
        nombre: String(nombre).trim(),
        celular: String(celular).trim(),
        email: String(email).trim().toLowerCase(),
        paraQuien: String(paraQuien).trim(),
        descripcion: String(descripcion).trim(),
        modalidad: modalidad === 'remoto' ? 'remoto' : 'fisico',
        temporalidad: temporalidad === 'quincenal' ? 'quincenal' : 'semanal',
        slotDate: String(slotDate),
        slotTime: String(slotTime),
      },
    })
    return NextResponse.json({ success: true, id: booking.id })
  } catch (e) {
    console.error('BookingRequest POST error:', e)
    return NextResponse.json({ error: 'Error al enviar solicitud' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const auth = await getAuthFromCookie()
  if (!auth) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const body = await request.json()
    const { id, status, notas } = body
    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

    await prisma.bookingRequest.update({
      where: { id },
      data: {
        ...(status && { status: String(status) }),
        ...(notas !== undefined && { notas: String(notas) }),
      },
    })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('BookingRequest PATCH error:', e)
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}
