import { Order } from '../models/order'

export interface OrderRepository {

    create(order: Order): Promise<string>
    getByOrder(code:string): Promise<string>
    
}