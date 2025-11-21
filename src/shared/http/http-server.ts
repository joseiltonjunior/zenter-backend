import { authRoutes } from '@modules/user/infra/http/routes/auth.routes'
import Fastify from 'fastify'

import { errorMiddleware } from './middlewares/error-middleware'
import { setupSwagger } from './swagger'

export function buildServer() {
  const app = Fastify({ logger: true })

  setupSwagger(app) // sem await

  app.register(authRoutes, { prefix: '/auth' })

  app.setErrorHandler(errorMiddleware)

  return app
}
