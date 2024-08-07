import { OrderItemRequest } from './order-item-request.dto'

export type OrderRequest = {
    customerDocument: string
    itens: OrderItemRequest[]
}