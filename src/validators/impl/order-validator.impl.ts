import { OrderErrorDTO } from "../../dto/order-error.dto";
import { OrderRequest } from "../../dto/order-request.dto";
import { OrderValidator } from "../order.validator";

export class OrderValidatorImpl implements OrderValidator {

    async validate(orderRequest: OrderRequest): Promise<OrderErrorDTO[]> {
        const errors: OrderErrorDTO[] = [];

    }
        // validacoes nescessarias 
    
    // exemplo:

    // validar cpf
    // validar stock
    // validar codigo do produto
    // validar limite de pedidos em aberto por customer
    // validar desconto
    // validar preco do produto
}