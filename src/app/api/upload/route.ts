import { NextRequest, NextResponse } from 'next/server'
import { getAuthFromCookie } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { supabase, UPLOADS_BUCKET } from '@/lib/supabase'
import path from 'path'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
  const auth = await getAuthFromCookie()
  if (!auth) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { error: 'No se envió ningún archivo' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const ext = (path.extname(file.name) || '.jpg').toLowerCase()
    const safeName = `${randomUUID().slice(0, 12)}${ext}`

    // Supabase Storage (producción) o filesystem local (desarrollo sin Supabase)
    const useSupabase = supabase !== null

    let url: string

    if (useSupabase && supabase) {
      const { data, error } = await supabase.storage
        .from(UPLOADS_BUCKET)
        .upload(safeName, buffer, {
          contentType: file.type || 'application/octet-stream',
          upsert: false,
        })

      if (error) {
        console.error('Supabase upload error:', error)
        return NextResponse.json(
          { error: 'Error al subir archivo: ' + error.message },
          { status: 500 }
        )
      }

      const { data: publicData } = supabase.storage
        .from(UPLOADS_BUCKET)
        .getPublicUrl(data.path)

      url = publicData.publicUrl
    } else {
      // Fallback local (solo desarrollo)
      const { writeFile, mkdir } = await import('fs/promises')
      const uploadDir = path.join(process.cwd(), 'public', 'uploads')
      const filePath = path.join(uploadDir, safeName)
      await mkdir(uploadDir, { recursive: true })
      await writeFile(filePath, buffer)
      url = `/uploads/${safeName}`
    }

    await prisma.file.create({
      data: {
        filename: file.name,
        path: url,
        url,
        mimeType: file.type || null,
        size: file.size,
      },
    })

    return NextResponse.json({ url, filename: file.name })
  } catch (e) {
    console.error('Upload error:', e)
    return NextResponse.json(
      { error: 'Error al subir archivo' },
      { status: 500 }
    )
  }
}
