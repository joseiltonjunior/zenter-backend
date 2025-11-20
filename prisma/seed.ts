import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('123456', 10)

  const user = await prisma.user.upsert({
    where: { email: 'teste@teste.com' },
    update: {},
    create: {
      email: 'teste@teste.com',
      password: passwordHash,
      name: 'Junior',
    },
  })

  console.log('Usuário criado:', user)
}

main()
  .then(() => prisma.$disconnect())
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
