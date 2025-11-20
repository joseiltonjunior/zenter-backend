import { FastifyError, FastifyRequest, FastifyReply } from 'fastify'
import { ZodError } from 'zod'

import { AppError } from '../../errors/AppError'

export function errorMiddleware(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  // ZOD
  if (error instanceof ZodError) {
    return reply.status(400).send({
      status: 'validation_error',
      errors: error.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    })
  }

  // DOMAIN ERRORS
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      status: 'error',
      message: error.message,
    })
  }

  // FASTIFY INTERNAL ERRORS
  if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
    return reply.status(error.statusCode).send({
      status: 'error',
      message: error.message,
    })
  }

  // UNEXPECTED ERRORS
  request.log.error(error)

  return reply.status(500).send({
    status: 'error',
    message: 'Internal server error',
  })
}
