import { FastifyInstance } from "fastify";

export const businesses = [
    {
      "id": 1,
      "userID": 1,
      "email": "testvicens@gmail.com",
      "name": "Umai",
      "phoneNumber": "637000000",
      "menu": {
        "categories": [
          {
            "id": 1,
            "name": "Cafés",
            "description": "Descripción cafés",
            "show": true,
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
            ]
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
    },
  {
    "id": 2,
    "userID": 2,
    "email": "testvicens@gmail.com",
    "name": "Anatolia",
    "phoneNumber": "637000000",
    "menu": { "categories": [] },
  }
]

export const registerBusinessRoutes = (app: FastifyInstance, opts, next) => {
  app.get('/', async () => businesses)

  app.get('/:id', async (request) => {
    return businesses.find((business) => business.id === Number(request.params.id))
  })

  app.post('/category', async (request, reply) => {
    const newCategory = request.body

    if (newCategory?.businessId && newCategory?.name) {
      const businessCategories = businesses.find((business) => business.id === newCategory.businessId)?.menu.categories

      delete newCategory.businessId
      newCategory.id     = businessCategories.length + 1
      newCategory.items  = []

      businessCategories.push(newCategory)
      return 'Categoría añadida correctamente'
    }

    reply.status(400)
    return 'Falta el businessId o el Nombre'
  })

  app.patch('/category', async (request, reply) => {
    const updatedCategory : object | any = request.body

    if (
        updatedCategory?.businessId
        && updatedCategory?.id
        && updatedCategory?.name
    ) {

      const category = businesses
          .find((business) => business.id === updatedCategory.businessId).menu.categories
          .find((c) => c.id === updatedCategory.id)

      category.name = updatedCategory.name
      category.description = updatedCategory.description
      category.show = updatedCategory.show

      return 'Categoría añadida correctamente'
    }

    reply.status(400)
    return 'Falta el id de la categoría, el businessId o el nombre'
  })

  app.post('/product', async (request, reply) => {
    const newProduct = request.body

    console.log(newProduct)

    if (
        newProduct?.businessId
        && newProduct.categoryId
        && newProduct.name
        && newProduct.price
    ) {
      const categoryProducts = businesses
          .find((business) => business.id === newProduct.businessId)?.menu.categories
          .find((category) => category.id === newProduct.categoryId).items

      delete newProduct.businessId
      delete newProduct.categoryId
      newProduct.id     = categoryProducts.length + 1

      categoryProducts.push(newProduct)
      return 'Producto añadido correctamente'
    }

    reply.status(400)
    return 'Falta el businessId, el categoryId, el nombre o el precio'
  })

  app.put('/product', async (request) => {
    businesses.push(request.body.categoryData)
  })

  next()
}
