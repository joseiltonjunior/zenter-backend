import { AppError } from '@shared/errors/AppError'
import { jwtProvider } from '@shared/infra/providers/jwt-provider'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function authMiddleware(request: FastifyRequest, _reply: FastifyReply) {
  const header = request.headers.authorization

  if (!header) {
    throw new AppError('Unauthorized', 401)
  }

  const [type, token] = header.split(' ')

  if (type !== 'Bearer' || !token) {
    throw new AppError('Unauthorized', 401)
  }

  try {
    const payload = jwtProvider.verify(token)

    const userId = payload.sub

    if (!userId) {
      throw new AppError('Unauthorized', 401)
    }

    request.user = {
      id: userId,
      payload: payload as Record<string, unknown>,
    }
  } catch {
    throw new AppError('Unauthorized', 401)
  }
}
