import { Inject } from '../../config/container.config'
import { OrderService } from './../order.service';
import { OrderRequest } from '../../dto/order-request.dto'
import { OrderRepository } from '../../repositories/order.repository'

export class OrderServiceImpl implements OrderService {
   
    @Inject('orderRepo') 
    private repository!: OrderRepository 

    async create(orderRequest: OrderRequest): Promise<string> {
        // todo -> recuperar o customer
        // todo -> validar se customer existe
        // todo -> recuperar a lista de produtos
        // todo -> validar os produtos
        // todo -> criar a order
        // todo -> criar uma validacao para ver se os dados da order estão corretos
        // todo -> salvar os itens na tabela a products_orders
        return ''
    }
}
