import { authRoutes } from '@modules/auth/infra/http/routes/auth.routes'
import { errorHandler } from '@shared/errors/error-handler'
import fastify from 'fastify'

export function createHttpServer() {
  const app = fastify({ logger: true })

  // Aqui você registra o módulo exatamente uma vez
  app.register(authRoutes, { prefix: '/auth' })

  app.setErrorHandler(errorHandler)

  return app
}
