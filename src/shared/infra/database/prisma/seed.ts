import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🔄 Executando seed...')

  const passwordHash = await bcrypt.hash('123456', 10)

  const user = await prisma.user.upsert({
    where: { email: 'teste@teste.com' },
    update: {},
    create: {
      email: 'teste@teste.com',
      password: passwordHash, // mesmo nome usado no banco
      name: 'Junior',
    },
  })

  console.log('✅ Usuário criado:', user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error('❌ Erro no seed:', error)
    await prisma.$disconnect()
    process.exit(1)
  })
