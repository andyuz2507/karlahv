import { NextRequest, NextResponse } from 'next/server'
import { getAuthFromCookie } from '@/lib/auth'
import { getAllContent, setContent, type ContentKeys } from '@/lib/db'

const VALID_KEYS: ContentKeys[] = [
  'site',
  'about',
  'servicios',
  'recursos',
  'cursos',
  'agenda',
  'contacto',
  'pageVisibility',
]

export async function GET() {
  const content = await getAllContent()
  return NextResponse.json(content)
}

export async function PUT(request: NextRequest) {
  const auth = await getAuthFromCookie()
  if (!auth) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { key, value } = body

    if (!key || !VALID_KEYS.includes(key as ContentKeys)) {
      return NextResponse.json(
        { error: 'Clave inválida' },
        { status: 400 }
      )
    }

    await setContent(key as ContentKeys, value)
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Content update error:', e)
    return NextResponse.json(
      { error: 'Error al guardar' },
      { status: 500 }
    )
  }
}
