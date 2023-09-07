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

  app.get('/:businessId/categories', async (request, reply) => {
    const targetBusiness = businesses.find((business) => business.id === Number(request.params.businessId))

    if (targetBusiness) {
      return targetBusiness.menu.categories
    }

    reply.status(500)
    return 'No se ha encontrado un negocio con este ID'
  })

  app.post('/:businessId/categories', async (request, reply) => {
    const newCategory = request.body
    const businessId = Number(request.params.businessId)

    if (businessId && newCategory?.name) {
      const businessCategories = businesses.find((business) => business.id === businessId)?.menu.categories

      newCategory.id = businessCategories.length + 1
      newCategory.items = []

      businessCategories.push(newCategory)
      return newCategory
    }

    reply.status(500)
    return 'Falta el businessId o el Nombre'
  })

  app.patch('/:businessId/categories/:categoryId', async (request, reply) => {
    const updatedCategory : object | any = request.body
    const businessId = Number(request.params.businessId)
    const categoryId = Number(request.params.categoryId)

    if (
        businessId
        && categoryId
        && updatedCategory?.name
    ) {

      const category = businesses
          .find((business) => business.id === businessId).menu.categories
          .find((c) => c.id === categoryId)

      category.name = updatedCategory.name
      category.description = updatedCategory.description
      category.show = updatedCategory.show

      return category
    }

    reply.status(500)
    return 'Falta el id de la categoría, el businessId o el nombre'
  })

  app.delete('/:businessId/categories/:categoryId', async (request, reply) => {
    const businessCategories = businesses.find((business) => business.id === Number(request.params.businessId))?.menu.categories

    if (!businessCategories) {
      reply.status(404)
      return `No existe un business con este ID: ${request.params.businessId}`
    }

    let targetCategory

    for (const [index, category] of businessCategories.entries()) {
      if (category.id === Number(request.params.categoryId)) {
        targetCategory = category
        businessCategories.splice(index, 1)
      }
    }

    if (targetCategory) {
      return targetCategory
    }

    reply.status(404)
    return `No existe una categoría con este ID: ${request.params.categoryId}`
  })

  app.post('/:businessId/categories/:categoryId/products', async (request, reply) => {
    const newProduct = request.body
    const businessId = Number(request.params.businessId)
    const categoryId = Number(request.params.categoryId)

    if (
        businessId
        && categoryId
        && newProduct.name
        && newProduct.price
    ) {
      const targetCategory = businesses
          .find((business) => business.id === businessId)?.menu.categories
          .find((category) => category.id === categoryId)

      if (!!targetCategory.items) {
        newProduct.id = targetCategory.items.length + 1
      } else {
        newProduct.id = 1
        targetCategory.items = []
      }

      targetCategory.items.push(newProduct)

      return newProduct
    }

    reply.status(500)
    return 'Falta el businessId, el categoryId, el nombre o el precio'
  })

  app.patch('/:businessId/categories/:categoryId/products/:productId', async (request, reply) => {
    const updatedProduct : object | any = request.body
    const businessId = Number(request.params.businessId)
    const categoryId = Number(request.params.categoryId)
    const productId = Number(request.params.productId)

    if (
        businessId
        && categoryId
        && productId
        && updatedProduct.name
        && updatedProduct.price
    ) {
      const targetProduct = businesses
          .find((business) => business.id === businessId)?.menu.categories
          .find((category) => category.id === categoryId)?.items
          .find((product) => product.id === productId)

      targetProduct.name = updatedProduct.name
      targetProduct.price = updatedProduct.price
      targetProduct.description = updatedProduct.description
      targetProduct.show = updatedProduct.show

      return targetProduct
    }

    reply.status(500)
    return 'Falta el businessId, el categoryId, el productId, el nombre o el precio'
  })

  next()
}
