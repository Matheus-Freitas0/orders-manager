import { OrderErrorDTO } from '../dto/order-error.dto'
import { OrderRequest } from '../dto/order-request.dto'

export interface OrderValidator {

    validate(orderRequest: OrderRequest): Promise<OrderErrorDTO[]>

}