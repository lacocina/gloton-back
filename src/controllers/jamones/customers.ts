import { FastifyInstance } from "fastify";
import type { Customer } from "../../types/jamones/Customer.ts";
export const customers : Customer[] = [
    {
        id: 1,
        active: false,
        name: "Teresa Simón",
        alias: "Teresa",
        pastOrders: []
    },
    {
        id: 2,
        active: false,
        name: "Miquel Marimón",
        alias: "Marimón",
        pastOrders: []
    }
]

export const registerCustomersRoutes = (app: FastifyInstance, opts, next) => {

    app.get('/', async () => customers)

    next()
}
