import { Inject } from '../../config/container.config'
import { OrderRequest } from '../../dto/order-request.dto'
import { Order } from '../../models/order'
import { OrderItem } from '../../models/order-item'
import { OrderRepository } from '../../repositories/order.repository'
import { AppUtils } from '../../utils/app.utils'
import { CustomerService } from '../customer.service'
import { OrderService } from '../order.service'
import { ProductService } from '../product.service'

export class OrderServiceImpl implements OrderService {
   
    @Inject('orderRepo') private repository!: OrderRepository 
    @Inject('productSvc') private productService!: ProductService
    @Inject('customerSvc') private customerService!: CustomerService

    async create(orderRequest: OrderRequest): Promise<string> {
        const customer = await this.customerService.getByDocument(orderRequest.customerDocument)

        if(!customer) throw new Error('Customer not found')
        const productsCode = orderRequest.itens.map(item => item.productCode)
        const products = await this.productService.getProductsByCodeIn(productsCode)

        if(orderRequest.itens.length != products.length) throw new Error('The products found did not match from request')
        
        const order: Order = {
            customerId: customer.id,
            code: AppUtils.genereteUUIDSimples()
        }
        const orderCode = await this.repository.create(order)

        return ''
    }
}
