import { getSiteData } from '@/lib/get-site-data'
import { ContactoClient } from '@/components/ContactoClient'
import { requirePageActive } from '@/lib/page-visibility'

export default async function ContactoPage() {
  await requirePageActive('contacto')
  const { site, contacto } = await getSiteData()
  return <ContactoClient site={site} contacto={contacto} />
}
