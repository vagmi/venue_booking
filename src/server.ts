import Fastify from 'fastify'
import jwtPlugin from '@fastify/jwt'
import { routes as locationRoutes} from './routes/locations'
import { routes as bookingRoutes} from './routes/bookings'
const fastify = Fastify({
  logger: true
})

fastify.register(jwtPlugin, {
  secret: process.env.SECRET_KEY || 'supersecret'
});
fastify.register(locationRoutes, { prefix: '/api/locations' })
fastify.register(bookingRoutes, { prefix: '/api/bookings' })

// Declare a route
fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})


// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
