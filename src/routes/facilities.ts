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
};

