import { notFound } from 'next/navigation'
import { getSiteData } from './get-site-data'
import type { PageVisibility } from './get-site-data'

/** Lanza notFound() si la página no está activa */
export async function requirePageActive(key: keyof PageVisibility) {
  const { pageVisibility } = await getSiteData()
  if (!pageVisibility[key]) {
    notFound()
  }
}
