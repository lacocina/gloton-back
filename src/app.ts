import fastify from "fastify";
import { registerUserRoutes } from './controllers/users'
import { registerBusinessRoutes } from "./controllers/businesses.ts";
import { registerSwagger } from "./swagger.ts";
import cors from "@fastify/cors";

export const app = fastify()
if (!import.meta.env.PROD) {
  registerSwagger(app)
}

app.register(cors, { origin: true })

app.register(registerUserRoutes, { prefix: '/users' })
app.register(registerBusinessRoutes, { prefix: '/businesses' })
app.put('/:id', {
  schema: {
    description: 'post some data',
    tags: ['user', 'code'],
    summary: 'qwerty',
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'user id'
        }
      }
    },
    body: {
      type: 'object',
      properties: {
        hello: { type: 'string' },
        obj: {
          type: 'object',
          properties: {
            some: { type: 'string' }
          }
        }
      }
    },
    response: {
      201: {
        description: 'Successful response',
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      },
      default: {
        description: 'Default response',
        type: 'object',
        properties: {
          foo: { type: 'string' }
        }
      }
    },
    security: [
      {
        "apiKey": []
      }
    ]
  }
}, async () => ({ message: 'Hello world!' }))
app.ready()

