import { PrismaClient } from '@prisma/client'
import { site, about, servicios, recursos, cursos, agenda, contacto } from './site-data'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export type ContentKeys = 'site' | 'about' | 'servicios' | 'recursos' | 'cursos' | 'agenda' | 'contacto'

const defaultContent: Record<ContentKeys, unknown> = {
  site,
  about,
  servicios,
  recursos,
  cursos,
  agenda,
  contacto,
}

export async function getContent<T = unknown>(key: ContentKeys): Promise<T> {
  const row = await prisma.content.findUnique({ where: { key } })
  if (row) return JSON.parse(row.value) as T
  return defaultContent[key] as T
}

export async function getAllContent(): Promise<Record<string, unknown>> {
  const rows = await prisma.content.findMany()
  const result: Record<string, unknown> = {}
  for (const k of Object.keys(defaultContent) as ContentKeys[]) {
    const row = rows.find((r) => r.key === k)
    result[k] = row ? JSON.parse(row.value) : defaultContent[k]
  }
  return result
}

export async function setContent(key: ContentKeys, value: unknown): Promise<void> {
  await prisma.content.upsert({
    where: { key },
    create: { key, value: JSON.stringify(value) },
    update: { value: JSON.stringify(value) },
  })
}
