import { OrderRequest } from '../dto/order-request.dto'

export interface OrderService {

    create(orderRequest: OrderRequest): Promise<string>

}