import { AuthenticateUserDTO } from '@modules/auth/application/dto/authenticate-user-dto'
import { authenticateUserUseCase } from '@modules/auth/application/use-cases/authenticate-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

class AuthController {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const data: AuthenticateUserDTO = loginSchema.parse(request.body)

    const result = await authenticateUserUseCase.execute(data)

    return reply.send(result)
  }
}

export const authController = new AuthController()
