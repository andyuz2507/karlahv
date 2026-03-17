import { getSiteData } from '@/lib/get-site-data'
import { ContactoClient } from '@/components/ContactoClient'

export default async function ContactoPage() {
  const { site, contacto } = await getSiteData()
  return <ContactoClient site={site} contacto={contacto} />
}
