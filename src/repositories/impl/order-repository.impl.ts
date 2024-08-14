import { Order } from '../../models/order'
import { OrderRepository } from '../order.repository'
import { Repository } from '../repository'
import queries from '../../../files/queries/orders-queries.json'
import { OrderItem } from '../../models/order-item'

export class OrderRepositoryImpl extends Repository implements OrderRepository {

    async create(order: Order): Promise<Order> {
        await this.datasource.query(queries.create, order.code , order.customerId)
        return await this.getByCode(order.code)
    }

    async getByCode(code: string): Promise<Order> {
        const data = await this.datasource.query(queries.getByCode, code)
        const resultSet = data[0] as Order[]        
        return resultSet[0] as Order        
    }

    async createOrderItem(item: OrderItem): Promise<void> {
        await this.datasource.query(queries.createOrderItem,  item.productId, item.orderId, item.quantity, item.discountPercent, item.total)
    }

    async createOrderItemBatch(items: OrderItem[]): Promise<void> {
        for (const item of items) {
            await this.createOrderItem(item)
        }
    }
    async updateOrder(code: string, item: Order): Promise<void> {
        const order = await this.getByCode(code)
        if(!order){
            throw new Error(`Order with code: ${code} not found`)
        }
        await this.datasource.query(queries.updateOrder, item.status, item.status_payment, item.payment_method , code)
    }
}