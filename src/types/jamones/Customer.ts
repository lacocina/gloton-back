export interface Customer {
    id: number
    active: boolean
    name: string
    alias?: string
    pastOrders: number[]
}
