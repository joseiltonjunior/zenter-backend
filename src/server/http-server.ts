import { registerAuthModule } from '@modules/auth/http/routes'
import Fastify from 'fastify'

export async function buildServer() {
  const app = Fastify({
    logger: true,
  })

  registerAuthModule(app)

  return app
}
