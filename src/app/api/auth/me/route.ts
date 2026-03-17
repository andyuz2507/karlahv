import { NextResponse } from 'next/server'
import { getAuthFromCookie } from '@/lib/auth'

export async function GET() {
  const auth = await getAuthFromCookie()
  if (!auth) {
    return NextResponse.json({ user: null }, { status: 401 })
  }
  return NextResponse.json({ user: { email: auth.email } })
}
