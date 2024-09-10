import { Order } from '../models/order'
import { OrderItem } from '../models/order-item'

export interface OrderRepository {

    create(order: Order): Promise<Order>
    getByCode(code: string): Promise<Order>
    createOrderItem(item: OrderItem): Promise<void>
    createOrderItemBatch(items: OrderItem[]): Promise<void>
    updateOrder(code: string, item: Order): Promise<void>
    getAll(pageSize: number, pageNumber: number): Promise<Order[]>
}