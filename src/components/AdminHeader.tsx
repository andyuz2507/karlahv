'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function AdminHeader({ email }: { email: string }) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="bg-berry text-white py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/admin" className="font-serif text-xl font-bold">
          KarlaHV Admin
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-dusty-rose text-sm">{email}</span>
          <button
            onClick={handleLogout}
            className="text-dusty-rose hover:text-white text-sm"
          >
            Cerrar sesión
          </button>
          <Link href="/" className="text-dusty-rose hover:text-white text-sm" target="_blank">
            Ver sitio →
          </Link>
        </div>
      </div>
    </header>
  )
}
