// prisma-auth-repository.ts
import { AuthRepository } from '@modules/auth/application/repositories/auth-repository'
import { User } from '@modules/auth/domain/entities/User'
import { Email } from '@modules/auth/domain/value-objects/Email'
import { prisma } from '@shared/infra/database/prisma/client'

export class PrismaAuthRepository implements AuthRepository {
  async findByEmail(email: Email): Promise<User | null> {
    const raw = await prisma.user.findUnique({
      where: { email: email.getValue() },
    })

    // Se não achou, retorna null (contrato do repositório)
    if (!raw) return null

    // Validação explícita de campos não-null
    if (!raw.email) {
      // opcional: logar
      return null
    }
    if (!raw.password) {
      // usuário em estado inválido; trate como não encontrado
      return null
    }

    return new User({
      id: raw.id,
      name: raw.name ?? '', // se name puder ser null, decida policy — aqui eu normalizo para string vazia
      email: Email.create(raw.email), // raw.email é string garantida aqui
      passwordHash: raw.password, // também garantido
      createdAt: raw.createdAt ?? new Date(),
    })
  }
}
