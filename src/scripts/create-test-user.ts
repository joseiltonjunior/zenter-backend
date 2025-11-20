import bcrypt from 'bcryptjs'

import { prisma } from '../libs/prisma'

async function main() {
  const passwordHash = await bcrypt.hash('123456', 10)

  const user = await prisma.user.create({
    data: {
      email: 'teste@teste.com',
      password: passwordHash,
      name: 'Junior',
    },
  })

  console.log('Usuário criado:', user)
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
