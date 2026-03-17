'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CursosPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/recursos-y-cursos')
  }, [router])
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <p className="text-charcoal-light">Redirigiendo...</p>
    </div>
  )
}
