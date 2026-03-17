import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getSiteData } from '@/lib/get-site-data'

export const dynamic = 'force-dynamic'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { pageVisibility } = await getSiteData()
  return (
    <>
      <Header pageVisibility={pageVisibility} />
      <main className="flex-1">{children}</main>
      <Footer pageVisibility={pageVisibility} />
    </>
  )
}
