import { Order } from '../../models/order'
import { OrderRepository } from '../order.repository'
import { Repository } from '../repository'

export class OrderRepositoryImpl extends Repository implements OrderRepository {

    async create(order: Order): Promise<string> {
        // todo -> criar a query de insert
        // todo -> executar a query
        // todo -> buscar order que foi criada para retornar o codigo        

        return ''
    }

}