import {
  AuthenticateUserSchema,
  AuthenticateUserDTO,
} from '@modules/user/application/dto/authenticate_user_dto'
import { authenticateUserUseCase } from '@modules/user/application/use_cases/authenticate_user_use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

class AuthController {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const data: AuthenticateUserDTO = AuthenticateUserSchema.parse(request.body)

    const result = await authenticateUserUseCase.execute(data)

    return reply.send(result)
  }
}

export const authController = new AuthController()
