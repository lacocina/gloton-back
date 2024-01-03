import type { CustomerOrder } from "./CustomerOrder.ts";
import type { PackageStatus } from "./PackageStatus.ts";
export interface Package {
    id: number
    hamPrice: number
    customerOrders: CustomerOrder[]
    status: PackageStatus
    creationDate: Date
    closingDate?: Date
    shippingPrice?: number
}
