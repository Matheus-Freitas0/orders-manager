import { Order } from '../../models/order'
import { OrderRepository } from '../order.repository'
import { Repository } from '../repository'
import queries from '../../../files/queries/orders-queries.json'
import { OrderItem } from '../../models/order-item'
import { error } from 'console'

export class OrderRepositoryImpl extends Repository implements OrderRepository {

    async create(order: Order): Promise<Order> {
        await this.datasource.query(queries.create, order.code, order.customerId)
        return await this.getByCode(order.code)
    }

    async getByCode(code: string): Promise<Order> {
        const data = await this.datasource.query(queries.getByCode, code);
        
        if (!data || data.length === 0) {
          throw new Error('Nenhum pedido encontrado');
        }
      
        const resultSet = data[0] as any[];
        
        if (!resultSet || resultSet.length === 0) {
          throw new Error('Codigo invalido ou vazio');
        }
      
        const items: OrderItem[] = this.itemConverter(resultSet);
        const order: Order = this.orderConverter(resultSet, items);
      
        return order;
      }

    private orderConverter(resultSet: any[], items: OrderItem[]): Order {
        return {
            id: resultSet[0]['order_id'],
            code: resultSet[0]['order_code'],
            customerId: resultSet[0]['customer'],
            created: resultSet[0]['created'],
            status: resultSet[0]['status'],
            status_payment: resultSet[0]['status_payment'],
            payment_method: resultSet[0]['payment_method'],
            customerDocument: resultSet[0]['document'],
            total: resultSet.reduce((a, c) => a + parseFloat(c['total']), 0),
            items
        }
    }

    private itemConverter(resultSet: any[]): OrderItem[] {
        return resultSet.map(item => {
            return {
                productId: item['product_id'],
                orderId: item['order_id'],
                quantity: item['quantity'],
                discountPercent: item['discount_percent'],
                total: item['value']
            }
        })
    }

    async createOrderItem(item: OrderItem): Promise<void> {
        await this.datasource.query(queries.createOrderItem, item.productId, item.orderId, item.quantity, item.discountPercent, item.total)
    }

    async createOrderItemBatch(items: OrderItem[]): Promise<void> {
        for (const item of items) {
            await this.createOrderItem(item)
        }
    }
    
    async updateOrder(code: string, item: Order): Promise<void> {
        await this.datasource.query(queries.updateOrder, item.status, item.status_payment, item.payment_method , code)
    }

    async getAll(pageSize: number, pageNumber: number, orderStatus: string, initDate: string, endDate: string): Promise<Order[]> {
        const offset = (pageNumber - 1) * pageSize
        
        const orderStatusF = `%${orderStatus}%`
        
        const data = await this.datasource.query(queries.getAll, orderStatusF, initDate, endDate, pageSize, offset)
        
        const resultSet = data[0] as any[]

        const items: OrderItem[] = this.itemConverter(resultSet)
       
        const orderIds = items.map(element => element.orderId)

        const setOrderIds = new Set(orderIds)

        const orders: Order[] = []
        
        setOrderIds.forEach(orderId => {
            const itemById = items.filter(item => item.orderId === orderId)

            const resultSetFiltered = resultSet.filter(rs => rs['order_id'] === orderId)
            
            const order: Order = this.orderConverter(resultSetFiltered, itemById)
            
            orders.push(order)
        })

        return orders
    }

    async count(orderStatus: string, initDate: string, endDate: string): Promise<number> {
        
        const data = await this.datasource.query(queries.count, `%${orderStatus}%`, initDate, endDate)
        return data[0][0]['total'] as number
    
    }
}