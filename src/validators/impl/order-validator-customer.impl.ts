import { OrderErrorDTO } from '../../dto/order-error.dto'
import { OrderRequest } from '../../dto/order-request.dto'
import { OrderValidator } from '../order.validator'
import { Inject } from '../../config/container.config'
import { CustomerService } from '../../services/customer.service'

export class OrderValidatorCustomerImpl implements OrderValidator {
    
    @Inject('customerSvc') private customerService!: CustomerService

    async validate(orderRequest: OrderRequest, orderMetadata?: { [name: string]: any }): Promise<OrderErrorDTO[]> {
    const errors: OrderErrorDTO[] = []
        try {
            orderMetadata!['customerDocument']
            
        }   catch (error: any) {
            errors.push({ title: 'customerDocument', message: error.message })
        }   
    return errors
    
    }
}