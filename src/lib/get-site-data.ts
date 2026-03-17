import { getAllContent } from './db'
import {
  site as siteDefault,
  about as aboutDefault,
  servicios as serviciosDefault,
  recursos as recursosDefault,
  cursos as cursosDefault,
  agenda as agendaDefault,
  contacto as contactoDefault,
  pageVisibility as pageVisibilityDefault,
} from './site-data'

export type SiteData = typeof siteDefault
export type PageVisibility = typeof pageVisibilityDefault
export type AboutData = typeof aboutDefault
export type ServiciosData = typeof serviciosDefault
export type RecursosData = typeof recursosDefault
export type CursosData = typeof cursosDefault
export type AgendaData = typeof agendaDefault
export type ContactoData = typeof contactoDefault

export async function getSiteData() {
  const content = await getAllContent()
  return {
    site: (content.site ?? siteDefault) as SiteData,
    about: (content.about ?? aboutDefault) as AboutData,
    servicios: (content.servicios ?? serviciosDefault) as ServiciosData,
    recursos: (content.recursos ?? recursosDefault) as RecursosData,
    cursos: (content.cursos ?? cursosDefault) as CursosData,
    agenda: (content.agenda ?? agendaDefault) as AgendaData,
    contacto: (content.contacto ?? contactoDefault) as ContactoData,
    pageVisibility: (content.pageVisibility ?? pageVisibilityDefault) as PageVisibility,
  }
}
