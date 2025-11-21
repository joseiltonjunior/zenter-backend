export const authenticateUserSchema = {
  tags: ['Auth'],
  summary: 'Autentica um usuário',
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
    401: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        statusCode: { type: 'number' },
      },
    },
  },
}
