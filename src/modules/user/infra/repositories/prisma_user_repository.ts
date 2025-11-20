// prisma-auth-repository.ts
import { AuthRepository } from '@modules/user/application/repositories/user_repository'
import { User } from '@modules/user/domain/entities/User'
import { prisma } from '@shared/infra/database/prisma/client'

export class PrismaAuthRepository implements AuthRepository {
  async findByEmail(email: string) {
    const record = await prisma.user.findUnique({ where: { email } })

    if (!record) return null

    return User.restore({
      id: record.id,
      name: record.name,
      email: record.email,
      passwordHash: record.password,
      createdAt: record.createdAt,
    })
  }
}
