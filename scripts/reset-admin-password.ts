/**
 * Script para restablecer la contraseña del admin.
 * Uso: npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/reset-admin-password.ts [nueva-contraseña]
 *
 * Si no pasas contraseña, usa: Emili@2026
 */
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const newPassword = process.argv[2] || 'Emili@2026'
  const email = 'karlahv3110@gmail.com'

  const hashedPassword = await bcrypt.hash(newPassword, 12)

  await prisma.user.upsert({
    where: { email },
    create: {
      email,
      password: hashedPassword,
      role: 'admin',
    },
    update: { password: hashedPassword },
  })

  console.log(`✓ Contraseña actualizada para ${email}`)
  if (process.argv[2]) {
    console.log('  Usa la nueva contraseña que indicaste.')
  } else {
    console.log('  Contraseña: Emili@2026')
  }
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
