import { OrderItemRequest } from '../dto/order-item-request.dto'
import { Order } from '../models/order'

export interface OrderRepository {

    create(order: Order): Promise<string>

}