import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { verifyPassword, createToken, setAuthCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña requeridos' },
        { status: 400 }
      )
    }

    const emailNorm = email.trim().toLowerCase()

    // Login vía Supabase (HTTP, sin conexión directa a DB - funciona en Vercel)
    if (!supabase) {
      return NextResponse.json(
        { error: 'Configuración incompleta' },
        { status: 500 }
      )
    }

    const { data: users, error } = await supabase
      .from('User')
      .select('id, email, password')
      .eq('email', emailNorm)
      .limit(1)

    if (error) {
      console.error('Supabase login error:', error)
      return NextResponse.json(
        { error: 'Error al conectar' },
        { status: 500 }
      )
    }

    const user = users?.[0]
    if (!user || !(await verifyPassword(password, user.password))) {
      return NextResponse.json(
        { error: 'Credenciales incorrectas' },
        { status: 401 }
      )
    }

    const token = await createToken({ email: user.email, id: user.id })
    await setAuthCookie(token)

    return NextResponse.json({ success: true, email: user.email })
  } catch (e) {
    console.error('Login error:', e)
    return NextResponse.json(
      { error: 'Error al iniciar sesión' },
      { status: 500 }
    )
  }
}
