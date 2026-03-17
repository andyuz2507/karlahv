import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const {
  site,
  about,
  servicios,
  recursos,
  cursos,
  agenda,
  contacto,
} = require('../src/lib/site-data')

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('Emili@2026', 12)

  await prisma.user.upsert({
    where: { email: 'karlahv3110@gmail.com' },
    create: {
      email: 'karlahv3110@gmail.com',
      password: hashedPassword,
      role: 'admin',
    },
    update: { password: hashedPassword },
  })

  const contents = [
    { key: 'site', value: JSON.stringify(site) },
    { key: 'about', value: JSON.stringify(about) },
    { key: 'servicios', value: JSON.stringify(servicios) },
    { key: 'recursos', value: JSON.stringify(recursos) },
    { key: 'cursos', value: JSON.stringify(cursos) },
    { key: 'agenda', value: JSON.stringify(agenda) },
    { key: 'contacto', value: JSON.stringify(contacto) },
  ]

  for (const c of contents) {
    await prisma.content.upsert({
      where: { key: c.key },
      create: c,
      update: { value: c.value },
    })
  }

  console.log('Seed completado. Usuario admin: karlahv3110@gmail.com')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
