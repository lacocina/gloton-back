import {FastifyInstance} from "fastify";

const users = [
  {
    "email": "testvicens@gmail.com",
    "lastname": "Álvarez Garau",
    "name": "Vicenç",
    "phoneNumber": "637000000"
  },
  {
    "email": "testjoan@gmail.com",
    "lastname": "Picornell",
    "name": "Joan",
    "phoneNumber": "637000001"
  }
]

export const registerUserRoutes = (app: FastifyInstance, opts, next) => {
  app.get('/', async () => users)
  app.get('/me', async () => users[0])
  next()
}



