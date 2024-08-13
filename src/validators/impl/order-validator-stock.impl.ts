import { OrderErrorDTO } from '../../dto/order-error.dto'
import { OrderRequest } from '../../dto/order-request.dto'
import { OrderValidator } from '../order.validator'
import { Inject } from '../../config/container.config'
import { ProductService } from '../../services/product.service'

export class OrderValidatorStockImpl implements OrderValidator {
    @Inject('productSvc') private productService!: ProductService
    
    async validate(orderRequest: OrderRequest): Promise<OrderErrorDTO[]> {
        const errors: OrderErrorDTO[] = []
        
        try {
            const productsCode = orderRequest.items.map(item => item.productCode)
            const products = await this.productService.getProductsByCodeIn(productsCode)
            
            orderRequest.items.forEach(item => {
                const product = products.find(p => p.code === item.productCode)
                
                if (item.quantity > product!.stock) {
                    errors.push({ title: 'stock', message: `Product ${item.productCode} does not have enough stock` })
                }
            })
        } catch (error) {
            errors.push({ title: 'stock', message: 'Error when trying to verify stock' })
        }
        return errors
    }

}