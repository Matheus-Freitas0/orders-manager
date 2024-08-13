import { OrderErrorDTO } from '../../dto/order-error.dto'
import { OrderRequest } from '../../dto/order-request.dto'
import { OrderValidator } from '../order.validator'
import { Inject } from '../../config/container.config'
import { ProductService } from '../../services/product.service'

export class OrderValidatorProductImpl implements OrderValidator {
    @Inject('productSvc') private productService!: ProductService
    
    async validate(orderRequest: OrderRequest): Promise<OrderErrorDTO[]> {
        const errors: OrderErrorDTO[] = []
        
        try {
            const productsCode = orderRequest.items.map(item => item.productCode)
            const products = await this.productService.getProductsByCodeIn(productsCode)
            
            if (orderRequest.items.length !== products.length) {
                errors.push({ title: 'items', message: 'The products found did not match the request' })
            }
        } catch (error) {
            errors.push({ title: 'items', message: 'Error when trying to find products' })
        }
        return errors
    }
}