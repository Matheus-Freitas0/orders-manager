import { OrderErrorDTO } from '../dto/order-error.dto'
import { OrderRequest } from '../dto/order-request.dto'

export interface OrderValidator {

    validate(orderRequest: OrderRequest): Promise<OrderErrorDTO[]>

}
    // validacoes nescessarias 
    
    // exemplo:

    // validar cpf
    // validar stock
    // validar codigo do produto
    // validar limite de pedidos em aberto por customer
    // validar desconto
    // validar preco do produto