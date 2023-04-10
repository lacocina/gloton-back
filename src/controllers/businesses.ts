import {FastifyInstance} from "fastify";

const business = {
  "email": "testvicens@gmail.com",
  "name": "Umai",
  "phoneNumber": "637000000",
  "menu": {
    "categories": [
      {
        "description": "Descripción cafés",
        "id": 1,
        "items": [
          {
            "description": "Descripción cortado",
            "id": 1,
            "name": "Cortado",
            "price": 1.3,
            "show": true
          },
          {
            "description": "Descripción café con leche",
            "id": 2,
            "name": "Café con leche",
            "price": 1.5,
            "show": true
          }
        ],
        "name": "Cafés",
        "show": true
      },
      {
        "description": "Descripción entrantes",
        "id": 2,
        "items": [
          {
            "description": "Descripción nachos",
            "id": 1,
            "name": "Nachos",
            "price": 7,
            "show": true
          },
          {
            "description": "Descripción patatas bravas",
            "id": 2,
            "name": "Patatas Bravas",
            "price": 5,
            "show": true
          },
          {
            "description": "Descripción cebolla frita",
            "id": 3,
            "name": "Cebolla frita",
            "price": 6.5,
            "show": false
          }
        ],
        "name": "Entrantes",
        "show": true
      },
      {
        "description": "Descripción pizzas",
        "id": 3,
        "name": "Pizzas",
        "show": true
      },
      {
        "description": "Descripción postres",
        "id": 4,
        "items": [
          {
            "description": "Descripción tarta de queso",
            "id": 1,
            "name": "Tarta de queso",
            "price": 6,
            "show": true
          }
        ],
        "name": "Postres",
        "show": false
      },
      {
        "description": "Descripción bebidas",
        "id": 5,
        "items": [
          {
            "description": "Descripción agua",
            "id": 1,
            "name": "Agua",
            "price": 2,
            "show": false
          }
        ],
        "name": "Bebidas",
        "show": true
      }
    ]
  },
}

export const registerBusinessRoutes = (app: FastifyInstance, opts, next) => {
  app.get('/', async () => [business])
  next()
}



