import { FastifyInstance } from "fastify";
import { prisma } from "../prisma";
import dayjs from "dayjs";

export const routes = async (fastify: FastifyInstance, _options) => {
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  });

  fastify.get('/', {
  }, async (request, reply) => {
    const result = await prisma.user.findUnique({
      where: {id: request.user.userId},
      select: {
        bookings: true
      }
    });
    return result?.bookings;
  });
  fastify.post<{
    Body: {
      facilityId: number,
      startTime: Date,
      endTime: Date
    }
  }>('/', {
    schema: {
      body: {
        type: 'object',
        properties: {
          facilityId: { type: 'number' },
          startTime: { type: 'string' },
          endTime: { type: 'string' },
        }
      }
    }
  }, async (request, reply) => {
    const result = await prisma.booking.create({
      data: {
        userId: request.user.userId,
        facilityId: request.body.facilityId,
        start_time: dayjs(request.body.startTime).toDate(),
        end_time: dayjs(request.body.endTime).toDate()
      }
    });
    return result;
  });
}