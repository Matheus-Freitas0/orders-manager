import { OrderItem } from './../../models/order-item';
import { Inject } from '../../config/container.config'
import { OrderRequest } from '../../dto/order-request.dto'
import { OrderResponseDTO } from '../../dto/order-response.dto'
import { Order } from '../../models/order'
import { OrderRepository } from '../../repositories/order.repository'
import { AppUtils } from '../../utils/app.utils'
import { CustomerService } from '../customer.service'
import { OrderService } from '../order.service'
import { ProductService } from '../product.service'

export class OrderServiceImpl implements OrderService {
   
    @Inject('orderRepo') private repository!: OrderRepository 
    @Inject('productSvc') private productService!: ProductService
    @Inject('customerSvc') private customerService!: CustomerService

    async create(orderRequest: OrderRequest): Promise<OrderResponseDTO> {
        const customer = await this.customerService.getByDocument(orderRequest.customerDocument)

        if(!customer) throw new Error('Customer not found')
        
        const productsCode = orderRequest.items.map(item => item.productCode)
        const products = await this.productService.getProductsByCodeIn(productsCode)

        if(orderRequest.items.length != products.length) throw new Error('The products found did not match from request')
        
        const order: Order = {
            customerId: customer.id,
            code: AppUtils.genereteUUIDSimples()
        }
        const orderSaved = await this.repository.create(order)

        orderRequest.items.forEach(async itemRequest => {
            const orderItem: OrderItem = {
                orderId: orderSaved.id as number,
                productId: itemRequest.productId,
                quantity: itemRequest.quantity,
                total: itemRequest.total,
                discountPercent: itemRequest.discountPercent            
            }
            await this.repository.createOrderItem(orderItem)
        })        

        return {
            id: orderSaved.id as number,
            code: orderSaved.code
        }
    }
}
