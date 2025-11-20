import { buildServer } from './server/http-server'
import './core/env'

async function start() {
  const app = await buildServer()

  try {
    await app.listen({ port: 3333 })
    console.log('🔥 Zenter API running on http://localhost:3333')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
