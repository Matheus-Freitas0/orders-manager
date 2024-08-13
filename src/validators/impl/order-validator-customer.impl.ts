import { OrderErrorDTO } from '../../dto/order-error.dto'
import { OrderRequest } from '../../dto/order-request.dto'
import { OrderValidator } from '../order.validator'
import { Inject } from '../../config/container.config'
import { CustomerService } from '../../services/customer.service'

export class OrderValidatorCustomerImpl implements OrderValidator {
    
    @Inject('customerSvc') private customerService!: CustomerService

    async validate(orderRequest: OrderRequest): Promise<OrderErrorDTO[]> {
    const errors: OrderErrorDTO[] = []
        try {
            const customer = await this.customerService.getByDocument(orderRequest.customerDocument)
            if (!customer) {
                errors.push({ title: 'customerDocument', message: 'Customer not found' })
            }
        }   catch (error: any) {
            errors.push({ title: 'customerDocument', message: error.messa })
        }   
    return errors
    
    }
}