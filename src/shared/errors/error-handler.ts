import { env } from '@shared/config/env'
import { FastifyReply, FastifyRequest } from 'fastify'

import { AppError } from './AppError'

export function errorHandler(error: unknown, request: FastifyRequest, reply: FastifyReply) {
  // Erro da aplicação (esperado)
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      status: 'error',
      message: error.message,
      ...(error.details ? { details: error.details } : {}),
    })
  }

  // Erros desconhecidos (bugs, infra, etc)
  // Logue pesado — você quer ver isso no server logs.
  // Aqui use console.error por simplicidade; troque por um Logger central (Pino) se tiver.
  console.error('Unhandled error:', error)

  // Em dev, exponha stack para acelerar debugging.
  if (env.NODE_ENV === 'dev') {
    const serialized =
      error instanceof Error ? { message: error.message, stack: error.stack } : String(error)
    return reply.status(500).send({
      status: 'error',
      message: 'Internal server error',
      error: serialized,
    })
  }

  // Em prod, resposta genérica
  return reply.status(500).send({
    status: 'error',
    message: 'Internal server error',
  })
}
