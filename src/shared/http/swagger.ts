import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { FastifyInstance } from 'fastify'

export async function setupSwagger(app: FastifyInstance) {
  await app.register(swagger, {
    swagger: {
      info: {
        title: 'Zenter API',
        version: '1.0.0',
        description: 'Documentação da API do projeto',
      },
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  })

  await app.register(swaggerUi, {
    routePrefix: '/docs',
    staticCSP: true,
  })
}
