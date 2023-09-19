import { FastifyInstance } from "fastify";
import { prisma } from "../prisma";

export const routes = async (fastify: FastifyInstance, _options) => {
    fastify.get('/', {
        schema: {
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                        }
                    }

                }
            }
        }

    }, async (request, reply) => {
        return await prisma.location.findMany()
    });

    fastify.get<{
        Params: { id: number}
    }>('/:id/facilities', {
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'number' }
                }
            },
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                            num_seats: {type: 'number'},
                        }
                    }

                }
            }
        }

    }, async (request, reply) => {
        return await prisma.facility.findMany({
            select: {
                id: true,
                name: true,
                num_seats: true
            },
            where: {
                locationId: request.params.id
            }});
    });
};