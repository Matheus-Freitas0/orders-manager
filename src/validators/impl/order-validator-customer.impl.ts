import { OrderErrorDTO } from '../../dto/order-error.dto'
import { OrderRequest } from '../../dto/order-request.dto'
import { OrderValidator } from '../order.validator'

export class OrderValidatorCustomerImpl implements OrderValidator {
    
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