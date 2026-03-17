import { getAuthFromCookie } from '@/lib/auth'
import { AdminHeader } from '@/components/AdminHeader'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const auth = await getAuthFromCookie()

  return (
    <div className="min-h-screen bg-cream-light">
      {auth ? (
        <div className="flex flex-col min-h-screen">
          <AdminHeader email={auth.email} />
          <main className="flex-1 p-6">{children}</main>
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  )
}
