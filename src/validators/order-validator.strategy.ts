import { Inject, InjectArray } from '../config/container.config'
import { OrderErrorDTO } from '../dto/order-error.dto'
import { OrderRequest } from '../dto/order-request.dto'
import { CustomerService } from '../services/customer.service'
import { ProductService } from '../services/product.service'
import { OrderValidator } from './order.validator'

export class OrderValidatorStrategy {

    @InjectArray('orderValidator') private orderValidators!: OrderValidator[]
    @Inject('productSvc') private productService!: ProductService
    @Inject('customerSvc') private customerService!: CustomerService

    async execute(orderRequest: OrderRequest, orderMetadata?: { [name: string]: any }): Promise<OrderErrorDTO[]> {
        let outerErrors: OrderErrorDTO[] = []
        
        orderMetadata!['products'] = await this.productService.getProductsByCodeIn(orderRequest.items.map(item => item.productCode))
        orderMetadata!['customer'] = await this.customerService.getByDocument(orderRequest.customerDocument)
        
        for (const validator of this.orderValidators) {
            const innerErrors = await validator.validate(orderRequest, orderMetadata)
            outerErrors = [...outerErrors, ...innerErrors]
        }
        return outerErrors
    }

}