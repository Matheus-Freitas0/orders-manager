import { OrderErrorDTO } from '../../dto/order-error.dto'
import { OrderRequest } from '../../dto/order-request.dto'
import { OrderValidator } from '../order.validator'
import { Inject } from '../../config/container.config'
import { ProductService } from '../../services/product.service'

export class OrderValidatorProductImpl implements OrderValidator {
    @Inject('productSvc') private productService!: ProductService
    
    async validate(orderRequest: OrderRequest, orderMetadata?: { [name: string]: any }): Promise<OrderErrorDTO[]> {
        const errors: OrderErrorDTO[] = []
        
        try {
            const products = orderMetadata!['products']
            
            if (orderRequest.items.length !== products.length) {
                errors.push({ title: 'items', message: 'The products found did not match the request' })
            }
        } catch (error) {
            errors.push({ title: 'items', message: 'Error when trying to find products' })
        }
        return errors
    }
}