export interface CustomerOrder {
    packageId: number
    customerId: number
    customerAlias: string
    totalPrice: number
    quantity: number
    payed: boolean
    paymentDate?: Date
    hamsWeight?: number[]
}
