import { OrderRequest } from '../dto/order-request.dto'
import { OrderResponseDTO } from '../dto/order-response.dto'
import { Order } from '../models/order'
import { Paged } from '../dto/paged'
import { OrderPayRequest } from '../dto/order-pay-request.dto'

export interface OrderService {

    create(orderRequest: OrderRequest): Promise<OrderResponseDTO>
    getByCode(code: string): Promise<Order>
    updateOrder(code: string, order: Order): Promise<void>
    getAll(pageSize: number, pageNumber: number, orderStatus: string, initDate: string, endDate: string): Promise<Paged<Order>>
    pay(orderPayRequest: OrderPayRequest): Promise<void>
}
