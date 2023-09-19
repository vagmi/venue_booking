declare module '@fastify/jwt' {
	interface FastifyJWT {
		payload: {
            userId: number
            iat: number
        },
	}
}