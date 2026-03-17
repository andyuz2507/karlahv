import { requirePageActive } from '@/lib/page-visibility'
import { ComunidadClient } from '@/components/ComunidadClient'

export default async function ComunidadPage() {
  await requirePageActive('comunidad')
  return <ComunidadClient />
}
