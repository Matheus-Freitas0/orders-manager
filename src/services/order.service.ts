import { OrderRequest } from '../dto/order-request.dto'
import { OrderResponseDTO } from '../dto/order-response.dto'
import { Order } from '../models/order'

export interface OrderService {

    create(orderRequest: OrderRequest): Promise<OrderResponseDTO>
    updateOrder(code: string, order: Order): Promise<void>
}