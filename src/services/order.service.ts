import { OrderRequest } from '../dto/order-request.dto'
import { OrderResponseDTO } from '../dto/order-response.dto'

export interface OrderService {

    create(orderRequest: OrderRequest): Promise<OrderResponseDTO>

}