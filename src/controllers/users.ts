import { FastifyInstance } from "fastify";
import { businesses } from "./businesses.ts";

const users = [
  {
    "id": 1,
    "email": "testvicens@gmail.com",
    "lastname": "Álvarez Garau",
    "name": "Vicenç",
    "phoneNumber": "637000000",
    "pass": "1234"
  },
  {
    "id": 2,
    "email": "testjoan@gmail.com",
    "lastname": "Picornell",
    "name": "Joan",
    "phoneNumber": "637000001",
    "pass": "1234"
  },
  {
    "id": 3,
    "email": "null",
    "lastname": "null",
    "name": "null",
    "phoneNumber": "null",
    "pass": "null"
  }
]

export const registerUserRoutes = (app: FastifyInstance, opts, next) => {
  app.get('/', async () => users)

  app.get('/:id', async () => users[0])

  app.post('/login', async (request, reply) => {

    const email = request.body.email || null
    const pass = request.body.pass || null

    if (email) {
      const user = users.find((user) => user.email === email)

      if (user.pass === pass) {
        const business = businesses.find((business) => business.userID === user.id)
        return {
          user,
          business: business
        }
      }
    }

    reply.status(400)
    return 'Usuario o password incorrecto'
  })

  app.post('/', async (request) => {
    users.push(request.body)
  })

  next()
}



