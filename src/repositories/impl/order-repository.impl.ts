import { Order } from '../../models/order'
import { OrderRepository } from '../order.repository'
import { Repository } from '../repository'
import queries from '../../../files/queries/orders-queries.json'
import { OrderItem } from '../../models/order-item'

export class OrderRepositoryImpl extends Repository implements OrderRepository {

    async create(order: Order): Promise<string> {
        await this.datasource.query(queries.create, order.code , order.customerId)
        const orderSaved = await this.getByCode(order.code)
        return orderSaved.code
    }

    async getByCode(code: string): Promise<Order> {
        const data = await this.datasource.query(queries.getByCode, code)
        const resultSet = data[0] as Order[]        
        return resultSet[0] as Order        
    }

    async createOrderItem(item: OrderItem): Promise<void> {
        await this.datasource.query(queries.createOrderItem,  item.productId, item.orderId, item.quantity, item.descountPercent, item.total)
    }

}