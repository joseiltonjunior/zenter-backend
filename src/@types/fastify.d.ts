import 'fastify'
import { JwtPayload } from '@/shared/infra/providers/jwt-provider'

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: string
      payload: JwtPayload
    }
  }
}
